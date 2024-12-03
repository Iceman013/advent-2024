console.log("Start");
let fs = require('fs');
let str = fs.readFileSync('day-1.txt', 'utf8');
// console.log(str);
let la = [];
let lb = [];
let texta = str.split("\n");
console.log(texta.length)
for (let i = 0; i < texta.length; i++) {
    let textb = texta[i].split("   ");
    let inpa = parseInt(textb[0]);
    let inpb = parseInt(textb[1]);

    if (la.length == 0) {
        la.push(inpa);
    } else {
        for (let j = 0; j <= la.length; j++) {
            if (j == la.length || la[j] >= inpa) {
                la.splice(j, 0, inpa);
                j = la.length + 2;
            }
        }
    }

    if (lb.length == 0) {
        lb.push(inpb);
    } else {
        for (let j = 0; j <= lb.length; j++) {
            if (j == lb.length || lb[j] >= inpb) {
                lb.splice(j, 0, inpb);
                j = lb.length + 2;
            }
        }
    }
}

let sum = 0;
for (let i = 0; i < la.length; i++) {
    let item = la[i];
    for (let j = 0; j < lb.length; j++) {
        if (lb[j] == item) {
            sum += item;
        }
    }
}
console.log(sum)