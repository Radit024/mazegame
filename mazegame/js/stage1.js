const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const jumpscareDiv = document.getElementById('jumpscare');
const collideSound = document.getElementById('collideSound');
let gameOver = false;
let goalReached = false; 
let clickCount = 0; 

const player = {
    x: 100,
    y: 100,
    size: 10,
    speed: 5,
    dx: 0,
    dy: 0
};

const walls = [
    { x: 50, y: 50, width: 700, height: 10 },
    { x: 50, y: 50, width: 10, height: 500 },
    { x: 740, y: 50, width: 10, height: 500 },
    { x: 50, y: 540, width: 700, height: 10 },
    { x: 150, y: 100, width: 10, height: 400 },
    { x: 250, y: 50, width: 10, height: 400 },
    { x: 350, y: 150, width: 10, height: 400 }
];

const goal = {
    x: 700,
    y: 500,
    size: 20
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    for (let wall of walls) {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }
    
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    ctx.fillStyle = 'green';
    ctx.fillRect(goal.x, goal.y, goal.size, goal.size);
}

function randomizeSpeed() {
    const speed = player.speed * (0.25 + Math.random() * 0.25);
    const offsetX = (Math.random() - 0.5) * 2; 
    const offsetY = (Math.random() - 0.5) * 2; 
    return { speed, offsetX, offsetY };
}

function applyMomentum() {
    player.x += player.dx;
    player.y += player.dy;
    player.dx *= 0.9; 
    player.dy *= 0.9; 
}

function update() {
    applyMomentum();
    checkCollision();
    checkGoal();
    draw();
}

function checkCollision() {
    for (let wall of walls) {
        if (player.x < wall.x + wall.width &&
            player.x + player.size > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.size > wall.y) {
            player.dx = 0; 
            player.dy = 0; 
            collideSound.play().catch(function(error) {
                console.error('Error playing collision sound:', error);
            });
            triggerJumpscare();
            gameOver = true; 
            break; 
        }
    }
}

function checkGoal() {
    if (!goalReached && player.x < goal.x + goal.size &&
        player.x + player.size > goal.x &&
        player.y < goal.y + goal.size &&
        player.y + player.size > goal.y) {
        goalReached = true; 
        alert("You Win! Proceeding to Stage 2.");
        window.location.href = "stage2.html"; 
    }
}

function triggerJumpscare() {
    gameOver = true;
    jumpscareDiv.classList.remove('hidden');
    var video = document.getElementById('video');
    if (video) {
        video.loop = true; 
        video.oncanplay = function() {
            video.play().catch(function(error) {
                console.error('Error playing video:', error);
            });
        };
        video.onerror = function() {
            console.error('Error loading video');
        };
        if (video.readyState >= 3) {
            video.play().catch(function(error) {
                console.error('Error playing video:', error);
            });
        } else {
            video.load(); 
        }
    } else {
        console.error('Video element not found');
    }
}

function handleKeydown(e) {
    if (gameOver) return; 
    const { speed, offsetX, offsetY } = randomizeSpeed();
    switch (e.key) {
        case "ArrowUp": case "w": case "W": 
            player.dy = -speed + offsetY; 
            player.dx = offsetX; 
            break;
        case "ArrowDown": case "s": case "S": 
            player.dy = speed + offsetY; 
            player.dx = offsetX; 
            break;
        case "ArrowLeft": case "a": case "A": 
            player.dx = -speed + offsetX; 
            player.dy = offsetY; 
            break;
        case "ArrowRight": case "d": case "D": 
            player.dx = speed + offsetX; 
            player.dy = offsetY; 
            break;
        case "Escape":
            window.location.href = "index.html"; // Go back to menu
            break;
    }
    update();
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= player.x && x <= player.x + player.size &&
        y >= player.y && y <= player.y + player.size) {
        clickCount++;
        if (clickCount >= 15) {
            alert("You Win! Proceeding to Stage 2.");
            window.location.href = "stage2.html"; 
        }
    }
});

window.addEventListener("keydown", handleKeydown);

function gameLoop() {
    if (!gameOver) {
        update();
        requestAnimationFrame(gameLoop);
    }
}

requestAnimationFrame(gameLoop);