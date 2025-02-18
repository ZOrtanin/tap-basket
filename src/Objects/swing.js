export default class Swing extends Phaser.GameObjects.Sprite {
    constructor(scene,settings) {
        super(scene); 

        this.scene = scene;
        console.log('install swing');

        this.create(...settings); 
    }

    create(x,y){
        this.x = x;
        this.y = y;       

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
        let paddle = this.scene.matter.add.rectangle(550, 550, 470, 10, {
            // render: { sprite: { texture: 'paddle' } },
            ffriction: 0.0005,
            restitution: 0.005,
            density: 0.0001,
            // mass: 0.00001,
            // frictionAir: 0.0000002,            
            //ignoreGravity: false
           
        });

        // текстура
        let sprite = this.scene.add.rectangle(100, 100, 470, 10, 0x000000); 
        const circle = this.scene.add.circle(200, 200, 15, 0x000000);
        this.scene.matter.add.gameObject(sprite, paddle);
        this.scene.matter.add.gameObject(circle, paddle);

        // Ось вращения платформы
        const pivot = this.scene.matter.add.circle(500, 390, 5, { isStatic: true });

        // Связь между платформой и осью
        this.scene.matter.add.constraint(paddle, pivot, 0, 1,{
            pointA: { x:0, y: 0 }, // Смещение точки привязки на правый край платформы
            pointB: { x: 0, y: 0 },
            stiffness: 1
        });
             
    }

} 