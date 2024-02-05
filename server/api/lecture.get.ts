import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { lectureDate, groupId } = getQuery(event);

  if (lectureDate && groupId) {
    const lectureFromDB = await prisma.lecture_by_date.findFirst({
      where: {
        groupId: Number(groupId),
        date: String(lectureDate),
      },
    });
    if (!lectureFromDB) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "No lecture found for this groupId and date.",
        }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(lectureFromDB),
    };
  }
});
