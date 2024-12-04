console.log("Start");
let fs = require('fs');
let str = fs.readFileSync('day-4.txt', 'utf8');
let texta = str.split("\n");

let arr = [];
for (let i = 0; i < texta.length; i++) {
    let row = [];
    for (let j = 0; j < texta[i].length; j++) {
        let item = texta[i].substring(j, j + 1);
        row.push(item);
    }
    arr.push(row);
}

function getIndexAt(x, y) {
    let out = "Z";
    if (arr[x] != null) {
        if (arr[x][y] != null) {
            out = arr[x][y];
        }
    }
    return out;
}

function isPattern(x, y, fir, sex) {
    out = false;
    if (getIndexAt(x, y) == "X" && getIndexAt(x + fir, y + sex) == "M" && getIndexAt(x + 2*fir, y + 2*sex) == "A" && getIndexAt(x + 3*fir, y + 3*sex) == "S") {
        out = true;
    }
    return out;
}

let dirs = [[1,0],[0,1],[1,1],[-1,0],[0,-1],[-1,-1],[-1,1],[1,-1]];
let count = 0;
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        for (let k = 0; k < dirs.length; k++) {
            if (isPattern(i, j, dirs[k][0], dirs[k][1])) {
                count++;
            }
        }
    }
}
console.log(count);