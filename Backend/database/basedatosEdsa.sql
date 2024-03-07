drop database if exists `basedatos`;
create database `basedatos`;
use `basedatos`;
create table tabla (id int primary key auto_increment,
titulo varchar(255), 
descripcion varchar,
portada varchar,
fechainicio date,
fechafinal date

);
