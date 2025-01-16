export default class Button extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,over,out,text,color='#1E1E1E',type=false,value=false,touch=false) {
        super(scene); 

        this.scene = scene.scene;

        if(out == ''){
            out = '1%';
            over = '1%';
        }
        
        // Создание кнопки
        this.button = scene.add.sprite(x, y, out).setInteractive();
        
        if(text!=undefined){
            this.text = scene.add.text(x, y, text, {
            fontFamily: 'Alumni Sans Pinstripe', fontSize: 64, color: color,
            // stroke: '#000000', strokeThickness: 8,
            align: 'center'
            }).setOrigin(0.5);
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
        this.button.on('pointerup',this.onButtonUpper, this);


        if(type==='chek'){
            this.button.setTexture(this.texture);
        }else{             
            this.button.on('pointerover', this.onButtonOver, this);
            this.button.on('pointerout', this.onButtonOut, this);
        }

        
        if(this.value===false){           
            this.texture = this.out;

        }else{            
            this.texture = this.over;
        }
        //console.log(this.value);
        this.button.setTexture(this.texture);



        if(this._visible === false){
            // console.log('не видемая');
        }
        
        
    }

    preload(){
        // console.log('123-12312312');
    }

    update(){
        if(this.visible === false){
            // console.log('не видемая');
        }
        // console.log('123-12312312');
    }

    onButtonClicked() {
        // Обработчик события для щелчка по кнопке
        if(this.value===true){
            this.texture = this.out;
        }else{
            this.texture = this.over;
        }
        this.button.setTexture(this.texture);
        if (this.touch) {
           
        }else{
            this.relise();
        }
    }

    onButtonUpper() {
        if (this.touch) {
           
        }else{
            this.unrelise();
        }
        
    }

    onButtonOver() {
        // Обработчик события для щелчка по кнопке        
        this.button.setTexture(this.over);
        if (this.touch) {
           this.relise(); 
        }
        // console.log('2')
    }

    onButtonOut() {
        // Обработчик события для щелчка по кнопке        
        this.button.setTexture(this.out);
        if (this.touch) {
           this.unrelise(); 
        }
        //console.log('3')
    }  

    relise(){
        // console.log('запуск');
    } 
    unrelise(){
        // console.log('отпуск');
    }

} 