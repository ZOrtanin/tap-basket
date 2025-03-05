import Button from '../Objects/button.js';
import Sound from '../Objects/sound.js';
import GameProgress from '../utils/GameProgress.js';

import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
        this.progressManager = new GameProgress();
        this.nextScren = '____';
    }

    preload() {
        // this.progressManager.clear() // сбрасываем сохранение
        // загрузка настроек из локал сторедж
        const loadedProgress = this.progressManager.load();
        if (loadedProgress) {
            //console.log('Загруженный прогресс:', loadedProgress.levels);

            // установка настроек

            // загрузка уровней
            const game = this.scene.get('Game');
            game.levels = loadedProgress.levels;
            
        }
        
    }

    create (){
        //console.log(this.game.config);
        if(this.sound.name === 'mysound'){
            // музыка уже есть
        }else{
            this.sound = new Sound(this,this.sound);
            this.sound.playMusicBG();
        }


        let screenWidth = this.game.config.width;
        let screenHeight = this.game.config.height;



        this.add.image(540, 984, 'bg_main');
        let graf = this.add.image(540, 1604, 'graffity');
        graf.setScale(0.6);
        this.block = this.matter.add.rectangle(550, 600, 10, 100, { isStatic: true });

                
        // Кнопка запуска игры
            this.button_new_game = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-700, // y
                '','',
                // 'start_button_activ', // не активна
                // 'start_button', // активна
                'СТАРТ',
                '#D9D9D9'
                );

            this.button_new_game.relise = function() { 
                
                //this.scene.start('Levels');
                
                const gamemenu = this.scene.get('MainMenu');
                gamemenu.block.isStatic = false;
                gamemenu.nextScren = 'Levels';

                const game = this.scene.get('Game'); 
                game.random_level = false;
               
                setTimeout(function() {
                    gamemenu.nextScrenSwich('Levels');
                }, 1500);

            };

        // Кнопка запуска рандомной игры
            this.button_new_game = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-600, // y
                '','',
                // 'start_button_activ', // не активна
                // 'start_button', // активна
                'РАНДОМ',
                '#D9D9D9'
                );

            this.button_new_game.relise = function() { 

                const gamemenu = this.scene.get('MainMenu');
                gamemenu.block.isStatic = false;

                const game = this.scene.get('Game'); 
                game.random_level = true;
                this.scene.start('Game')      
            };

        // Кнопка настройки
            this.button_settings = new Button(
                this, // сцена
                screenWidth/2, // x
                screenHeight-500, // y
                '', // не активна
                '', // активна
                'НАСТРОЙКИ',
                '#D9D9D9'
                );

            this.button_settings.relise = function() { 
                const gamemenu = this.scene.get('MainMenu');
                gamemenu.block.isStatic = false;
                gamemenu.nextScren = 'Settings';

                this.scene.get('Settings').prevScreen = 'MainMenu';
               
                setTimeout(function() {
                    gamemenu.nextScrenSwich('Settings');
                }, 1500);         
            };

        // Добовляем щит
            let backboard = this.matter.add.image(550,600, 'backboard', null, { isStatic: true, isSensor: true});
            backboard.setScale(0.7)

        // Создаем мяч
            this.ball = this.matter.add.image(550, 500,'ball',0,{
                    friction: 1,
                    restitution: 0.005,
                    frictionAir: 0.0001,
                    density: 0.09,
                    isStatic: false,                   
                    mass: 0.01
                    
                });
            this.ball.setCircle(60);
            this.ball.setScale(0.7)
            this.ball.setBounce(0.5);
            
        // добовляем кольцо
            this.addHoop(550,600);

    }



    update() {
        
        // Обновляем сетку
        this.updateNet();
    }

    nextScrenSwich(screen){
        //console.log(screen);
        this.scene.start(screen);        
    }

    // Кольцо
    addHoop(x,y){

        let hoopPositionX = x;
        let hoopPositionY = y;
        const hoopWidth = 100;
        const hoopHeight = 10;
        
        let ring = this.matter.add.image(hoopPositionX, hoopPositionY+15, 'ring', null, { isStatic: true, isSensor: true});
        ring.setScale(0.7)       

        let border = this.matter.add.rectangle(hoopPositionX-65, hoopPositionY+10, 5, 15, { isStatic: true });
        let border2 = this.matter.add.rectangle(hoopPositionX+65, hoopPositionY+10, 5, 15, { isStatic: true });

        // Добавляем невидимый сенсор для засчета попадания
        this.hoopSensor = this.matter.add.rectangle(hoopPositionX, hoopPositionY+20, hoopWidth, 10, {
            isSensor: true,
            isStatic: true
        });

        // Добавляем невидимый сенсор для засчета попадания
        this.winSensor = this.matter.add.rectangle(hoopPositionX , hoopPositionY-50, 10, 10, {
            isSensor: true,
            isStatic: true
        });

        // добовляем сетку
        this.addNet(x,y); //550,500
    }

    addNet(x,y){
        // Кординаты для отрисовки сетки
        this.coordnet = {x:x-70,y:y+10}

        const group = this.matter.world.nextGroup(true);

        const particleOptions = { 
            friction: 0.00001, 
            collisionFilter: { group: group }, 
            render: { visible: false } 
        };

        const constraintOptions = { stiffness: 0.03 };

        // softBody: function (x, y, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions)
        // 480, 510
        this.cloth = this.matter.add.softBody(this.coordnet.x, this.coordnet.y, 6, 6, 10, 10, false, 8, particleOptions, constraintOptions);

        for (let i = 0; i < this.cloth.bodies.length; i++)
            {
                const body = this.cloth.bodies[i];

                if (i == 0 || i == 5)
                {
                    body.isStatic = true;
                }
            }

        // Создаем графический объект для текстуры
        this.netTexture = this.add.graphics();

        // Отображаем сетку
        this.updateNet();
    }

    updateNet() {
        this.netTexture.clear(); // Очищаем старое изображение  
        
        // задаем стиль для рисования сетки
        this.netTexture.lineStyle(2, 0x1E1E1E, 1);     

        const bodies = this.cloth.bodies;

        for (let i = 0; i < this.cloth.bodies.length; i++) {
            const bodyA = bodies[i];
            const xA = bodyA.position.x;
            const yA = bodyA.position.y;

            // Соединяем текущую частицу с соседями (сетка)
            const neighbors = this.getNeighbors(i); // Получаем соседние индексы
            
            // Привязываем сетку к кольцу
            if(i > 0 && i < 5 ){
                //480, 500
                this.netTexture.lineBetween(xA, yA, 27*i+this.coordnet.x, this.coordnet.y+5); 
            }           

            for (let j of neighbors) {
                const bodyB = bodies[j];
                const xB = bodyB.position.x;
                const yB = bodyB.position.y;

                // рисуем сетку но не всю чтобы остались ввисячие шнурки
                if(j<24){                    
                    // Рисуем линию между частицами
                    this.netTexture.lineBetween(xA, yA, xB, yB);
                }
                
            }

        }
    }

    getNeighbors(index) {
        const cols = 6; // Число частиц в строке
        const neighbors = [];

        // Добавляем соседей по строкам и столбцам
        if (index % cols !== 0) neighbors.push(index - 1); // Левый сосед
        if ((index + 1) % cols !== 0) neighbors.push(index + 1); // Правый сосед
        if (index >= cols) neighbors.push(index - cols); // Верхний сосед
        if (index < cols * (cols - 1)) neighbors.push(index + cols); // Нижний сосед

        return neighbors;
    }
    // Кольцо - конец
}
