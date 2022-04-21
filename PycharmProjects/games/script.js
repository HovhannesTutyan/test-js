const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const scoreEl = document.querySelector("#scoreEl");
const startGame = document.querySelector("#startGameEl");
const modalEl = document.querySelector("#modalEl");
const bigScore = document.querySelector("#bigScoreEl");

canvas.width = innerWidth;
canvas.height = innerHeight

class Player{
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const friction = 0.99
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1 // to fade the particles
    }
    draw(){
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01;
    }
}

const x = canvas.width / 2
const y = canvas.height / 2

let player = new Player(x, y, 10, 'white');
let projectiles = []
let enemies = []
let particles = []

//const projectile1 = new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", {x:1, y:1})
//const projectile2 = new Projectile(canvas.width / 2, canvas.height / 2, 5, "green", {x:-1, y:-1})
//const projectiles = [projectile1, projectile2]



function init(){
    player = new Player(x, y, 10, 'white');
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEl.innerHTML = score;
    bigScore.innerHTML = score;
}

function spawnEnemies(){
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4; // get random numbers from 4 to 30

        let x
        let y

        if (Math.random() < 0.5) { // set enemies distance from player
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
}

let animationId;
let score = 0;
function animate(){
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,.1)';
    c.fillRect(0, 0, canvas.width, canvas.height) // clearRect gives white background
    particles.forEach((particle, index) =>{
        if(particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update();
        }
    })
    player.draw()
    projectiles.forEach((projectile, index)=>{
        projectile.update();
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height){ // remove projectiles from array if they are out of screen
            setTimeout(()=>{
                projectiles.splice(index, 1);
            },0)
        }
    })
    enemies.forEach((enemy, index)=>{
        enemy.update()
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animationId)
            modalEl.style.display = "flex";
            bigScore.innerHTML = score
        }
        projectiles.forEach((projectile, projectileIndex) => { // delete the enemy if hit by projectile
           const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
           if(dist - enemy.radius - projectile.radius < 1){
                for (let i=0; i<enemy.radius; i++){ // create particles when projectile hits the enemy
                    particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color,
                    {x: (Math.random() - 0.5) * (Math.random() * 8), y: (Math.random() - 0.5) * (Math.random() * 8)})) // create more powerful explosion
                }
                if (enemy.radius - 10 > 5) { // not to allow too small enemies

                    score += 100; // increase the score with 100 if enemy is shrinking
                    scoreEl.innerHTML = score;

                    gsap.to(enemy, {radius: enemy.radius - 10}); // give shrinking to smaller size animation
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                } else {
                        score += 250; // increase the score with 250 if enemy is removed by one shot
                        scoreEl.innerHTML = score;
                        setTimeout(() => {
                        enemies.splice(index, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                }
           }
        });
    })
}

window.addEventListener('click', (event)=>{
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity))
})
startGame.addEventListener("click", function(){
    init();
    animate();
    spawnEnemies();
    modalEl.style.display = "none";
})
