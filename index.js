const inquirer = require('inquirer');
const employeeData = require('./db/employeeData.js');
const sequelize = require('./config/connection.js');
const mysql = require('mysql2/promise');

const data = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const mainQuestions = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
          { value: 'view_departments', name: 'View all departments' },
          { value: 'view_employees', name: 'View all employees' },
          { value: 'view_roles', name: 'View all roles' },
          { value: 'add_department', name: 'Add a department' },
          { value: 'add_role', name: 'Add a role' },
          { value: 'add_employee', name: 'Add an employee' },
          { value: 'update_role', name: 'Update an employee role' },
        ],
      },
    ])
    .then((response) => {
      switch (response.option) {
        case 'view_departments':
          view_departments();
          break;
        case 'view_roles':
          view_roles();
          break;
        case 'view_employees':
          view_employees();
          break;
        case 'add_department':
          add_department();
          break;
        case 'add_role':
          add_role();
          break;
        case 'add_employee':
          add_employee();
          break;
        case 'update_role':
          update_role();
          break;
      }
    });
};

const view_departments = () => {
  data.query('SELECT * FROM departments').then(([results]) => {
    console.table(results);

    mainQuestions();
  });
};

const view_employees = () => {
  data.query('SELECT * FROM employees').then(([results]) => {
    console.table(results);

    mainQuestions();
  });
};

const view_roles = () => {
  data.query('SELECT * FROM roles').then(([results]) => {
    console.table(results);

    mainQuestions();
  });
};

const add_department = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'Enter the new department name:',
      },
    ])
    .then((response) => {
      data
        .query('INSERT INTO departments (name) VALUES (?)', [response.department_name])
        .then(([results]) => {
          console.log('\n', results, '\n');
          mainQuestions();
        });
    });
};

const add_role = () => {
  data.query('SELECT * FROM departments').then(([results]) => {
    const departmentChoices = results.map((department) => ({
      value: department.id,
      name: department.name,
    }));

    inquirer
      .createPromptModule([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the new title of the role: ',
        },
        {
          type: 'number',
          name: 'salary',
          message: 'Enter the salary for the new role:',
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Select the department for the role below',
          choices: departmentChoices,
        },
      ])
      .then((response) => {
        data
          .query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [
            response.title,
            response.salary,
            response.department_id,
          ])
          .then(([results]) => {
            console.log('\n', results, '\n');
            mainQuestions();
          });
      });
  });
};

const add_employee = () => {
  data.query('SELECT * FROM roles').then(([results]) => {
    const roleChoices = results.map((role) => ({
      value: role.id,
      name: role.title,
    }));

    data.query('SELECT * FROM employees').then(([results]) => {
      const managerChoices = results.map((employee) => ({
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
      }));

      managerChoices.unshift({ value: null, name: 'None' });

      inquirer
        .createPromptModule([
          {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:',
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:',
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'Enter the role of the employee:',
            choices: roleChoices,
          },
          {
            type: 'list',
            name: 'manager_id',
            message: 'Enter the manager of the employee:',
            choices: managerChoices,
          },
        ])
        .then((response) => {
          data
            .query(
              'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
              [response.first_name, response.last_name, response.role_id, response.manager_id]
            )
            .then(([results]) => {
              console.log('\n', results, '\n');
              mainQuestions();
            });
        });
    });
  });
};

const update_role = () => {
  data.query('SELECT * FROM employees').then(([results]) => {
    const employeeChoices = results.map((employee) => ({
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    }));

    data.query('SELECT * FROM roles').then(([results]) => {
      const roleChoices = results.map((role) => ({
        value: role.id,
        name: role.title,
      }));

      inquirer
        .createPromptModule([
          {
            type: 'list',
            name: 'employee_id',
            message: 'Select which employee to update below:',
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'Select the employee\'s new role below:',
            choices: roleChoices,
          },
        ])
        .then((response) => {
          data
            .query('UPDATE employees SET role_id = ? WHERE id = ?', [response.role_id, response.employee_id])
            .then(([results]) => {
              console.log('\n', results, '\n');
              mainQuestions();
            });
        });
    });
  });
};

mainQuestions();
