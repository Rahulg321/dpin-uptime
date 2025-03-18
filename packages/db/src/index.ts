import { PrismaClient } from "@prisma/client";
import type {
  User,
  Website,
  Validator,
  WebsiteStatus,
  WebsiteTick,
} from "@prisma/client";

export const prismaClient = new PrismaClient();
export type { User, Website, Validator, WebsiteTick, WebsiteStatus };

export type WebsiteWithTicks = Website & {
  ticks: WebsiteTick[];
};
