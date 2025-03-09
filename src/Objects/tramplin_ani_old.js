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
    addTramplin() {
        let vertices = []; // Создаём новый массив вершин для каждой дуги

        // Делаем дугу
        for (let i = 0; i <= this.steps; i++) {
            const angle = this.startAngle + (i / this.steps) * (this.endAngle - this.startAngle);
            const x = Math.cos(angle) * this.radius;
            const y = Math.sin(angle) * this.radius;
            vertices.push({ x, y });
        }

        // Закрываем дугу с другой стороны
        for (let i = this.steps; i >= 0; i--) {
            const angle = this.startAngle + (i / this.steps) * (this.endAngle - this.startAngle);
            const x = Math.cos(angle) * (this.radius - 10); // Внутренняя часть дуги
            const y = Math.sin(angle) * (this.radius - 10);
            vertices.push({ x, y });
        }

        // Центрируем вершины относительно (0,0)
        let minX = Math.min(...vertices.map(v => v.x));
        let minY = Math.min(...vertices.map(v => v.y));
        let maxX = Math.max(...vertices.map(v => v.x));
        let maxY = Math.max(...vertices.map(v => v.y));

        let offsetX = (minX + maxX) / 2;
        let offsetY = (minY + maxY) / 2;

        vertices = vertices.map(v => ({ x: v.x - offsetX + 43, y: v.y - offsetY - 20 }));

        // Создаём физическое тело
        const body = this.scene.matter.add.fromVertices(this.x, this.y, vertices, {
            friction: 1,
            restitution: 0.5,
            density: 0.9,
            isStatic: true
        }, true);

        if (this.barer) {
            // Создаём графику
            const graphics = this.scene.add.graphics();
            graphics.fillStyle(0x1E1E1E, 1);
            graphics.fillPoints(vertices, true);

            // Добавляем `graphics` в физический мир
            this.scene.matter.add.gameObject(graphics).setExistingBody(body);

            // Обновляем позицию графики
            graphics.setPosition(this.x, this.y);

            // (Опционально) Добавляем анимацию
            this.scene.tweens.add({
                targets: graphics,
                angle: 360,
                duration: 10000,
                repeat: -1
            });
        }
    }

} 