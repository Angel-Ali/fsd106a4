//function
function sayHello(name) {
console.log("Hi there" + name);

    
}



function testFns() {

    sayHello("Angel");


}

// OR

function testFns() {
    let x = "Angel";
    sayHello("x");


}
// same thing, a function




//object constructor*************
function Dog(name,age) {
this.name = name;
this.age = age;
}



//Class
class Cat {
    constructor(name, age, color){
        //a method here
        this.name =name;
        this.age = age;
        this.color = color;
    }
}






//Object literal
function testObj() {
    let lola = {
        name: "lola", age: "3",
     };
     console.log(lola);
//you are literally describing an object here lola




//object constructor*************
let fido = new Dog("fido", 4);
let mouse = new Dog("Mouse", 5);
console.log(fido);
console.log(mouse);




//Class
let jery = new Cat("Jerry", 3, "Black");
console.log;(jerry);



}


function testReq() {
$.ajax({
    type: 'GET',
    url:"http://restclass.azurewebsites.net/api/test",

    success: function(res) {  console.log("Request good!", res);},
   
    error: function(error){  console.log("Request Failed!", res);},
//the request will either succeed or fail

        
    
});

}

