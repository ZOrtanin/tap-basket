export default class Button extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,over,out,text,color='#1E1E1E',type=false,value=false,touch=false) {
        super(scene); 
        this.main = scene;
        this.scene = scene.scene;
        this.x = x;
        this.y = y;
        this.text = text;
        this.value_text = text;

        this.action = false;

        if(out == ''){
            out = '1%';
            over = '1%';
        }
        
        // Создание кнопки
        this.button = scene.add.sprite(x, y, out).setInteractive();
        
        if(text!=undefined){
            // this.text = scene.add.text(x, y, text, {
            // fontFamily: 'Sofia Sans Condensed', 
            // fontSize: 64, 
            // color: color,
            // // stroke: '#000000', strokeThickness: 8,
            // align: 'center'
            // }).setOrigin(0.5);

            if(color == '#1E1E1E'){
                this.render = scene.add.bitmapText(x, y, 'dark_font', text, 80)
                .setOrigin(0.5)
                .setTint(0xD9D9D9);

                this.default = 'dark_font';
                
            }else{
                this.render = scene.add.bitmapText(x, y, 'white_font', text, 80)
                .setOrigin(0.5)
                .setTint(0xD9D9D9);

                this.default = 'white_font';
            }

        }
        
       
        this.over = over;
        this.out = out;

        this.type = type;
        this.value = value;
        this.touch = touch;

        this.activ;
        this.texture = over;

        // Добавление обработчика события для щелчка по кнопке
        this.button.on('pointerdown', this.onButtonClicked, this);

        // добовление обрабочика при наведении
        this.button.on('pointerover', this.onButtonOver, this);
       
        // добовление обрабочика выхода за границу
        this.button.on('pointerout', this.onButtonOut, this);
        
        if(this.value===false){           
            this.texture = this.out;

        }else{            
            this.texture = this.over;
        }
        //console.log(this.value);
        this.button.setTexture(this.texture);
        
    }

    preload(){
        // console.log('123-12312312');
    }

    update(){
        if(this.visible === false){
            // console.log('не видемая');
        }
        
    }

    onButtonClicked() {
        // поведение при клике
        console.log(this.render);
        if(this.out === '1%'){
            this.action = true;
            this.render.destroy();
            this.render = this.main.add.bitmapText(this.x, this.y, 'dark_font', this.text, 80)
                    .setOrigin(0.5)
                    .setTint(0xD9D9D9);
        }
        

        // Обработчик события для щелчка по кнопке
        if(this.value===true){
            this.texture = this.out;
        }else{
            this.texture = this.over;
        }

        this.button.setTexture(this.texture);
        this.action = true;
        this.relise();
        
    }

    onButtonOver() {
        // пведение кнопки при наведении
        // if(this.value===true){
        //     this.texture = this.out;
        // }else{
        //     this.texture = this.over;
        // }
        
        console.log(this.out);
        if( this.out === '1%' ){
            this.render.destroy();
            this.render = this.main.add.bitmapText(this.x, this.y, 'dark_font', this.text, 80)
                .setOrigin(0.5)
                .setTint(0xD9D9D9);
        }
        
        
    }

    onButtonOut() {
        // пведение кнопки привыходе за границу
        if(this.action === false && this.out === '1%'){
            this.render.destroy();
            this.render = this.main.add.bitmapText(this.x, this.y, this.default, this.text, 80)
                .setOrigin(0.5)
                .setTint(0xD9D9D9);
        }
    }  

    relise(){
        //console.log('запуск');
    } 
    unrelise(){
        // console.log('отпуск');
    }

} 