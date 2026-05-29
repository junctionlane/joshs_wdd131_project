function convert(grade) {
    let points;

    switch (grade) {
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }

    return points;
}

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const students = [
    { last: 'Andrus', first: 'Aaron' },
    { last: 'Masa', first: 'Manny' },
    { last: 'Tanda', first: 'Tamanda' }
];


// ARRAY METHODS

// forEach
words.forEach(word => {
    console.log(word);
});


// map
const upperWords = words.map(word => word.toUpperCase());

console.log(upperWords);


// filter
const longWords = words.filter(word => word.length > 5);

console.log(longWords);


// find
const foundStudent = students.find(student => student.last === 'Masa');

console.log(foundStudent);


// reduce
const grades = ['A', 'B', 'C', 'A', 'B'];

const totalPoints = grades.reduce((total, grade) => {
    return total + convert(grade);
}, 0);

console.log(totalPoints);


// TEMPLATE LITERAL ON PAGE
const output = document.querySelector("#output");

students.forEach(student => {
    output.innerHTML += `
        <p>${student.first} ${student.last}</p>
    `;
});