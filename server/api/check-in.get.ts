import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { groupId, userId, lectureDate } = getQuery(event);

  if (groupId && userId && lectureDate) {
    const checkInFromDB = await prisma.check_in_by_date.findFirst({
      where: {
        user_id: Number(userId),
        group_id: Number(groupId),
        date: String(lectureDate),
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
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Please provide at least a groupId, userId and lectureDate.",
    }),
  };
});
