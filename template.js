// Start program
console.log("Start");
let fs = require('fs');

// let str = fs.readFileSync('day-.txt', 'utf8');
let str = fs.readFileSync('demo.txt', 'utf8');

let texta = str.split("\n");
let grid = [];

// Turn into a grid
for (let i = 0; i < texta.length; i++) {
    if (texta[i].indexOf("\r") != -1) {
        texta[i] = texta[i].substring(0, texta[i].indexOf("\r"));
    }
    let row = [];
    for (let j = 0; j < texta[i].length; j++) {
        row.push(texta[i].substring(j, j+1));
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

console.log(sum);