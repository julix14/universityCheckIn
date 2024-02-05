SELECT
  gen_random_uuid() AS id,
  "Lecture".id AS "lectureId",
  "Lecture".name,
  "Lecture"."groupId",
  "substring"(("Lecture"."startTime") :: text, 0, 11) AS date,
  "Lecture"."startTime" AS starttime
FROM
  "Lecture";