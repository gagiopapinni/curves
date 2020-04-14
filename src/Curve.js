const {pow, sin, cos, asin, sqrt, sign, tan} = Math;

class Curve {
    constructor(func, domain) {
        this.func = func;
        this.domain = domain;
        this.init();
    }
 
    init() {
        let func = {
            x: math.parse(this.func.x),
            y: math.parse(this.func.y),
        };
        let der = {
            x: math.derivative(this.func.x, 't'),
            y: math.derivative(this.func.y, 't')
        };
        let secDer = {
            x: math.derivative(der.x, 't'),
            y: math.derivative(der.y, 't')
        };
        this.symbolic = {
            func: func,
            derivative: der,
            secondDerivative: secDer
        };

        this.primitive = this.primitive.bind(this);
        this.derivative = this.derivative.bind(this);
        this.secondDerivative = this.secondDerivative.bind(this);
        this.evolute = this.evolute.bind(this);
    }

    primitive(t) {
        return {
            x: this.symbolic.func.x.evaluate({t: t}),
            y: this.symbolic.func.y.evaluate({t: t})
        }
    }

    derivative(t) {
        return {
            x: this.symbolic.derivative.x.evaluate({t: t}),
            y: this.symbolic.derivative.y.evaluate({t: t})
        }
    }

    secondDerivative(t) {
        return {
            x: this.symbolic.secondDerivative.x.evaluate({t: t}),
            y: this.symbolic.secondDerivative.y.evaluate({t: t})
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



