
let Vector = {
     normalize: v => {
          let len = Math.sqrt( Math.pow(v[0],2)+Math.pow(v[1],2) );
          return [v[0]/len,v[1]/len];
     },
     size: v => Math.sqrt( Math.pow(v[0],2)+Math.pow(v[1],2) ),
     add: (v1,v2) => [v1[0]+v2[0],v1[1]+v2[1]],
     dist: (v1,v2) => Vector.size( [ v2[0]-v1[0], v2[1]-v1[1] ] ),
}

function clear(cvs){
    let ctx = cvs.getContext('2d'); 
    ctx.fillStyle='white';
    ctx.fillRect(0,0,cvs.width,cvs.height);    
}

function plot(cvs,src,range,ops = {}){
    let ctx = cvs.getContext('2d');
    ctx.translate(cvs.width/2,cvs.height/2);
    ctx.beginPath();
    

    if(typeof src === 'function'){
        let fn = src;
        let first = true;
        for(let i = range[0];i<=range[1];i+=.01){
            let x,y, res = fn(i);

            if(!Array.isArray(res)) res = [i,res];
            if(res[0]===null || res[1]===null) continue;

            x = res[0] * cvs.width/range[1];
            y = res[1] * cvs.width/range[1];

            if(first){ ctx.moveTo(x,y); first = false; }
            else ctx.lineTo(x,y);
        }

    }
    else{  
        let tbl = src;
        let first = true;
        for(let i = 0;i<tbl.length;i++){
            let x = tbl[i][0], y = tbl[i][1];

            x = x * cvs.width/range[1];
            y = y * cvs.width/range[1];

            if(first){ ctx.moveTo(x,y); first = false; }
            else ctx.lineTo(x,y);
        }
    }


    ctx.strokeStyle = ops.color || "red";
    ctx.lineWidth = ops.lineWidth || 2;
    ctx.stroke();
    ctx.translate(-cvs.width/2,-cvs.height/2);

}
