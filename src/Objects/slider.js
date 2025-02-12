export default class Slider extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,value=0,width=300,color_line=0x1E1E1E,img_line,img_knob) {
        super(scene); 

        this.scene = scene.scene; 
        this.halfwidth = width / 2;

        this.flag = false;

        this.save_volume = value; // 0 - 0.78
        this.save_position = (this.save_volume * (x + this.halfwidth)) + (x - this.halfwidth); 

        // Отрисовка "линии" слайдера
        if(img_line === '' || img_line === undefined){
            this.sliderLine = scene.add.rectangle(x, y, width, 5, color_line,); 
        }else{
            this.sliderLine = scene.add.sprite(x, y, img_line);
        }
        
        
        // Отрисовка бегунка
        if(img_knob === '' || img_knob === undefined){
            this.sliderKnob = scene.add.circle(this.save_position, y, 20, 0xffffff,).setInteractive({ draggable: true });
        }else{
            this.sliderKnob = scene.add.sprite(this.save_position, y, img_knob).setInteractive({ draggable: true });
        }

        // Обработка перетаскивания бегунка
        scene.input.setDraggable(this.sliderKnob);
        scene.input.on('drag', (pointer, gameObject, dragX) => {
            // Ограничиваем передвижение по оси X
            dragX = Phaser.Math.Clamp(dragX, x - this.halfwidth, x + this.halfwidth);
            gameObject.x = dragX;
            this.volume = (dragX - (x - this.halfwidth)) / (x + this.halfwidth);
        });

        this.sliderKnob.on('pointerdown', this.onButtonClicked, this);
        this.sliderKnob.on('pointerup',this.onButtonUpper, this);
        this.sliderKnob.on('pointerout', this.onButtonUpper, this);
        
        
    }

    preload(){
        // console.log('123-12312312');
    }

    update(){
        
        // console.log('123-12312312');
    }

    onButtonClicked(){
        this.flag = true;
    }

    onButtonUpper() {
        if(this.flag){
            console.log('work');
            this.relise();
            this.flag = false;
        }        
    }

    

    relise(){
        // console.log('work1');
    }

   

} 