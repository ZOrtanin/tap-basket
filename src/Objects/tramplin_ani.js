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

        for (let i = 0; i <= steps; i++) {
            let angle = gapAngle + (Math.PI * 2 - 2 * gapAngle) * (i / steps);
            vertices.push({ x: cx + Math.cos(angle) * outerRadius, y: cy + Math.sin(angle) * outerRadius });
        }
        for (let i = steps; i >= 0; i--) {
            let angle = gapAngle + (Math.PI * 2 - 2 * gapAngle) * (i / steps);
            vertices.push({ x: cx + Math.cos(angle) * innerRadius, y: cy + Math.sin(angle) * innerRadius });
        }

        // Создаём тело кольца
        const ring = this.scene.matter.add.fromVertices(cx, cy, vertices, { 
            isStatic: false, // Делаем подвижным
            frictionAir: 0.9, // Лёгкое трение, чтобы замедляться со временем
            density: 0.9,
            mass:3000000,
        });

        // Фиксируем ось в центре
        const pivot = this.scene.matter.add.circle(cx, cy, 5, { isStatic: true });
        // const constraint = this.scene.matter.add.constraint(pivot, ring,50, 1, {
        //     pointA: { x: 10, y: 10 }, // Смещаем точку привязки на pivot
        //     pointB: { x: 0, y: 0 }, // Смещаем точку привязки на ring
        //     damping: 0, // Дополнительное демпфирование (гашение колебаний)
        // });     
        this.scene.matter.add.constraint(pivot, ring, 0, 1,{
            //pointA: { x:50, y: 0 }, // Смещение точки привязки на правый край платформы
            pointB: { x: 10, y: 30 },
            damping: 0.9 
            // stiffness:1
        });
        this.scene.matter.add.constraint(pivot, ring, 0, 1,{
            //pointA: { x:50, y: 0 }, // Смещение точки привязки на правый край платформы
            pointB: { x: -10, y: -30 },
            damping: 0.9 
            // stiffness:1
        });
        //ring.setAngularDamping(0.2);
        //this.scene.matter.add.constraint(pivot, ring, 50, 1, { pointA: { x: -50, y: 0 } });
        // this.scene.matter.add.constraint(pivot, ring, 50, 1, { pointB: { x: 20, y: 0 } });
  

        //this.scene.matter.body.setAngularVelocity(ring, 0.05); // Вращаем тело с постоянной скоростью

        // this.scene.tweens.add({
        //     targets: ring,
        //     angle: -360,
        //     duration: 50000,
        //     repeat: -1
        // });
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