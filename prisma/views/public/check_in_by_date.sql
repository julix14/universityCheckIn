SELECT
  gen_random_uuid() AS row_id,
  c.id AS check_in_id,
  c.user_id,
  c.latitude,
  c.longitude,
  l.name,
  g.id AS group_id,
  "substring"((l.start_time) :: text, 0, 11) AS date,
  l.start_time
FROM
  (
    (
      check_in c
      JOIN lecture l ON ((l.id = c.lecture_id))
    )
    JOIN "group" g ON ((l.group_id = g.id))
  )
ORDER BY
  c.user_id,
  ("substring"((l.start_time) :: text, 0, 11));