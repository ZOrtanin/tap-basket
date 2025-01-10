import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor (){
        super('Game');

        this.circle = null;
        this.isDragging = false;
        this.startPosition = { x: 0, y: 0 };
        this.dragLine = null; // Линия для визуализации прицеливания
    }

    preload() {
        // Загружаем ресурсы (если понадобятся)
      }


    create_old() {
        // Настраиваемые размеры объектов
        const hoopWidth = 100;
        const hoopHeight = 10;
        const backboardWidth = 20;
        const backboardHeight = 100;
        const ballRadius = 15;

        // Добавляем кольцо с щитом
        const backboard = this.matter.add.image(700, 300, 'backboard', null, { isStatic: true });
        const hoop = this.matter.add.image(690, 350, 'hoop', null, { isStatic: true });

        // Создаем мяч
        this.ball = this.matter.add.image(200, 500, 'ball');
        this.ball.setCircle();
        this.ball.setBounce(0.8);
        this.ball.setFriction(0.005);

        // Управление мышью
        this.input.on('pointerdown', (pointer) => {
            this.matter.body.setPosition(this.ball.body, { x: pointer.x, y: pointer.y });
        });

        this.input.on('pointerup', (pointer) => {
            const forceX = (pointer.x - this.ball.x) * 0.05;
            const forceY = (pointer.y - this.ball.y) * 0.05;
            this.ball.setVelocity(forceX, forceY);
        });

        // Земля
        this.matter.add.rectangle(400, 590, 800, 20, { isStatic: true });
    }

    create() {

        let hoopPositionX = 590;
        let hoopPositionY = 360;

        let score = 0;
        let scoreText;
        // Настраиваемые размеры объектов
        const hoopWidth = 100;
        const hoopHeight = 10;
        const backboardWidth = 20;
        const backboardHeight = 100;
        const ballRadius = 15;

        // Добавляем кольцо с щитом
        //const backboard = this.matter.add.rectangle(700, 300, backboardWidth, backboardHeight, { isStatic: true, render: { sprite: { texture: 'backboard' } } });
        //const hoop = this.matter.add.rectangle(690, 350, hoopWidth, hoopHeight, { isStatic: true, render: { sprite: { texture: 'hoop' } } });

        let backboard = this.matter.add.image(hoopPositionX, hoopPositionY, 'backboard', null, { isStatic: true, isSensor: true});
        backboard.setScale(0.4)       

        let border = this.matter.add.rectangle(hoopPositionX-60, hoopPositionY+10, 15, 15, { isStatic: true });
        let border2 = this.matter.add.rectangle(hoopPositionX+60, hoopPositionY+10, 15, 15, { isStatic: true });

        // Добавляем невидимый сенсор для засчета попадания
        const hoopSensor = this.matter.add.rectangle(hoopPositionX, hoopPositionY+10, hoopWidth, 10, {
            isSensor: true,
            isStatic: true
        });


        // Создаем мяч
        this.ball = this.matter.add.image(200, 500,'ball',{
                friction: 0.0005,
                restitution: 0.5,
                density: 0.0001,
                isStatic: false,
                angle: 10, // Угол в градусах
                mass:1
            });
        // this.ball = this.matter.add.circle(200, 500, ballRadius, {
        //     render: { sprite: { texture: 'ball' } }
        // });
        this.ball.setCircle(60);
        this.ball.setScale(0.5)
        //this.ball.setBounce(1);
        //this.ball.setFriction(0.0005);


        

        

        // Событие для проверки попадания
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                if (pair.bodyA === hoopSensor || pair.bodyB === hoopSensor) {
                    if (pair.bodyA === this.ball.body || pair.bodyB === this.ball.body) {
                        score += 1;
                        scoreText.setText('Score: ' + score);
                    }
                }
            });
        });

        // Текст для отображения счета
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        // Управление мышью
        this.input.on('pointerdown', (pointer) => {
            this.matter.body.setPosition(this.ball.body, { x: pointer.x, y: pointer.y });
        });

        this.input.on('pointerup', (pointer) => {
            const forceX = (pointer.x - this.ball.x) * 0.05;
            const forceY = (pointer.y - this.ball.y) * 0.05;
            this.ball.setVelocity(forceX, forceY);
        });

        // Земля
        let tree = this.matter.add.rectangle(100, 590, 800, 20, { isStatic: true, angle: Phaser.Math.DegToRad(20) });
       

        // Добавляем вращающуюся платформу (лапка)
        const paddle = this.matter.add.rectangle(580, 730, 150, 20, {
            render: { sprite: { texture: 'paddle' } },
            density: 0.9,
        });

        // Ось вращения платформы
        const pivot = this.matter.add.circle(510, 730, 5, { isStatic: true });

        // Связь между платформой и осью
        this.matter.add.constraint(paddle, pivot, 0, 1,{
            pointA: { x: -65, y: 0 }, // Смещение точки привязки на правый край платформы
            pointB: { x: 0, y: 0 },
            stiffness: 1
        });

        // Управление вращением платформы с помощью клавиш
        this.input.keyboard.on('keydown-LEFT', () => {
           
                this.matter.body.setAngularVelocity(paddle, -0.5); // Вращение против часовой стрелки
            
        });

        this.input.keyboard.on('keydown-RIGHT', () => {
            
                this.matter.body.setAngularVelocity(paddle, 0.5); // Вращение по часовой стрелке
            
        });

        // Ограничение угла вращения
        this.matter.world.on('beforeupdate', () => {
            const angle = Phaser.Math.RadToDeg(paddle.angle);
            if (angle < 90) {
                this.matter.body.setAngle(paddle, Phaser.Math.DegToRad(0));
                //this.matter.body.setAngularVelocity(paddle, 0.01);
            } else if (angle > 0) {
                this.matter.body.setAngle(paddle, Phaser.Math.DegToRad(0));
                //this.matter.body.setAngularVelocity(paddle, -0.001);
            }
        });

    }

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

     update() {
        // Если мяч вылетел за пределы, вернуть его на старт
        if (this.ball.y > 800) {
            this.ball.setPosition(200, 500);
            this.ball.setVelocity(0, 0);
        }
    }


}
