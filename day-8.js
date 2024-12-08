console.log("Start");
const { subscribe } = require('diagnostics_channel');
let fs = require('fs');
const { get } = require('http');
let str = fs.readFileSync('day-8.txt', 'utf8');
// let str = fs.readFileSync('demo.txt', 'utf8');

let texta = str.split("\n");

let nodes = [];
let locs = [];
let sum = 0;
for (let i = 0; i < texta.length; i++) {
    if (texta[i].indexOf("\r") != -1) {
        texta[i] = texta[i].substring(0, texta[i].indexOf("\r"));
    }
    for (let j = 0; j < texta[i].length; j++) {
        if (getCell(i,j) != ".") {
            let ite = [i,j];
            nodes.push(ite);
        }
    }
}
function getCell(x,y) {
    if (texta[x] == null) {
        return null;
    }
    if (texta[x].substring(y, y + 1) == "") {
        return null;
    }
    return texta[x].substring(y, y + 1);
}
for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
        let ita = nodes[i];
        let itb = nodes[j];
        if (ita != itb && getCell(ita[0],ita[1]) == getCell(itb[0],itb[1])) {
            let tx = ita[0];
            let ty = ita[1];
            while (getCell(tx,ty) != null) {
                let pass = true;
                for (let k = 0; k < locs.length; k++) {
                    if (locs[k][0] == tx && locs[k][1] == ty) {
                        pass = false;
                    }
                }
                if (pass && ((getCell(tx,ty) == ".") || (getCell(tx,ty) == getCell(ita[0],ita[1])))) {
                    locs.push([tx,ty,getCell(ita[0],ita[1])]);
                }
                tx -= (itb[0] - ita[0]);
                ty -= (itb[1] - ita[1]);
            }
        }
    }
}
// console.log(locs);
console.log(locs.length);