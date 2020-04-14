const Vector = {
    normalize: v => {
        let x = v.x,
            y = v.y;
        let len = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return {
            x: x / len,
            y: y / len
        };
    },
    size: v => {
        let x = v.x,
            y = v.y;
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    },
    add: (v1, v2) => {
        return {
            x: v1.x + v2.x,
            y: v1.y + v2.y
        }
    },
    dist: (v1, v2) => {
        return Vector.size({
            x: v2.x - v1.x,
            y: v2.y - v1.y
        })
    },
}

function clear(...cvs) {
    for (let canvas of cvs) {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function plot(cvs, src, ops = {}, domain) {
    let ctx = cvs.getContext('2d');
    ctx.translate(cvs.width / 2, cvs.height / 2);
    ctx.beginPath();
    let size = $('#size').val();
    if (typeof src === 'function') {
        let fn = src;
        let first = true;
        for (let i = domain[0]; i <= domain[1]; i += .01) {
            let x, y, res = fn(i);

            if (res.x === null || res.y === null) continue;

            x = res.x * cvs.width*size / domain[1];
            y = -res.y * cvs.width*size / domain[1];

            if (first) {
                ctx.moveTo(x, y);
                first = false;
            } else ctx.lineTo(x, y);
        }
    } else {
        let tbl = src;
        let first = true;
        for (let i = 0; i < tbl.length; i++) {
            let x = tbl[i].x, y = tbl[i].y;

            x = x * cvs.width*size / domain[1];
            y = -y * cvs.width*size / domain[1];

            if (first) {
                ctx.moveTo(x, y);
                first = false;
            } else ctx.lineTo(x, y);
        }
    }

    ctx.strokeStyle = ops.color || "red";
    ctx.lineWidth = ops.lineWidth || 2;
    ctx.stroke();
    ctx.translate(-cvs.width / 2, -cvs.height / 2);
}

function multiDraw(canvas, ...args){
    for(let drawOpt of args){
        plot(canvas, ...drawOpt);
    }
}
