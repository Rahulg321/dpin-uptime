import { PublicKey } from "@solana/web3.js";
import { type ServerWebSocket } from "bun";
import { v4 as uuidv4 } from "uuid";
import {
  type IncomingMessage,
  type OutgoingMessage,
  type SignupIncomingMessage,
} from "common/types";
import { prismaClient } from "db/client";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

const availableValidators: {
  validatorId: string;
  socket: ServerWebSocket<unknown>;
  publicKey: string;
}[] = [];

// every key in the object must be a string, and each key maps to a function with data like this
const CALLBACKS: { [callbackId: string]: (data: IncomingMessage) => void } = {};

const COST_PER_VALIDATION = 100;

Bun.serve({
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  port: 8081,
  websocket: {
    async message(ws: ServerWebSocket<unknown>, message: string) {
      const data: IncomingMessage = JSON.parse(message);

      if (data.type === "signup") {
        // we check the user signed that message or not
        const verified = await verifyMessage(
          `Signed message for ${data.data.callbackId}, ${data.data.publicKey}`,
          data.data.publicKey,
          data.data.signedMessage
        );

        if (verified) {
          await signupHandler(ws, data.data);
        }
      } else if (data.type === "validate") {
        CALLBACKS[data.data.callbackId](data);
        delete CALLBACKS[data.data.callbackId];
      }
    }, // a message is received
    async close(ws: ServerWebSocket<unknown>) {
      availableValidators.splice(
        availableValidators.findIndex((v) => {
          return v.socket === ws;
        }, 1)
      );
    }, // a socket is closed
  },
});

async function validateMessage() {}

async function signupHandler(
  ws: ServerWebSocket<unknown>,
  { ip, publicKey, signedMessage, callbackId }: SignupIncomingMessage
) {
  const validatorDb = await prismaClient.validator.findFirst({
    where: {
      publicKey,
    },
  });

  if (validatorDb) {
    ws.send(
      JSON.stringify({
        type: "signup",
        data: {
          callbackId,
          validatorId: validatorDb.id,
        },
      })
    );

    availableValidators.push({
      validatorId: validatorDb.id,
      socket: ws,
      publicKey: validatorDb.publicKey,
    });
    return;
  }

  const createdValidator = await prismaClient.validator.create({
    data: {
      publicKey,
      ip,
      location: "unknown",
    },
  });

  ws.send(
    JSON.stringify({
      type: "signup",
      data: {
        validatorId: createdValidator.id,
        callbackId,
      },
    })
  );

  availableValidators.push({
    validatorId: createdValidator.id,
    socket: ws,
    publicKey: createdValidator.publicKey,
  });
}

async function verifyMessage(
  message: string,
  publicKey: string,
  signature: string
) {
  const messageBytes = nacl_util.decodeUTF8(message);
  const result = nacl.sign.detached.verify(
    messageBytes,
    new Uint8Array(JSON.parse(signature)),
    new PublicKey(publicKey).toBytes()
  );

  return result;
}

setInterval(async () => {
  const websitesToMonitor = await prismaClient.website.findMany({
    where: {
      disabled: false,
    },
  });

  console.log("websites to monitor", websitesToMonitor);
  for (const website of websitesToMonitor) {
    availableValidators.forEach((validator) => {
      const callbackId = uuidv4();
      console.log(
        `sending validate to ${validator.validatorId} for ${website.url} `
      );

      validator.socket.send(
        JSON.stringify({
          type: "validate",
          data: {
            callbackId,
            url: website.url,
            websiteId: website.id,
          },
        })
      );

      CALLBACKS[callbackId] = async (data: IncomingMessage) => {
        if (data.type === "validate") {
          const { validatorId, status, latency, signedMessage } = data.data;

          const verified = await verifyMessage(
            `Replying to ${callbackId}`,
            validator.publicKey,
            signedMessage
          );

          if (!verified) {
            return;
          }

          await prismaClient.$transaction(async (tx) => {
            await tx.websiteTick.create({
              data: {
                websiteId: website.id,
                validatorId,
                status,
                latency,
              },
            });

            await tx.validator.update({
              where: {
                id: validatorId,
              },
              data: {
                pendingPayouts: { increment: COST_PER_VALIDATION },
              },
            });
          });
        }
      };
    });
  }
}, 1000 * 60);
