INSERT INTO department (id, name) VALUES (1, 'Adminstrative');
INSERT INTO department (id, name) VALUES (2, 'Legal');
INSERT INTO department (id, name) VALUES (3, 'science');
INSERT INTO department (id, name) VALUES (4, 'veterinary');

INSERT INTO role (id, title, salary, department_id) VALUES (1,'biologist', 45000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (2,'Lawyer', 100000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (3,'Veterinary surgeon', 250000, 4);
INSERT INTO role (id, title, salary, department_id) VALUES (4,'laboratory technician', 50000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (5,'Receptionist', 21000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (6,'Data Entry Clerk', 25000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (7,'solicitor', 320000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1,'Mary', 'Lowe', 3, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2,'Fred', 'Flintstone', 3, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3,'Gary', 'Field', 4, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4,'Stacey', 'Keel', 1, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5,'Harvey', 'Specter', 2, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6,'Wendy', 'Adams', 3, 5);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (7,'Chris', 'Grinch', 4, 6);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8,'Richie', 'Rich', 2, 4);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (9,'Wanda', 'Women', 1, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (10,'Lisa', 'Thompson', 4, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (11,'Charlie', 'Brown', 1, 2);

