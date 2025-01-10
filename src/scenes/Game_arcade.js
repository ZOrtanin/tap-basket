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

   create() {
        let score = 0;
        let scoreText;
        let paddle;
        
        let hoop;

        // Настраиваемые размеры объектов
        const hoopWidth = 100;
        const hoopHeight = 10;
        const ballRadius = 15;

        // Добавляем кольцо
        hoop = this.physics.add.staticImage(690, 350, 'hoop');
        hoop.displayWidth = hoopWidth;
        hoop.displayHeight = hoopHeight;

        // Создаем мяч
        this.ball = this.physics.add.sprite(200, 500, 'ball');
        this.ball.setBounce(0.8);
        this.ball.setCollideWorldBounds(true);
        this.ball.body.setCircle(ballRadius);

        // Добавляем вращающуюся платформу (лапка)
        paddle = this.physics.add.sprite(400, 550, 'paddle');
        paddle.setImmovable(true);
        paddle.setCollideWorldBounds(true);
        paddle.rotation = Phaser.Math.DegToRad(-10);

        // Управление платформой
        this.input.keyboard.on('keydown-LEFT', () => {
            if (paddle.rotation > Phaser.Math.DegToRad(-90)) {
                paddle.rotation -= Phaser.Math.DegToRad(5);
            }
        });

        this.input.keyboard.on('keydown-RIGHT', () => {
            if (paddle.rotation < Phaser.Math.DegToRad(0)) {
                paddle.rotation += Phaser.Math.DegToRad(5);
            }
        });

        // Текст для отображения счета
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        // Проверка попадания в кольцо
        const hoopSensor = this.physics.add.staticImage(690, 370, null);
        hoopSensor.displayWidth = hoopWidth;
        hoopSensor.displayHeight = 10;
        this.physics.add.overlap(this.ball, hoopSensor, this.scorePoint, null, this);

        // Земля (наклонена на 10 градусов)
        // const ground = this.add.rectangle(400, 590, 800, 20, 0x000000);
        // this.physics.add.existing(ground, true);
        // ground.body.angle = 10;

        // Коллизии
        //this.physics.add.collider(this.ball, ground);
        this.physics.add.collider(this.ball, paddle);

        this.score = score;
    }

    update() {
        // Если мяч вылетел за пределы, вернуть его на старт
        if (this.ball.y > 800) {
            this.ball.setPosition(200, 500);
            this.ball.setVelocity(0, 0);
        }
    }

    scorePoint(ball, hoopSensor) {
        score += 1;
        scoreText.setText('Score: ' + score);
    }


}
