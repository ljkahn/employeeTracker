module.exports = {
    //create a list of options for the menu
    createList: () => {
        const list = [
            {
                name: 'View All Employees',
                value: 1
            },

                     {
                name: 'Add Employee',
                value: 2
            },

                     {
                name: 'Update Employee Role',
                value: 3
            },

                     {
                name: 'View All Roles',
                value: 4
            },

                     {
                name: 'Add Role',
                value: 5
            },

                     {
                name: 'View All Departments',
                value: 6
            },

                     {
                name: 'Add Department',
                value: 7
            },

                     {
                name: 'Quit',
                value: 8
            },

        ]
        return result;
    }

},

//create a function to display questions on CLI
questions: (cb) => {
    const choices = cb();

    return [
        {
            type: ' list',
            name: 'Choice',
            message: 'What would you like to do?',
        
        }
    ]
}