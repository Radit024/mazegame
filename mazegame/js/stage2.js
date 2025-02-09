const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const jumpscareDiv = document.getElementById('jumpscare');
const collideSound = document.getElementById('collideSound');
let gameOver = false;
let goalReached = false; // Add a flag to track if the goal is reached
let clickCount = 0; // Add a counter for player clicks

// Game objects
const player = {
    x: 100,
    y: 100,
    size: 10,
    speed: 5,
    dx: 0,
    dy: 0
};

const walls = [
    // Outer walls
    { x: 50, y: 50, width: 700, height: 10 },    // Top
    { x: 50, y: 50, width: 10, height: 500 },    // Left
    { x: 740, y: 50, width: 10, height: 500 },   // Right
    { x: 50, y: 540, width: 700, height: 10 },   // Bottom
    
    // New maze walls for Stage 2
    { x: 150, y: 100, width: 10, height: 400 },
    { x: 250, y: 50, width: 10, height: 400 },
    { x: 350, y: 150, width: 10, height: 400 },
    { x: 450, y: 300, width: 10, height: 200 }, // New wall
    { x: 600, y: 100, width: 10, height: 400 }  // New wall
];

const goal = {
    x: 700,
    y: 500,
    size: 20
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw walls
    ctx.fillStyle = 'white';
    for (let wall of walls) {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }
    
    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    // Draw goal
    ctx.fillStyle = 'green';
    ctx.fillRect(goal.x, goal.y, goal.size, goal.size);
}

function randomizeSpeed() {
    const speed = player.speed * (0.25 + Math.random() * 0.25);
    const offsetX = (Math.random() - 0.5) * 2; // Random offset between -1 and 1 for x-axis
    const offsetY = (Math.random() - 0.5) * 2; // Random offset between -1 and 1 for y-axis
    return { speed, offsetX, offsetY };
}

function applyMomentum() {
    player.x += player.dx;
    player.y += player.dy;
    player.dx *= 0.9; // Reduce momentum over time
    player.dy *= 0.9; // Reduce momentum over time
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
            console.log(`Collision detected! Player: (${player.x}, ${player.y}, ${player.size}), Wall: (${wall.x}, ${wall.y}, ${wall.width}, ${wall.height})`);
            player.dx = 0; // Freeze player
            player.dy = 0; // Freeze player
            collideSound.play(); // Play collision sound
            triggerJumpscare();
            gameOver = true; // Set game over flag
            break; // Stop checking after the first collision
        }
    }
}

function checkGoal() {
    if (!goalReached && player.x < goal.x + goal.size &&
        player.x + player.size > goal.x &&
        player.y < goal.y + goal.size &&
        player.y + player.size > goal.y) {
        goalReached = true; // Set the flag to true
        alert("You Win! Proceeding to Stage 3...");
        window.location.href = "stage3.html"; // Redirect to Stage 3
    }
}

function triggerJumpscare() {
    gameOver = true;
    jumpscareDiv.style.display = "flex";
    var video = document.getElementById('video');
    if (video) {
        video.loop = true; // Set the video to loop indefinitely
        video.oncanplay = function() {
            video.play().catch(function(error) {
                console.error('Error playing video:', error);
            });
        };
        video.onerror = function() {
            console.error('Error loading video');
        };
        if (video.readyState >= 3) { // Check if the video is already loaded
            video.play().catch(function(error) {
                console.error('Error playing video:', error);
            });
        } else {
            video.load(); // Ensure the video is loaded before playing
        }
    } else {
        console.error('Video element not found');
    }
}

function handleKeydown(e) {
    if (gameOver) return; // Prevent input if game is over
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
        console.log(`Player clicked ${clickCount} times`);
        if (clickCount >= 15) {
            alert("You Win! Proceeding to Stage 3...");
            window.location.href = "stage3.html"; // Redirect to Stage 3
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

// Initialize game
requestAnimationFrame(gameLoop);