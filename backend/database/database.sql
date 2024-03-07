drop database if exists datos;
create database datos;
use datos;

create table dato (
  id varchar(255) primary key,
  dato varchar(255),
  posicion_dato int
);

select * from dato;
