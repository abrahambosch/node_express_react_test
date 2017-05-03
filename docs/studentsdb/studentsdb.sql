


DROP TABLE IF EXISTS class_lesson;
CREATE TABLE class_lesson (
  class_id int(11) DEFAULT NULL,
  lesson_id int(11) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_index (class_id,lesson_id)
);


INSERT INTO class_lesson (class_id, lesson_id)
VALUES
	(1,1),
	(1,2),
	(1,5),
	(2,1),
	(2,4),
	(3,1),
	(3,3),
	(3,5);


DROP TABLE IF EXISTS class_user;
CREATE TABLE class_user (
  user_id int(11) NOT NULL,
  class_id int(11) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_index (user_id,class_id)
);


INSERT INTO class_user (user_id, class_id)
VALUES
	(1,2),
	(1,3),
	(2,1),
	(2,3),
	(3,1),
	(3,2),
	(3,3),
	(4,1),
	(4,2);


DROP TABLE IF EXISTS classes;
CREATE TABLE classes (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  class_name varchar(50) DEFAULT NULL,
  period int(11) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


INSERT INTO classes (id, class_name, period)
VALUES
	(1,'Math',2),
	(2,'English',4),
	(3,'Science',5);


DROP TABLE IF EXISTS lessons;
CREATE TABLE lessons (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  lesson_name varchar(30) NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


INSERT INTO lessons (id, lesson_name)
VALUES
	(1,'Intro'),
	(2,'Geometry'),
	(3,'Physics'),
	(4,'British Literature'),
	(5,'Algebra');



DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  first_name varchar(40) NOT NULL DEFAULT '',
  last_name varchar(40) NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);



INSERT INTO users (id, first_name, last_name)
VALUES
	(1,'Kevin','Parker'),
	(2,'Steven','Tray'),
	(3,'Brittany','Chase'),
	(4,'Jessica','Smith');




-- 1) Show all of the lessons User 1 is taking

select l.lesson_name
from lessons l
join class_lesson cl on (l.id=cl.lesson_id)
join classes c on (cl.class_id=c.id)
join class_user cu on (cu.class_id=cl.class_id)
join users u on (u.id=cu.user_id)
where u.id=1
group by lesson_name


-- 2) Show all users in a class during Period 5
select u.first_name, u.last_name
from lessons l
join class_lesson cl on (l.id=cl.lesson_id)
join classes c on (cl.class_id=c.id)
join class_user cu on (cu.class_id=cl.class_id)
join users u on (u.id=cu.user_id)
where c.period=5
group by first_name, last_name