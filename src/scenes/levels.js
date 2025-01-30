import Button from '../utils/button.js';
import {getRandomInt} from '../utils/utils.js';

import { Scene } from 'phaser';

export class Levels extends Scene
{
    constructor ()
    {
        super('Levels');

        this.playerProgress = {
                    level: 0,
                    score: 1200,
                    items: ['sword', 'shield'],
                };

        
    }

    preload() {
       
        const game = this.scene.get('Game');
        this.levels = game.levels;
    }

    create (){

        let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;

        this.add.image(540, 984, 'bg_levels');

        // уровни
        // let data = this.levels[0];
        // this.printBtn(100,100,'1 level',data[1],data[2]);

        let col = 0;
        let row = 1;

        this.levels.forEach(item => {
            //console.log(row)
            if(col==4){
               row += 1; 
               col = 0 ;
            }
            this.printBtn(208*col+220,211*row+260,item[0],item[1],item[2]);
            col +=1;
        });

        // кнопка назад
         this.button_new_game = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-300, // y
                '','',
                // 'start_button_activ', // не активна
                // 'start_button', // активна
                'назад',
                '#D9D9D9'
                );

            this.button_new_game.relise = function() { 
                this.scene.start('MainMenu');          
            }; 
    }


    printBtn(x,y,name,win,star){
        if(win===0){
            this.button_new_game = new Button(this,x,y,'','',name);
        }else{
            this.button_new_game = new Button(this,x,y,'','',name,'#ffffff');
        }        

        if(star>-1){            
            this.add.circle(x+61, y, 7, 0x1E1E1E);
        }
        if(star>1 || star===1){            
            this.add.circle(x+61, y+27, 7, 0x1E1E1E);
        }
        if(star>2 || star===2){            
            this.add.circle(x+61, y-27, 7, 0x1E1E1E);
        }
        

        this.button_new_game.relise = function() { 
            console.log(name);
            //this.shild_coords = {x:getRandomInt(200,700),y:getRandomInt(250,800)}
            const game = this.scene.get('Game');
            game.level = name;
            // game.shild_coords = coords;
            this.scene.start('Game');          
        }; 
    }

}
