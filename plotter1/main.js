let started=false;

let from=-15;
let to=10;
let x1, y1, x2, y2;

let pos=0;
let step=1;
let img;

function der(x){
    return x*((3*x)+16);
}

function f(x){
    return (x**3)+(8*(x**2))+100;
}

function hordownscale(d){
    return d*Math.abs(from-to)/800;
}

function horupscale(d){
    return d*800/Math.abs(from-to);
}

function hortrans(x){
    return x+from;
}

function verupscale(d){
    return 2*d;
}
function verinvert(y){
    return 600-y;
}


function setup(){
    createCanvas(800,600);
    background(200);
    stroke (0);
    for(pos=0; pos<width; pos+=step){
        x1=pos;
        y1=verinvert(verupscale(f(hortrans(hordownscale(x1)))));
        x2=pos+step;
        y2=verinvert(verupscale(f(hortrans(hordownscale(x2)))));
        line (x1, y1, x2, y2);
    }
    img=get();
    stroke(255,0,0);
}


function draw(){
    image (img, 0,0)

    let m= der(hortrans(hordownscale(mouseX)));
    function tang(x){
        let a = hortrans(hordownscale(mouseX));
        let b = f(a);
        return (m*(x-a))+b;
    }
    x1= -400;
    y1= verinvert(verupscale(tang(hortrans(hordownscale(x1)))));
    x2= 800;
    y2= verinvert(verupscale(tang(hortrans(hordownscale(x2)))));

    line(x1, y1, x2, y2);

    if(started)
        setFrequency(map(m,-200, 200, 200, 20000));

}
