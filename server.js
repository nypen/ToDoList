const express = require('express');
const app = express();

const db = require('./src/database');
//test db
db.authenticate()
.then(()=>console.log('db connected'))
.catch(err => console.log(err))

app.use(express.json());

const todos  = [
  {id:0 , post: "post1" , date: "adate"},
  {id:1 , post: "post2" , date: "adate"},
  {id:2 , post: "post3" , date: "adate"}
];

app.get('/api/todos' , (req,res) => {

  res.json(todos);
});

app.post('/api/addtodo',(req,res) => {
  todos.push(req.body);
  console.log(todos);
});

app.post('/api/deletetodo',(req,res) => {
  console.log(req.body);
});

app.post('/api/updateTodo',(req,res) => {
  //na kanei update to post stin basi
  console.log(req.body);
});


const port = 5000;

app.listen(port, ()=> console.log('sss'));
