console.log("Start");
const { subscribe } = require('diagnostics_channel');
let fs = require('fs');
let str = fs.readFileSync('day-7.txt', 'utf8');
// let str = fs.readFileSync('demo.txt', 'utf8');
let texta = str.split("\n");


function evalua(list, ops) {
    let tot = list[0];
    for (let i = 1; i < list.length; i++) {
        if (ops[i] == 0) {
            tot += list[i];
        }
        if (ops[i] == 1) {
            tot *= list[i];
        }
    }
    return tot;
}
let sum = 0;
for (let i = 0; i < texta.length; i++) {
    let target = parseInt(texta[i].substring(0, texta[i].indexOf(":")));

    let dip = texta[i].substring(texta[i].indexOf(":") + 2).split(" ");
    let list = [];
    let ops = [];
    for (let j = 0; j < dip.length; j++) {
        list.push(parseInt(dip[j]));
        ops.push(0);
    }

    let done = false;
    while (!done) {
        if (evalua(list, ops) == target) {
            sum += target;
            done = true;
        } else if (ops[0] == 1) {
            done = true;
        } else {
            for (let j = ops.length - 1; j >= 0; j--) {
                if (ops[j] == 0) {
                    ops[j] = 1;
                    j = 0;
                } else {
                    ops[j] = 0;
                }
            }
        }
    }
}
console.log(sum);