import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { lectureDate, groupId } = getQuery(event);

  if (lectureDate && groupId) {
    const lecturesFromDB = await prisma.lecture.findMany({
      where: {
        groupId: Number(groupId),
      },
    });
    if (!lecturesFromDB) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No lecture found for this groupId." }),
      };
    }

    // Filter the lectures by date and check if the datetime is on the same day as the lectureDate
    const lecturesOnDate = lecturesFromDB.filter((lecture) => {
      const lectureDateObj = new Date(lecture.startTime);
      const lectureDateStr = lectureDateObj.toISOString().split("T")[0];
      return lectureDateStr === lectureDate;
    });

    if (lecturesOnDate.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No lecture found on this day." }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(lecturesOnDate[0]),
    };
  }
});
