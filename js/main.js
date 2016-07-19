var canvasWidth =window.innerWidth;
var canvasHeight = window.innerHeight;
var centerScreen = canvasWidth / 2;
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

seal.width = 25;
seal.height = 40;


stage.addChild(seal);

function createIceberg(){
    // create a new Sprite using the texture
    var iceberg = new PIXI.Sprite(icebergTexture);

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

    icebergObjects.push(icebergObject);

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

// Stop watching the acceleration
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

var xPos = centerScreen;

// onSuccess: Get a snapshot of the current acceleration
// And display these on the page
function onAccelerate(acceleration) {

    var maxAngle = 4;
    var angleRatio = acceleration.x / maxAngle;
    xPos = angleRatio * centerScreen + centerScreen;
}

// onError: Failed to get the acceleration
function onError() {
    alert('onError!');
}



// start animating
animate();

function animate() {
    // request another animation frame
    requestAnimationFrame(animate);

    // get the elapsed time
    var time = Date.now();

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
        var icebergWidth = iceberg.instance.width;
        var icebergHeight = iceberg.instance.height;
        var icebergTop = iceberg.instance.y - icebergHeight / 2;
        var icebergLeft = iceberg.instance.x - icebergWidth / 2;
        var icebergRight = iceberg.instance.x + icebergWidth / 2;
        var icebergBottom = iceberg.instance.y + icebergHeight / 2;

        iceberg.instance.position.y+= icebergSpeed;

        if(sealTop < icebergBottom && sealTop > icebergTop){

            if(sealRight > icebergLeft && sealLeft < icebergRight){
                //vibrate phone to alert user theyve hit iceberg
                navigator.notification.vibrate(1000);
            }
        }
    }

    seal.position.x = xPos;

    // render the container
    renderer.render(stage);

}