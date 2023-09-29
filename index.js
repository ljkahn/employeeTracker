const mysql = require('mysql2');
const inquirer = require('inquirer');
const PORT = 2001;
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'KJK1LJK2!',
  database: 'company_db'
},
  console.log(`Connected to the company_db database!`)

);


// //GET ALL MOVIES FROM DATABASE TABLE  

// app.get('/api/departments', async (req, res) => {
//   console.log(req);
//   //now i want to interact with the db
//   const movieResponse = await query('SELECT * FROM departments', (err, data) => {
//     res.json(movieResponse);
//     console.log(data);
//   })
// })


// app.get('/api/movie-reviews', async (req, res) => {
//   console.log(req);
//   //now i want to interact with the db
//   const movieReviewResponse = await query('SELECT * FROM employees', (err, data) => {
//     res.json(movieReviewResponse);
//     console.log(data);
//   })
// })


// //POST REQUESTS

// app.post('/api/add-movie', (req, res) => {
//   console.log(res)
// })




app.listen(PORT, () => {
  console.log('API server is listening on ${PORT}')
});


function init() {
  //inquirer prompt for questions
  inquirer.prompt(questions)
    .then((data) => {
      //validation that it doesnt accept more than 3 characters
      if (data.text.length > 3) {
        return console.error("You must use a maximum of three characters. Please try again.");

      }
    }
    )
}