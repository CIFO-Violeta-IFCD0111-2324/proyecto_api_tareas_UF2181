drop database if exists datos;
create database datos;
use datos;

create table dato (
  id int primary key auto_increment,
  dato varchar(100) 
);

select * from dato;
