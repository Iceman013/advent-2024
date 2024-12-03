console.log("Start");
let fs = require('fs');
let str = fs.readFileSync('day-2.txt', 'utf8');
let la = [];
let texta = str.split("\n");
let count = 0;
let countb = 0;
for (let i = 0; i < texta.length; i++) {
    la.push([]);
    let textb = texta[i].split(" ");
    for (let j = 0; j < textb.length; j++) {
        let inp = parseInt(textb[j]);
        la[i].push(inp);
    }

    let dir = (la[i][1] - la[i][0])/Math.abs(la[i][1] - la[i][0]);
    let pass = true;
    for (let j = 1; j < la[i].length; j++) {
        let diff = la[i][j] - la[i][j - 1];
        if (diff/dir < 0) {
            pass = false;
        }
        if (!(Math.abs(diff) >= 1 && Math.abs(diff) <= 3)) {
            pass = false;
        }
    }
    if (pass) {
        count++;
    }

    let anyp = false;
    for (let k = 0; k < la[i].length; k++) {
        let tarr = [];
        for (let q = 0; q < la[i].length; q++) {
            if (q != k) {
                tarr.push(la[i][q]);
            }
        }
        
        let dirb = (tarr[1] - tarr[0])/Math.abs(tarr[1] - tarr[0]);
        let passb = true;
        for (let j = 1; j < tarr.length; j++) {
            let diffb = tarr[j] - tarr[j - 1];
            if (diffb/dirb < 0) {
                passb = false;
            }
            if (!(Math.abs(diffb) >= 1 && Math.abs(diffb) <= 3)) {
                passb = false;
            }
        }
        if (passb) {
            anyp = true;
        }
    }
    if (anyp) {
        countb++;
    }
}
console.log(count);
console.log(countb);