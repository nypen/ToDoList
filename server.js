const express = require('express');

const app = express();

app.get('/api/todos' , (req,res) => {
  const todos  = [
    {id:1 , post: "post1"},
    {id:2 , post: "post2"},
    {id:3 , post: "post3"}
  ];
  res.send('hey')
//  res.json(todos);
});

const port = 5000;

app.listen(port, ()=> console.log('sss'));
