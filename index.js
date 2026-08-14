const Da = 1.0;
const Db = 0.5;

const W = 200;
const H = 150;
const SIZE = W * H;
const W_1 = W - 1;
const H_1 = H - 1;

let a = new Float32Array(SIZE);
let b = new Float32Array(SIZE);
let nextA = new Float32Array(SIZE);
let nextB = new Float32Array(SIZE);

let F = 0.0545;
let k = 0.0620;

function init() {
    a.fill(1.0);
    b.fill(0);
    seedSquare(100, 75, 10);
}

function seedSquare(cx, cy, radius) {
    const minX = Math.max(0, cx - radius);
    const maxX = Math.min(W, cx + radius);
    const minY = Math.max(0, cy - radius);
    const maxY = Math.min(H, cy + radius);

    for (let y = minY; y < maxY; y++) {
        let idx = minX + y * W;
        for (let x = minX; x < maxX; x++) {
            b[idx++] = 1.0;
        }
    }
}

function step() {
    for (let y = 1; y < H_1; y++) {
        let i = y * W + 1;
        for (let x = 1; x < W_1; x++, i++) {
            const iNW = i - W - 1, iN = i - W, iNE = i - W + 1;
            const iW  = i - 1,                 iE  = i + 1;
            const iSW = i + W - 1, iS = i + W, iSE = i + W + 1;

            const la = a[iNW] * 0.05 + a[iN] * 0.2 + a[iNE] * 0.05 +
                       a[iW]  * 0.2  - a[i]        + a[iE]  * 0.2  +
                       a[iSW] * 0.05 + a[iS] * 0.2 + a[iSE] * 0.05;

            const lb = b[iNW] * 0.05 + b[iN] * 0.2 + b[iNE] * 0.05 +
                       b[iW]  * 0.2  - b[i]        + b[iE]  * 0.2  +
                       b[iSW] * 0.05 + b[iS] * 0.2 + b[iSE] * 0.05;

            const av = a[i];
            const bv = b[i];
            const abb = av * bv * bv;

            let na = av + (Da * la - abb + F * (1.0 - av));
            let nb = bv + (Db * lb + abb - (k + F) * bv);

            nextA[i] = na < 0 ? 0 : (na > 1 ? 1 : na);
            nextB[i] = nb < 0 ? 0 : (nb > 1 ? 1 : nb);
        }
    }

    const tmpA = a; a = nextA; nextA = tmpA;
    const tmpB = b; b = nextB; nextB = tmpB;
}

function setParams(newF, newK) {
    F = newF;
    k = newK;
}

function addChemicalB(normX, normY, radius) {
    seedSquare((normX * W) | 0, (normY * H) | 0, radius);
}