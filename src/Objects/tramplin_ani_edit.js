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

    addTramplin(){
        const vertices = [];
        const steps = 40; // Количество сегментов
        const outerRadius = 300;
        const innerRadius = 290;
        const cx = 500, cy = 400;
        //const cx = 541, cy = 786;
        const gapAngle = Math.PI / 8; // Угол разрыва (например, 45 градусов)
        const gapSize = 3;

        const segments = [];
        const constraints = [];

        for (let i = 0; i <= steps; i++) {
            let angle = (Math.PI * 2) * (i / steps);
            let x = cx + Math.cos(angle) * outerRadius;
            let y = cy + Math.sin(angle) * outerRadius;
            
            // Пропускаем часть сегментов для разрыва
            if (i > steps / 2 - gapSize && i < steps / 2 + gapSize) continue;

            // Создаём сегмент
            let segment = this.scene.matter.add.circle(x, y, 5, { 
                isStatic: false,
                friction: 0.05,
                density: 0.1
            });

            segments.push(segment);

            // Связываем сегменты друг с другом
            if (segments.length > 1) {
                let constraint = this.scene.matter.add.constraint(segments[segments.length - 2], segment, 10, 1, {
                    stiffness: 0.9
                });
                constraints.push(constraint);
            }
        }

        // Связываем последний сегмент с первым, если нужно **(без разрыва убрать этот шаг)**
        if (!gapSize) {
            let constraint = this.scene.matter.add.constraint(segments[segments.length - 1], segments[0], 10, 1, {
                stiffness: 0.9
            });
            constraints.push(constraint);
        }

        // ====================
        //  ВИЗУАЛИЗАЦИЯ
        // ====================
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(4, 0xFFFFFF, 1);
        for (let i = 0; i < segments.length - 1; i++) {
            graphics.strokeLineShape(new Phaser.Geom.Line(
                segments[i].position.x, segments[i].position.y,
                segments[i + 1].position.x, segments[i + 1].position.y
            ));
        }

        // ====================
        //  АНМИМАЦИЯ ВРАЩЕНИЯ
        // ====================
        this.scene.matter.world.on('afterUpdate', () => {
            for (let segment of segments) {
                segment.force.x += Math.sin(segment.position.y * 0.01) * 0.001;
            }
        });

        
    }

   // Функция для создания объеектов в виде окружности
    old_addTramplin() {
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

        let vertices_new = vertices.map(v => ({ x: v.x - offsetX-500, y: v.y - offsetY  }));
        let vertices_textur = vertices.map(v => ({ x: v.x - offsetX+350, y: v.y - offsetY+350  }));

        // Устанавливаем новую позицию центра вращения
        const newCenterOfRotation = { x: 0, y: 0 }; // Новая позиция центра вращения относительно текущей позиции тела

        vertices_new.forEach(vertex => {
                vertex.x -= newCenterOfRotation.x;
                vertex.y -= newCenterOfRotation.y;
            });

        // Создаём физическое тело
        const body = this.scene.matter.add.fromVertices(this.x, this.y, vertices_new, {
            friction: 1,
            restitution: 0.5,
            density: 0.9,
            //isStatic: true,
            //angle: Phaser.Math.DegToRad(-45)
        }, true);

        // Создаём графику
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0x1E1E1E, 1);
        graphics.fillPoints(vertices_textur, true);
        graphics.fillStyle(0x1E1E1E, 0.5);
        graphics.fillRect(0, 0, 700, 700);


        // Генерируем текстуру
        graphics.generateTexture('trampolineTexture', 700, 700);
        graphics.destroy();  // Очищаем Graphics после создания текстуры

        
        

        console.log(body.centerOfMass.x);
        console.log(body.centerOfMass.y);


        if (this.barer) {

            
            
            const sprite = this.scene.add.sprite(700, 700, 'trampolineTexture');
            //this.scene.matter.add.gameObject(sprite).setExistingBody(body);
            
            // Обновляем позицию графики
            sprite.setOrigin(0.5, 0.5);
            sprite.setPosition(this.x, this.y);

            //this.scene.matter.add.gameObject(sprite, body);
              

            console.log(sprite);
            console.log(body.position);

             // (Опционально) Добавляем анимацию
            // this.scene.tweens.add({
            //     targets: sprite,
            //     angle: -360,
            //     duration: 10000,
            //     repeat: -1
            // });          

            // // Центр массы в локальных координатах (относительно тела)
            // const center = body.centerOfMass;

            // // Создаём графику и рисуем точку в центре массы
            // const graphics_my = this.scene.add.graphics();
            // graphics.fillStyle(0xff0000, 1); // Красный цвет
            // graphics.fillCircle(body.position.x + center.x, body.position.y + center.y, 5);
        }
    }

} 