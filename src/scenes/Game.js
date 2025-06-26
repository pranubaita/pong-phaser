import { Scene } from 'phaser';

const WIDTH = 1368;
const HEIGHT = 768;

export class Game extends Scene {
    constructor() {
        super('Game');
        this.ball = null;
        this.left_paddle = null;
        this.right_paddle = null;
        this.ballInMotion = false;
        this.udlr = null;
        this.wasd = null;
        this.leftScore = 0;
        this.rightScore = 0;
        this.leftScoreText = null;
        this.rightScoreText = null;
        this.speed = 500;
        this.paddle_speed = 5;
    }

    preload() {
        this.load.image('ball', 'assets/ball.png')
        this.load.image('paddle', 'assets/paddle.png')
    }

    create() {
        //this.ball = this.add.image(WIDTH/2, HEIGHT/2, 'ball').setScale(0.05,0.05);
        this.left_paddle = this.physics.add.image(WIDTH*(5/100), HEIGHT/2, 'paddle').setScale(0.5,0.5);
        this.right_paddle = this.physics.add.image(WIDTH*(95/100), HEIGHT/2, 'paddle').setScale(0.5,0.5);

        //physics
        this.ball = this.physics.add.image(WIDTH/2, HEIGHT/2, 'ball').setScale(0.05, 0.05).refreshBody();
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);
        this.physics.add.collider(this.ball, this.left_paddle, this.hitPaddle, null, this);
        this.left_paddle.setImmovable(true);
        this.right_paddle.setImmovable(true);
        this.physics.add.collider(this.ball, this.right_paddle, this.hitPaddle, null, this);
        this.input.keyboard.on('keydown-SPACE',this.startBall, this)
        this.udlr = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S
        });

        //text
        this.leftScoreText = this.add.text(WIDTH*(10/100), HEIGHT*(10/100), '0', { fontSize: '50px' })
        this.rightScoreText = this.add.text(WIDTH*(90/100), HEIGHT*(10/100), '0', { fontSize: '50px' })
    }

    update() {
        //score logic
        const margin = 22;
        if(this.ball.x < margin) {
            this.rightScore += 1;
            this.rightScoreText.setText(this.rightScore);
            //this.resetBall();
        }else if(this.ball.x > WIDTH - margin) {
            this.leftScore += 1;
            this.leftScoreText.setText(this.leftScore);
            //this.resetBall();
        }
        if(this.wasd.up.isDown && this.left_paddle.y > 0) {
            this.left_paddle.y -= this.paddle_speed;
        }
        else if(this.wasd.down.isDown && this.left_paddle.y < HEIGHT) {
            this.left_paddle.y += this.paddle_speed;
        }

        if(this.udlr.up.isDown && this.right_paddle.y > 0) {
            this.right_paddle.y -= this.paddle_speed;
        }
        else if(this.udlr.down.isDown && this.left_paddle.y < HEIGHT) {
            this.right_paddle.y += this.paddle_speed;
        }

        
    }

    startBall(){
        if(!this.ballInMotion) {
            this.ball.setVelocity(this.speed, this.speed);
            this.ballInMotion = true;
        }
    }
    hitPaddle() {
        this.speed *= 1.5;
        this.paddle_speed *= 1.025;
    }
}