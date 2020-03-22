const express = require('express');
const app = express();
const Todo = require('./models/Posts');

const db = require('./src/database');
//test db
db.authenticate()
.then(()=>console.log('db connected'))
.catch(err => console.log(err))

app.use(express.json());
var d = new Date();


app.get('/api/todos' , (req,res) => {
  console.log('Find all posts');
  Todo.findAll({
    attributes: ['id','text', 'post_date'],
    where: {
      user_id: 1
    }
  }).then(todos=>{
    res.json(todos);
  });
//  res.json(todos);
});

app.post('/api/addtodo',(req,res) => {
//  todos.push(req.body);
  const a_todo = Todo.create({
     text: req.body.text,
     post_date : d,
     user_id: req.body.user_id
   });
   res.sendStatus(200);
});

app.post('/api/deleteTodo',(req,res) => {
  Todo.destroy({
    where:{
      id:req.body.id
    }
  });
  res.sendStatus(200);
});

app.post('/api/updateTodo',(req,res) => {
  console.log('updating post with id '+req.body.id+ ' with text '+req.body.text);
  Todo.update(
    {
      text: req.body.text
    },
    {
      where:
      {
        id: req.body.id
      }
    }
  ).then(res=>res.sendStatus(200));
});


const port = 5000;

app.listen(port, ()=> console.log('sss'));
