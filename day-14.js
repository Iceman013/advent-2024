// Start program
console.log("Start");
let fs = require('fs');

let str = fs.readFileSync('day-14.txt', 'utf8');
// let str = fs.readFileSync('demo.txt', 'utf8');
// let width = 11;
// let height = 7;
let width = 101;
let height = 103;
let dur = 7753;

let texta = str.split("\n");

function bot(px, py, vx, vy) {
    this.px = px;
    this.py = py;
    this.vx = vx;
    this.vy = vy;

    this.getQuad = function() {
        for (let i = 0; i < dur; i++) {
            this.step();
        }
        let quad = -1;
        if (this.px < Math.floor(width/2)) {
            if (this.py < Math.floor(height/2)) {
                quad = 0;
            }
            if (this.py > Math.floor(height/2)) {
                quad = 1;
            }
        }
        if (this.px > Math.floor(width/2)) {
            if (this.py < Math.floor(height/2)) {
                quad = 2;
            }
            if (this.py > Math.floor(height/2)) {
                quad = 3;
            }
        }
        if (quad != -1) {
            return quad;
        }
    }
    this.step = function() {
        this.px += this.vx;
        this.py += this.vy;
        this.px = (this.px + 2*width)%width;
        this.py = (this.py + 2*height)%height;
    }
}
let probs = [];
// Turn into a grid
for (let i = 0; i < texta.length; i++) {
    let item = texta[i];
    if (item.indexOf("\r") != -1) {
        item = item.substring(0, item.indexOf("\r"));
    }

    let px = parseInt(item.substring(item.indexOf("p=")+2,item.indexOf(",")));
    let py = parseInt(item.substring(item.indexOf(",")+1,item.indexOf(" ")));

    let partb = item.substring(item.indexOf("v="));
    let vx = parseInt(partb.substring(partb.indexOf("v=")+2,partb.indexOf(",")));
    let vy = parseInt(partb.substring(partb.indexOf(",")+1));

    probs.push(new bot(px,py,vx,vy));
}

// Helper functions

function getSum() {
    let sums = [0,0,0,0];
    for (let i = 0; i < probs.length; i++) {
        let ans = probs[i].getQuad();
        if (ans != null) {
            sums[ans]++;
        }
    }
    console.log(sums);
    let sum = 1;
    for (let i = 0; i < sums.length; i++) {
        sum = sum*sums[i];
    }
    console.log(sum);
}

function print() {
    let grid = [];
    for (let i = 0; i < width; i++) {
        let row = [];
        for (let j = 0; j < height; j++) {
            row.push(0);
        }
        grid.push(row);
    }

    for (let i = 0; i < probs.length; i++) {
        grid[probs[i].px][probs[i].py]++;
    }

    for (let i = 0; i < width; i++) {
        let str = "";
        for (let j = 0; j < height; j++) {
            if (grid[i][j] == 0) {
                str = str + " ";
            } else {
                str = str + "#";
            }
        }
        console.log(str);
    }
}
function find() {
    for (let a = 0; a < 10000; a++) {
        for (let j = 0; j < probs.length; j++) {
            probs[j].step();
        }

        let grid = [];
        for (let i = 0; i < width; i++) {
            let row = [];
            for (let j = 0; j < height; j++) {
                row.push(0);
            }
            grid.push(row);
        }

        for (let i = 0; i < probs.length; i++) {
            grid[probs[i].px][probs[i].py]++;
        }

        for (let i = 0; i < width - 3; i++) {
            for (let j = 0; j < height - 3; j++) {
                out = true;
                for (let x = 0; x < 3; x++) {
                    for (let y = 0; y < 3; y++) {
                        if (grid[i+x][j+y] == 0) {
                            out = false;
                        }
                    }
                }
                if (out) {
                    console.log(a);
                }
            }
        }
    }
}
getSum();
print();
// find();