export default class Slider extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,width,color_line,img_line) {
        super(scene); 

        this.scene = scene.scene;  

        // Отрисовка "линии" слайдера
        // this.sliderLine = scene.add.rectangle(x, y, width, 5, color_line,); 
        this.sliderLine = scene.add.sprite(x, y, img_line);

        // Бегунок (физический объект Matter.js)
        // this.sliderKnob = scene.matter.add.circle(x, y, 10, { 
        //     isStatic: false, 
        //     friction: 0, 
        //     restitution: 0, 
        //     inertia: Infinity 
        // });   

        this.sliderKnob = scene.add.circle(x, y, 20, 0xffffff,).setInteractive({ draggable: true });

        // Обработка перетаскивания бегунка
        scene.input.setDraggable(this.sliderKnob);
        scene.input.on('drag', (pointer, gameObject, dragX) => {
            // Ограничиваем передвижение по оси X
            dragX = Phaser.Math.Clamp(dragX, x-350, x+350);
            gameObject.x = dragX; 
            this.volume = (dragX - (x -350)) / (x+350);
            console.log(this.volume);          
        });
        
        
    }

    preload(){
        // console.log('123-12312312');
    }

    update(){
        
        // console.log('123-12312312');
    }

   

} 