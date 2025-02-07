export default class Sound extends Phaser.GameObjects.Sprite {
    constructor(scene,mysound) {
        super(scene);

        this.myscene = scene;
        this.mysound = mysound;
        this.name = 'mysound'

        this.soundManager = this.mysound.add('myMusic');
        this.Ball = this.mysound.add('myBall');
        this.Udar = this.mysound.add('myUdar');
        this.Net = this.mysound.add('myNet');
        this.Star = this.mysound.add('myStar');
        

        this.music = true;
        this.sound = true;
        //console.log(mysound)

        this.soundCooldown = false; // Флаг блокировки
    }  

    playSoundBG(){
        this.sound = true;       

        // Воспроизведение звука
        this.soundBG.play();
        this.soundBG.setVolume(0.2);     
        
        

        // Также можно добавить слушатели событий звука
        this.soundBG.on('complete', function() {            
            this.play();
        });
    }

    stopSoundBG(){
        this.sound = false;
        this.soundBG.stop();
    }  

    playQuake(){
        // Звук землятресения            
        if(this.sound == true ){
            this.QuakeSong.play();
            this.QuakeSong.setVolume(0.3);

            this.QuakeSong.on('complete', function() {            
                this.play();
            });
        } 
    } 

    // фоновый звук
    stopQuake(){
        this.QuakeSong.stop();
    }

    // фоновая музыка
    playMusicBG(){
        this.music = true;

        // Воспроизведение звука
        this.soundManager.play();
        this.soundManager.setVolume(0.2);        

        // Также можно добавить слушатели событий звука
        this.soundManager.on('complete', function() {            
            this.play();
        });
    }

    // остановить фоновую музыку
    stopMusicBG(){
        this.music = false;
        this.soundManager.stop();
    }

    // звук шагов
    step(){
        if(this.sound && this.Step.isPlaying === false){
            this.Step.setRate(2);
            this.Step.play();            
        }
    }

    getBall(){
        if(this.sound && this.Ball.isPlaying === false){
            this.Ball.play();
        }
    }

    getUdar(){ 
        if(this.sound){
            this.Udar.play();
        }              
    }

    getStar(){ 
        if(this.sound){
            this.Star.play();
        }              
    }

    getNet(){ 
        if(this.sound && this.Net.isPlaying === false && !this.soundCooldown){
            this.Net.play();

            this.soundCooldown = true; // Блокируем повторный звук

            // Разблокируем через 3 секунды
            setTimeout(() => {
                this.soundCooldown = false;
            }, 3000);
        }              
    }

    youwinplay(){ 
        if(this.sound){
            this.YouWin.play();
        }        
    }

    thing(){
        if(this.sound){
            this.Thing.play();
        }
    }

    box(){
        if(this.sound){
            this.CrashBox.play();
        }
    }



}