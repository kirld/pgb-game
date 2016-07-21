//grab the width of the screen
var canvasWidth =window.innerWidth;
//grab the height of the screen
var canvasHeight = window.innerHeight;
//set the middle of the screen for later user
var centerScreen = canvasWidth / 2;
//create the canvas
var renderer = PIXI.autoDetectRenderer(canvasWidth, canvasHeight,{backgroundColor : 0x58BEFC});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var sealTexture = PIXI.Texture.fromImage('img/seal.png');

// create a texture from an image path
var icebergTexture = PIXI.Texture.fromImage('img/iceberg.png');

// create a new Sprite using the texture
var seal = new PIXI.Sprite(sealTexture);

// newly spawned objects start at Y=25
var spawnLineY = 25;

// spawn a new object every 1500ms
var spawnRate = 1000;

// set how fast the objects will fall
var icebergSpeed = 3;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var icebergObjects = []

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

// center the sprite's anchor point
seal.anchor.x = 0.5;
seal.anchor.y = 0.5;

// move the sprite to the center of the screen
seal.position.x = 200;
seal.position.y = 500;

//set the heigh and width of the image
seal.width = 25;
seal.height = 40;



//draw the image onto the canvas
stage.addChild(seal);


//create obstacles
function createIceberg(){
    // create a new Sprite using the texture
    var iceberg = new PIXI.Sprite(icebergTexture);
    //create objects to hold icebergs
    var icebergObject = {
        instance: iceberg
    };

    // center the sprite's anchor point
    iceberg.anchor.x = 0.5;
    iceberg.anchor.y = 0.5;

    // move the sprite to the center of the screen
    iceberg.position.x = Math.random() * canvasWidth;
    iceberg.position.y = 0;

    iceberg.width = 40;
    iceberg.height = 40;

    //since there will be many icebergs being created
    //object must be pushed into an array 
    icebergObjects.push(icebergObject);

    //draw iceberg onto canvas
    stage.addChild(iceberg);

}

// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for device API libraries to load to prevent errors
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available and ready so start the 
// accelerometer and begin checking device position/orientation
function onDeviceReady() {
    startWatch();
}

// Start watching the accelerometer values
function startWatch() {
    // Create options object to update properties of accelerometer
    // Update acceleration every 50 milliseconds
    var options = { frequency: 50 };
    watchID = navigator.accelerometer.watchAcceleration(onAccelerate, onError, options);
}

//store position as middle screen
var xPos = centerScreen;

// onSuccess: Get a snapshot of the current acceleration
// And display these on the page
function onAccelerate(acceleration) {
    //calculate the movement of characters position
    var maxAngle = 4;
    var angleRatio = acceleration.x / maxAngle;
    xPos = angleRatio * centerScreen + centerScreen;
}

// onError: Failed to get the acceleration
function onError() {
    alert('onError!');
}

function animate() {
    // request another animation frame
    requestAnimationFrame(animate);

    // get the elapsed time
    var time = Date.now();

    //store characters dimensions
    var sealTop = seal.y - seal.height / 2;
    var sealLeft = seal.x - seal.width / 2;
    var sealRight = seal.x + seal.width / 2;

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        createIceberg();
    }


    // move each object down the canvas
    for (var i = 0; i < icebergObjects.length; i++) {
        var iceberg = icebergObjects[i];
        //store iceberg dimensions to check for hit
        var icebergWidth = iceberg.instance.width;
        var icebergHeight = iceberg.instance.height;
        var icebergTop = iceberg.instance.y - icebergHeight / 2;
        var icebergLeft = iceberg.instance.x - icebergWidth / 2;
        var icebergRight = iceberg.instance.x + icebergWidth / 2;
        var icebergBottom = iceberg.instance.y + icebergHeight / 2;

        //move iceberg down page
        iceberg.instance.position.y += icebergSpeed;

        //check for hit, if hit on y axis
        if(sealTop < icebergBottom && sealTop > icebergTop){
            //check for hit on x axis
            if(sealRight > icebergLeft && sealLeft < icebergRight){
                //vibrate phone to alert user theyve hit iceberg
                // navigator.notification.vibrate(500); 
                // // alert("Game over press okay to replay")   
                navigator.notification.alert("Oh no, you've hit an iceberg", restart, "Game Over", "Play Again!");   
                function restart(){   
                    for(var i = stage.children.length - 1; i >= 0; i--) {  
                        stage.removeChild(stage.children[i]);
                    };       
                    //draw the image onto the canvas
                    stage.addChild(seal);
                    icebergObjects = [];    
                    animate();
                }  
            }
        }
    }

    //position set default to middle of screen
    seal.position.x = xPos;

    // render the container
    renderer.render(stage);

}

// start animating
animate();