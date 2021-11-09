//document.getElementById('button').addEventListener('click', loadText);
//
//function loadText() {
//    var xhr = new XMLHttpRequest();
//    xhr.open('GET', 'sample.txt', true);
////    xhr.onload = function(){
////        if(this.status == 200){
////            console.log(this.responseText);
////        }
////    }
//
//    xhr.onreadystatechange = function(){
//        if(this.readyState == 4 && this.status == 200) {
//            text = document.getElementById('text')
//            text.innerHTML = this.responseText
//        }
//    }
//
//    xhr.send();
//}

document.getElementById('button1').addEventListener('click', loadUser)

function loadUser(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'user.json', true);
    xhr.onload = function(){
        if(this.status == 200){
            var users = JSON.parse(this.responseText);
//            users.forEach(function(user){
//                    u = document.getElementById('users')
//                    u.innerHTML += `<li> name :  ${user.name}, email : ${user.email} </li>` // with backticks curly braces required
//                })
//            }
              var output = '';
              users.forEach(function(user){
                    output += '<ul>'
                            + '<li> ID:' + user.id + '</li>' +
                            '<li> Name:' + user.name + '</li>' +
                            '<li> Email:' + user.email + '</li>' +
                            '</ul>';
              })
              document.getElementById('users').innerHTML = output
        }
    }
    xhr.send();
}