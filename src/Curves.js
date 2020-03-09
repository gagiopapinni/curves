const Curves = (function () {
        const {pow, sin, cos, asin, sqrt, sign, tan} = Math;

        function EvoluteFor(curve) {
            return (s) => {
                let c = curve,
                    derivative = c.derivative(s),
                    secondDerivative = c.secondDerivative(s),
                    res = c(s);

                res.x -= derivative.y * (pow(derivative.x, 2) + pow(derivative.y, 2)) / (derivative.x * secondDerivative.y - derivative.y * secondDerivative.x);
                res.y += derivative.x * (pow(derivative.x, 2) + pow(derivative.y, 2)) / (derivative.x * secondDerivative.y - derivative.y * secondDerivative.x);
                return res;
            }
        }

        function Anguinea(t, a = .4, d = .4) {
            if (t < -Math.PI || t > Math.PI) return [null, null];
            return {
                x: d * tan(t / 2),
                y: a / 2 * sin(t)
            }
        }

        Anguinea.derivative = function (t, a = .4, d = .4) {
            if (t < -Math.PI || t > Math.PI) return [null, null];
            return {
                x: d / (2 * pow(cos(t / 2), 2)),
                y: a / 2 * cos(t)
            }
        }
        Anguinea.secondDerivative = function (t, a = .4, d = .4) {
            if (t < -Math.PI || t > Math.PI) return {x: null, y: null};
            return {
                x: 1 / 2 * d * 1 / pow(cos(t / 2), 2) * tan(t / 2),
                y: -a / 2 * sin(t)
            };
        }
        Anguinea.evolute = EvoluteFor(Anguinea);
        Anguinea.domain = [-Math.PI, Math.PI];


        function Circle(t, r = 1) {
            return {
                x: r * sin(t),
                y: r * cos(t)
            }
        }

        Circle.derivative = function (t, r = 1) {
            return {
                x: r * cos(t),
                y: -r * sin(t)
            }
        }
        Circle.secondDerivative = function (t, r = 1) {
            return {
                x: -r * sin(t),
                y: -r * cos(t)
            }
        }
        Circle.evolute = EvoluteFor(Circle);
        Circle.domain = [0, 2 * Math.PI];


        function Ellipse(t) {
            return {
                x: 1.5 * sin(t),
                y: 1 * cos(t)
            }
        }

        Ellipse.derivative = function (t) {
            return {
                x: 1.5 * cos(t),
                y: -sin(t)
            }
        }

        Ellipse.secondDerivative = function (t) {
            return {
                x: -1.5 * sin(t),
                y: -cos(t)
            };
        }
        Ellipse.evolute = EvoluteFor(Ellipse);
        Ellipse.domain = [0, 2 * Math.PI];


        function Cardioid(s) {
            return {
                x: (2 - 2 * pow(1 - s / 4, 2)) * (2 * pow(1 - s / 4, 2) - 1),
                y: (2 - 2 * pow(1 - s / 4, 2)) * 2 * (1 - s / 4) * pow(s / 4 * (2 - s / 4), 1 / 2)
            }
        }

        Cardioid.derivative = function (s) {
            return {
                x: -(s * s * s) / 16 + 3 * s * s / 4 - 9 * s / 4 + 1,
                y: 1 / 16 * pow(-(s - 8) * s, 1 / 2) * (s * s - 8 * s + 12)
            }
        }
        Cardioid.secondDerivative = function (s) {
            return {
                x: -3 / 16 * (s * s - 8 * s + 12),
                y: 3 * (4 - s) * (s * s - 8 * s + 4) / (16 * pow(-(s - 8) * s, 1 / 2))
            }
        }
        Cardioid.evolute = EvoluteFor(Cardioid);
        Cardioid.domain = [0, 8];


        function Astroid(t, a = 1) {
            let x = -a * pow(cos(t), 3);
            let y = a * pow(sin(t), 3);
            return {x, y};
        }

        Astroid.derivative = function (t, a = 1) {
            let x = 3 * a * pow(cos(t), 2) * sin(t);
            let y = 3 * a * cos(t) * pow(sin(t), 2);
            return {x, y};
        }
        Astroid.secondDerivative = function (t, a = 1) {
            let x = 3 * a * cos(t) * (cos(t) * cos(t) - 2 * sin(t) * sin(t));
            let y = 6 * a * cos(t) * cos(t) * sin(t) - 3 * a * sin(t) * sin(t) * sin(t);
            return {x, y};
        }
        Astroid.evolute = EvoluteFor(Astroid);
        Astroid.domain = [0, 6.3];


        return {
            Astroid: Astroid,
            Circle: Circle,
            Ellipse: Ellipse,
            Anguinea: Anguinea,
            Cardioid: Cardioid,
        }

    }
)();
