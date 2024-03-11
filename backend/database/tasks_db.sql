drop database if exists `task_db`;
create database `task_db`;
use `task_db`;

create table tasks(
	id int primary key auto_increment,
    nombre varchar(255),
    descripcion text,
    fecha_inicio datetime,
    fecha_fin datetime
);

select * from tasks;
