//postgres
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma as PrismaClient;

// ---------------------------------------------------------------

//mysql
// import { PrismaMariaDb } from '@prisma/adapter-mariadb'
// import { PrismaClient } from "./generated/prisma/client";

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is not set");
// }

// const globalForPrisma = globalThis as unknown as {
//   prisma?: PrismaClient;
// };

// const adapter = new PrismaMariaDb({
//   host: process.env.DATABASE_HOST,
//   port: parseInt(process.env.DATABASE_PORT || "3306"),
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   connectionLimit: 5,
//   socketTimeout: 3000,
// });

// const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//     log: ["error", "warn"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma as PrismaClient;
