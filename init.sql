CREATE TABLE public.users (
    id serial PRIMARY KEY,
    password varchar(20) NOT NULL
);

CREATE TABLE public.posts(
  id serial PRIMARY KEY,
  text VARCHAR(250) NOT NULL,
  post_date date,
  user_id INTEGER NOT NULL REFERENCES users(id)
);
