export default class Chekbox extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,width,text,box_img,chek_img,value=false) {
        super(scene); 

        this.scene = scene.scene; 
        this.value = value;
        
        // подпись чекбокса
        // this.text = scene.add.text(
        //     x - ( width / 2 ), 
        //     y, 
        //     text, {
        //         fontFamily: 'Sofia Sans Condensed', 
        //         fontSize: 64, 
        //         color: '#D9D9D9',            
        //         align: 'center'
        //         }).setOrigin(0);  

        this.text = scene.add.bitmapText(x - ( width / 2 ), y, 'white_font', text, 80)
            .setOrigin(0)
            .setTint(0xD9D9D9); 

        // сам чекбокс
        this.box = scene.add.sprite(
            x + ( width / 2 ), 
            y + 25, 
            box_img
            ).setInteractive();  

        // галочка
        this.chek = scene.add.sprite(
            x + ( width / 2 ) + 10, 
            y, 
            chek_img
            );  

        // значение по умолчанию
        if(value){
            this.chek.visible = true;
        }else{
            this.chek.visible = false;
        }

        // регистрация клика
        this.box.on('pointerdown', this.onButtonClicked, this);       
        
        
    }

    onButtonClicked(){
        this.relise();

        if(this.chek.visible){
            this.chek.visible = false;
            this.value = false;
        }else{
            this.chek.visible = true;
            this.value = true;
        }

    }

    relise(){
        // console.log('запуск');
    } 
    
    unrelise(){
        // console.log('отпуск');
    }

} 