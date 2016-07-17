    // // The watch id references the current `watchAcceleration`
    // var watchID = null;

    // // Wait for device API libraries to load to prevent errors
    // document.addEventListener("deviceready", onDeviceReady, false);
    // // device APIs are available and ready so start the 
    // // accelerometer and begin checking device position/orientation
    // function onDeviceReady() {
    //     startWatch();
    // }

    // // Start watching the accelerometer values
    // function startWatch() {
    //     // Create options object to update properties of accelerometer
    //     // Update acceleration every 50 milliseconds
    //     var options = { frequency: 50 };
    //     watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    // }

    // onSuccess: Get a snapshot of the current acceleration
    // And display these on the page
    // function onSuccess(acceleration) {
    //     acceleration.x

    //     document.getElementById('test').innerHTML = acceleration.x;

    //     if(acceleration.x >= 4){
    //     	document.getElementById("char").style.right = "250px";
    //     }
    //     else if(acceleration.x >= 3 && acceleration.x < 4){
    //     	document.getElementById("char").style.right = "218.75px";
    //     }
    // 	else if(acceleration.x >= 2 && acceleration.x < 3){
    //     	document.getElementById("char").style.right = "187.5px";
    //     }
    //     else if(acceleration.x >= 1 && acceleration.x < 2){
    //     	document.getElementById("char").style.right = "156.25px";
    //     }
    //     else if(acceleration.x >= 0 && acceleration.x < 1){
    //     	document.getElementById("char").style.right = "140px";
    //     }
    // 	else if(acceleration.x >= -1 && acceleration.x < 0){
    //     	document.getElementById("char").style.right = "125px";
    //     }
    // 	else if(acceleration.x >= -2 && acceleration.x < -1){
    //     	document.getElementById("char").style.right = "93.75px";
    //     }
    //   	else if(acceleration.x >= -3 && acceleration.x < -2){
    //     	document.getElementById("char").style.right = "62.5px";
    //     }
    //     else if(acceleration.x > -4 && acceleration.x < -3){
    //     	document.getElementById("char").style.right = "31.25px";
    //     }
    //     else if(acceleration.x <= -4){
    //    		document.getElementById("char").style.right = "0px";
    //     }
    // }

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
