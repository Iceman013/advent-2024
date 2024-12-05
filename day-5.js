console.log("Start");
let fs = require('fs');
let str = fs.readFileSync('day-5.txt', 'utf8');
let texta = str.split("\n");

let rules = [];
let afters = [];

let upds = [];

for (let i = 0; i < texta.length; i++) {
    let line = texta[i];
    line = line.replace("\r","");
    if (line.indexOf("|") != -1) {
        let tec = line.split("|");
        let found = false;
        for (let j = 0; j < rules.length; j++) {
            if (rules[j] == tec[0]) {
                afters[j].push(tec[1]);
                found = true;
            }
        }
        if (!found) {
            rules.push(tec[0]);
            afters.push([tec[1]]);
        }
    }
    if (line.indexOf(",") != -1) {
        let set = line.split(",");
        upds.push(set);
    }
}

let wrongs = [];
function check(list) {
    let good = true;
    for (let j = 0; j < list.length; j++) {
        let cur = list[j];
        let rul = -1;
        for (let m = 0; m < rules.length; m++) {
            if (rules[m] == cur) {
                rul = m;
            }
        }
        if (rul != -1) {
            for (let k = 0; k < j; k++) {
                for (let n = 0; n < afters[rul].length; n++) {
                    if (list[k] == afters[rul][n]) {
                        good = false;
                    }
                }
            }
        }
    }
    return good;
}
let sum = 0;
for (let i = 0; i < upds.length; i++) {
    if (check(upds[i])) {
        sum += parseInt(upds[i][Math.floor(upds[i].length/2)]);
    } else {
        wrongs.push(upds[i]);
    }
}
console.log(sum);

function checkb(list) {
    let problem = 100;
    for (let j = 0; j < list.length; j++) {
        let cur = list[j];
        let rul = -1;
        for (let m = 0; m < rules.length; m++) {
            if (rules[m] == cur) {
                rul = m;
            }
        }
        if (rul != -1) {
            for (let k = 0; k < j; k++) {
                for (let n = 0; n < afters[rul].length; n++) {
                    if (list[k] == afters[rul][n]) {
                        if (problem > k) {
                            problem = k;
                        }
                    }
                }
            }
        }
    }
    return problem;
}

for (let i = 0; i < wrongs.length; i++) {
    while (!check(wrongs[i])) {
        let problem = checkb(wrongs[i]);
        let temp = wrongs[i][problem];
        wrongs[i].splice(problem, 1);
        wrongs[i].push(temp);
    }
}

let sumb = 0;
for (let i = 0; i < wrongs.length; i++) {
    if (check(wrongs[i])) {
        sumb += parseInt(wrongs[i][Math.floor(wrongs[i].length/2)]);
    }
}
console.log(sumb);