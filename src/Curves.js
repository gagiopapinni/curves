const Curves = (function (){
    const {pow, sin, cos, asin, sqrt, sign, tan} = Math; 
 
    function EvoluteFor(curve){ 
       return (s)=>{
           let c = curve,
               dot = c.dot(s),
               dotdot = c.dotdot(s),
               res = c(s); 

           res[0] -= dot[1]*(pow(dot[0],2)+pow(dot[1],2))/(dot[0]*dotdot[1]-dot[1]*dotdot[0]);
           res[1] += dot[0]*(pow(dot[0],2)+pow(dot[1],2))/(dot[0]*dotdot[1]-dot[1]*dotdot[0]);
           return res;
       } 
    }

    function Anguinea(t,a=.4,d=.4){
       return [d*tan(t/2),a/2*sin(t)];
    }
    Anguinea.dot = function(t,a=.4,d=.4){
       return [d/(2*pow(cos(t/2),2)), a/2*cos(t)];
    }
    Anguinea.dotdot = function(t,a=.4,d=.4){
       return [1/2*d*1/pow(cos(t/2),2)*tan(t/2), -a/2*sin(t)];
    }
    Anguinea.evolute = EvoluteFor(Anguinea);
    Anguinea.domain = [-Math.PI,Math.PI];

 

    function Circle(t,r=1){
       return [r*sin(t),r*cos(t)];   
    }
    Circle.dot = function (t,r=1){
       return [r*cos(t),-r*sin(t)];   
    }
    Circle.dotdot = function (t,r=1){
       return [-r*sin(t),-r*cos(t)];   
    }
    Circle.evolute = EvoluteFor(Circle);
    Circle.domain = [0,2*Math.PI];


    function Ellipse(t){
       return [1.5*sin(t),1*cos(t)];   
    }

    Ellipse.dot = function (t){
       return [1.5*cos(t),-sin(t)];   
    }

    Ellipse.dotdot = function (t){
       return [-1.5*sin(t),-cos(t)];   
    }
    Ellipse.evolute = EvoluteFor(Ellipse);
    Ellipse.domain = [0,2*Math.PI];


    function Cardioid (s){
       return [ (2-2*pow(1-s/4,2))*(2*pow(1-s/4,2)-1), (2-2*pow(1-s/4,2))*2*(1-s/4)*pow(s/4*(2-s/4),1/2) ];
    }
    Cardioid.dot = function (s){
       return [ -(s*s*s)/16 + 3*s*s/4 - 9*s/4 + 1, 1/16 * pow(-(s-8)*s,1/2) * (s*s-8*s+12) ];
    }
    Cardioid.dotdot = function (s){
       return [ -3/16*(s*s-8*s+12), 3*(4-s)*(s*s-8*s+4)/(16*pow(-(s-8)*s,1/2))  ];
    }
    Cardioid.evolute = EvoluteFor(Cardioid);
    Cardioid.domain = [0,8];


    function Astroid (t,a = 1){
       let x =  -a*pow(cos(t),3);
       let y =  a*pow(sin(t),3);
       return [x,y];
    }
    Astroid.dot = function (t,a = 1){
       let x = 3*a*pow(cos(t),2)*sin(t);
       let y =  3*a*cos(t)*pow(sin(t),2);
       return [x,y];
    }
    Astroid.dotdot = function (t,a = 1){
       let x = 3*a*cos(t)*(cos(t)*cos(t) - 2*sin(t)*sin(t));
       let y = 6*a*cos(t)*cos(t)*sin(t) - 3*a*sin(t)*sin(t)*sin(t);
       return [x,y];
    }
    Astroid.evolute = EvoluteFor(Astroid);
    Astroid.domain = [0,6.3];


    return  {
         Astroid: Astroid,
         Circle: Circle,
         Ellipse:Ellipse,
         Anguinea:Anguinea,
         Cardioid: Cardioid,
    }

})()
