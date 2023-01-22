//----------------------------------- START GAME SCREEN----------------------------------

var startGame = false;

// Start Screen Background
document.body.style.backgroundImage = "url('./images/space.gif')";
document.body.style.backgroundSize = 'cover';

// Create a title element
var startTitle = document.createElement("div");
startTitle.innerHTML = "Alien Invaders";
startTitle.setAttribute("id", "startTitle");

// Add the title to the body
document.body.appendChild(startTitle);

// Set the title style
startTitle.style.textAlign = "center";
startTitle.style.fontSize = "5em";
startTitle.style.fontWeight = "bold";
startTitle.style.color = "white";
startTitle.style.position = "absolute";
startTitle.style.top = "25%";
startTitle.style.left = "50%";
startTitle.style.transform = "translate(-50%, -50%)";
startTitle.style.textShadow = "0px 0px 10px red";
startTitle.style.marginBottom = "20px";

// Create start button
var startBtn = document.createElement('button');
startBtn.innerHTML = 'Start Game';
startBtn.setAttribute("id", "start-btn");

// Set button styles
startBtn.style.position = 'absolute';
startBtn.style.top = '50%';
startBtn.style.left = '50%';
startBtn.style.transform = 'translate(-50%, -50%)';
startBtn.style.backgroundColor = 'red';
startBtn.style.color = 'white';
startBtn.style.padding = '30px 60px';
startBtn.style.borderRadius = '40px';
startBtn.style.fontSize = '40px';
startBtn.style.textAlign = 'center';
startBtn.style.textDecoration = 'none';
startBtn.style.boxShadow = '0px 0px 20px red';
startBtn.style.transition = 'all 0.2s ease';

// Add event listener for hover effect
startBtn.addEventListener('mouseover', function () {
    startBtn.style.boxShadow = '0px 0px 20px white';
});

// Add event listener to return button to normal state
startBtn.addEventListener('mouseout', function () {
    startBtn.style.boxShadow = '0px 0px 10px red';
});


// Add start button to the body
document.body.appendChild(startBtn);


startBtn.addEventListener('click', function () {

    // Start game code here
    startBtn.style.display = 'none';
    startTitle.style.display = "none";

    var backgroundMusic = new Audio('./sounds/music.mp3');
    backgroundMusic.play();
    backgroundMusic.loop = true;

    function createMusicButton() {
        // Create button element
        var musicBtn = document.createElement("button");
        musicBtn.style.backgroundColor = "red";
        musicBtn.style.position = "absolute";
        musicBtn.style.top = "10px";
        musicBtn.style.right = "10px";
        musicBtn.style.boxShadow = "0 0 10px red";
        musicBtn.style.transition = "box-shadow 0.3s";
        musicBtn.style.width = "120px";
        musicBtn.style.height = "60px";
        musicBtn.style.borderRadius = '40px';
        musicBtn.style.zIndex = '1';
        musicBtn.style.color = 'white';
        musicBtn.style.fontSize = '15px';

        // Add hover effect
        musicBtn.addEventListener("mouseover", function () {
            musicBtn.style.boxShadow = "0 0 20px white";
        });
        musicBtn.addEventListener("mouseout", function () {
            musicBtn.style.boxShadow = "0 0 10px red";
        });


        // Add event listener to the document to check for key presses
        document.addEventListener('keydown', function (event) {
            if (event.code === 'Space') {
                event.preventDefault();
                // Code to fire laser
                // ...
            } else if (event.code === 'KeyP') {
                // Code to pause or unpause the music
                if (backgroundMusic.paused) {
                    backgroundMusic.play();
                    musicBtn.innerHTML = "Pause";
                } else {
                    backgroundMusic.pause();
                    musicBtn.innerHTML = "Play";
                }
                musicBtn.innerHTML += " Music"
            }
        });


        // Add event listener to button
        musicBtn.addEventListener("click", function () {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicBtn.innerHTML = "Pause";
            } else {
                backgroundMusic.pause();
                musicBtn.innerHTML = "Play";
            }
            musicBtn.innerHTML += " Music"
        });

        // Set initial button text
        musicBtn.innerHTML = "Pause Music";

        // Append button to body
        document.body.appendChild(musicBtn);
    }

    createMusicButton();

    //-----------------------------------------GAME----------------------------------
    //game background image
    var background = document.createElement('img');
    background.src = './images/space.gif';
    background.style.position = 'absolute';
    background.style.top = '0';
    background.style.left = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.zIndex = '-1';
    document.body.appendChild(background);

    // player image
    var player = document.createElement('img');
    player.src = './images/player-img.png';
    player.style.position = 'fixed';
    player.style.top = '50%';
    player.style.left = '50%';
    player.style.transform = 'translate(-50%, -50%)'
    player.style.zIndex = '1';
    player.style.width = '8%';
    player.style.top = '95%'
    document.body.appendChild(player);
    player.style.backgroundColor = 'none';
    player.style.filter = "drop-shadow(0 0 5px white)";

    //moving player left and right
    document.addEventListener('mousemove', function (event) {
        var left = event.clientX - player.offsetWidth / 2;
        var right = event.clientX + player.offsetWidth / 2;
        if (left < 0) {
            player.style.left = player.offsetWidth / 2 + 'px';;
        } else if (right > window.innerWidth) {
            player.style.left = background.offsetWidth - player.offsetWidth / 2 + 'px';
        } else {
            player.style.left = left + 'px';
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            event.preventDefault();
            //laser firing with space bar
            var laser = document.createElement('img');
            laser.src = './images/lasers-img.png';
            laser.style.position = 'fixed';
            laser.style.left = player.offsetLeft + player.offsetWidth / 2 - laser.offsetWidth / 2 - player.width / 2 + 'px';
            laser.style.top = player.offsetTop + 'px';
            document.body.appendChild(laser);
            player.style.opacity = "0.8";
            player.style.filter = "drop-shadow(0 0 5px red)";
            var firing = new Audio('./sounds/laser.mp3');
            firing.play();
            var laserInterval = setInterval(function () {
                laser.style.top = laser.offsetTop - 10 + 'px';
                if (laser.offsetTop < 0) {
                    //player.style.background = "none";
                    player.style.opacity = '1';
                    player.style.filter = "drop-shadow(0 0 5px white)";
                    clearInterval(laserInterval);
                    document.body.removeChild(laser);
                }
            }, 10);
        }
    });

    var enemyInterval = setInterval(function () {
        var enemy = document.createElement('img');
        enemy.src = './images/enemy-img.png';
        enemy.style.position = 'fixed ';
        enemy.style.width = '14%'
        enemy.style.left = (Math.random() * (window.innerWidth - enemy.offsetWidth)) + 'px ';
        enemy.style.top = '0 ';
        enemy.style.filter = "drop-shadow(0 0 5px white)";
        document.body.appendChild(enemy);
        var enemyInterval = setInterval(function () {
            enemy.style.top = enemy.offsetTop + 1 + 'px';
            if (enemy.offsetTop > window.innerHeight) {
                clearInterval(enemyInterval);
                document.body.removeChild(enemy);
            }
        }, 10);
    }, 1000);

    //scoring
    var score = 0;
    var scoreElement = document.createElement('div');
    scoreElement.style.position = 'absolute';
    scoreElement.style.top = '0';
    scoreElement.style.left = '0';
    scoreElement.style.color = 'white';
    scoreElement.style.fontSize = '40px';
    scoreElement.innerHTML = 'Score: ' + 0;
    document.body.appendChild(scoreElement);
    var laserInterval = setInterval(function () {
        var lasers = document.querySelectorAll('img[src="./images/lasers-img.png"]');
        var enemies = document.querySelectorAll('img[src="./images/enemy-img.png"]');
        for (var i = 0; i < lasers.length; i++) {
            for (var j = 0; j < enemies.length; j++) {
                if (isCollision(lasers[i], enemies[j])) {
                    document.body.removeChild(lasers[i]);
                    document.body.removeChild(enemies[j]);
                    var destroy = new Audio('./sounds/destroy.mp3');
                    destroy.play();
                    player.style.opacity = '1';
                    player.style.filter = "drop-shadow(0 0 5px white)";
                    score++;
                    scoreElement.innerHTML = 'Score: ' + score;
                }
            }
        }
    }, 10);

    //collisions
    function isCollision(a, b) {
        var aRect = a.getBoundingClientRect();
        var bRect = b.getBoundingClientRect();
        return !(
            aRect.top + aRect.height < bRect.top ||
            aRect.top > bRect.top + bRect.height ||
            aRect.left + aRect.width < bRect.left ||
            aRect.left > bRect.left + bRect.width
        );
    }

});