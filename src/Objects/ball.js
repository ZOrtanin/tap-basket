export default class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,over,out,text,color='#1E1E1E',type=false,value=false,touch=false) {
        super(scene); 

        this.scene = scene.scene;
    }

    preload(){
        // console.log('123-12312312');
    }

    update(){
       
        // console.log('123-12312312');
    }

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

} 