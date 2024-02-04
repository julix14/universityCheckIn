import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { lectureName, startTime, groupId } = await readBody(event);
  try {
    const lectureFromDB = await prisma.lecture.create({
      data: {
        name: lectureName,
        startTime: startTime,
        groupId: groupId,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(lectureFromDB),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
});
