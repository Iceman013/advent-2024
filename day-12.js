// Start program
console.log("Start");
let fs = require('fs');

let str = fs.readFileSync('day-12.txt', 'utf8');
// let str = fs.readFileSync('demo.txt', 'utf8');

let texta = str.split("\n");
let grid = [];
let toggled = [];

// Turn into a grid
for (let i = 0; i < texta.length; i++) {
    if (texta[i].indexOf("\r") != -1) {
        texta[i] = texta[i].substring(0, texta[i].indexOf("\r"));
    }
    let row = [];
    let tr = [];
    for (let j = 0; j < texta[i].length; j++) {
        row.push(texta[i].substring(j, j+1));
        tr.push(false);
    }
    grid.push(row);
    toggled.push(tr);
}

// Helper functions

function getCell(same,list,x,y,match) {
    if (list[x] == null) {
        return false;
    }
    let out = ((list[x][y] == match) && same[x][y]);
    return out;
}

function getRCell(list,x,y) {
    if (list[x] == null || list[x][y] == null) {
        return false;
    } else {
        return list[x][y];
    }
}

function remove(list, item) {
    list.splice(list.indexOf(item), 1);
}

let sum = 0;
// Sum initiallizer
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (toggled[i][j] == false) {
            // console.log(grid[i][j]);
            // Do a check
            let group = [];
            for (let k = 0; k < grid.length; k++) {
                let tr = [];
                for (let m = 0; m < grid[k].length; m++) {
                    tr.push(false);
                }
                group.push(tr);
            }
            group[i][j] = true;

            let findNew = true;
            while (findNew) {
                findNew = false;
                for (let k = 0; k < grid.length; k++) {
                    for (let m = 0; m < grid[k].length; m++) {
                        if (group[k][m] == false && grid[k][m] == grid[i][j]) {
                            if (getCell(group,grid,k-1,m,grid[i][j]) || getCell(group,grid,k+1,m,grid[i][j]) || getCell(group,grid,k,m-1,grid[i][j]) || getCell(group,grid,k,m+1,grid[i][j])) {
                                findNew = true;
                                group[k][m] = true;
                            }
                        }
                    }
                }
            }
            
            let area = 0;
            let cells = [];
            for (let k = 0; k < grid.length; k++) {
                for (let m = 0; m < grid[k].length; m++) {
                    if (group[k][m]) {
                        area++;
                        toggled[k][m] = true;
                        cells.push([k,m]);
                    }
                }
            }
            // console.log(area);
            let perim = 0;
            let neigh = [[-1,0],[0,-1],[0,1],[1,0]];
            for (let k = -2; k <= group.length + 1; k++) {
                for (let m = -2; m <= group[0].length + 1; m++) {
                    if (getRCell(group,k,m) == false) {
                        for (let n = 0; n < neigh.length; n++) {
                            if (getRCell(group,k + neigh[n][0],m + neigh[n][1])) {
                                perim++;
                            }
                        }
                    }
                }
            }
            // console.log(perim);
            // sum += area*perim;

            let cellD = [];
            for (let n = 0; n < cells.length; n++) {
                cellD.push(["left","right","up","down"]);
                for (let m = 0; m < cells.length; m++) {
                    if (cells[m][0] == cells[n][0] + 1 && cells[m][1] == cells[n][1]) {
                        remove(cellD[n], "left");
                    }
                    if (cells[m][0] == cells[n][0] - 1 && cells[m][1] == cells[n][1]) {
                        remove(cellD[n], "right");
                    }
                    if (cells[m][0] == cells[n][0] && cells[m][1] == cells[n][1] + 1) {
                        remove(cellD[n], "up");
                    }
                    if (cells[m][0] == cells[n][0] && cells[m][1] == cells[n][1] - 1) {
                        remove(cellD[n], "down");
                    }
                }
            }

            let perimB = 0;
            let dirs = ["left","right","up","down"];
            for (let n = 0; n < cells.length; n++) {
                for (let d = 0; d < dirs.length; d++) {
                    let target = [];
                    if (d == 0) {
                        target = [cells[n][0],cells[n][1] + 1];
                    }
                    if (d == 1) {
                        target = [cells[n][0],cells[n][1] + 1];
                    }
                    if (d == 2) {
                        target = [cells[n][0] + 1,cells[n][1]];
                    }
                    if (d == 3) {
                        target = [cells[n][0] + 1,cells[n][1]];
                    }
                    let unique = true;
                    for (let m = 0; m < cells.length; m++) {
                        if (cells[m][0] == target[0] && cells[m][1] == target[1]) {
                            if (cellD[m].indexOf(dirs[d]) != -1) {
                                unique = false;
                            }
                        }
                    }
                    if (unique && cellD[n].indexOf(dirs[d]) != -1) {
                        perimB++;
                    }
                }
            }
            // console.log(perimB);
            sum += perimB*area;
        }
    }
}
console.log(sum);