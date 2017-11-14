//查找各个部门当前(to_date='9999-01-01')领导当前薪水详情以及其对应部门编号dept_no
	CREATE TABLE `dept_manager` (
	`dept_no` char(4) NOT NULL,
	`emp_no` int(11) NOT NULL,
	`from_date` date NOT NULL,
	`to_date` date NOT NULL,
	PRIMARY KEY (`emp_no`,`dept_no`));
	CREATE TABLE `salaries` (
	`emp_no` int(11) NOT NULL,
	`salary` int(11) NOT NULL,
	`from_date` date NOT NULL,
	`to_date` date NOT NULL,
	PRIMARY KEY (`emp_no`,`from_date`));

	INSERT INTO dept_manager VALUES('d001',10002,'1996-08-03','9999-01-01'); 
	INSERT INTO dept_manager VALUES('d002',10006,'1990-08-05','9999-01-01'); 
	INSERT INTO dept_manager VALUES('d005',10010,'1996-11-24','2000-06-26'); 
	INSERT INTO dept_manager VALUES('d006',10010,'2000-06-26','9999-01-01'); 
	INSERT INTO salaries VALUES(10001,60117,'1986-06-26','1987-06-26'); 
	INSERT INTO salaries VALUES(10001,62102,'1987-06-26','1988-06-25'); 
	INSERT INTO salaries VALUES(10001,66074,'1988-06-25','1989-06-25');

	//查询语句
	select salaries.emp_no,salaries.salary,salaries.from_date,salaries.to_date,dept_manager.dept_no
	from salaries join dept_manager
	on salaries.emp_no=dept_manager.emp_no
	where salaries.to_date='9999-01-01'
	and
	dept_manager.to_date='9999-01-01';

//查找薪水涨幅超过15次的员工号emp_no以及其对应的涨幅次数t
	CREATE TABLE `salaries` (
	`emp_no` int(11) NOT NULL,
	`salary` int(11) NOT NULL,
	`from_date` date NOT NULL,
	`to_date` date NOT NULL,
	PRIMARY KEY (`emp_no`,`from_date`));

	INSERT INTO salaries VALUES(10001,60117,'1986-06-26','1987-06-26'); 
	INSERT INTO salaries VALUES(10002,72527,'1996-08-03','1997-08-03'); 

	//查询语句
	select emp_no, count(emp_no) as times from salaries
	group by emp_no
	having times > 5;
