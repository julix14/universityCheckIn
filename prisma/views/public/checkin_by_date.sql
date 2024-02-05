SELECT
  gen_random_uuid() AS id,
  c.id AS "checkInId",
  c."userId",
  c.latitude,
  c.longitude,
  l.name,
  "substring"((l."startTime") :: text, 0, 11) AS date,
  l."startTime" AS starttime
FROM
  (
    "CheckIn" c
    JOIN "Lecture" l ON ((l.id = c."lectureId"))
  )
ORDER BY
  c."userId",
  ("substring"((l."startTime") :: text, 0, 11));