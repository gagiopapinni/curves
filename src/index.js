$(window).on('load', start);

let colors = {
    curve: 'red',
    evolute: 'grey',
    reper: 'grey',
    osc_circ: 'orange',
};
var currentCurve;


function start() {
    let cvs1 = $('#cvs1')[0],
        cvs2 = $('#cvs2')[0];
    let curve = currentCurve = Curves[$('#curve_selector').val()];
    cvs1.draw = function () {
        multiDraw(cvs1, ...arguments);
    };
    cvs2.draw = function () {
        multiDraw(cvs2, ...arguments);
    };
    const options = {
        get curve() {
            return [curve, {color: colors.curve}]
        },
        get evolute() {
            return [curve.evolute, {color: colors.evolute}]
        }
    };

    cvs1.draw(options.curve);
    cvs2.draw(options.curve, options.evolute);

    $('#curve_selector').on("input", () => {
        curve = currentCurve = Curves[$('#curve_selector').val()];
        clear(cvs1, cvs2);
        cvs1.draw(options.curve);

        cvs2.draw(options.curve, options.evolute);
    });

    $('#state_slider').on('input', (e) => {
        let v = $("#state_slider").val();

        clear(cvs1);
        cvs1.draw(options.curve);

        let t = curve.domain[0] + (curve.domain[1] - curve.domain[0]) * v;
        let current_point = curve(t);

        //unit tangent vector
        let tangent = Vector.normalize(curve.derivative(t));
        tangent = Vector.add(tangent, current_point);
        cvs1.draw([[current_point, tangent], {color: colors.reper}]);

        //unit normal vector
        tangent = Vector.normalize(curve.derivative(t));
        let normal = {
            x: -tangent.y,
            y: tangent.x
        };
        normal = Vector.add(normal, current_point);
        cvs1.draw([[current_point, normal], {color: colors.reper}]);

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
            osc_circle = [osc_curve, {color: colors.osc_circ}],
            vector_radius = [[current_point, curve.evolute(t)], {color: colors.osc_circ}];

        cvs2.draw(osc_circle, vector_radius);
    });

    $('#start_anim').on('click', () => {
        $("#state_slider").val(0);
        $({value: 0}).animate({value: 1}, {
            duration: 3000,
            easing: 'linear',
            step: value => {
                $("#state_slider").val(value).trigger('input')
            },
            complete: () => $("#state_slider").val(0),
        });
    })
}

