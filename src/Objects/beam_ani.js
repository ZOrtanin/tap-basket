export default class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene,settings) {
        super(scene); 

        this.scene = scene;       
        this.create(...settings); 
    }

    create(x,y,width,angle,anim='rout'){
        this.x = x;
        this.y = y;  
        this.width = width;
        this.angle = angle;   
        this.anim = anim;

        this.addBeam();
        
    }

    preload(){
        // console.log('123-12312312');
    }

    update(){
       
        // console.log('123-12312312');
    }

   // Функция для создания объеектов в виде окружности
    addBeam(){
        
        // тело
        let paddle = this.scene.matter.add.rectangle(this.x, this.y, this.width, 20, {
            friction: 1,
            frictionStatic: 1,
            restitution: 0,
            density: 0.9,
            isStatic: true,
            angle: Phaser.Math.DegToRad(this.angle) // Угол поворота в радианах (45 градусов)           
        });

        // текстура
        let sprite = this.scene.add.rectangle(this.x, this.y, this.width, 10, 0x000000);         
        this.scene.matter.add.gameObject(sprite, paddle);

        if(this.anim === 'rout'){
            this.scene.tweens.add({
                targets: sprite,   // Анимируем платформу
                angle: 360,  // Полный оборот
                duration: 2000, 
                repeat: -1  // Бесконечное повторение
            });
        }
        if(this.anim === 'slide'){
            this.scene.tweens.add({
                targets: sprite,   // Анимируем платформу
                x: "+=250",          // Двигаем вниз на 100 пикселей
                duration: 2000,      // Время движения (мс)
                yoyo: true,          // Возвращается обратно
                repeat: -1,          // Бесконечное повторение
                ease: "Sine.easeInOut" // Плавность
            });

        }
        if(this.anim === 'fly'){
            

            this.scene.tweens.add({
                targets: sprite,   // Анимируем платформу
                y: "+=200",          // Двигаем вниз на 100 пикселей
                duration: 1000,      // Время движения (мс)
                yoyo: true,          // Возвращается обратно
                repeat: -1,          // Бесконечное повторение
                ease: "Sine.easeInOut" // Плавность
            });

        }

        

       
             
    }

} 