console.log("Start");
let fs = require('fs');
let str = fs.readFileSync('day-3.txt', 'utf8');
let texta = str.split("mul(");

let sum = 0;
let donext = true;
for (let i = 0; i < texta.length; i++) {
    if (texta[i].indexOf(")") != -1) {
        let item = texta[i].substring(0, texta[i].indexOf(")"));

        let pa = parseInt(item.substring(0, item.indexOf(",")));
        let pb = parseInt(item.substring(item.indexOf(",") + 1));
        let tarlen = Math.floor(Math.log10(pa) + 1) + 1 + Math.floor(Math.log10(pb) + 1);
        if (!isNaN(pa*pb) && item.length == tarlen && donext) {
            sum += pa*pb;
        }
    }

    let last = 0;
    let lookfor = donext;
    let done = false;
    while (!done) {
        let target = "do()";
        if (lookfor) {
            target = "don't()";
        }
        if (texta[i].substring(last).indexOf(target) != -1) {
            last = last + texta[i].substring(last).indexOf(target);
            lookfor = !lookfor;
        } else {
            done = true;
        }
    }
    donext = lookfor;
    
}
console.log(sum);