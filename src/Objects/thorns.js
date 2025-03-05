export default class Thorns extends Phaser.GameObjects.Sprite {
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
        let thorn = this.scene.matter.add.rectangle(this.x, this.y, 200, 40, {
            ffriction: 0.5,
            restitution: 0.5,
            density: 0.1,
            isStatic: true,
            isSensor: true,
            angle: Phaser.Math.DegToRad(this.angle) // Угол поворота в радианах (45 градусов)           
        });

        // текстура
        //let sprite = this.scene.add.rectangle(this.x, this.y, this.width, 40, 0x000000); 
        let sprite = this.scene.add.image(this.x, this.y, 'spike');        
        this.scene.matter.add.gameObject(sprite, thorn);
        
        let my_game = this.scene.scene.get('Game');
        my_game.thons_arr.push(thorn);
       
             
    }

} 