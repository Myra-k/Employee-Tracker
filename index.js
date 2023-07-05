const inquirer = require('inquirer');
const employeeData = require ('./db/employeeData.js');
const sequelize = require ('./config/connection.js');

const data = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        passowrd: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,

});

const mainQuestions = () => {

    inquirer
    .createPromptModule([
        {
            type: 'list',
            name: 'option',
            message: 'what do you want to do?',
            choices: [
                { value: 'view_departments', name: "view all deparments" },
                { value: 'view_employees', name: "view all employees" },
                { value: 'view_roles', name: "view all roles" },
                { value: 'add_department', name: "add a deparments" },
                { value: 'add_role', name: "add a role" },
                { value: 'add_employee', name: "add an employee" },
                { value: 'update_role', name: "update an employee role" },
            ],
        },
    ])

    const deparmentQuestions = [
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter the new department name:'
        },
    ]

    const roleQuestions = [
        {
            type: 'input',
            name: 'title',
            message: 'Enter the new title of the role: '
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter the salary for the new role:'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the departemnt for the role below',
            choices: [
            ],
        },
    ]

    const employeeQuestions = [
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Enter the role of the employee:',
            choices: [
            ],
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Enter the manager of the employee:',
            choices: [
            ],
        },
    ]

    const updateEmployeeQuestions = [
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select which employee to update below:',
            choices: [
            ],
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select employees new role below:',
            choices: [
            ],
        },
    ]
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
    })
}

const view_departments = () => {
    data.getdepartments().then((results) => {
        console.table(results);

        mainQuestions();
    });
}

const view_employees = () => {
    data.getemployees().then((results) => {
        console.table(results);

        mainQuestions();
    });
}

const view_roles = () => {
    data.getRoles().then((results) => {
        console.table(results);

        mainQuestions();
    });
}

const add_department = () => {
    inquirer
    .createPromptModule(deparmentQuestions)
    .then((response) => {
        data.addDepartment(response).then((results) => {
            console.log('\n', results, '\n');
            mainQuestions();
        });
    })
}

const add_role = () => {
    data.getdepartments = roleQuestions[2];
    results.forEach((department) => {
        deparmentQuestions.choices.push({
            value:department.id,
            name: department.name
        });
    });

    inquirer
        .createPromptModule(roleQuestions)
        .then((response) => {
            data.addRole(response).then((results) => {
                console.log('\n', results, '\n');
                mainQuestions();
            });
        })
}

const add_employee = () => {
    data.getRoles().then((results) => {
        const roleQuestion = employeeQuestions[2];
        results.forEach((role) => {

            const role_summary = `${role.title} (${role.department_name}: ${role.salary})`;
            roleQuestion.choices.push({
                value: role.id,
                namae: role_summary
            });
        });

        db.getemployees().then((results) => {
             const managerQuestion = employeeQuestions[3];
             results.forEach((employee) => {
                managerQuestion.choices.push({
                    value: employee.id,
                    name: employee.name
                });
             });

             managerQuestion.choices.push({
                value:null,
                name: 'none'
             });

             inquirer
                 .createPromptModule(employeeQuestions)
                 .then((response) => {
                    data.addEmployee(response).then((results) => {
                        console.log('\n', results, '\n');
                        mainQuestions();
                    });
                 })
        });
    });
}

const update_role = () => {
    data.getemployees().then((results) => {
        const employeeQuestion = updateEmployeeQuestions[0];
        results.forEach((employee) => {
            employeeQuestion.choices.push ({
                value: employee.id,
                name: employee.name
            });
        });

        data.getRoles().then((results) => {
            const roleQuestion = updateEmployeeQuestions[1];
            results.forEach((role) => {
                roleQuestion.choices.push ({
                    value: role.id,
                    name: role.title
                });
            });

            inquirer
                .createPromptModule(updateEmployeeQuestions)
                .then((response) => {
                    data.updateEmployeeRole(response).then((results) => {
                        console.log('\n', results, '\n');
                        mainQuestions();
                    });
                })
        })
    })

}

mainQuestions();