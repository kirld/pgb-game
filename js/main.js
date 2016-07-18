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
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }

    // Stop watching the acceleration
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Get a snapshot of the current acceleration
    // And display these on the page
    function onSuccess(acceleration) {

        element.innerHTML = acceleration.x;
        var character = document.getElementById("char");
        if(acceleration.x >= 4){
        	character.style.right = "250px";
        }
        else if(acceleration.x >= 3 && acceleration.x < 4){
        	character.style.right = "218.75px";
        }
    	else if(acceleration.x >= 2 && acceleration.x < 3){
        	character.style.right = "187.5px";
        }
        else if(acceleration.x >= 1 && acceleration.x < 2){
        	character.style.right = "156.25px";
        }
        else if(acceleration.x >= 0 && acceleration.x < 1){
        	character.style.right = "140px";
        }
    	else if(acceleration.x >= -1 && acceleration.x < 0){
        	character.style.right = "125px";
        }
    	else if(acceleration.x >= -2 && acceleration.x < -1){
        	character.style.right = "93.75px";
        }
      	else if(acceleration.x >= -3 && acceleration.x < -2){
        	character.style.right = "62.5px";
        }
        else if(acceleration.x > -4 && acceleration.x < -3){
        	character.style.right = "31.25px";
        }
        else if(acceleration.x <= -4){
       		character.style.right = "0px";
        }
    }

    // onError: Failed to get the acceleration
    function onError() {
        alert('onError!');
    }

    // get a refrence to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var image = document.getElementById("iceberg");

// newly spawned objects start at Y=25
var spawnLineY = 25;

// spawn a new object every 1500ms
var spawnRate = 5000;

// set how fast the objects will fall
var spawnRateOfDescent = 1;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

// start animating
animate();


function spawnRandomObject() {

    // select a random type for this new object
    var t;

    // About Math.random()
    // Math.random() generates a semi-random number
    // between 0-1. So to randomly decide if the next object
    // will be A or B, we say if the random# is 0-.49 we
    // create A and if the random# is .50-1.00 we create B


    // if (Math.random() < 0.50) {
    //     t = "red";
    // } else {
    //     t = "blue";
    // }

    // create the new object
    var object = {
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: spawnLineY,
    }

    // add the new object to the objects[] array
    objects.push(object);
}



function animate() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }

    // request another animation frame
    requestAnimationFrame(animate);

    // clear the canvas so all objects can be 
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the line where new objects are spawned
    // ctx.beginPath();
    // ctx.moveTo(0, spawnLineY);
    // ctx.lineTo(canvas.width, spawnLineY);
    // ctx.stroke();

    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.y += spawnRateOfDescent;
        // ctx.drawImage(image);
        ctx.beginPath();
        ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();
    }

}
