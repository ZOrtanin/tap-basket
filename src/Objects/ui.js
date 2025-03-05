import Button from '../Objects/button.js';

export default class UI extends Phaser.GameObjects.Sprite {
    //constructor(scene,x,y,over,out,text,color='#1E1E1E',type=false,value=false,touch=false)
    constructor(scene) {
        super(scene); 

        this.scene = scene.scene;

        //console.log(this.scene);

        // Кнопка настроек
        // this.scene.button_settings = new Button(
        //     this.scene, // сцена
        //     100, // x
        //     100, // y
        //     'settings_activ', // не активна
        //     'settings', // активна
        //     );

        // this.scene.button_settings.relise = function() { 
        //     this.scene.start('MainMenu');         
        // };
    }

    preload(){
        // console.log('123-12312312');
    }

    update(){
       
        // console.log('123-12312312');
    }

    addUI(){
        // добовляем колличество попыток
        this.attempts = 3;


        // добовляем попытки
        for (let i = 0; i < this.attempts; i++) {
            const icon = this.add.image(935, 190+i*110, 'dark_ball').setScale(0.7);
            this.attemptsIcons.push(icon);
        }

        this.attemptsIcons.reverse();
    }

} 