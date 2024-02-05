import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { groupId, userId, lectureDate } = getQuery(event);

  if (groupId && userId && lectureDate) {
    const checkInFromDB = await prisma.checkIn.findFirst({
      where: {
        userId: Number(userId),
      },
    });
    if (!checkInFromDB) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No check-in found for this userId" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(checkInFromDB),
    };
  }
});
