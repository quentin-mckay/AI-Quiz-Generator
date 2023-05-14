export const testQuiz = [
    {
        query: 'What is the correct way to declare a variable in JavaScript?',
        choices: [
            'var = myVariable',
            'variable myVariablevariable myVariablevariable myVariablevariable myVariablevariable myVariablevariable myVariablevariable myVariable',
            'var myVariable',
            'variable = myVariable',
        ],
        answer: '2',
        explanation:
            "The correct way to declare a variable in JavaScript is using the 'var' keyword followed by the variable name. For example, 'var myVariable;'",
    },
    {
        query: 'Which operator is used to concatenate strings in JavaScript?',
        choices: ['+', '-', '*', '/'],
        answer: '0',
        explanation:
            "The '+' operator is used to concatenate strings in JavaScript. For example, 'var fullName = firstName + ' ' + lastName;'",
    },
    {
        query: 'What is the output of the following code?\nvar x = 5;\nconsole.log(x++);\nconsole.log(x);',
        choices: ['5, 6', '6, 5', '5, 5', '6, 6'],
        answer: '0',
        explanation:
            "The output of the code is '5' and '6'. The 'x++' operator increments the value of 'x' by 1 after the value has been returned. Therefore, the first console.log statement outputs '5', and the second console.log statement outputs '6'.",
    },
    {
        query: 'Which method is used to add an element to the end of an array in JavaScript?',
        choices: ['push()', 'pop()', 'shift()', 'unshift()'],
        answer: '0',
        explanation:
            "The 'push()' method is used to add an element to the end of an array in JavaScript. For example, 'myArray.push('newElement');'",
    },
    {
        query: "What is the correct syntax for a 'for' loop in JavaScript?",
        choices: [
            'for (i=0; i<length; i++)',
            'for (i=0; i<=length; i++)',
            'for (i=1; i<=length; i++)',
            'for (i<0; i<length; i++)',
        ],
        answer: '0',
        explanation:
            "The correct syntax for a 'for' loop in JavaScript is 'for (initialExpression; condition; incrementExpression)'. For example, 'for (i=0; i<length; i++) { // code to be executed }'",
    },
]