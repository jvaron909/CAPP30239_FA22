/* 
This is a javascript example for
week 2.
*/

// inline comment

let num = 100; //integer

function foo() {
    let num2 = 200;
    console.log(num);

};

foo();

//let anomFun = function() {
//    console.log("Hello");
//};

let anomFun = () => console.log("Hello");

(function() {
    console.log("hi")
});

let person = "Summer";

function people(peopleName) {
    console.log("Hello " + peopleName);
};

people(person);

let arr = ["foo", 123, ["zar", "bar"]];

console.log(arr[2]);

// set item in array

arr[1] = "barbar";

console.log(arr)

//Add item to the end of the array
arr.push("car");

//Removing an item from the index
arr.splice(2, 1);
console.log(arr)


for (let item of arr){
    console.log(item);
}

for (let i in arr) {
    console.log(i + " - " + arr[i]);
}

//loop through each item in the array whith its index
arr.forEach((item, i) => console.log(i + " * " + item));

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};

console.log(obj1.name);
console.log(obj1["age"]);

obj1.job = "Barista";

console.log(obj1);

for (let key in obj1) {
    let value = obj1[key];
    console.log(`${key}: ${value}`);

}

console.log("hello " + obj1["name"] +  " " + num);

//console.log("hello " + ${obj1["name"]} ${num});

////for (let i = 0 ;)

//let x = 75;

//if  (x>)

//traverse DOM
let example = document.getElementById("example");

example.innerHTML += "HelloWorld";