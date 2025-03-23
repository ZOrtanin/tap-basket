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

        let tex_vertices = vertices.map(v => ({ x: v.x - offsetX+5, y: v.y - offsetY-5 }));

        // Создаём физическое тело
        const body = this.scene.matter.add.fromVertices(this.x, this.y, vertices, {
            friction: 1,
            restitution: 0.5,
            density: 0.9,
            //isStatic: true
        }, true);

        const newCenterOfRotation = { x: 43, y: -20 }; // Новая позиция центра вращения относительно текущей позиции тела

        // Обновляем позицию тела
        body.position.x += newCenterOfRotation.x;
        body.position.y += newCenterOfRotation.y;
        body.centerOffset = { x: 43, y: -20 };
        body.centerOfMass = { x: 43, y: -20 };
        body.velocity.x = 0;
        body.velocity.y = 0;

        // Ось вращения платформы
        const pivot = this.scene.matter.add.circle(this.x, this.y, 5, { isStatic: true });
        pivot.collisionFilter.mask = 0;

        // Связь между платформой и осью
        this.scene.matter.add.constraint(body, pivot, 0, 1,{
            pointA: { x:0, y: 0 }, // Смещение точки привязки на правый край платформы
            pointB: { x:0, y: 0 },
            stiffness: 1
        });

        if (this.barer) {
            // Создаём графику
            const graphics = this.scene.add.graphics();
            graphics.fillStyle(0x1E1E1E, 1);
            graphics.fillPoints(tex_vertices, true);

            // Добавляем `graphics` в физический мир
            this.scene.matter.add.gameObject(graphics).setExistingBody(body);

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