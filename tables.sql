drop table if exists users;

create table users (
  id serial not null primary key,
  name varchar(50) not null,
  counter int not null default 0,
  language varchar(50) not null
);
