id |   name   | number_of_greetings |       time_of_greets       
----+----------+---------------------+----------------------------
  1 | Tau      |                   3 | 2020-09-08 04:10:25+02
  2 | Themba   |                   2 | 2020-09-08 00:15:28+02
  3 | Sipho    |                   1 | 2020-09-08 01:12:30+02
  4 | Mahlatsi |                   4 | 2020-09-08 02:05:10+02
 26 |          |                     | 
 27 |          |                   1 | 2020-09-09 12:46:17.753+02
 28 |          |                   1 | 2020-09-09 12:47:10.171+02
 29 |          |                   1 | 2020-09-09 12:47:59.534+02
(29 rows)

create table greetings(
	id serial not null primary key,
	name text not null,
	count int,
	time text
);