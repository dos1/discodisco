var x = 10, y = 30;

var bitmaps = ['bg1', 'bg2', 'bg3', 'guy1', 'guy2', 'guy3', 'badguy1', 'badguy2', 'bam', 'kula1', 'kula2', 'kula3', 'kula4'];
var sprites = {};

var bgcount = 0, kulacount = 0, guycount = 0, spacja = false, pos1 = 200, pos2 = 300, hit1 = false, hit2 = false;
var music, bamsample;
var hitl = 0, hitr = 0;

var speed = 0.8, lost = false;

var score = 100;

var points = 0;

function draw() {
    draw_sprite(canvas, sprites['bg'+(((~~bgcount) % 3) + 1)], 320/2, 180/2);

        draw_sprite(canvas, sprites['kula'+(((~~kulacount)%4) + 1)], 320/2, 180/2);

                                        draw_sprite(canvas, sprites['badguy'+(((~~guycount)%2) + 1)], 320/2 + 50 - pos1, 180/2 - 1 + 5);
                                draw_sprite(canvas, sprites['badguy'+(((~~guycount)%2) + 1)], 320/2 - 50 + pos2, 180/2 + 15);

                                if (hitl > 0) {
                                        draw_sprite(canvas, sprites.bam, 320/2 - 50, 180/2 - 10);
                                }
                                if (hitr > 0) {
                                        draw_sprite(canvas, sprites.bam, 320/2 + 50, 180/2 - 10);
                                }
        
        if (spacja) {
                draw_sprite(canvas, sprites['guy3'], 320/2, 180/2 + 3 + 5 + 10);
            
        } else {
                draw_sprite(canvas, sprites['guy'+(((~~(guycount - 0.03))%2) + 1)], 320/2, 180/2 + 3 + 5 + 10);
        }
             	textout(canvas,font,points,x+1,y+1,24,makecol(0,0,0));
             	textout(canvas,font,points,x,y,24,makecol(255,255,255));
   
rectfill(canvas, 0, 175, 320 * score / 100, 180, makecol(255,255,255));
}

function update() {
    bgcount += 0.1;
    kulacount += 0.05;
    guycount += 0.06;
    speed += 0.002;
    pos1 -= speed;
    pos2 -= speed;
    if (pressed[KEY_SPACE]) {
        spacja = true;
        if (pos1 < 100) {
            hit1 = true;
            hitl = 20;
            points++;
            play_sample(bamsample);
        }
        if (pos2 < 100) {
            hit2 = true;
            hitr = 20;
            points ++;
                        play_sample(bamsample);

        }
    }
    if (released[KEY_SPACE]) spacja = false;
    if (hit1) pos1 += 2 * speed;
    if (hit2) pos2 += 2 * speed;
    if (pos1 > 300) {
        hit1 = false;
        pos1 = Math.random()*200 + 200;
    }
    if (pos2 > 300) {
        hit2 = false;
        pos2 = Math.random()*200 + 200;        
    }
    if (pos1 < 50) pos1 = 50;
    if (pos2 < 50) pos2 = 50;
    hitl--;
    hitr--;
    
    if (pos1 == 50) score-=2;
    if (pos2 == 50) score-=2;
    
    if(score>100) score=100;
    if ((score <= 0) && (!lost)) { alert("YOU LOST"); window.location.reload(); lost = true; }
}

function main() {
	enable_debug('debug');
	allegro_init_all("game_canvas", 320, 180);
        canvas.mozImageSmoothingEnabled = false;
        canvas.webkitImageSmoothingEnabled = false;
        canvas.msImageSmoothingEnabled = false;
        canvas.imageSmoothingEnabled = false;
        music = load_sample('music.ogg');
        bamsample = load_sample('bam.ogg');

        bitmaps = bitmaps.forEach(function(name) {
            sprites[name] = load_bmp(name+'.png');
        });
        
	ready(function(){
                        play_sample(music, 1.0, 1.0, true);

		loop(function(){
			clear_to_color(canvas,makecol(255,255,255));
			update();
			draw();
		},BPS_TO_TIMER(60));
	});
	return 0;
}
END_OF_MAIN();

 
