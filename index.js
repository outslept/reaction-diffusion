const Db = 0.5;

const W = 200;
const H = 150;
const SIZE = W * H;

let a = new Float32Array(SIZE);
let b = new Float32Array(SIZE);
let nextA = new Float32Array(SIZE);
let nextB = new Float32Array(SIZE);

let F = 0.0545;
let k = 0.0620;

function init() {
    a.fill(1.0);
    seedSquare(100, 75, 10);
}

function seedSquare(cx, cy, radius) {
    const minX = Math.max(0, cx - radius);
    const maxX = Math.min(W, cx + radius);
    const minY = Math.max(0, cy - radius);
    const maxY = Math.min(H, cy + radius);

    for (let y = minY; y < maxY; y++) {
        b.fill(1.0, y * W + minX, y * W + maxX);
    }
}

function lap(f, i) {
    return f[i - W - 1] * 0.05 + f[i - W] * 0.2 + f[i - W + 1] * 0.05 +
           f[i - 1] * 0.2 - f[i] + f[i + 1] * 0.2 +
           f[i + W - 1] * 0.05 + f[i + W] * 0.2 + f[i + W + 1] * 0.05;
}

function step() {
    for (let y = 1; y < H - 1; y++) {
        let i = y * W + 1;
        for (let x = 1; x < W - 1; x++, i++) {
            const la = lap(a, i);
            const lb = lap(b, i);

            const av = a[i];
            const bv = b[i];
            const abb = av * bv * bv;

            let na = av + (la - abb + F * (1.0 - av));
            let nb = bv + (Db * lb + abb - (k + F) * bv);

            nextA[i] = na < 0 ? 0 : (na > 1 ? 1 : na);
            nextB[i] = nb < 0 ? 0 : (nb > 1 ? 1 : nb);
        }
    }

    [a, nextA] = [nextA, a];
    [b, nextB] = [nextB, b];
}

function setParams(newF, newK) {
    F = newF;
    k = newK;
}

function addChemicalB(normX, normY, radius) {
    seedSquare((normX * W) | 0, (normY * H) | 0, radius);
}
