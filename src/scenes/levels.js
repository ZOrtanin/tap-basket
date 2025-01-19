import Button from '../utils/button.js';
import {getRandomInt} from '../utils/utils.js';

import { Scene } from 'phaser';

export class Levels extends Scene
{
    constructor ()
    {
        super('Levels');

        this.levels = [
            [0,{x:200,y:700},1],
            [1,{x:300,y:700},0],[2,{x:550,y:800},0],
            [3,{x:550,y:300},0],[4,{x:550,y:600},0],

            [5,{x:415,y:546},0],[6,{x:662,y:462},0],
            [7,{x:696,y:336},0],[8,{x:342,y:400},0],

            [9,{x:558,y:586},0],[10,{x:411,y:543},0],
            [11,{x:641,y:450},0],[12,{x:362,y:1045},0],

            [13,{x:630,y:890},0],[14,{x:200,y:700},0],
            [15,{x:200,y:700},0],[16,{x:200,y:700},0],

            [17,{x:200,y:700},0],[18,{x:200,y:700},0],
            [19,{x:200,y:700},0],[20,{x:200,y:700},0],

            [21,{x:200,y:700},0],[22,{x:200,y:700},0],
            [23,{x:200,y:700},0],           

        ]
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
            this.printBtn(200*col+230,200*row+300,item[0],item[1],item[2]);
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
                'назад'
                );

            this.button_new_game.relise = function() { 
                this.scene.start('MainMenu');          
            }; 

        

    }


    printBtn(x,y,name,coords,win){
        if(win===0){
            this.button_new_game = new Button(this,x,y,'','',name);
        }else{
            this.button_new_game = new Button(this,x,y,'','',name,'#ffffff');
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
