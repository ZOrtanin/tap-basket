import Button from '../utils/button.js';

import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;

        this.add.image(540, 984, 'bg_main');

        // Кнопка запуска игры
            this.button_new_game = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-700, // y
                '','',
                // 'start_button_activ', // не активна
                // 'start_button', // активна
                'старт',
                '#D9D9D9'
                );

            this.button_new_game.relise = function() { 
                this.scene.start('Levels');          
            };

        // Кнопка запуска рандомной игры
            this.button_new_game = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-600, // y
                '','',
                // 'start_button_activ', // не активна
                // 'start_button', // активна
                'рандом',
                '#D9D9D9'
                );

            this.button_new_game.relise = function() { 
                
                const game = this.scene.get('Game');                
                game.level = -1;
                this.scene.start('Game')      
            };

        // Кнопка настройки
            this.button_settings = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-500, // y
                '', // не активна
                '', // активна
                'настройки',
                '#D9D9D9'
                );

            this.button_settings.relise = function() { 
                //this.scene.start('Game');          
            };

        //this.add.image(512, 300, 'logo');

        // this.add.text(512, 460, 'Main Menu', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);

        // this.input.once('pointerdown', () => {

        //     this.scene.start('Game');

        // });
    }
}
