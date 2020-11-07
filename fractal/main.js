function sketch(p){

    p.preload = function () {
    }

    p.maxiterations = 100;

    p.colorsRed = [];
    p.colorsGreen = [];
    p.colorsBlue = [];

    p.setup = function () {
        //p.createCanvas(p.img.width, p.img.height);
        //p.image(p.img, 0, 0);
        //p.colorMode(p.HSB);

        p.pixelDensity(1);
        p.cnv=p.createCanvas(700, 600);
        p.cnv.center('horizontal');
        p.colorMode(p.HSB, 1);

        p.img = p.createImage(700,600);

        p.img.loadPixels();
        
        // Create the colors to be used for each possible iteration count
        for (p.n = 0; p.n < p.maxiterations; p.n++) {
            // Gosh, we could make fancy colors here if we wanted
            p.hu = p.sqrt(p.n / p.maxiterations);
            p.col = p.color(p.hu, 255, 150);
            p.colorsRed[p.n] = p.red(p.col);
            p.colorsGreen[p.n] = p.green(p.col);
            p.colorsBlue[p.n] = p.blue(p.col);
        }

        p.makeImage(-0.8, 0.156);
    }

    

    p.draw = function (){

        p.mycolor = p.img.get(p.mouseX, p.mouseY);
        
        p.image(p.img, 0, 0);

        setFrequency(p.map(p.mycolor[0], 0, 255, 500, 8000));
       
    }

    
    p.makeImage = function(a, b){
        // let ca = map(mouseX, 0, width, -1, 1); //-0.70176;
        // let cb = map(mouseY, 0, height, -1, 1); //-0.3842;
        
        p.ca = a;//-0.8;
        p.cb = b;//0.156;
        
        //angle += 0.02;
        
        p.background(255);
        
        // Establish a range of values on the complex plane
        // A different range will allow us to "zoom" in or out on the fractal
        
        // It all starts with the width, try higher or lower values
        //let w = abs(sin(angle)) * 5;
        p.w = 1.2;
        p.h = (p.w * p.height) / p.width;
        
        // Start at negative half the width and height
        p.xmin = -p.w / 2;
        p.ymin = -p.h / 2;
        
        // Make sure we can write to the pixels[] array.
        // Only need to do this once since we don't do any other drawing.
        //loadPixels();
        
        // x goes from xmin to xmax
        p.xmax = p.xmin + p.w;
        // y goes from ymin to ymax
        p.ymax = p.ymin + p.h;
        
        // Calculate amount we increment x,y for each pixel
        p.dx = (p.xmax - p.xmin) / p.width;
        p.dy = (p.ymax - p.ymin) / p.height;
        
        // Start y
        p.y = p.ymin;
        for (p.j = 0; p.j < p.height; p.j++) {
            // Start x
            p.x = p.xmin;
            for (p.i = 0; p.i < p.width; p.i++) {
            // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
            p.a = p.x;
            p.b = p.y;
            p.n = 0;
            while (p.n < p.maxiterations) {
                p.aa = p.a * p.a;
                p.bb = p.b * p.b;
                // Infinity in our finite world is simple, let's just consider it 16
                if (p.aa + p.bb > 4.0) {
                break; // Bail
                }
                p.twoab = 2.0 * p.a * p.b;
                p.a = p.aa - p.bb + p.ca;
                p.b = p.twoab + p.cb;
                p.n++;
            }
        
            // We color each pixel based on how long it takes to get to infinity
            // If we never got there, let's pick the color black
            p.pix = (p.i + p.j * p.width) * 4;
            if (p.n == p.maxiterations) {
                p.img.pixels[p.pix + 0] = 0;
                p.img.pixels[p.pix + 1] = 0;
                p.img.pixels[p.pix + 2] = 0;
                p.img.pixels[p.pix + 3] = 255;
            } else {
                // Otherwise, use the colors that we made in setup()
                p.img.pixels[p.pix + 0] = p.colorsRed[p.n];
                p.img.pixels[p.pix + 1] = p.colorsGreen[p.n];
                p.img.pixels[p.pix + 2] = p.colorsBlue[p.n];
                p.img.pixels[p.pix + 3] = 255;
            }
            p.x += p.dx;
            }
            p.y += p.dy;
        }
        p.img.updatePixels();
    }

    p.loadFromLink = function(a){
        p.img = p.loadImage(a);
        p.img.loadPixels();
    }
 
}

