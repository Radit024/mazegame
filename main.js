const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const jumpscareDiv = document.getElementById('jumpscare');
const screamSound = new Audio('asset/scream.mp3');
let gameOver = false;

// Game objects
const player = {
    x: 100,
    y: 100,
    size: 10,
    speed: 5 //add randomizer interval 1 second (1000 ms)
};

const walls = [
    // Outer walls
    { x: 50, y: 50, width: 700, height: 10 },    // Top
    { x: 50, y: 50, width: 10, height: 500 },    // Left
    { x: 740, y: 50, width: 10, height: 500 },   // Right
    { x: 50, y: 540, width: 700, height: 10 },   // Bottom
    
    // Maze walls
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

function update() {
    draw();
}

function checkCollision() {
    for (let wall of walls) {
        if (player.x < wall.x + wall.width &&
            player.x + player.size > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.size > wall.y) {
            triggerJumpscare();
        }
    }
}

function checkGoal() {
    if (player.x < goal.x + goal.size &&
        player.x + player.size > goal.x &&
        player.y < goal.y + goal.size &&
        player.y + player.size > goal.y) {
        alert("You Win!");
        location.reload();
    }
}

function triggerJumpscare() {
    gameOver = true;
    jumpscareDiv.style.display = "flex";
    screamSound.play();
    const video = document.getElementById('buzzlightyear');
    video.play();
    setTimeout(() => {
        jumpscareDiv.style.display = "none";
        location.reload();
    }, 5000);
}

window.addEventListener("keydown", (e) => {
    if (gameOver) return;
    switch (e.key) {
        case "ArrowUp": player.y -= player.speed; break;
        case "ArrowDown": player.y += player.speed; break;
        case "ArrowLeft": player.x -= player.speed; break;
        case "ArrowRight": player.x += player.speed; break;
    }
    checkCollision();
    checkGoal();
    update();
});

// Initialize game
update();