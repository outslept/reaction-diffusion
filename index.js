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
    b.fill(0.0);
    seedCircle(W >> 1, H >> 1, 10);
}

function seedCircle(cx, cy, radius) {
    const r2 = radius * radius;
    const minX = Math.max(1, (cx - radius) | 0);
    const maxX = Math.min(W - 1, (cx + radius) | 0);
    const minY = Math.max(1, (cy - radius) | 0);
    const maxY = Math.min(H - 1, (cy + radius) | 0);

    for (let y = minY; y < maxY; y++) {
        const dy = y - cy;
        const row = y * W;
        for (let x = minX; x < maxX; x++) {
            const dx = x - cx;
            if (dx * dx + dy * dy <= r2) {
                b[row + x] = 1.0;
            }
        }
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
    seedCircle(normX * W, normY * H, radius);
}

function addChemicalBLine(x0, y0, x1, y1, radius) {
    const gx0 = x0 * W;
    const gy0 = y0 * H;
    const gx1 = x1 * W;
    const gy1 = y1 * H;
    const dist = Math.hypot(gx1 - gx0, gy1 - gy0);
    const steps = Math.max(1, Math.ceil(dist / (radius * 0.4)));

    for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        seedCircle(gx0 + (gx1 - gx0) * t, gy0 + (gy1 - gy0) * t, radius);
    }
}
