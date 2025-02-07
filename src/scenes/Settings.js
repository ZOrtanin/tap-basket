import Button from '../Objects/button.js';
import Slider from '../Objects/slider.js';
import GameProgress from '../utils/GameProgress.js';

import { Scene } from 'phaser';

export class Settings extends Scene
{
    constructor ()
    {
        super('Settings');
        this.progressManager = new GameProgress();
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

       
    }

    create ()
    {
        let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;

        //this.add.image(540, 984, 'bg_main');
        this.block = this.matter.add.rectangle(550, 600, 10, 100, { isStatic: true });

        // чекбокс
            this.chek_settings = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-900, // y
                'chek_box_off', // не активна
                'chek_box_on', // активна
                '',
                '',
                false,
                false,
                true
                );

            this.chek_settings.relise = function() { 
                         
            };

        // Слайдер звука
            this.slider_vol = new Slider(
                this, // сцена
                screenWidth/2, // x
                screenHeight-700, // y
                500, // длина слайдера
                0x1E1E1E, // цвет полосы
                'slider_line' // картинка полосы
                );
        

        // Кнопка сброса
            this.button_settings = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-500, // y
                '', // не активна
                '', // активна
                'СБРОСИТЬ ПРОГРЕСС',
                '#D9D9D9'
                );

            this.button_settings.relise = function() { 
                const gamemenu = this.scene.get('MainMenu');
                gamemenu.progressManager.clear();         
            };

        // Кнопка возвращения
            this.button_new_game = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-300, // y
                '','',
                // 'start_button_activ', // не активна
                // 'start_button', // активна
                'НАЗАД',
                '#D9D9D9'
                );

            this.button_new_game.relise = function() { 

                this.scene.start('MainMenu');      
            };
      
    }
}
