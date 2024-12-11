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
            newL.push(1);
            newS.push(ics);
        } else if (item.toString().length%2 == 0) {
            let str = item.toString();
            newL.push(parseInt(str.substring(0, str.length/2)));
            newL.push(parseInt(str.substring(str.length/2)));
            newS.push(ics);
            newS.push(ics);
        } else {
            newL.push(2024*item);
            newS.push(ics);
        }
    }
    stones = newL;
    scount = newS;

    // Fixify
    for (let j = 0; j < stones.length - 1; j++) {
        if (stones[j] == stones[j + 1]) {
            scount[j + 1] += scount[j];
            scount[j] = 0;

            // Delete
            stones.splice(j, 1);
            scount.splice(j, 1);
            j = j - 1;
        }
    }
}

function counter() {
    let sum = 0;
    for (let i = 0; i < scount.length; i++) {
        sum += scount[i];
    }
    return sum;
}

console.log(counter());