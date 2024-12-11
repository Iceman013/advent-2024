// Start program
console.log("Start");
let fs = require('fs');

let text = "4 4841539 66 5279 49207 134 609568 0";
let inputy = text.split(" ");
let stones = [];
let scount = [];
for (let i = 0; i < inputy.length; i++) {
    stones.push(parseInt(inputy[i]));
    scount.push(1);
}

function printy(list) {
    let out = list[0].toString();
    for (let i = 1; i < list.length; i++) {
        out += " ";
        out += list[i].toString();
    }
    return out;
}

function sort(list, copy) {
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] > list[j]) {
                let temp = list[i];
                let tempb = copy[i];

                list[i] = list[j];
                copy[i] = copy[j];
                list[j] = temp;
                copy[j] = tempb;
            }
        }
    }
}

function addToList(item, count, list, lcount) {
    let loc = list.indexOf(item);
    if (loc == -1) {
        list.push(item);
        lcount.push(count);
    } else {
        lcount[loc] += count;
    }
}
const COUNT = 75;
for (let i = 0; i < COUNT; i++) {
    if (i%5 == 0) {
        console.log("Iteration: " + i);
        console.log("Stones size: " + stones.length);
        console.log("Stones count: " + counter());
        console.log("");
    }
    let newL = [];
    let newS = [];
    for (let j = 0; j < stones.length; j++) {
        let item = stones[j];
        let ics = scount[j];
        if (item == 0) {
            addToList(1, ics, newL, newS);
        } else if (item.toString().length%2 == 0) {
            let str = item.toString();
            addToList(parseInt(str.substring(0, str.length/2)), ics, newL, newS);
            addToList(parseInt(str.substring(str.length/2)), ics, newL, newS);
        } else {
            addToList(2024*item, ics, newL, newS);
        }
    }
    stones = newL;
    scount = newS;
}

function counter() {
    let sum = 0;
    for (let i = 0; i < scount.length; i++) {
        sum += scount[i];
    }
    return sum;
}

console.log(counter());