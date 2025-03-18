import { PublicKey } from "@solana/web3.js";
import { randomUUIDv7, type ServerWebSocket } from "bun";
import { type IncomingMessage, type OutgoingMessage } from "common/types";
import { prismaClient } from "db/client";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

const availableValidators: {
  validatorId: string;
  socket: ServerWebSocket<unknown>;
  publicKey: string;
}[] = [];

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
    message(ws: ServerWebSocket<unknown>, message: string) {
      const data: IncomingMessage = JSON.parse(message);

      if (data.type === "signup") {
      }

      if (data.type === "validate") {
      }
    }, // a message is received
    open(ws) {}, // a socket is opened
    async close(ws: ServerWebSocket<unknown>) {
      availableValidators.splice(
        availableValidators.findIndex((v) => {
          return v.socket === ws;
        }, 1)
      );
    }, // a socket is closed
    drain(ws) {}, // the socket is ready to receive more data
  },
});
