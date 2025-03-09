export default class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene,settings) {
        super(scene); 

        this.scene = scene;       
        this.create(...settings); 
    }

    create(x,y,width,angle){
        this.x = x;
        this.y = y;  
        this.width = width;
        this.angle = angle;     

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
            friction: 0.0005,
            restitution: 1,
            density: 0.1,
            isStatic: true,
            angle: Phaser.Math.DegToRad(this.angle) // Угол поворота в радианах (45 градусов)           
        });

        // текстура
        let sprite = this.scene.add.rectangle(this.x, this.y, this.width, 10, 0x000000);         
        this.scene.matter.add.gameObject(sprite, paddle);
        

       
             
    }

} 