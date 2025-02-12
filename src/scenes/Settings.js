import Button from '../Objects/button.js';
import Slider from '../Objects/slider.js';
import Chekbox from '../Objects/chekbox.js';
import GameProgress from '../utils/GameProgress.js';

import { Scene } from 'phaser';

export class Settings extends Scene
{
    constructor ()
    {   
        console.log('делаем с нуля');
        super('Settings');
        this.progressManager = new GameProgress();

        this.prevScreen = 'MainMenu';

        this.save = { 
            volume:true,
            volume_level:0.7,
            fx:true,
            fx_level:0.7
            }
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

       
    }

    create (){
        let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;

        //this.add.image(540, 984, 'bg_main');
        this.block = this.matter.add.rectangle(550, 600, 10, 100, { isStatic: true });

        console.log(this.prevScreen);

        // Слайдер музыки
            this.chek_box_music = new Chekbox(
                this,
                screenWidth/2,
                screenHeight-1100,
                700,
                'МУЗЫКА',
                'box',
                'chek',
                this.save.volume
                );
            this.chek_box_music.relise = function(){
                this.sound = this.scene.get('MainMenu').sound; 
                let save = this.scene.get('Settings').save;

                if(this.value){
                    this.sound.stopMusicBG();
                    save.volume = false;
                }else{
                    this.sound.playMusicBG();
                    save.volume = true;
                }
            }

            this.slider_music = new Slider(
                this, // сцена
                screenWidth/2, // x
                screenHeight-1000, // y
                this.save.volume_level, // значение
                700, // длина слайдера
                0x1E1E1E, // цвет полосы
                'slider_line' // картинка полосы
                );
            this.slider_music.relise = function(){
                let save = this.scene.get('Settings').save;
                save.volume_level = this.volume;

                this.sound = this.scene.get('MainMenu').sound;
                this.sound.setVolumeMusic(this.volume)
                //console.log('work relise', this.volume);
            }

        // Слайдер эфектов            
            this.chek_box_fx = new Chekbox(
                this,
                screenWidth/2,
                screenHeight-800,
                700,
                'ЗВУКИ',
                'box',
                'chek',
                this.save.fx
                );
            this.chek_box_fx.relise = function(){
                this.sound = this.scene.get('MainMenu').sound;
                let save = this.scene.get('Settings').save;

                if(this.value){
                    this.sound.stopSoundBG();
                    save.fx = false;
                }else{
                    this.sound.playSoundBG();
                    save.fx = true;
                }
            }

            this.slider_fx = new Slider(
                this, // сцена
                screenWidth/2, // x
                screenHeight-700, // y
                this.save.fx_level, // значение
                700, // длина слайдера
                0x1E1E1E, // цвет полосы
                'slider_line' // картинка полосы
                );
            this.slider_fx.relise = function(){
                let save = this.scene.get('Settings').save;
                save.fx_level = this.volume;

                this.sound = this.scene.get('MainMenu').sound;
                this.sound.setVolumeFx(this.volume)
                //console.log('work relise');
            }
        
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

        // Выход в меню
            if(this.prevScreen == 'Game'){
                this.button_mainmenu = new Button(
                    this, // сцена
                    screenWidth/2, // x
                    screenHeight-400, // y
                    '','',
                    // 'start_button_activ', // не активна
                    // 'start_button', // активна
                    'В МЕНЮ',
                    '#D9D9D9'
                    );

                this.button_mainmenu.relise = function() {                     
                    this.scene.start('MainMenu');      
                };

            }

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
                let screen = this.scene.get('Settings').prevScreen;
                console.log(screen);
                this.scene.start(screen);      
            };
      
    }

    save(){
        const game = this.scene.get('Game');            

        const playerProgress = {
            level: 'level',
            levels: game.levels,
            settings: [{}]
        };

        const main = this.scene.get('MainMenu');
        const progressManager = main.progressManager;

        progressManager.save(playerProgress);
    }
}
