drop table if exists users;

create table users (
  id serial not null primary key,
  name varchar(50) not null unique,
  counter int not null default 0
);
