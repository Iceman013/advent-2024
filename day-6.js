console.log("Start");
let fs = require('fs');
let str = fs.readFileSync('day-6.txt', 'utf8');
// let str = fs.readFileSync('demo.txt', 'utf8');
let texta = str.split("\n");

let room = [];
let startX = 0;
let startY = 0;
let dir = 0;

let sum = 1;
let sumb = 0;
for (let i = 0; i < texta.length; i++) {
    let row = [];
    for (let j = 0; j < texta[i].length; j++) {
        let key = texta[i].substring(j, j+1);
        if (key == ".") {
            row.push(0);
        }
        if (key == "#") {
            row.push(-1);
        }
        if (key == "^") {
            startX = i;
            startY = j;
            row.push(1);
        }
    }
    room.push(row);
}

let trux = startX;
let truy = startY;

for (let i = 0; i < room.length; i++) {
    for (let j = 0; j < room[i].length; j++) {
        if (room[i][j] != -1) {
            let tro = [];
            for (let a = 0; a < room.length; a++) {
                let tr = [];
                for (let b = 0; b < room[a].length; b++) {
                    tr.push(room[a][b]);
                }
                tro.push(tr);
            }
            tro[i][j] = -1;
            check(tro);
        }
    }
}

let done = false;
dir = 0;
startX = trux;
startY = truy;
while (!done) {
    dir = dir % 4;
    let tx = startX;
    let ty = startY;

    if (room[startX][startY] == 0) {
        sum++;
        room[startX][startY] = 1;
    }

    if (dir == 0) {
        tx = startX - 1;
    }
    if (dir == 1) {
        ty = startY + 1;
    }
    if (dir == 2) {
        tx = startX + 1;
    }
    if (dir == 3) {
        ty = startY - 1;
    }
    if (room[tx] != null && room[tx][ty] != null) {
        if (room[tx][ty] == -1) {
            dir++;
        } else {
            startX = tx;
            startY = ty;
        }
    } else {
        done = true;
        if (room[startX][startY] == 0) {
            sum++;
            room[startX][startY] = 1;
        }
    }
}
console.log(sum);
console.log(sumb);

function check(listy) {
    startX = trux;
    startY = truy;
    dir = 0;
    let done = false;
    while (!done) {
        dir = dir % 4;
        let tx = startX;
        let ty = startY;

        if (listy[startX][startY] == 0) {
            listy[startX][startY] = dir + 1;
        }

        if (dir == 0) {
            tx = startX - 1;
        }
        if (dir == 1) {
            ty = startY + 1;
        }
        if (dir == 2) {
            tx = startX + 1;
        }
        if (dir == 3) {
            ty = startY - 1;
        }
        if (listy[tx] != null && listy[tx][ty] != null && listy[tx][ty] == dir + 1) {
            sumb++;
            done = true;
        }
        if (listy[tx] != null && listy[tx][ty] != null) {
            if (listy[tx][ty] == -1) {
                dir++;
            } else {
                startX = tx;
                startY = ty;
            }
        } else {
            done = true;
            if (listy[startX][startY] == 0) {
                listy[startX][startY] = 1;
            }
        }
    }
}