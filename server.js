const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { posts: Todo, users: User, Sequelize, sequelize } = require("./models");
const passport = require("./passport");
const app = express();


sequelize
  .authenticate()
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
      secret: 'green-india',  //pick a random string to make the hash that is generated secure
      resave: false,
      saveUninitialized: false
  })
)

app.use(passport.initialize());
app.use(passport.session());


app.get("/api/getuser",async (req,res)=>{
  if(req.isAuthenticated()){
    console.log('authenticated user')
    res.json({user:req.user})
  }else{
    console.log('no user auth')
    res.json({user:null})
  }
})

app.post("/api/logout",async (req,res)=>{
  if(req.isAuthenticated()){
    req.logout()
    res.end()
  }
  res.end()

})

app.post("/api/signup", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user) {
    res.json({
      error: `Sorry, that username already exists with ${req.body.username}`
    });
  } else {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    res.json(newUser);
  }
});

app.post("/api/signin", (req, res, next) => {
  console.log(req.body)
  /* the above is only for debugging and will print in the terminal -  { username: 'rohanpaul2@gmail.com', password: '123456' }  */
  next()
  },
  passport.authenticate('local'),
  (req, res) => {
  console.log('loggedin', req.user);
  
  var userInfo = {
      username: req.user.username
  };
  res.send(userInfo)
});

app.post("/api/todos", async (req, res) => {
  console.log("Find all posts");
  console.log("user is ",req.user,req.isAuthenticated())

  allTodos = await Todo.findAll({
    attributes: ["id", "text", "post_date", "user_id", "order"],
    where: {
      user_id: req.user.id
    },
    order: [["order", "ASC"]]
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
  console.log(
    "update order in server on " +
      req.body.id +
      " with new order " +
      req.body.index
  );
  if (req.body.oldIndex < req.body.newIndex) {
    const incr = await Todo.increment(
      {
        order: -1
      },
      {
        where: {
          order: {
            [Sequelize.Op.lte]: req.body.newIndex,
            [Sequelize.Op.gt]: req.body.oldIndex
          },
          id: {
            [Sequelize.Op.ne]: req.body.id
          }
        }
      }
    );
  } else {
    const incr = await Todo.increment(
      {
        order: 1
      },
      {
        where: {
          order: {
            [Sequelize.Op.gte]: req.body.newIndex,
            [Sequelize.Op.lt]: req.body.oldIndex
          },
          id: {
            [Sequelize.Op.ne]: req.body.id
          }
        }
      }
    );
  }
  const updated = await Todo.update(
    {
      order: req.body.newIndex //h seira pou tha mpei
    },
    {
      where: {
        id: req.body.id
      }
    }
  );
  res.json(updated);
});

const port = 5000;

app.listen(port, () => console.log("Server is listening on port",port));
