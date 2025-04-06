const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 100,
    y: 500,
    width: 50,
    height: 50,
    speed: 5,
    velocityY: 0,
    gravity: 1,
    jumping: false,
    moveLeft: false,
    moveRight: false
};

let platforms = [
    {x: 0, y: 550, width: 800, height: 50}, // Ground platform
    {x: 200, y: 400, width: 200, height: 20}, // Floating platform
    {x: 500, y: 300, width: 200, height: 20}, // Floating platform
];

let chests = [
    {x: 150, y: 470, width: 40, height: 40, linkedWebsite: "projects.html"},
    {x: 400, y: 270, width: 40, height: 40, linkedWebsite: "education.html"},
    {x: 650, y: 170, width: 40, height: 40, linkedWebsite: "job-experience.html"},
];

// Draw player (red square)
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw platforms (green squares)
function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

// Draw chests (gold squares)
function drawChests() {
    ctx.fillStyle = 'gold';
    chests.forEach(chest => {
        ctx.fillRect(chest.x, chest.y, chest.width, chest.height);
    });
}

// Check collisions between the player and platforms
function checkCollisions() {
    let isOnPlatform = false;  // Flag to check if the player is on a platform

    platforms.forEach(platform => {
        // Check if the player is falling and hits the platform from above
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height <= platform.y + player.velocityY &&  // Player is below the platform's top edge
            player.y + player.height + player.velocityY >= platform.y) { // Player is falling onto the platform

            // Stop falling and place the player on top of the platform
            player.velocityY = 0;   // Stop the downward velocity (gravity)
            player.jumping = false; // Player is no longer jumping
            player.y = platform.y - player.height;  // Position the player on top of the platform

            isOnPlatform = true;  // Set flag to indicate that the player is on the platform
        }
    });

    // If the player isn't on any platform, gravity continues to apply
    if (!isOnPlatform) {
        player.jumping = true; // Player is in the air, so they're jumping
    }
}


// Check for chest interactions (redirect to portfolio page)
function checkChestInteractions() {
    chests.forEach(chest => {
        if (player.x < chest.x + chest.width &&
            player.x + player.width > chest.x &&
            player.y + player.height <= chest.y + chest.height &&
            player.y + player.height + player.velocityY >= chest.y) {
            window.location.href = chest.linkedWebsite;  // Redirect to portfolio page
        }
    });
}

// Update player movement based on input
function updatePlayerMovement() {
    if (player.moveLeft) {
        player.x -= player.speed;
    }
    if (player.moveRight) {
        player.x += player.speed;
    }

    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Prevent player from falling off the screen
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
    }
}

// Handle key press events
function handleKeyPress(event) {
    if (event.code === 'ArrowLeft') {
        player.moveLeft = true;
    }
    if (event.code === 'ArrowRight') {
        player.moveRight = true;
    }
    if (event.code === 'Space' && !player.jumping) {
        player.velocityY = -22;  // Jump force
        player.jumping = true;
    }
}

// Handle key release events
function handleKeyRelease(event) {
    if (event.code === 'ArrowLeft') {
        player.moveLeft = false;
    }
    if (event.code === 'ArrowRight') {
        player.moveRight = false;
    }
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update game state
    updatePlayerMovement();
    checkCollisions();
    checkChestInteractions();

    // Draw everything
    drawPlatforms();
    drawChests();
    drawPlayer();

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Add event listeners for keypress and key release
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyRelease);

// Start the game loop
gameLoop();
