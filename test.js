// const names = 'John ';
// const age = 30;
// // concatanation
// console.log('My name is ' + names + 'and i am ' + age);
// // template string 
// const hello = `My name is ${names} and i am ${age} years old`
// console.log(hello)

// const person = {
//     firstName: 'John',
//     lastName: 'Doe',
//     age: 30,
//     hobbies: ['music', 'movies', 'sports'],
//     address: {
//         street: '50 main str',
//         city: 'Boston',
//         state: 'MA'
//     }
// }
// console.log(person.hobbies[1])
// console.log(person.address.city)

// const {firstName, lastNam, address:{city, street, state}} = person;
// console.log(firstName)
// console.log(city)
// person.email = "john@gmail.com"
// console.log(person)

//`````````` *****************************************```````````````//

// const todos = [
//     {
//         id: 1,
//         text: 'Take out trash',
//         isCompleted: true
//     },
//     {
//         id: 2,
//         text: 'Meeting with boss',
//         isCompleted: true
//     },
//     {
//         id: 3,
//         text: 'Dentist appt',
//         isCompleted: false
//     },
// ];
// console.log(todos)
// console.log(todos[1].text)
// const todoJSON = JSON.stringify(todos)
// console.log(todoJSON)

// for(let i = 0; i < todos.length; i++) {
//     console.log(todos[i].text);
// }

// for(let todo of todos) {
//     console.log(todo.text)
// }

// todos.forEach(function(todo){
//     console.log(todo.text);
// });

// const todoText = todos.map(function(todo){
//     return todo.text;
// });
// console.log(todoText);

// const todoFilter = todos.filter(function(todo){
//     return todo.isCompleted === true;
// }).map(function(todo){
//     return todo.id; 
// })
// console.log(todoFilter) // 1 , 2


//``````````````````****************************```````````````//

// function Person(firstName, lastName, dob) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.dob = new Date(dob);
//     // this.getBirthYear = function(){
//     //     return this.dob.getFullYear();
//     // }
//     // this.getFullName = function(){
//     //     return `${this.firstName} ${this.lastName}`;
//     // }
// }

// Person.prototype.getBirthYear = function(){
//     return this.dob.getFullYear();
// }
// Person.prototype.getFullName = function(){
//     return `${this.firstName} ${this.lastName}`
// }

// const person1 = new Person('John', 'Doe', '4-3-1980')
// const person2 = new Person('Mary', 'Smith', '4-3-1990')
// console.log(person1);
// console.log(person2.dob);
// console.log(person1.getBirthYear());
// console.log(person1.getFullName());

//``````````````````****************************```````````````//

// class Person {
//     constructor(firstName, lastName, dob) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.dob = new Date(dob);
//     }

//     getBirthYear() {
//         return this.dob.getFullYear();
//     }
//     getFullName() {
//         return `${this.firstName} ${this.lastName}`
//     }
// }

// const person1 = new Person('John', 'Doe', '4-3-1980')
// const person2 = new Person('Mary', 'Smith', '4-3-1990')
// console.log(person1);
// console.log(person2.dob);
// console.log(person1.getBirthYear());
// console.log(person1.getFullName());

//``````````````````****************************```````````````//
//``````````````````****************************```````````````//
//``````````````````****************************```````````````//

/////////// Adding users and click submit ////////////

// // Single element 
// console.log(document.getElementById('my-form'));
// console.log(document.querySelector('h1'));

// // Multiple element
// const items = document.querySelectorAll('.item');
// // console.log(document.getElementsByClassName('item'));
// items.forEach(function(item){
//     console.log(item)
// })
// const item = document.querySelector('.items')
// // item.lastElementChild.remove()
// console.log(item);
// item.firstElementChild.textContent = "hello";
// item.children[1].innerHTML = 'Brad';
// item.lastElementChild.innerHTML = '<h1> Hello </h1>';

// const btn = document.querySelector('.btn');
// btn.style.background = 'red';

// btn.addEventListener('click', function(e) {
//     e.preventDefault()
//     // console.log(e.target.className);
//     document.querySelector('#my-form').style.background = '#ccc';
//     document.querySelector('body').classList.add('bg-dark');
//     document.querySelector('.items').lastElementChild.classList.add('bg-red');
// })

//``````````````````****************************```````````````//

const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);
function onSubmit(e){
    e.preventDefault();
    // console.log(nameInput.value)
    if(nameInput.value === '' || emailInput.value === ''){
        msg.classList.add('error')
        msg.innerHTML = 'Please enter all fields';
        setTimeout(()=> msg.remove(), 3000);
    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
        userList.appendChild(li);
        nameInput.value = '';
        emailInput.value = '';
    }

}

