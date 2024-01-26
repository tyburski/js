const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const addButton = document.getElementById('addButton');
const performanceContainer = document.getElementById('performance');
const divCount = document.getElementById('count');

let frameCount = 0;
let startTime;
let started = false;

let balls = [];

const minDistance = 120;
const ballRadius = 20; 

divCount.textContent = `Ilość kulek: 0`;

function updatePerformance() {
    frameCount++;

    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime >= 1000) {
        const fps = (frameCount / elapsedTime) * 1000;
        performanceContainer.textContent = `FPS: ${fps.toFixed(2)}`;

        frameCount = 0;
        startTime = currentTime;
    }

    requestAnimationFrame(updatePerformance);
}
startTime = performance.now();
    updatePerformance();


function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function initializeBalls() {
    balls = [];
    for (let i = 0; i < Math.floor(Math.random() * 20) + 5; i++) {
        const r = Math.floor(Math.random() * 15) + 5;
        const v = 10 * 1/r ;
        balls.push({
            x: getRandomNumber(ballRadius, canvas.width - ballRadius),
            y: getRandomNumber(ballRadius, canvas.height - ballRadius),
            radius:r,
            vx: v,
            vy: v,            
        });
    }
    
   
}

function drawBall(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawLine(ball1, ball2) {
    ctx.beginPath();
    ctx.moveTo(ball1.x, ball1.y);
    ctx.lineTo(ball2.x, ball2.y);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}

function detectCollision(ball1, ball2) {
    const distance = Math.sqrt((ball1.x - ball2.x) ** 2 + (ball1.y - ball2.y) ** 2);
    return distance < minDistance;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ballRadius < 0 || ball.x + ballRadius > canvas.width) {
            ball.vx = -ball.vx;
        }
        if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
            ball.vy = -ball.vy;
        }

        drawBall(ball.x, ball.y, ball.radius);

        for (let j = i + 1; j < balls.length; j++) {
            const otherBall = balls[j];
            if (detectCollision(ball, otherBall)) {
                drawLine(ball, otherBall);
            }
        }
    }

    requestAnimationFrame(update);
}
addButton.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        const r = Math.floor(Math.random() * 15) + 5;
        const v = 10 * 1/r ;
        balls.push({
            x: getRandomNumber(ballRadius, canvas.width - ballRadius),
            y: getRandomNumber(ballRadius, canvas.height - ballRadius),
            radius:r,
            vx: v,
            vy: v,            
        });
    }
    divCount.textContent = `Ilość kulek: ${balls.length}`
});
startButton.addEventListener('click', () => {
    if(!started)
    {
        initializeBalls();
        update();
        started = true;
    }
    else{
        balls.length = 0;
        started = false;
    }
    divCount.textContent = `Ilość kulek: ${balls.length}`
    
});

resetButton.addEventListener('click', () => {
    if(started)
    {
        initializeBalls();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        divCount.textContent = `Ilość kulek: ${balls.length}`
    }
    
});

