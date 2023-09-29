INSERT INTO departments (id, dep_name)
VALUES (1, "Finance"),
(2, "Marketing"),
(3, "Engineering"),
(4, "Sales");


INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Financial Lead", 300000, 1),
(2, "Scrum Master", 300000, 1),
(3, "Senior Engineer", 300000, 1),
(4, "Senior Sales", 300000, 1),
(5, "Accountant", 300000, 1),
(6, "Advertising Lead", 300000, 1),
(7, "Outreach Specialist", 300000, 1);



INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES ( 1, "Kayleigh", "Jordan", 1, 1),
( 2, "Mark", "Wallis", 2, 2),
( 3, "Austyn", "Crandall", 3, 3),
( 4, "Jamie", "Burkhart", 4, 4),
( 5, "Ashton", "Key", 5, 5),
