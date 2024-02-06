SELECT
  gen_random_uuid() AS row_id,
  lecture.id AS lecture_id,
  lecture.name,
  lecture.group_id,
  "substring"((lecture.start_time) :: text, 0, 11) AS date,
  lecture.start_time AS starttime
FROM
  lecture;