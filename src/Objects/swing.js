export default class Swing extends Phaser.GameObjects.Sprite {
    constructor(scene,settings) {
        super(scene); 

        this.scene = scene;
        console.log('install swing');

        this.create(...settings); 
    }

    create(x,y,width){
        this.x = x;
        this.y = y; 
        this.width = width;      

        this.addSwing();
        
    }

    preload(){
        // console.log('123-12312312');
    }

    update(){
       
        // console.log('123-12312312');
    }

   // Функция для создания объеектов в виде окружности
    addSwing(){
        console.log('create swing');
        // тело
        let paddle = this.scene.matter.add.rectangle(550, 550, this.width, 20, {
            // render: { sprite: { texture: 'paddle' } },
            friction: 0.005,
            restitution: 0.01,
            density: 0.001,
            //mass: 0.00001,
            frictionAir: 0.00002,            
            //ignoreGravity: false
            angle: Phaser.Math.DegToRad(180),
            sleepThreshold: 40
           
        });

        // текстура
        let sprite = this.scene.add.rectangle(100, 100, this.width, 10, 0x000000); 
        const circle = this.scene.add.circle(200, 200, 15, 0x000000);
        this.scene.matter.add.gameObject(sprite, paddle);
        this.scene.matter.add.gameObject(circle, paddle);

        // Ось вращения платформы
        //const pivot = this.scene.matter.add.circle(801, 1000, 5, { isStatic: true });
        const pivot = this.scene.matter.add.circle(this.x, this.y, 5, { isStatic: true });

        // Связь между платформой и осью
        this.scene.matter.add.constraint(paddle, pivot, 0, 1,{
            pointA: { x:0, y: 0 }, // Смещение точки привязки на правый край платформы
            pointB: { x: 0, y: 0 },
            stiffness: 1
        });
             
    }

} 