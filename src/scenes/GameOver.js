import Button from '../Objects/button.js';

import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
        this.star = 0;
        
    }

    create (){
        this.screenWidth = this.game.config.width;
        this.screenHeight = this.game.config.height;
        this.cameras.main.setBackgroundColor(0x3A4452);

        this.my_game = this.scene.get('Game');

        //console.log(game.attempts)

        if(this.my_game.attempts > -1){
            this.win();
        }else{
            this.fall();
        }

        // this.add.text(512, 384, 'Game Over', {
        //     fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);

        // this.input.once('pointerdown', () => {

        //     this.scene.start('MainMenu');

        // });
    }

    win(){



        if(this.star === 2 || this.star > 2){
            this.add.image(540, 584, '3stars');
        }
        
        if(this.star === 1){
            this.add.image(540, 584, '2stars');
        }

        if(this.star === 0){
            this.add.image(540, 584, '1stars');
        }

        // сохраняем прогресс
        const game = this.scene.get('Game');

        game.levels[game.level][1] = 1;
        game.levels[game.level][2] = this.star;
        this.save(game.levels);

        
        //this.add.image(540, 984, 'button_win');

        // если уровень не рандомный ставим кнопку 
        //console.log(game.random_level);
        if(!game.random_level){

            // следуйщий уровень
            this.button_new_game = new Button(
                this, // сцена
                this.screenWidth/2, // x
                this.screenHeight-900, // y
                '', // не активна
                '', // активна
                'дальше',
                '#D9D9D9'
                );

            this.button_new_game.relise = function() { 
                
                game.level += 1;
                this.scene.start('Game');          
            };
        }

        // перезапуск игры
        this.button_new_game = new Button(
            this, // сцена
            this.screenWidth/2, // x
            this.screenHeight-800, // y
            '', // не активна
            '', // активна
            'еще',
            '#D9D9D9'
            );

        this.button_new_game.relise = function() { 
            this.scene.start('Game');          
        };

        // выход в менб
        this.button_new_game = new Button(
            this, // сцена
            this.screenWidth/2, // x
            this.screenHeight-700, // y
            '', // не активна
            '', // активна
            'в меню',
            '#D9D9D9'
            );

        this.button_new_game.relise = function() { 
            this.scene.start('MainMenu');          
        };

    }

    fall(){
        this.add.image(540, 584, 'stars');
        //this.add.image(540, 984, 'button_fall');

        // сохраняем прогресс
        const game = this.scene.get('Game');
        this.save(game.level);

        // перезапуск игры
        this.button_new_game = new Button(
            this, // сцена
            this.screenWidth/2, // x
            this.screenHeight-800, // y
            '', // не активна
            '', // активна
            'еще',
            '#D9D9D9'
            );

        this.button_new_game.relise = function() { 
            this.scene.start('Game');          
        };

        // выход в менб
        this.button_new_game = new Button(
            this, // сцена
            this.screenWidth/2, // x
            this.screenHeight-700, // y
            '', // не активна
            '', // активна
            'в меню',
            '#D9D9D9'
            );

        this.button_new_game.relise = function() { 
            this.scene.start('MainMenu');          
        };
    }

    save(levels){
        const game = this.scene.get('Game');
            

        const playerProgress = {
            level: 'level',
            levels: game.levels,
            score: 1200,
            items: ['sword', 'shield'],
        };

        const main = this.scene.get('MainMenu');
        const progressManager = main.progressManager;

        progressManager.save(playerProgress);
    }
}
