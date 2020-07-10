
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];

var ground;

function setup() {
        Events = Matter.Events,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Vector = Matter.Vector;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1300,
            height: 800,
            wireframes: false,
            background: '#0f0f13'
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var group = Body.nextGroup(true),
        length = 150,
        width = 14;
        
    var pendulum1 = Composites.stack(150, 230, 6, 1, -10, 10, function(x, y) {
        return Bodies.rectangle(x, y, length, width, { 
            collisionFilter: { group: group },
            frictionAir: 0,
            chamfer: 5,
            render: {
                fillStyle: 'transparent',
                lineWidth: 1
            }
        });
    });

    pendulum1.bodies[0].render.strokeStyle = '#4a485b';
    pendulum1.bodies[1].render.strokeStyle = '#4a485b';
    pendulum1.bodies[2].render.strokeStyle = '#4a485b';
    pendulum1.bodies[3].render.strokeStyle = '#4a485b';
    pendulum1.bodies[4].render.strokeStyle = '#4a485b';
    pendulum1.bodies[5].render.strokeStyle = '#4a485b';
    world.gravity.scale = 0.001;
    
    Composites.chain(pendulum1, 0.45, 0, -0.45, 0, { 
        stiffness: 0.9, 
        length: 0,
        angularStiffness: 0.3,
        render: {
            strokeStyle: '#4a485b'
        }
    });

    
    Composite.add(pendulum1, Constraint.create({ 
        // bodyA: pendulum1.bodies[3],
        bodyB: pendulum1.bodies[2],
        pointB: { x: length * 0.42, y: 0},
        pointA: { x: pendulum1.bodies[1].position.x - length * 0.42, y: pendulum1.bodies[1].position.y },
        stiffness: 0.9,
        length: 0,
        render: {
            strokeStyle: '#4a485b'
        }
    }));




    var lowerArm1 = pendulum1.bodies[0];
    var lowerArm2 = pendulum1.bodies[5];
    var lowerArm3 = pendulum1.bodies[2];
    var lowerArm4 = pendulum1.bodies[3];

    Body.rotate(lowerArm1, -Math.PI * 0.3, {
        x: lowerArm1.position.x - 100,
        y: lowerArm1.position.y
    });

    Body.rotate(lowerArm2, -Math.PI * 0.3, {
        x: lowerArm2.position.x - 100,
        y: lowerArm2.position.y
    });

       Body.rotate(lowerArm3, -Math.PI * 0.3, {
        x: lowerArm3.position.x - 100,
        y: lowerArm3.position.y
    });
          Body.rotate(lowerArm4, -Math.PI * 0.3, {
        x: lowerArm4.position.x - 100,
        y: lowerArm4.position.y
    });
    
    World.add(world, pendulum1);

    var trail = [];

    Events.on(render, 'afterRender', function() {
        trail.unshift({
            position: Vector.clone(lowerArm1.position),
            speed: lowerArm1.speed
        });

        Render.startViewTransform(render);
        render.context.globalAlpha = 0.7;

        for (var i = 0; i < trail.length; i += 1) {
            var point = trail[i].position,
                speed = trail[i].speed;
            
            var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
            render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
            render.context.fillRect(point.x, point.y, 2, 2);
        }

        render.context.globalAlpha = 1;
        Render.endViewTransform(render);

        if (trail.length > 3000) {
            trail.pop();
        }
    });
    Events.on(render, 'afterRender', function() {
        trail.unshift({
            position: Vector.clone(lowerArm2.position),
            speed: lowerArm2.speed
        });

        Render.startViewTransform(render);
        render.context.globalAlpha = 0.7;

        for (var i = 0; i < trail.length; i += 1) {
            var point = trail[i].position,
                speed = trail[i].speed;
            
            var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
            render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
            render.context.fillRect(point.x, point.y, 2, 2);
        }

        render.context.globalAlpha = 1;
        Render.endViewTransform(render);

        if (trail.length > 3000) {
            trail.pop();
        }
    });


    Events.on(render, 'afterRender', function() {
        trail.unshift({
            position: Vector.clone(lowerArm3.position),
            speed: lowerArm3.speed
        });

        Render.startViewTransform(render);
        render.context.globalAlpha = 0.7;

        for (var i = 0; i < trail.length; i += 1) {
            var point = trail[i].position,
                speed = trail[i].speed;
            
            var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
            render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
            render.context.fillRect(point.x, point.y, 2, 2);
        }

        render.context.globalAlpha = 1;
        Render.endViewTransform(render);

        if (trail.length > 3000) {
            trail.pop();
        }
    });
    Events.on(render, 'afterRender', function() {
        trail.unshift({
            position: Vector.clone(lowerArm4.position),
            speed: lowerArm4.speed
        });

        Render.startViewTransform(render);
        render.context.globalAlpha = 0.7;

        for (var i = 0; i < trail.length; i += 1) {
            var point = trail[i].position,
                speed = trail[i].speed;
            
            var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
            render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
            render.context.fillRect(point.x, point.y, 2, 2);
        }

        render.context.globalAlpha = 1;
        Render.endViewTransform(render);

        if (trail.length > 3000) {
            trail.pop();
        }
    });
    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 700, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
}