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

function isPattern(x, y) {
    out = false;
    if (getIndexAt(x, y) == "A") {
        if ((getIndexAt(x-1, y-1) == "M" && getIndexAt(x+1, y+1) == "S") || (getIndexAt(x-1, y-1) == "S" && getIndexAt(x+1, y+1) == "M")) {
            if ((getIndexAt(x+1, y-1) == "M" && getIndexAt(x-1, y+1) == "S") || (getIndexAt(x+1, y-1) == "S" && getIndexAt(x-1, y+1) == "M")) {
                out = true;
            }
        }
    }
    return out;
}

let count = 0;
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (isPattern(i, j)) {
            count++;
        }
    }
}
console.log(count);