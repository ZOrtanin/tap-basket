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

        let vertices_new = vertices.map(v => ({ x: v.x - offsetX, y: v.y - offsetY  }));
        let vertices_textur = vertices.map(v => ({ x: v.x - offsetX+350, y: v.y - offsetY+350  }));

        // Создаём физическое тело
        const body = this.scene.matter.add.fromVertices(0, 0, vertices_new, {
            friction: 1,
            restitution: 0.5,
            density: 0.9,
            isStatic: true
        }, true);

        // Устанавливаем новую позицию центра вращения
        const newCenterOfRotation = { x: 43, y: -20 }; // Новая позиция центра вращения относительно текущей позиции тела

        // Обновляем позицию тела
        body.position.x += newCenterOfRotation.x;
        body.position.y += newCenterOfRotation.y;

        // Обновляем вершины тела
        body.vertices.forEach(vertex => {
            vertex.x -= newCenterOfRotation.x;
            vertex.y -= newCenterOfRotation.y;
        });

        // Обновляем центр массы
        body.centerOfMass.x = newCenterOfRotation.x;
        body.centerOfMass.y = newCenterOfRotation.y;

        console.log(body.centerOfMass.x);
        console.log(body.centerOfMass.y);


        if (this.barer) {

            // Создаём графику
            const graphics = this.scene.add.graphics();
            graphics.fillStyle(0x1E1E1E, 1);
            graphics.fillPoints(vertices_textur, true);
            graphics.fillStyle(0x1E1E1E, 0.5);
            //graphics.fillRect(0, 0, 700, 700);


            // Генерируем текстуру
            graphics.generateTexture('trampolineTexture', 700, 700);
            graphics.destroy();  // Очищаем Graphics после создания текстуры
            
            const sprite = this.scene.add.sprite(700, 700, 'trampolineTexture');
            this.scene.matter.add.gameObject(sprite).setExistingBody(body);


            // Добавляем `graphics` в физический мир
            //this.scene.matter.add.gameObject(graphics).setExistingBody(body); 

            // console.log(graphics);
            // console.log(body.position);
           

            // Обновляем позицию графики
            sprite.setOrigin(0.5, 0.5);
            sprite.setPosition(this.x, this.y);
              

            console.log(sprite);
            console.log(body.position);

             // (Опционально) Добавляем анимацию
            this.scene.tweens.add({
                targets: sprite,
                angle: -360,
                duration: 10000,
                repeat: -1
            });          

            // // Центр массы в локальных координатах (относительно тела)
            // const center = body.centerOfMass;

            // // Создаём графику и рисуем точку в центре массы
            // const graphics_my = this.scene.add.graphics();
            // graphics.fillStyle(0xff0000, 1); // Красный цвет
            // graphics.fillCircle(body.position.x + center.x, body.position.y + center.y, 5);
        }
    }

} 