const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
// const cohortName = process.argv[2];
const limit = process.argv[2] || 'JUL02';
// Store all potentially malicious values in an array.
const values = [limit];

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name like $1
ORDER BY teacher;
  `;

pool.query(queryString,values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${process.argv[2]} : ${user.teacher}`);
  })
  pool.end();
}).catch(err => console.error('query error', err.stack));