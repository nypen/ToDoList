const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const db = require("./src/database");
const Todo = require("./models/Posts");
const User = require("./models/Users");
const passport = require("./passport");


//test db
db.authenticate()
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize())
app.use(passport.session())


app.post("/api/signup",async (req,res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if(user){
      res.json({
          error: `Sorry, that username already exists with ${req.body.username}`
      })
    }else{
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password
      })
      res.json(newUser);
    }
  }
);

app.post('/api/signin', (req, res, next) => {
  const { body: { user } } = req;
  return passport.authenticate('local', (err, passportUser, info) => {
    if(err) {
      return next(err);
    }
    if(passportUser) {  //authenticated
      console.log('user id '+passportUser.id)
      return res.json({
        user_id: passportUser.id,
        username: passportUser.Username
      });
    }
    return res.json({status:400});
  })(req, res, next);
});


app.post("/api/todos", async (req, res) => {
  console.log("Find all posts");
  allTodos = await Todo.findAll({
    attributes: ["id", "text", "post_date", "user_id","order"],
    where: {
      user_id: req.body.user_id
    },
    order:[['order', 'ASC']]
  });

  res.json(allTodos);
});


app.post("/api/addtodo", async (req, res) => {
  var d = new Date();

  const added = await Todo.create({
    text: req.body.text,
    post_date: d,
    user_id: req.body.user_id,
    order: req.body.order
  });

  res.json(added);
});

app.post("/api/deleteTodo", async (req, res) => {
  await Todo.destroy({
    where: {
      id: req.body.id
    }
  });

  res.json({ id: req.body.id });
});

app.post("/api/updateTodo", async (req, res) => {
  console.log(
    "updating post with id " + req.body.id + " with text " + req.body.text
  );
  const updated = await Todo.update(
    {
      text: req.body.text
    },
    {
      where: {
        id: req.body.id
      }
    }
  );

  res.json(updated);
});

app.post("/api/updateOrder", async (req, res) => {
  console.log('update order in server on '+req.body.id+ ' with new order '+req.body.index);
  if(req.body.oldIndex<req.body.newIndex){
    const incr = await Todo.increment(
      {
        order: -1
      },
      {
        where:{
          order:{
            [Sequelize.Op.lte]: req.body.newIndex,
            [Sequelize.Op.gt]: req.body.oldIndex
          },
          id:{
            [Sequelize.Op.ne]: req.body.id
          }
        }
      });
  }else{
    const incr = await Todo.increment(
      {
        order: 1
      },
      {
        where:{
          order:{
            [Sequelize.Op.gte]: req.body.newIndex,
            [Sequelize.Op.lt]: req.body.oldIndex
          },
          id:{
            [Sequelize.Op.ne]: req.body.id
          }
        }
      });
  }
  const updated = await Todo.update(
    {
      order: req.body.newIndex  //h seira pou tha mpei
    },
    {
      where:{
        id: req.body.id
      }
    }
  );
  res.json(updated);
});



const port = 5000;

app.listen(port, () => console.log("sss"));
