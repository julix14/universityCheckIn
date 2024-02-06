import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { lectureDate, groupId } = getQuery(event);

  if (lectureDate && groupId) {
    return getLectureByDateAndGroup(lectureDate, groupId);
  } else if (groupId) {
    return getAllLecturesByGroup(groupId);
  } else if (lectureDate) {
    return getAllLecturesByDate(lectureDate);
  }
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Please provide at least a groupId.",
    }),
  };
});

async function getLectureByDateAndGroup(lectureDate, groupId) {
  const lectureFromDB = await prisma.lecture_by_date.findFirst({
    where: {
      group_id: Number(groupId),
      date: String(lectureDate),
    },
  });
  if (lectureFromDB) {
    return {
      statusCode: 200,
      body: JSON.stringify(lectureFromDB),
    };
  }
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "No lecture found for this groupId and date.",
    }),
  };
}

async function getAllLecturesByGroup(groupId) {
  const lecturesFromDB = await prisma.lecture.findMany({
    where: {
      group_id: Number(groupId),
    },
  });
  if (lecturesFromDB.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify(lecturesFromDB),
    };
  }
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "No lectures found for this groupId.",
    }),
  };
}

async function getAllLecturesByDate(lectureDate) {
  const lecturesFromDB = await prisma.lecture_by_date.findMany({
    where: {
      date: String(lectureDate),
    },
  });
  if (lecturesFromDB.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify(lecturesFromDB),
    };
  }
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "No lectures found for this date.",
    }),
  };
}
