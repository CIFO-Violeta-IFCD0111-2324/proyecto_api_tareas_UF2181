drop database if exists test;
create database test;
use test;

create table tareas(
id int primary key auto_increment,
nombre_tarea varchar(255),
fecha_inicio date,
fecha_fin date,
descripcion varchar(255)
);



select * from tareas;
