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
	else{
		for (var Y = 0; Y < mazeSizeY; Y++) {			//setting the whole maze to black, except for what the mouse can see
			for (var X = 0; X < mazeSizeX; X++) {
				var divTemp = "#" + X +'-'+ Y;
				$divTemp = $(divTemp);
				hideCats($divTemp);
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
			var up = mouseLocationY[i]-1;
			var down = mouseLocationY[i]+1;
			var lookLeft = mouseLocationX[i]-1;
			if (lookLeft == -1)
				next = false;
			if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeLeft'))
				next = false;
			while(next){
				var divTemp = "#" + lookLeft +'-'+mouseLocationY[i];
				$divTemp = $(divTemp);
				$divTemp.removeClass('dark');

				revealCats($divTemp);

				// if($divTemp.hasClass('pipe') && !$divTemp.hasClass('pipeRight'))
				// 	$divTemp.addClass('fakeWall');

				if(!$divTemp.hasClass("wall") && !$divTemp.hasClass("pipe")){
					if(up != -1){
						var peripheral = "#" + lookLeft +'-'+ up;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
					if(down != mazeSizeY){
						var peripheral = "#" + lookLeft +'-'+ down;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
				}	
				if (lookLeft-1 == -1 || $divTemp.hasClass("wall"))
					next = false;
				else if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeRight") || !$divTemp.hasClass("pipeLeft")))
					next = false;
				else
					lookLeft--;
			}

			//////////////// look right
			var next = true;
			var lookRight = mouseLocationX[i]+1;
			if (lookRight == mazeSizeX)
				next = false;
			if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeRight'))
				next = false;
			while(next){
				var divTemp = "#" + lookRight +'-'+mouseLocationY[i];
				$divTemp = $(divTemp);
				$divTemp.removeClass('dark');

				revealCats($divTemp);

				if(!$divTemp.hasClass("wall") && !$divTemp.hasClass("pipe")){
					if(up != -1){
						var peripheral = "#" + lookRight +'-'+ up;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
					if(down != mazeSizeY){
						var peripheral = "#" + lookRight +'-'+ down;
						$peripheral = $(peripheral);
						if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
							$(peripheral).removeClass('dark');
						}
					}
				}	
				if (lookRight+1 == mazeSizeX || $divTemp.hasClass("wall"))
					next = false;
				else if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeRight") || !$divTemp.hasClass("pipeLeft")))
					next = false;
				else
					lookRight++;
			}

			//////////////// look up
			var next = true;
			var noPipes = true;
			var left = mouseLocationX[i]-1;
			var right = mouseLocationX[i]+1;
			var look = mouseLocationY[i]-1;
			var lookLeftMax = lookLeft; 			// how far the mouse can see to the left (the coordinate of the wall it can see)
			var lookRightMax = lookRight;
			if (look == -1)
				next = false;
			if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeUp'))
				next = false;
			while(next){
				left = mouseLocationX[i]-1;
				right = mouseLocationX[i]+1;
				var divTemp = "#" + mouseLocationX[i] +'-'+look;
				$divTemp = $(divTemp);
				$divTemp.removeClass('dark');
				
				revealCats($divTemp);
			
				// look up to the left
				if($divTemp.hasClass("wall") || $divTemp.hasClass("pipe")){ //&& left <= lookLeftMax){
					lookLeftMax = mouseLocationX[i];
					lookRightMax = mouseLocationY[i];
					noPipes = false;
					nextPeripheralLeft = false;
					nextPeripheralRight = false;
				}
				else {
					nextPeripheralLeft = true;
					nextPeripheralRight = true;
				}
				while(nextPeripheralLeft && noPipes){
					if(left <= -1)
						break;
					var peripheral = "#" + left +'-'+ look;
					$peripheral = $(peripheral);
					if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe') || left-1 <= -1){
						$peripheral.removeClass('dark');
						revealCats($peripheral);
					}
					if(left > lookLeftMax){
						$peripheral.removeClass('dark');
						revealCats($peripheral);
						if(!$peripheral.hasClass('wall') && !$peripheral.hasClass('pipe')){
							var peripheralUp = "#" + left +'-'+ (look-1);
							$peripheralUp = $(peripheralUp);
							if($peripheralUp.hasClass('wall') || $peripheralUp.hasClass("pipe"))
								$peripheralUp.removeClass('dark');
						}
						else if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe')){
							lookLeftMax = left;
							nextPeripheralLeft = false;
						}
						left--;
					}
					else{
						nextPeripheralLeft = false;
					}
				}
				
				// look up to the right
				while(nextPeripheralRight && noPipes){
					if(right >= mazeSizeX)
						break;
					var peripheral = "#" + right +'-'+ look;
					$peripheral = $(peripheral);
					if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe') || right+1 >= mazeSizeX){
						$peripheral.removeClass('dark');
						revealCats($peripheral);
					}
					if(right < lookRightMax){
						$peripheral.removeClass('dark');
						revealCats($peripheral);
						if(!$peripheral.hasClass('wall') && !$peripheral.hasClass('pipe')){
							var peripheralUp = "#" + right +'-'+ (look-1);
							$peripheralUp = $(peripheralUp);
							if($peripheralUp.hasClass('wall') || $peripheralUp.hasClass("pipe"))
								$peripheralUp.removeClass('dark');
						}
						else if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe')){
							lookRightMax = right;
							nextPeripheralRight = false;
						}
						right++;
					}
					else{
						nextPeripheralRight = false;
					}
				}

					
					
				if (look-1 == -1 || $divTemp.hasClass("wall"))
					next = false;
				if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeDown") || !$divTemp.hasClass("pipeUp")))
					next = false;
				look--;
			}

			//////////////// look down
			next = true;
			noPipes = true;
			look = mouseLocationY[i]+1;
			var lookLeftMax = lookLeft; 			// how far the mouse can see to the left (the coordinate of the wall it can see)
			var lookRightMax = lookRight;
			if (look == mazeSizeY)
				next = false;
			if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeDown'))
				next = false;
			while(next){
				left = mouseLocationX[i]-1;
				right = mouseLocationX[i]+1;
				var divTemp = "#" + mouseLocationX[i] +'-'+look;
				$divTemp = $(divTemp);
				$divTemp.removeClass('dark');

				revealCats($divTemp);

				// look down to the left
				if($divTemp.hasClass("wall") || $divTemp.hasClass("pipe")){ //&& left <= lookLeftMax){
					lookLeftMax = mouseLocationX[i];
					lookRightMax = mouseLocationY[i];
					noPipes = false;
					nextPeripheralLeft = false;
					nextPeripheralRight = false;
				}
				else{
					nextPeripheralLeft = true;
					nextPeripheralRight = true;
				}
				while(nextPeripheralLeft && noPipes){
					if(left <= -1)
						break;
					var peripheral = "#" + left +'-'+ look;
					$peripheral = $(peripheral);
					if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe') || left-1 <= -1){
						$peripheral.removeClass('dark');
						revealCats($peripheral);
					}
					if(left > lookLeftMax){
						$peripheral.removeClass('dark');
						revealCats($peripheral);
						if(!$peripheral.hasClass('wall') && !$peripheral.hasClass('pipe')){
							var peripheralDown = "#" + left +'-'+ (look+1);
							$peripheralDown = $(peripheralDown);
							if($peripheralDown.hasClass('wall') || $peripheralDown.hasClass("pipe"))
								$peripheralDown.removeClass('dark');
						}
						else if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe')){
							lookLeftMax = left;
							nextPeripheralLeft = false;
						}
						left--;
					}
					else{
						nextPeripheralLeft = false;
					}
				}
				
				// look down to the right
				while(nextPeripheralRight && noPipes){
					if(right >= mazeSizeX)
						break;
					var peripheral = "#" + right +'-'+ look;
					$peripheral = $(peripheral);
					if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe') || right+1 >= mazeSizeX){
						$peripheral.removeClass('dark');
						revealCats($peripheral);
					}
					if(right < lookRightMax){
						$peripheral.removeClass('dark');
						revealCats($peripheral);
						if(!$peripheral.hasClass('wall') && !$peripheral.hasClass('pipe')){
							var peripheralDown = "#" + right +'-'+ (look+1);
							$peripheralDown = $(peripheralDown);
							if($peripheralDown.hasClass('wall') || $peripheralDown.hasClass("pipe"))
								$peripheralDown.removeClass('dark');
						}
						else if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe')){
							lookRightMax = right;
							nextPeripheralRight = false;
						}
						right++;
					}
					else{
						nextPeripheralRight = false;
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

	if(!checkForLock($lookAheadTemp, i))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeRight'))	//checks so it won't enter a pipe from the wrong side
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeLeft'))	//checks so it won't leave a pipe except from an exit
		return;

	if(mouseLocationX[i]-1 != -1 && !$lookAheadTemp.hasClass('inaccessibleByMouse')){
		if(mouseLocation[0] != mouseLocation[1]){
			$oldMouseLocation.removeClass("mouse");
			$oldMouseLocation.css("background-image", "none");
		}
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

	if(!checkForLock($lookAheadTemp, i))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeLeft'))
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeRight'))	//checks so it won't leave a pipe except from an exit
		return;

	if (mouseLocationX[i]+1 != mazeSizeX && !$lookAheadTemp.hasClass('inaccessibleByMouse')){ //check for ability to move
		if(mouseLocation[0] != mouseLocation[1]){
			$oldMouseLocation.removeClass("mouse");
			$oldMouseLocation.css("background-image", "none");
		}
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

	if(!checkForLock($lookAheadTemp, i))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeDown'))
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeUp'))	//checks so it won't leave a pipe except from an exit
		return;

	if (mouseLocationY[i]-1 != -1 && !$lookAheadTemp.hasClass('inaccessibleByMouse')){ //check for ability to move
		if(mouseLocation[0] != mouseLocation[1]){
			$oldMouseLocation.removeClass("mouse");
			$oldMouseLocation.css("background-image", "none");
		}
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

	if(!checkForLock($lookAheadTemp, i))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeUp'))
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeDown'))	//checks so it won't leave a pipe except from an exit
		return;

	if (mouseLocationY[i]+1 != mazeSizeY && !$lookAheadTemp.hasClass('inaccessibleByMouse')){ //check for ability to move
		if(mouseLocation[0] != mouseLocation[1]){
			$oldMouseLocation.removeClass("mouse");
			$oldMouseLocation.css("background-image", "none");
		}
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
		$oldLocation.css("background-image", "url(images/mouseBlueDown.png)");
	if($oldLocation.hasClass("mouseRed"))
		$oldLocation.css("background-image", "url(images/mouseRedDown.png)");
	if($oldLocation.hasClass("portalBlueWithMouseBlue") && !$oldLocation.hasClass("mouseBlue"))
		$oldLocation.removeClass('portalBlueWithMouseBlue');
	if($oldLocation.hasClass("portalBlueWithMouseRed") && !$oldLocation.hasClass("mouseRed"))
		$oldLocation.removeClass('portalBlueWithMouseRed');
	if($oldLocation.hasClass("portalRedWithMouseBlue") && !$oldLocation.hasClass("mouseBlue"))
		$oldLocation.removeClass('portalRedWithMouseBlue');
	if($oldLocation.hasClass("portalRedWithMouseRed") && !$oldLocation.hasClass("mouseRed"))
		$oldLocation.removeClass('portalRedWithMouseRed');
	if($oldLocation.hasClass("portalBlue"))
		$oldLocation.css("background-image", "url(images/portalBlue.jpg)");
	if($oldLocation.hasClass("portalRed"))
		$oldLocation.css("background-image", "url(images/portalRed.png)");
	if($oldLocation.hasClass("unlocked1"))
		$oldLocation.css("background-image", "url(images/unlocked1.png)");
	if($oldLocation.hasClass("unlocked2"))
		$oldLocation.css("background-image", "url(images/unlocked2.png)");
	if($oldLocation.hasClass("unlocked3"))
		$oldLocation.css("background-image", "url(images/unlocked3.png)");
	if($oldLocation.hasClass("unlocked1WithMouseBlue") && !$oldLocation.hasClass("mouseBlue"))
		$oldLocation.removeClass('unlocked1WithMouseBlue');
	if($oldLocation.hasClass("unlocked1WithMouseRed") && !$oldLocation.hasClass("mouseRed"))
		$oldLocation.removeClass('unlocked1WithMouseRed');
	if($oldLocation.hasClass("unlocked2WithMouseBlue") && !$oldLocation.hasClass("mouseBlue"))
		$oldLocation.removeClass('unlocked2WithMouseBlue');
	if($oldLocation.hasClass("unlocked2WithMouseRed") && !$oldLocation.hasClass("mouseRed"))
		$oldLocation.removeClass('unlocked2WithMouseRed');
	if($oldLocation.hasClass("unlocked3WithMouseBlue") && !$oldLocation.hasClass("mouseBlue"))
		$oldLocation.removeClass('unlocked3WithMouseBlue');
	if($oldLocation.hasClass("unlocked3WithMouseRed") && !$oldLocation.hasClass("mouseRed"))
		$oldLocation.removeClass('unlocked3WithMouseRed');
	if($oldLocation.hasClass("pipeVert"))
		$oldLocation.css("background-image", "url(images/grayWallVertPipe.jpg)");
	if($oldLocation.hasClass("pipeCorner"))
		$oldLocation.css("background-image", "url(images/grayWallCornerPipe.jpg)");
	if($oldLocation.hasClass("pipeT"))
		$oldLocation.css("background-image", "url(images/grayWallTPipe.jpg)");
	if($oldLocation.hasClass("pipeFourWay"))
		$oldLocation.css("background-image", "url(images/grayWallFourWayPipe.jpg)");
}