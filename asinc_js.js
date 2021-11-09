/////////////////// HTTP READYSTATE AND REQUEST STATUS /////////////////

//const getTodos = function(){
//        const request = new XMLHttpRequest();
//        request.addEventListener('readystatechange', ()=> {
//        //console.log(request, request.readyState);  XMLHttpRequest 1, XMLHttpRequest 2, XMLHttpRequest 3, XMLHttpRequest 4
//        if(request.readyState === 4 && request.status === 200){
//            data = (request.responseText)
//            console.log(data)
//        }
//        else if(request.readyState === 4){
//            console.log('could not fetch the data')
//        }
//    });
//    request.open("GET", 'https://jsonplaceholder.typicode.com/todos/');
//    request.send();
//}
//
//getTodos()


/////////////// CALLBACK FUNCTIONS AND JSON PARSE///////////////////////////////
//const getTodos = function(callback){  // in js (not in Python) function can be assigned to a variable, and then parameter in that function can be another function;
//        const request = new XMLHttpRequest();
//        request.addEventListener('readystatechange', ()=> {
//        if(request.readyState === 4 && request.status === 200){
//            const data = JSON.parse(request.responseText) // jsone.parse is used to add keys to each object of array.
//            callback(undefined, data)
//        }
//        else if(request.readyState === 4){
//            callback('could not fetch data', undefined)
//        }
//    });
//    request.open("GET", 'https://jsonplaceholder.typicode.com/todos/');
//    request.send();
//};
//
//console.log(1);
//console.log(2);
//
//getTodos(function(err, data){
//    console.log('callback fired')
//    if(err){
//        console.log(err);
//    } else {
//        console.log(data);
//    }
//});
//
//console.log(3)
//console.log(4)

////////////////////////////// CALLBACKS, PROMISES ///////////////////////////////

const posts = [
    {title: 'Post One', body: 'This is post one'},
    {title: 'Post Two', body: 'This is post two'}
];

function getPosts() {
    setTimeout(function(){
        let output = '';
        posts.forEach(function(post, index){
            output += `<li>${post.title}</li>`
        });
        document.body.innerHTML = output;
    },1000);
}
//                //////////////// CALLBACKS
//function createPost(post, callback) { // without callback posts will not be added because the setTimeout for getPosts is 1 sec, and for createPosts is 2 sec.
//    setTimeout(function(){
//        posts.push(post);
//        callback()// wait one second after the post is pushed.
//    },2000)
//}
//
//createPost({title: 'Post three', body: 'This is post 3'}, getPosts())

                    // PROMISES ////////////////////
//function createPost(post) {
//    return new Promise(function(resolve, reject){
//        setTimeout(function(){
//            posts.push(post);
//            const error = false;
//
//            if(!error) {
//                resolve();
//            } else {
//                reject('Error: Something went wrong');
//            }
//        }, 2000)
//    })
//}

//createPost({title:'Post Three', body: 'This is post three'}).then(getPosts).catch(function(err){
//    console.log(err)
//})

                // PROMISE.ALL ////////////////////
const promise1 = Promise.resolve('Hello World');
const promise2 = 10;
const promise3 = new Promise(function(resolve, reject){
    setTimeout(resolve, 2000, 'Goodbye')
});
const promise4 = new XMLHttpRequest()
promise4.open("GET", 'https://jsonplaceholder.typicode.com/todos/');
promise4.send();



Promise.all([promise1, promise2, promise3, promise4]).then(function(values){
    console.log(values)
})