// Start program
console.log("Start");
let fs = require('fs');

let str = fs.readFileSync('day-10.txt', 'utf8');
// let str = fs.readFileSync('demo.txt', 'utf8');

let texta = str.split("\n");
let grid = [];

// Turn into a grid
for (let i = 0; i < texta.length; i++) {
    if (texta[i].indexOf("\r") != -1) {
        texta[i] = texta[i].substring(0, texta[i].indexOf("\r"));
    }
    let row = [];
    for (let j = 0; j < texta[i].length; j++) {
        let item = parseInt(texta[i].substring(j, j+1));
        row.push(item);
    }
    grid.push(row);
}

// Helper functions

function getCell(x,y) {
    if (grid[x] == null) {
        return null;
    }
    return grid[x][y];
}

// Sum initiallizer

let sum = 0;
function expand(x, y, big) {
    let cur = getCell(x, y);
    if (cur == null) {
        return;
    } else {
        if (cur == 9) {
            let cow = [x,y];
            let inside = false;
            for (let i = 0; i < big.length; i++) {
                if (big[i][0] == cow[0] && big[i][1] == cow[1]) {
                    inside = true;
                }
            }
            if (!inside) {
                big.push(cow);
            }
            return;
        }
        let addy = [];
        if (getCell(x+1,y) == cur + 1) {
            expand(x+1,y,big);
        }
        if (getCell(x-1,y) == cur + 1) {
            expand(x-1,y,big);
        }
        if (getCell(x,y+1) == cur + 1) {
            expand(x,y+1,big);
        }
        if (getCell(x,y-1) == cur + 1) {
            expand(x,y-1,big);
        }
        return addy;
    }
}
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (getCell(i,j) == 0) {
            let roc = [];
            expand(i,j,roc);
            sum += roc.length;
        }
    }
}
console.log(sum);