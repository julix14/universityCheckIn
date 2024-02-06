import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { userId, lectureId, latitude, longitude } = await readBody(event);
  try {
    const checkInFromDB = await prisma.check_in.create({
      data: {
        user_id: userId,
        lecture_id: lectureId,
        latitude: latitude,
        longitude: longitude,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(checkInFromDB),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
});
