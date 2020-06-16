-- The following queries focus on the Harrisonburg City division. To keep things
-- simple, only gender is displayed instead of all five student demographics.

--
-- membership (1296 rows)
--
SELECT
  school_year AS year,
  sch_name AS school,
  grade_code AS grade,
  gender,
  fall_membership_cnt AS students
FROM fall_membership
WHERE div_num = '113'
  AND federal_race_code IS NULL
  AND disability_flag IS NULL
  AND lep_flag IS NULL
  AND disadvantaged_flag IS NULL
ORDER BY
  school_year,
  sch_name,
  grade_code,
  gender,
  fall_membership_cnt;

--
-- testdata (4431 rows)
--
SELECT
  school_year AS year,
  sch_name AS school,
  gender,
  test,
  test_level AS level,
  avg_sol_scale_score AS avg_score,
  pass_rate,
  fail_rate
FROM sol_test_data
WHERE div_num = '113'
  AND federal_race_code IS NULL
  AND disability_flag IS NULL
  AND lep_flag IS NULL
  AND disadvantaged_flag IS NULL
ORDER BY
  school_year,
  sch_name,
  gender,
  test,
  test_level,
  avg_sol_scale_score,
  pass_rate,
  fail_rate;

--
-- graduate (63 rows)
--
SELECT
  school_year AS year,
  sch_name AS school,
  gender,
  hs_completion_name AS deg_type,
  hs_completer_cnt AS grad_cnt
FROM hs_graduate
WHERE div_num = '113'
  AND sch_num IS NOT NULL -- only one high school
  AND federal_race_code IS NULL
  AND disability_flag IS NULL
  AND lep_flag IS NULL
  AND disadvantaged_flag IS NULL
ORDER BY
  school_year,
  sch_name,
  gender,
  hs_completion_num,
  hs_completer_cnt;

--
-- postsec (48 rows)
--
SELECT
  school_year AS year,
  sch_name AS school,
  gender,
  cohort_graduate_cnt AS cohort_size,
  CASE ps_institution_type
    WHEN 1 THEN '4-Year Public'
    WHEN 2 THEN '2-Year College'
    WHEN 3 then '4-Year Private'
    END AS inst_type,
  ps_enrollment_cnt AS enroll_cnt
FROM postsec_enroll
WHERE div_num = '113'
  AND sch_num IS NOT NULL -- only one high school
  AND federal_race_code IS NULL
  AND disability_flag IS NULL
  AND lep_flag IS NULL
  AND disadvantaged_flag IS NULL
ORDER BY
  school_year,
  sch_name,
  gender,
  ps_institution_type,
  ps_enrollment_cnt;
