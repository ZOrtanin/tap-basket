import Button from '../Objects/button.js';
import UI from '../Objects/ui.js';
import Sound from '../Objects/sound.js';

import Tramplin from '../Objects/tramplin.js';
import Swing from '../Objects/swing.js';
import Beam from '../Objects/beam.js';

import {getRandomInt} from '../utils/utils.js';

import { Scene } from 'phaser';

export class Game extends Scene{
    constructor (){
        super('Game');

        // Попытки
        this.attempts = 3;
        this.attemptsIcons = [];

        this.circle = null;
        this.isDragging = false;
        this.startPosition = { x: 0, y: 0 };
        this.dragLine = null; // Линия для визуализации прицеливания

        this.gameOver = this.gameOver.bind(this);

        this.shild_coords = {x:550,y:800};
        this.level = 0;

        this.perfect = 0;

        this.random_level = false;
        this.levels = [
            [0,0,-1,{x:541,y:885},{x:544,y:632}],
            [1,0,-1,{x:726,y:658},{x:282,y:637}],
            [2,0,-1,{x:541,y:1053},{x:147,y:1547}],
            [3,0,-1,{x:541,y:240},{x:262,y:887}],

            [4,0,-1,{x:739,y:862},{x:480,y:477},[ ['ramp',[608,487,180,380,300,20,true]] ] ],
            [5,0,-1,{x:247,y:1013},{x:282,y:637},[ ['ramp',[449,647,180,380,300,20,true]] ] ],            
            [6,0,-1,{x:148,y:726},{x:241,y:323},[ ['ramp',[532,418,180,380,300,20,true]] ] ],
            [7,0,-1,{x:390,y:569},{x:745,y:1161},[ ['ramp',[592,974,180,380,300,20,true]] ] ],

            [8,0,-1,{x:541,y:720},{x:213,y:374},[ ['beam',[733,632,300,-45]],['beam',[344,632,300,45]] ] ],
            [9,0,-1,{x:541,y:720},{x:540,y:238},[ ['beam',[420,576,300,90]],['beam',[667,576,300,90]] ] ],
            [10,0,-1,{x:541,y:720},{x:540,y:238},[ ['beam',[540,540,300,10]] ] ],
            [11,0,-1,{x:541,y:720},{x:545,y:362},[ ['beam',[668,550,300,30]],['beam',[411,552,300,-30]] ] ],

            [12,0,-1,{x:362,y:1045}],
            [13,0,-1,{x:630,y:890}],
            [14,0,-1,{x:481,y:562}],
            [15,0,-1,{x:596,y:911}],

            [16,0,-1,{x:516,y:1098}],
            [17,0,-1,{x:251,y:851}],
            [18,0,-1,{x:309,y:835}],
            [19,0,-1,{x:438,y:964}],

            [20,0,-1,{x:388,y:255}],
            [21,0,-1,{x:777,y:482}],
            [22,0,-1,{x:444,y:978}],
            [23,0,-1,{x:635,y:376}],           

        ]

        

    }

    preload() {
        // Загружаем ресурсы (если понадобятся)
        // console.log('-- Уровень --');
 
        if(this.random_level){
            this.shild_coords = {x:getRandomInt(200,700),y:getRandomInt(250,1100)}
        }else{
            this.shild_coords =  this.levels[this.level][3];
        }

        
        const main_scren = this.scene.get('MainMenu');
        this.sound = main_scren.sound;
    

        this.perfect = 0;

        const win_scren = this.scene.get('GameOver');
        win_scren.star = 0;

    }


    create() {
        let score = 0;
        let scoreText;

        this.add.image(540, 984, 'bg2');       

        // Пишем номер уровня
            // this.add.text(350, 500, this.level, { fontFamily: 'Sofia Sans Condensed', fontSize: '764px', fill: '#37404D' });
            if(!this.random_level){
                this.add.bitmapText(550, 800, 'dark_font', this.level, 764)
                .setOrigin(0.5)
                .setTint(0x37404D)
                .setAlpha(0.1);
            }

        // интерфейс 
            this.addUI(); 

        // Событие для проверки попадания
            this.evensGame();

        // Сборка уровня
            this.buildLevel(); 

        //


        // Текст для отображения счета
            //scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        // Упровление мышкой для отладки
            if(this.sys.game.config.physics.matter.debug){
                this.controlMouse();
            }
            
    } 

    gameOver(){
        this.scene.start('GameOver');
    }   

    // проверка на косание мяча
    evensGame(){
        const win_scren = this.scene.get('GameOver');
            
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                if (pair.bodyA === this.ball.body || pair.bodyB === this.ball.body) {
                    let impactForce = pair.collision.depth;
                    // console.log(impactForce);
                   

                    if(pair.bodyA.label === 'hoop_net' || pair.bodyB.label === 'hoop_net' ){
                       this.sound.getNet();
                    }else{
                        if(impactForce > 4){
                            this.sound.getUdar();
                        }
                    }
                    
                }
                
                // проверка на забивание ( сенсор под кольцом )
                if (pair.bodyA === this.hoopSensor || pair.bodyB === this.hoopSensor) {
                    if (pair.bodyA === this.ball.body || pair.bodyB === this.ball.body) {
                        //score += 1;
                        //scoreText.setText('Score: ' + score);
                        
                        if(this.perfect === 1){                            
                            win_scren.star += 1;
                        }
                        this.levels[this.level][2] = 1;                        
                        setTimeout(this.gameOver, 1500);
                        
                    }
                }

                // проверка на чистое поподание ( сенсор над кольцом )
                if (pair.bodyA === this.winSensor || pair.bodyB === this.winSensor) {
                    if (pair.bodyA === this.ball.body || pair.bodyB === this.ball.body) {
                        if(this.perfect === 0){
                            this.perfect += 1;
                        }
                        //console.log(this.perfect,'добавили');
                    }
                }

                // проверка на косание педали
                if (pair.bodyA === this.paddle_sensor || pair.bodyB === this.paddle_sensor) {
                    if (pair.bodyA === this.ball.body || pair.bodyB === this.ball.body) {
                        if(this.perfect!=0){
                            this.perfect -= 1;
                        }  

                        let impactForce = pair.collision.depth;
                        // console.log(impactForce);
                        if(impactForce > 4){
                            this.sound.getBall();
                        }                      
                        //console.log(this.perfect,'убавили');
                    }
                }
                
                // Проверка на взятие звездочки
                if (pair.bodyA === this.starSensor || pair.bodyB === this.starSensor) {
                    if (pair.bodyA === this.ball.body || pair.bodyB === this.ball.body) { 
                        if(this.star.visible === true){
                            this.sound.getStar();
                        }
                                                                      
                        //console.log(this.star,'взяли звездочку');
                        this.star.visible = false;
                        win_scren.star += 1;
                    }
                }


            });
        });
    }

    update() {
        if(this.attempts == -1){
            this.scene.start('GameOver');
        }

        // Если мяч вылетел за пределы, вернуть его на старт
        if (this.ball.y > 2000) {
            this.ball.setPosition(935, 500);
            this.ball.setVelocity(0, 0);
            this.removeBalls()
            this.attempts -= 1;
        }

        // Обновляем сетку
        this.updateNet();
    }

    // Сборка уровня
    buildLevel(){
        const win_scren = this.scene.get('GameOver');
        
        // добовляем кольцо и мяч
            this.addHoop(this.shild_coords.x,this.shild_coords.y);

        // Границы игры
            //this.matter.add.rectangle(1000, 1490, 800, 20, { isStatic: true, angle: Phaser.Math.DegToRad(-20) });
            this.matter.add.rectangle(-10, 940, 100, 1900, { isStatic: true });
            this.matter.add.rectangle(1090, 940, 100, 1900, { isStatic: true });
            this.matter.add.rectangle(550, -20, 1140, 100, { isStatic: true });            
            this.podacha = new Tramplin(this,[905,1500,0,81,490,20]); 

        // Объекты в игре
            if(!this.random_level){
                // проверяем объекты в уровне
                if(this.levels[this.level].length > 5){
                    this.addObjects(this.levels[this.level][5]);
                }
                
                if(this.levels[this.level].length > 4){
                    let cordStar = this.levels[this.level][4];
                    this.addStar(cordStar.x,cordStar.y);
                }else{
                    win_scren.star += 1;
                }
            }

        // Добовление педали
            this.addPaddle();    
    }

    // Интерфейс игры
    addUI(){
        this.ui = new UI(this);

        // добовляем колличество попыток
        this.attempts = 3;

        // Кнопка настроек
            this.button_settings = new Button(
                this, // сцена
                100, // x
                100, // y
                'settings_activ', // не активна
                'settings', // активна
                );

            this.button_settings.relise = function() { 
                this.scene.get('Settings').prevScreen  = 'Game';
                console.log('work123',this.scene.get('Settings').prevScreen);
                this.scene.start('Settings');         
            };

        // добовляем попытки
            for (let i = 0; i < this.attempts; i++) {
                const icon = this.add.image(935, 190+i*110, 'dark_ball').setScale(0.7);
                this.attemptsIcons.push(icon);
            }

            this.attemptsIcons.reverse();
    }

    // Функция для отрисовки мяча 
    addBall(){ 
        // Создаем мяч
        this.ball = this.matter.add.image(935, 2000,'ball',0,{
                    friction: 1,
                    restitution: 0.005,
                    frictionAir: 0.0001,
                    density: 0.09,
                    isStatic: false,
                    angle: 10, // Угол в градусах
                    mass: 0.01
                    
                });
            this.ball.setCircle(60);
            this.ball.setScale(0.7);
            this.ball.setBounce(0.5); 
    }

    // Функция для удаления неудачной попытки
    removeBalls(){
        for (const item of this.attemptsIcons) {
            if(item._visible != false){
                item.setVisible(false);
                return;
            }
        }
    }

    // Функцция добовления объектов
    addObjects(objects){
        objects.forEach(item =>{

            if(item[0] == 'ramp'){
                let settingsPlatform = item[1];                    
                const ramp = new Tramplin(this,settingsPlatform); 
            } 

            if(item[0] == 'swing'){
                let settingsPlatform = item[1];                    
                const swing = new Swing(this,settingsPlatform);
            }

            if(item[0] == 'beam'){
                let settingsPlatform = item[1];                    
                const swing = new Beam(this,settingsPlatform);
            }
        });
    }

    // Функция для установки победной звездочки
    addStar(x,y){
        this.star = this.add.image(x, y, 'star');

        this.starSensor = this.matter.add.rectangle(x , y, 10, 10, {
            isSensor: true,
            isStatic: true
        });
    }        

    // Кольцо
    addHoop(x,y){
        // Добовляем щит
        let backboard = this.matter.add.image(
            x,
            y, 
            'backboard', 
            null, 
            { isStatic: true, isSensor: true}
            );
        backboard.setScale(0.7)

        // добовляем мячи
        this.addBall();

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

                body.label = "hoop_net";

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

    addPaddle(){
        // Добавляем вращающуюся платформу (лапка)
        let paddle = this.matter.add.rectangle(580, 730, 400, 100, {
            // render: { sprite: { texture: 'paddle' } },
            friction: 0.0005,
            restitution: 0.5,
            density: 0.0001,
        });

        this.paddle_sensor = paddle;

        //console.log(paddle);

        let sprite = this.add.sprite(100, 100, 'paddle');

        this.matter.add.gameObject(sprite, paddle);


        //добовляем ограничитель
        this.matter.add.rectangle(570, 1860, 20, 20, { isStatic: true })

        // Ось вращения платформы
        const pivot = this.matter.add.circle(770, 1750, 5, { isStatic: true });

        // Связь между платформой и осью
        this.matter.add.constraint(paddle, pivot, 0, 1,{
            pointA: { x:150, y: 0 }, // Смещение точки привязки на правый край платформы
            pointB: { x: -150, y: 0 },
            stiffness: 1
        });

        // Обработчик нажатия пробела
        this.input.keyboard.on('keydown-SPACE', () => {  
            // console.log(Phaser.Math.RadToDeg(paddle.angle)) 
            if (Phaser.Math.RadToDeg(paddle.angle) < 0){        
                this.matter.body.setAngularVelocity(paddle, 0.5); // Вращение против часовой стрелки            
            }
        });

        this.input.on('pointerdown', (pointer) => {
            if (Phaser.Math.RadToDeg(paddle.angle) < 0){        
                this.matter.body.setAngularVelocity(paddle, 0.5); // Вращение против часовой стрелки            
            }
        });

        // Управление вращением платформы с помощью клавиш
        this.input.keyboard.on('keydown-LEFT', () => {           
                this.matter.body.setAngularVelocity(paddle, -0.5); // Вращение против часовой стрелки            
        });

        this.input.keyboard.on('keydown-RIGHT', () => {
            // if (Phaser.Math.RadToDeg(paddle.angle) < 0){
                this.matter.body.setAngularVelocity(paddle, 0.5); // Вращение по часовой стрелке
            //}
            
        });

        this.matter.body.setAngle(paddle, Phaser.Math.DegToRad(90));

        // // Ограничение угла вращения
        // this.matter.world.on('beforeupdate', () => {
        //     const angle = Phaser.Math.RadToDeg(paddle.angle);
        //     if (angle < 180) {
        //         this.matter.body.setAngle(paddle, Phaser.Math.DegToRad(0));
        //         //this.matter.body.setAngularVelocity(paddle, 0.01);
        //     } else if (angle > 0) {
        //         this.matter.body.setAngle(paddle, Phaser.Math.DegToRad(0));
        //         //this.matter.body.setAngularVelocity(paddle, -0.001);
        //     }
        // });
    }

    // Упровление мышю для отладки
    onPointerDown(pointer) {
        const dist = Phaser.Math.Distance.Between(pointer.x, pointer.y, this.circle.position.x, this.circle.position.y);
        if (dist < 20) {
          this.isDragging = true;
          this.startPosition = { x: pointer.x, y: pointer.y };
        }
    }

    onPointerUp(pointer) {
        if (this.isDragging) {
          this.isDragging = false;
          this.dragLine.setVisible(false); // Скрыть линию прицеливания

          const endPosition = { x: pointer.x, y: pointer.y };
          const forceX = (this.startPosition.x - endPosition.x) * 0.00035; // Масштабируем силу
          const forceY = (this.startPosition.y - endPosition.y) * 0.00035;

          // Применяем импульс к кругу
          this.matter.body.applyForce(this.circle, { x: 0, y: 0 }, { x: forceX, y: forceY });
        }
    }

    onPointerMove(pointer) {
        if (this.isDragging) {
          this.dragLine.setVisible(true); // Показать линию прицеливания
          this.dragLine.setTo(
            this.circle.position.x, this.circle.position.y, // Начало линии
            pointer.x, pointer.y // Текущее положение мыши
          );
        }
    }

    controlMouse(){
         // Управление мышью
        this.input.on('pointerdown', (pointer) => {
            this.matter.body.setPosition(this.ball.body, { x: pointer.x, y: pointer.y });
        });

        this.input.on('pointerup', (pointer) => {
            const forceX = (pointer.x - this.ball.x) * 0.05;
            const forceY = (pointer.y - this.ball.y) * 0.05;
            this.ball.setVelocity(forceX, forceY);
        });
    }


}
