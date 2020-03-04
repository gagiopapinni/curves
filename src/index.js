$(window).on('load',start);

let colors = {
    curve:'red',
    evolute:'grey',
    reper:'grey',
    osc_circ:'orange',
    

}

function start(){
    let cvs1 = $('#cvs1')[0],
        cvs2 = $('#cvs2')[0];
    let curve = Curves[$('#curves').val()];
    plot(cvs1,curve,curve.domain,{color:colors.curve});
    plot(cvs2,curve,curve.domain,{color:colors.curve});
    plot(cvs2,curve.evolute,curve.domain,{color:colors.evolute});

    $('#curves').on("input",()=>{
       curve = Curves[$('#curves').val()];

       clear(cvs1)
       plot(cvs1,curve,curve.domain,{color:colors.curve});

       clear(cvs2);
       plot(cvs2,curve,curve.domain,{color:colors.curve});
       plot(cvs2,curve.evolute,curve.domain,{color:colors.evolute});
    })

    $('#inp1').on('input',(e)=>{
       let v = $("#inp1").val();

       clear(cvs1);
       plot(cvs1,curve,curve.domain,{color:colors.curve});

       let t = curve.domain[0] + (curve.domain[1]-curve.domain[0])*v;
       let current_point = curve(t);

       //unit tangent vector
       let tangent = Vector.normalize( curve.dot(t) );
       tangent = Vector.add( tangent, current_point );
       plot(cvs1,[ current_point, tangent ],curve.domain,{color:colors.reper});

       //unit normal vector
       tangent = Vector.normalize( curve.dot(t) );
       let normal = [-tangent[1],tangent[0]];
       normal = Vector.add(normal,current_point);
       plot(cvs1,[ current_point, normal ],curve.domain,{color:colors.reper});

       //evolute
       clear(cvs2);
       plot(cvs2,curve,curve.domain);
       plot(cvs2,curve.evolute,curve.domain,{color:colors.evolute});

       //osculating circle
       let osc_circle_center = curve.evolute(t),
           osc_circle_r = Vector.dist(current_point,osc_circle_center);

       plot(cvs2,(s)=>{return [osc_circle_r*Math.sin(s)+osc_circle_center[0], 
                               osc_circle_r*Math.cos(s)+osc_circle_center[1]] },curve.domain,{color:colors.osc_circ});

       plot(cvs2,[ current_point,curve.evolute(t) ],curve.domain,{color:colors.osc_circ});

    })

    $('#anim').on('click',()=>{
           $( "#inp1" ).val(0);
           $({ value: 0 }).animate({ value: 1 },{
             duration: 3000,
             easing: 'linear',
             step: value=>{
               $("#inp1").val(value).trigger('input')
             },
             complete:()=>$( "#inp1" ).val(0),
           });
    })
}

