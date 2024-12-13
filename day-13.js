// Start program
console.log("Start");
let fs = require('fs');

let str = fs.readFileSync('day-13.txt', 'utf8');
// let str = fs.readFileSync('demo.txt', 'utf8');

let texta = str.split("\n");

function gcd(a, b) { 
    for (let temp = b; b !== 0;) { 
        b = a % b; 
        a = temp; 
        temp = b; 
    } 
    return a; 
} 
  
function lcmFunction(a, b) { 
    const gcdValue = gcd(a, b); 
    return (a * b) / gcdValue; 
}

function problem() {
    this.ax;
    this.ay;
    this.bx;
    this.by;
    this.tx;
    this.ty;

    this.getSolve = function() {
        // 3 for a
        // 1 for b
        let a = 0;
        let b = 0;

        // Part b
        this.tx += 10000000000000;
        this.ty += 10000000000000;
        // this.tx += 1000000000000;
        // this.ty += 1000000000000;

        let solve = false;
        a = Math.ceil(this.tx/this.ax);
        let lcm = lcmFunction(this.ax, this.bx);
        let acow = lcm/this.ax;
        let bcow = lcm/this.bx;
        let start = 0;
        while (a >= 0 && !solve) {
            // console.log(a*this.ax + b*this.bx)
            // console.log(a)
            if (a*this.ax + b*this.bx == this.tx && a*this.ay + b*this.by == this.ty) {
                solve = true;
            } else {
                if (a*this.ax + b*this.bx == this.tx) {
                    if (start == 0) {
                        start = (a*this.ay + b*this.by) - this.ty;
                    } else {
                        let curp = (a*this.ay + b*this.by) - this.ty;
                        if (Math.abs(curp) >= Math.abs(start)) {
                            a = -1;
                        }
                    }
                    a -= acow;
                    b += bcow;
                } else {
                    if (a < Math.ceil(this.tx/this.ax) - acow) {
                        a = -1;
                    }
                    if (a*this.ax + b*this.bx > this.tx) {
                        a--;
                    } else {
                        b++;
                    }
                }
            }
        }
        if (!solve) {
            a = 0;
            b = 0;
        }
        return 3*a + 1*b;
    }
}

let problems = [];
for (let i = 0; i < texta.length; i++) {
    let cur = texta[i];
    if (cur.indexOf("Button A") != -1) {
        problems.push(new problem);
        let ax = cur.substring(cur.indexOf("X+") + 2, cur.indexOf(", Y+"));
        let ay = cur.substring(cur.indexOf("Y+") + 2);
        problems[problems.length - 1].ax = parseInt(ax);
        problems[problems.length - 1].ay = parseInt(ay);
    }
    if (cur.indexOf("Button B") != -1) {
        let ax = cur.substring(cur.indexOf("X+") + 2, cur.indexOf(", Y+"));
        let ay = cur.substring(cur.indexOf("Y+") + 2);
        problems[problems.length - 1].bx = parseInt(ax);
        problems[problems.length - 1].by = parseInt(ay);
    }
    if (cur.indexOf("Prize") != -1) {
        let ax = cur.substring(cur.indexOf("X=") + 2, cur.indexOf(", Y="));
        let ay = cur.substring(cur.indexOf("Y=") + 2);
        problems[problems.length - 1].tx = parseInt(ax);
        problems[problems.length - 1].ty = parseInt(ay);
    }
}

let sum = 0;
for (let i = 0; i < problems.length; i++) {
    console.log("Promblem " + (i+1) + "/" + problems.length);
    sum += problems[i].getSolve();
}
console.log(sum);