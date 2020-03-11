const {pow, sin, cos, asin, sqrt, sign, tan} = Math;

class Curve {
    constructor(func, domain) {
        this.initFunc = func;
        this.domain = domain;
        this.init();
    }

    funcs = {};

    init() {
        let _init = {
            x: math.parse(this.initFunc.x),
            y: math.parse(this.initFunc.y),
        };
        let _der = {
            x: math.derivative(this.initFunc.x, 't'),
            y: math.derivative(this.initFunc.y, 't')
        };
        let _secDer = {
            x: math.derivative(_der.x, 't'),
            y: math.derivative(_der.y, 't')
        };
        this.funcs = {
            init: _init,
            derivative: _der,
            secondDerivative: _secDer
        };

        this.primitive = this.primitive.bind(this);
        this.derivative = this.derivative.bind(this);
        this.secondDerivative = this.secondDerivative.bind(this);
        this.evolute = this.evolute.bind(this);
    }

    primitive(t) {
        let x = this.funcs.init.x,
            y = this.funcs.init.y;
        return {
            x: x.evaluate({t: t}),
            y: y.evaluate({t: t})
        }
    }

    derivative(t) {
        let x = this.funcs.derivative.x,
            y = this.funcs.derivative.y;
        return {
            x: x.evaluate({t: t}),
            y: y.evaluate({t: t})
        }
    }

    secondDerivative(t) {
        let x = this.funcs.secondDerivative.x,
            y = this.funcs.secondDerivative.y;
        return {
            x: x.evaluate({t: t}),
            y: y.evaluate({t: t})
        }
    }

    evolute(t) {
        let derivative = this.derivative(t),
            secondDerivative = this.secondDerivative(t),
            res = this.primitive(t);

        res.x -= derivative.y * (pow(derivative.x, 2) + pow(derivative.y, 2)) / (derivative.x * secondDerivative.y - derivative.y * secondDerivative.x);
        res.y += derivative.x * (pow(derivative.x, 2) + pow(derivative.y, 2)) / (derivative.x * secondDerivative.y - derivative.y * secondDerivative.x);
        return res;
    }

}

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



