/////////////////line of sight//////////////////////////////////
function updateLineOfSight(){
	if(mazeVisible){
		for (var Y = 0; Y < mazeSizeY; Y++) {			//removing all blackness
			for (var X = 0; X < mazeSizeX; X++) {
				var divTemp = "#" + X +'-'+ Y;
				$divTemp = $(divTemp);
				$divTemp.removeClass('dark');
				revealCats($divTemp);
			}
		}
	}
	//if(!mazeVisible){
	else{
		for (var Y = 0; Y < mazeSizeY; Y++) {			//setting the whole maze to black, except for what the mouse can see
			for (var X = 0; X < mazeSizeX; X++) {
				var divTemp = "#" + X +'-'+ Y;
				$divTemp = $(divTemp);
				hideCats($divTemp);
				//$divTemp.removeClass("fakeWall");		//an idea for making pipes look like walls from the side
			}
		}

		for(var i=0; i < mouseLocation.length; i++){
			var divTemp = "#" + mouseLocationX[i] +'-'+mouseLocationY[i];		//make mouse visible
			$divTemp = $(divTemp);
			$divTempOfMouse = $(divTemp);
			$divTemp.removeClass('dark');
			revealCats($divTemp);

			//////////////// look left
			var next = true;
			var up;
			var down;
			var look = mouseLocationX[i]-1;
			if (look == -1)
				next = false;
			while(next){
				if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeLeft'))
					break;
				var divTemp = "#" + look +'-'+mouseLocationY[i];
				$divTemp = $(divTemp);
				$divTemp.removeClass('dark');

				revealCats($divTemp);

				// if($divTemp.hasClass('pipe') && !$divTemp.hasClass('pipeRight'))
				// 	$divTemp.addClass('fakeWall');

				up = mouseLocationY[i]-1;
				down = mouseLocationY[i]+1;
				if(!$divTemp.hasClass("wall") && !$divTemp.hasClass("pipe")){
					if(up != -1){
						var peripheral = "#" + look +'-'+ up;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
					if(down != mazeSizeY){
						var peripheral = "#" + look +'-'+ down;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
				}	
				if (look-1 == -1 || $divTemp.hasClass("wall"))
					next = false;
				if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeRight") || !$divTemp.hasClass("pipeLeft")))
					next = false;
				look--;
			}

			//////////////// look right
			var next = true;
			var up;
			var down;
			var look = mouseLocationX[i]+1;
			if (look == mazeSizeX)
				next = false;
			while(next){
				if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeRight'))
					break;
				var divTemp = "#" + look +'-'+mouseLocationY[i];
				$(divTemp).removeClass('dark');
				$divTemp = $(divTemp);

				revealCats($divTemp);

				up = mouseLocationY[i]-1;
				down = mouseLocationY[i]+1;
				if(!$divTemp.hasClass("wall") && !$divTemp.hasClass("pipe")){
					if(up != -1){
						var peripheral = "#" + look +'-'+ up;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
					if(down != mazeSizeY){
						var peripheral = "#" + look +'-'+ down;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
				}	
				if (look+1 == mazeSizeX || $divTemp.hasClass("wall"))
					next = false;
				if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeRight") || !$divTemp.hasClass("pipeLeft")))
					next = false;
				look++;
			}

			//////////////// look up
			var next = true;
			var left;
			var right;
			var look = mouseLocationY[i]-1;
			if (look == -1)
				next = false;
			while(next){
				if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeUp'))
					break;
				var divTemp = "#" + mouseLocationX[i] +'-'+look;
				$(divTemp).removeClass('dark');
				$divTemp = $(divTemp);

				revealCats($divTemp);

				left = mouseLocationX[i]-1;
				right = mouseLocationX[i]+1;
				if(!$divTemp.hasClass("wall") && !$divTemp.hasClass("pipe")){
					if(left != -1){
						var peripheral = "#" + left +'-'+ look;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
					if(right != mazeSizeX){
						var peripheral = "#" + right +'-'+ look;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
				}	
				if (look-1 == -1 || $divTemp.hasClass("wall"))
					next = false;
				if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeDown") || !$divTemp.hasClass("pipeUp")))
					next = false;
				look--;
			}

			//////////////// look down
			var next = true;
			var left;
			var right;
			var look = mouseLocationY[i]+1;
			if (look == mazeSizeY)
				next = false;
			while(next){
				if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeDown'))
					break;
				var divTemp = "#" + mouseLocationX[i] +'-'+look;
				$(divTemp).removeClass('dark');
				$divTemp = $(divTemp);

				revealCats($divTemp);

				left = mouseLocationX[i]-1;
				right = mouseLocationX[i]+1;
				if(!$divTemp.hasClass("wall") && !$divTemp.hasClass("pipe")){
					if(left != -1){
						var peripheral = "#" + left +'-'+ look;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}	
					if(right != mazeSizeX){
						var peripheral = "#" + right +'-'+ look;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
				}	
				if (look+1 == mazeSizeY || $divTemp.hasClass("wall"))
					next = false;
				if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeUp") || !$divTemp.hasClass("pipeDown")))
					next = false;
				look++;
			}
		}

	}
}





////////////////////////////////////////////////////////////////////////////////////


function revealCats($divTemp){
	if($divTemp.hasClass("cat1Eyes")){
		$divTemp.removeClass('cat1Eyes').addClass("cat1");
		$divTemp.css("background-image", "url(images/catOminous.jpg)");
	}
	if($divTemp.hasClass("cat2Eyes")) {
		$divTemp.removeClass('cat2Eyes').addClass("cat2");
		$divTemp.css("background-image", "url(images/catScary.jpg)");
	}
	if($divTemp.hasClass("cat3Eyes")) {
		$divTemp.removeClass('cat3Eyes').addClass("cat3");
		$divTemp.css("background-image", "url(images/catSeeker.jpg)");
	}
}


function hideCats($divTemp){
	if($divTemp.hasClass("cat1Eyes"))
		$divTemp.removeClass('dark');
	else if($divTemp.hasClass("cat1")){
		$divTemp.removeClass("cat1").addClass("cat1Eyes");
		$divTemp.css("background-image", "url(images/catEyesOminous.jpg)");
	}

	if($divTemp.hasClass("cat2Eyes"))
		$divTemp.removeClass('dark');
	else if($divTemp.hasClass("cat2")){
		$divTemp.removeClass("cat2").addClass("cat2Eyes");
		$divTemp.css("background-image", "url(images/catEyesScary.jpg)");
	}

	if($divTemp.hasClass("cat3Eyes"))
		$divTemp.removeClass('dark');
	else if($divTemp.hasClass("cat3")){
		$divTemp.removeClass("cat3").addClass("cat3Eyes");
		$divTemp.css("background-image", "url(images/catEyesSeeker.jpg)");
	}
	
	if(!$divTemp.hasClass("cat1Eyes") && !$divTemp.hasClass("cat2Eyes") && !$divTemp.hasClass("cat3Eyes"))
		$divTemp.addClass('dark');
}



////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// moving the mouse ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


function moveLeft(i){
	var oldMouseLocation = "#" + mouseLocation[i];
	var $oldMouseLocation = $(oldMouseLocation);
	var lookAheadTemp = "#" + (mouseLocationX[i]-1)+'-'+mouseLocationY[i];
	var $lookAheadTemp = $(lookAheadTemp);

	if(!checkForLock1($lookAheadTemp))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeRight'))	//checks so it won't enter a pipe from the wrong side
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeLeft'))	//checks so it won't leave a pipe except from an exit
		return;

	if(mouseLocationX[i]-1 != -1 && !$lookAheadTemp.hasClass('inaccessibleByMouse')){
		$oldMouseLocation.removeClass("mouse");	
		$oldMouseLocation.css("background-image", "none");
		mouseLocationX[i]--;
		var newMouseLocation = "#" + mouseLocationX[i]+'-'+mouseLocationY[i];
		var $newMouseLocation = $(newMouseLocation);
		mouseLocation[i] = mouseLocationX[i]+'-'+mouseLocationY[i];
		$newMouseLocation.addClass("mouse");
		if(i==0){
			$newMouseLocation.css("background-image", "url(images/mouseBlueLeft.png)");
			$oldMouseLocation.removeClass("mouseBlue");	
			$newMouseLocation.addClass("mouseBlue");
		}
		else{
			$newMouseLocation.css("background-image", "url(images/mouseRedLeft.png)");
			$oldMouseLocation.removeClass("mouseRed");	
			$newMouseLocation.addClass("mouseRed");
		}
		if(mazeVisible){
			$oldMouseLocation.addClass('trail');
			$newMouseLocation.removeClass('trail');
		}
		checkSquare($oldMouseLocation, $newMouseLocation, i);
	}
}

function moveRight(i){
	var oldMouseLocation = "#" + mouseLocation[i];
	var $oldMouseLocation = $(oldMouseLocation);
	var lookAheadTemp = "#" + (mouseLocationX[i]+1)+'-'+mouseLocationY[i];
	var $lookAheadTemp = $(lookAheadTemp); 

	if(!checkForLock1($lookAheadTemp))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeLeft'))
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeRight'))	//checks so it won't leave a pipe except from an exit
		return;

	if (mouseLocationX[i]+1 != mazeSizeX && !$lookAheadTemp.hasClass('inaccessibleByMouse')){ //check for ability to move
		$oldMouseLocation.removeClass("mouse");
		$oldMouseLocation.css("background-image", "none");
		mouseLocationX[i]++;
		var newMouseLocation = "#" + mouseLocationX[i]+'-'+mouseLocationY[i];
		var $newMouseLocation = $(newMouseLocation);
		mouseLocation[i] = mouseLocationX[i]+'-'+mouseLocationY[i];
		$newMouseLocation.addClass("mouse");
		if(i==0){
			$newMouseLocation.css("background-image", "url(images/mouseBlueRight.png)");
			$oldMouseLocation.removeClass("mouseBlue");	
			$newMouseLocation.addClass("mouseBlue");
		}
		else{
			$newMouseLocation.css("background-image", "url(images/mouseRedRight.png)");
			$oldMouseLocation.removeClass("mouseRed");	
			$newMouseLocation.addClass("mouseRed");
		}
		if(mazeVisible){
			$oldMouseLocation.addClass('trail');
			$newMouseLocation.removeClass('trail');
		}
		checkSquare($oldMouseLocation, $newMouseLocation, i);
	}
}

function moveUp(i){
	var oldMouseLocation = "#" + mouseLocation[i];
	var $oldMouseLocation = $(oldMouseLocation);
	var lookAheadTemp = "#" + mouseLocationX[i]+'-'+(mouseLocationY[i]-1);
	var $lookAheadTemp = $(lookAheadTemp);

	if(!checkForLock1($lookAheadTemp))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeDown'))
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeUp'))	//checks so it won't leave a pipe except from an exit
		return;

	if (mouseLocationY[i]-1 != -1 && !$lookAheadTemp.hasClass('inaccessibleByMouse')){ //check for ability to move
		$oldMouseLocation.removeClass("mouse");
		$oldMouseLocation.css("background-image", "none");
		mouseLocationY[i]--;
		var newMouseLocation = "#" + mouseLocationX[i]+'-'+mouseLocationY[i];
		var $newMouseLocation = $(newMouseLocation);
		mouseLocation[i] = mouseLocationX[i]+'-'+mouseLocationY[i];
		$newMouseLocation.addClass("mouse");
		if(i==0){
			$newMouseLocation.css("background-image", "url(images/mouseBlueUp.png)");
			$oldMouseLocation.removeClass("mouseBlue");	
			$newMouseLocation.addClass("mouseBlue");
		}
		else{
			$newMouseLocation.css("background-image", "url(images/mouseRedUp.png)");
			$oldMouseLocation.removeClass("mouseRed");	
			$newMouseLocation.addClass("mouseRed");
		}
		if(mazeVisible){
			$oldMouseLocation.addClass('trail');
			$newMouseLocation.removeClass('trail');
		}
		checkSquare($oldMouseLocation, $newMouseLocation, i);
	}
}

function moveDown(i){
	var oldMouseLocation = "#" + mouseLocation[i];
	var $oldMouseLocation = $(oldMouseLocation);
	var lookAheadTemp = "#" + mouseLocationX[i]+'-'+(mouseLocationY[i]+1);
	var $lookAheadTemp = $(lookAheadTemp);

	if(!checkForLock1($lookAheadTemp))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeUp'))
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeDown'))	//checks so it won't leave a pipe except from an exit
		return;

	if (mouseLocationY[i]+1 != mazeSizeY && !$lookAheadTemp.hasClass('inaccessibleByMouse')){ //check for ability to move
		$oldMouseLocation.removeClass("mouse");
		$oldMouseLocation.css("background-image", "none");
		mouseLocationY[i]++;
		var newMouseLocation = "#" + mouseLocationX[i]+'-'+mouseLocationY[i];
		var $newMouseLocation = $(newMouseLocation);
		mouseLocation[i] = mouseLocationX[i]+'-'+mouseLocationY[i];
		$newMouseLocation.addClass("mouse");
		if(i==0){
			$newMouseLocation.css("background-image", "url(images/mouseBlueDown.png)");
			$oldMouseLocation.removeClass("mouseBlue");	
			$newMouseLocation.addClass("mouseBlue");
		}
		else{
			$newMouseLocation.css("background-image", "url(images/mouseRedDown.png)");
			$oldMouseLocation.removeClass("mouseRed");	
			$newMouseLocation.addClass("mouseRed");
		}
		if(mazeVisible){
			$oldMouseLocation.addClass('trail');
			$newMouseLocation.removeClass('trail');
		}
		checkSquare($oldMouseLocation, $newMouseLocation, i);
	}
}



function checkSpotToFixPicAsMouse($oldLocation){
	if($oldLocation.hasClass("mouseBlue"))
		$oldLocation.addClass('mouseBlue');
	if($oldLocation.hasClass("portalBlueWithMouseBlue"))
		$oldLocation.removeClass('portalBlueWithMouseBlue');
	if($oldLocation.hasClass("portalBlueWithMouseRed"))
		$oldLocation.removeClass('portalBlueWithMouseRed');
	if($oldLocation.hasClass("portalRedWithMouseBlue"))
		$oldLocation.removeClass('portalRedWithMouseBlue');
	if($oldLocation.hasClass("portalRedWithMouseRed"))
		$oldLocation.removeClass('portalRedWithMouseRed');
	if($oldLocation.hasClass("portalBlue"))
		$oldLocation.css("background-image", "url(images/portalBlue.jpg)");
	if($oldLocation.hasClass("portalRed"))
		$oldLocation.css("background-image", "url(images/portalRed.png)");
	if($oldLocation.hasClass("unlocked1"))
		$oldLocation.css("background-image", "url(images/unlocked1.png)");
	if($oldLocation.hasClass("pipeVert"))
		$oldLocation.css("background-image", "url(images/grayWallVertPipe.png)");
	if($oldLocation.hasClass("pipeCorner"))
		$oldLocation.css("background-image", "url(images/grayWallCornerPipe.png)");
}