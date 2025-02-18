export default class Tramplin extends Phaser.GameObjects.Sprite {
    constructor(scene,settings) {
        super(scene); 

        this.scene = scene;

        this.create(...settings); 
    }

    create(x,y,start,end,radius,steps,barer=false){
        this.x = x;
        this.y = y;

        // Создаём массив точек для дуги 
        this.vertices = [];

        this.startAngle = Phaser.Math.DegToRad(start); // Начальный угол
        this.endAngle = Phaser.Math.DegToRad(end); // Конечный угол

        this.radius = radius;
        this.steps = steps;

        this.barer = barer;

        this.addTramplin();
        
    }

    preload(){
        // console.log('123-12312312');
    }

    update(){
       
        // console.log('123-12312312');
    }

   // Функция для создания объеектов в виде окружности
    addTramplin(){
        // Создаём массив точек для дуги

        // делаем дугу
        for (let i = 0; i <= this.steps; i++) {
            const angle = this.startAngle + (i / this.steps) * (this.endAngle - this.startAngle);
            const x = Math.cos(angle) * this.radius;
            const y = Math.sin(angle) * this.radius;
            this.vertices.push({ x, y });
        }

        // Закрываем дугу с другой стороны
        for (let i = this.steps; i >= 0; i--) {
            const angle = this.startAngle + (i / this.steps) * (this.endAngle - this.startAngle);
            const x = Math.cos(angle) * (this.radius - 10); // Внутренняя часть дуги
            const y = Math.sin(angle) * (this.radius - 10);
            this.vertices.push({ x, y });
        }

        const body = this.scene.matter.add.fromVertices(this.x, this.y, this.vertices, {
            friction: 0.0005,
            restitution: 0.5,
            density: 0.0001,
            isStatic: true
        }, true); // true позволяет автоматически корректировать форму

        // мы также делаем трамплин для общего поля по этому и нужно выключать видимость
        if(this.barer){
            // Создаём графику
            const graphics = this.scene.add.graphics();
            graphics.fillStyle(0x1E1E1E, 1); 
            graphics.fillPoints(this.vertices, true);

            // Синхронизируем графику с физическим телом
            this.scene.matter.world.on('afterupdate', () => {
                graphics.x = body.position.x-28;
                graphics.y = body.position.y+165;
                graphics.rotation = body.angle;
            });
        }        
    }

} 