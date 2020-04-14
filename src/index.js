$(window).on('load', start);

let colors = {
    curve: '#0d3f67',
    evolute: 'grey',
    reper: '#6b48ff',
    osc_circ: 'orange',
};


const Curves = {
    Circle: new Curve({
        x: '1*sin(t)',
        y: '1*cos(t)'
    }, [0, 2 * Math.PI]),
    Ellipse: new Curve({
        x: '1.5*sin(t)',
        y: '1*cos(t)'
    }, [0, 2 * Math.PI]),
    Deltoida: new Curve({
        x: '2*cos(t)+cos(2t)',
        y: '2*sin(t)-sin(2t)'
    }, [0, 2 * Math.PI]),
    Butterfly: new Curve({
        x: 'sin(t)*(exp(cos(t))-2*cos(4t)-(sin(1*t/12))^5)',
        y: 'cos(t)*(exp(cos(t))-2*cos(4t)-(sin(1*t/12))^5)'
    }, [0, 12*Math.PI]),
    Spiral: new Curve({
        x: 't*sin(t)',
        y: 't*cos(t)'
    }, [0, 5*Math.PI]),
    Hypocycloid_1: new Curve({
        x: '2*(cos(t)+cos(5t)/5)',
        y: '2*(sin(t)-sin(5t)/5)'
    }, [0, 2*Math.PI]),
    Hypocycloid_2: new Curve({
        x: '4.4*(cos(t)+cos(1.1t)/1.1)',
        y: '4.4*(sin(t)-sin(1.1t)/1.1)'
    }, [0, 20*Math.PI]),
    Heart: new Curve({
        x: '16*(sin(t))^3',
        y: '13*cos(t)-5*cos(2t)-2*cos(3t)-cos(4t)'
    }, [0, 2*Math.PI]),
    Hypocycloid_3: new Curve({
        x: '6.2(cos(t)-cos(3.1t)/3.1)',
        y: '6.2(sin(t)-sin(3.1t)/3.1)'
    }, [0, 20*Math.PI])
};

function newCurve(){
    try {

        let min = parseInt($('#min').val());
        let max = parseInt($('#max').val());
        if(isNaN(min) || isNaN(max)) throw new Error('"max" and "min" must be numbers');

        Curves[$('#new_curve_name').val()] = new Curve({
            x: $('#new_curve_x').val(),
            y: $('#new_curve_y').val()
        }, [min, max]);

        let sel = $('#curve_selector')[0];
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode($('#new_curve_name').val()))
        opt.value = $('#new_curve_name').val();
        sel.appendChild(opt);
    
        $('#curve_selector').val($('#new_curve_name').val()).trigger('input');
   
    } catch(e){
        alert(e)
    } finally {
        $('#close').click();
    }
}


function start() {

    let cvs1 = $('#cvs1')[0],
        cvs2 = $('#cvs2')[0],
        curve = Curves[$('#curve_selector').val()];
    
    const options = {
        get curve() {
            return [curve.primitive, {color: colors.curve},curve.domain];
        },
        get evolute() {
            return [curve.evolute, {color: colors.evolute},curve.domain];
        }
    };

    cvs1.draw = function () {
        multiDraw(cvs1, ...arguments);
    };
    cvs2.draw = function () {
        multiDraw(cvs2, ...arguments);
    };
    

    $('#curve_selector').on("input", () => {
        curve = Curves[$('#curve_selector').val()];
        clear(cvs1, cvs2);
        cvs1.draw(options.curve);

        cvs2.draw(options.curve, options.evolute);
        $('#state_slider').val(0).trigger('input')

    });

    $('#state_slider, #size').on('input', (e) => {
        let state = $("#state_slider").val();
        let size = $("#size").val();

        $("#state_slider_label")[0].innerText = `Состояние: ${((+state)*100).toFixed(0)}%`;
        $("#size_label")[0].innerText = `Размер: ${((+size)*100).toFixed(0)}%`;

        clear(cvs1);
        cvs1.draw(options.curve);

        let t = curve.domain[0] + (curve.domain[1] - curve.domain[0]) * state;
        let current_point = curve.primitive(t);

        //unit tangent vector
        let tangent = Vector.normalize(curve.derivative(t));
        tangent = Vector.add(tangent, current_point);
        cvs1.draw([[current_point, tangent], {color: colors.reper}, curve.domain]);

        //unit normal vector
        tangent = Vector.normalize(curve.derivative(t));
        let normal = {
            x: -tangent.y,
            y: tangent.x
        };
        normal = Vector.add(normal, current_point);
        cvs1.draw([[current_point, normal], {color: colors.reper}, curve.domain]);

        //evolute
        clear(cvs2);
        cvs2.draw(options.curve, options.evolute);

        //osculating circle
        let osc_circle_center = curve.evolute(t),
            osc_circle_r = Vector.dist(current_point, osc_circle_center),
            osc_curve = (s) => {
                return {
                    x: osc_circle_r * Math.sin(s) + osc_circle_center.x,
                    y: osc_circle_r * Math.cos(s) + osc_circle_center.y
                }
            },
            osc_circle = [osc_curve, {color: colors.osc_circ}, curve.domain],
            vector_radius = [[current_point, curve.evolute(t)], {color: colors.osc_circ}, curve.domain];

        cvs2.draw(osc_circle, vector_radius);
    });
    
    $('#state_slider').val(0).trigger('input');

    $('#start_anim').on('click', () => {
        $("#state_slider").val(0);
        $({value: 0}).animate({value: 1}, {
            duration: 5000,
            easing: 'linear',
            step: value => {
                $("#state_slider").val(value).trigger('input')
            },
            complete: () => $("#state_slider").val(0).trigger('input'),
        });
    })
}

