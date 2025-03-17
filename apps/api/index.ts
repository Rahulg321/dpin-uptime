import express from "express";
import { authMiddleware } from "./middleware";
import { prismaClient } from "db/client";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/website/status", authMiddleware, async (req, res) => {
  const websiteId = req.query.websiteId as unknown as string;

  const userId = req.userId!;

  if (!websiteId) {
    res.json({
      error: "website id does not exist",
    });
  }

  const data = await prismaClient.website.findFirst({
    where: {
      id: websiteId!,
      disabled: false,
      userId,
    },
    include: {
      ticks: true,
    },
  });

  res.json(data);
});

app.post("/api/v1/website", authMiddleware, async (req, res) => {
  const { url } = req.body;
  const userId = req.userId!;

  if (!userId) {
    res
      .json({
        error: "No user id present",
      })
      .status(401);
  }

  if (!url) {
    res
      .json({
        error: "No url provided",
      })
      .status(404);
  }

  const data = await prismaClient.website.create({
    data: {
      url,
      userId,
    },
  });

  res.json({
    id: data.id,
  });
});

app.get("/api/v1/website/:id", authMiddleware, (req, res) => {});

app.get("/api/v1/websites", authMiddleware, async (req, res) => {
  const userId = req.userId!;

  const websites = await prismaClient.website.findMany({
    where: {
      userId,
      disabled: false,
    },
    include: {
      ticks: true,
    },
  });

  res.json(websites);
});

app.delete("/api/v1/website/", authMiddleware, async (req, res) => {
  const websiteId = req.body.websiteId as unknown as string;

  const userId = req.userId!;

  if (!websiteId) {
    res.json({
      error: "website id does not exist",
    });
  }

  await prismaClient.website.update({
    where: {
      id: websiteId,
      userId,
    },
    data: {
      disabled: true,
    },
  });

  res.json({
    message: "Successfully disabled website",
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
