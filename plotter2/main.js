let started=false;

let a=0.5;
let from=-a;
let to=a;
let x1, y1, x2, y2;

let pos=0;
let step=1;
let img;

function der(x){
    if(x!=0)
        return 500*(Math.sin(1/x)-(Math.cos(1/x)/x));
    else
        return 0;
}

function f(x){
    let c=150;
    if(x!=0)
        return 500*x*Math.sin(1/x)+c;
    else
        return c;
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

    console.log(m);

    if(started)
        setFrequency(map(m,-50000, 50000, 200, 20000));

    colorMode(HSB);
    let c = color(map(m,-50000, 50000, 0,255), 255,255);
    let rh=round(red(c)).toString(16);
    if(rh.length==1) rh='0'+rh;
    else if(rh.length==0) rh='00';
    let gh=round(green(c)).toString(16);
    if(gh.length==1) gh='0'+gh;
    else if(gh.length==0) gh='00';
    let bh=round(blue(c)).toString(16);
    if(bh.length==1) bh='0'+bh;
    else if(bh.length==0) bh='00';
    
    document.body.style.backgroundColor='#'+rh+gh+bh;

}
