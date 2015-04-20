var mazeSizeX;			//Global variables
var mazeSizeY;
var divSize = 40;
var mazeVisible = true;
var gameReady = false;
var paused = false;
var twoPlayers = true;
var mousesAlive = new Array(); 	//a boolean array. it's true if that mouse is alive
var isLoadingMaze = false;		//just for the mazeMaker.js loadingMaze function
var levelNum = 1;
var timeOuts=new Array();
var firstMove = false;
var totalLevels = 6;
var levelToBeat2 = 0;			//for localStorage
var timedRecords2 = new Array(); //index 0 is the total time of the records of each level. after that it aligns with each level's record
var currentTimer = 0;

var mouseLocationX=new Array();
var mouseLocationY=new Array();
var mouseLocation=new Array();

var wallLocation=new Array();
var cheeseLocationX=new Array();
var cheeseLocationY=new Array();
var cheeseLocation=new Array();
var cheeseCount = 0;
var portalLocationBlueX=new Array();
var portalLocationBlueY=new Array();
var portalLocationBlue=new Array();
var portalBlueCount = 0;
var portalLocationRedX=new Array();
var portalLocationRedY=new Array();
var portalLocationRed=new Array();
var portalRedCount = 0;
var key1Location=new Array();
var key1Count = 0;
var key2Location=new Array();
var key2Count = 0;
var key3Location=new Array();
var key3Count = 0;
var lock1Location=new Array();
var lock1Count = 0;
var lock2Location=new Array();
var lock2Count = 0;
var lock3Location=new Array();
var lock3Count = 0;
var pipeVertLocation=new Array();
var pipeVertAlignment=new Array();
var pipeCornerLocation=new Array();
var pipeCornerAlignment=new Array();
var pipeTLocation=new Array();
var pipeTAlignment=new Array();
var pipeFourWayLocation=new Array();

var cat1LocationX=new Array();
var cat1LocationY=new Array();
var cat1Location=new Array();
var cat2LocationX=new Array();
var cat2LocationY=new Array();
var cat2Location=new Array();
var cat3LocationX=new Array();
var cat3LocationY=new Array();
var cat3Location=new Array();



function refreshClasses(){		//Only refreshes optional features
	wallLocation=new Array();
	cheeseLocationX=new Array();
	cheeseLocationY=new Array();
	cheeseLocation=new Array();
	cheeseCount = 0;
	portalLocationBlueX=new Array();
	portalLocationBlueY=new Array();
	portalLocationBlue=new Array();
	portalBlueCount = 0;
	portalLocationRedX=new Array();
	portalLocationRedY=new Array();
	portalLocationRed=new Array();
	portalRedCount = 0;
	key1Location=new Array();
	key1Count = 0;
	key2Location=new Array();
	key2Count = 0;
	key3Location=new Array();
	key3Count = 0;
	lock1Location=new Array();
	lock1Count = 0;
	lock2Location=new Array();
	lock2Count = 0;
	lock3Location=new Array();
	lock3Count = 0;
	pipeVertLocation=new Array();
	pipeVertAlignment=new Array();
	pipeCornerLocation=new Array();
	pipeCornerAlignment=new Array();
	pipeTLocation=new Array();
	pipeTAlignment=new Array();
	pipeFourWayLocation=new Array();

	cat1LocationX=new Array();
	cat1LocationY=new Array();
	cat1Location=new Array();
	oldcat1Location=new Array;
	cat2LocationX=new Array();
	cat2LocationY=new Array();
	cat2Location=new Array();
	oldcat2Location=new Array;
	canSee2=new Array;
	cat3LocationX=new Array();
	cat3LocationY=new Array();
	cat3Location=new Array();
	oldcat3Location=new Array;
	canSee3=new Array;
}

function clearTimeOuts(){
	clearTimeout(timeOuts['cheeseFlash']);
	clearTimeout(timeOuts['cat1Timeout']);
	clearTimeout(timeOuts['cat2Timeout']);
	clearTimeout(timeOuts['cat3Timeout']);
	clearTimeout(timeOuts['timerTimeOuts']);
}

function resetGame(){
	if(gameReady){
		var answer = confirm("Are you sure you want to go back to the main menu? You will have to restart the level that you are on.")
		if(answer)
			window.location="index.html";
		else
			return;
	}
	window.location="index.html";
}

function startGame(){			//method called to initialize the game.
	if(gameReady){
		var answer = confirm("Are you sure you want to restart the level?");
		if(!answer)
			return;
	}
	$("#totalTimeRecord").addClass("hidden");
	$("#mainMenuButton").removeClass("hidden");
	$("#resetButton").removeClass("hidden");
	$("#pauseButton").removeClass("hidden");
	$("#resetButton").removeClass('trail');
	$("#timerID").removeClass('hidden');
	$("#key1ID").removeClass('hidden').addClass("smallPic2");
	$("#key2ID").removeClass('hidden').addClass("smallPic2");
	$("#key3ID").removeClass('hidden').addClass("smallPic2");
	$("#cheeseCountID").removeClass('hidden').addClass("smallPic2");
	document.getElementById("resetButton").innerHTML="Restart Level";
	visibleOff();
	refreshClasses();
	setUpMazeElements(levelNum);//set up walls, player, etc
	loadMaze();					//actually loads the maze to the page
	updateLineOfSight();
	clearTimeOuts();
	currentTimer = 0;
	updateTimer();
	firstMove = true;
	gameReady = true;
	showAllCheese(2000);
}

function pauseGame(){
	if(gameReady){
		if(!paused){
			clearTimeOuts();
			paused = true;
			document.getElementById("pauseButton").innerHTML="Play";
		}
		else{
			letCatsLoose();
			startTimer();
			showCheese(700);
			paused = false;
			document.getElementById("pauseButton").innerHTML="Pause";
		}
	}
}

function showLoadableLevels(){			//lets players play levels they've beaten before
	if(levelToBeat2 == 0 || levelToBeat2 == undefined)
		$("#message").html("Beat a level first, then you may load.");
	$("#mainMenuButton").removeClass("hidden");
	$("#totalTimeRecord").removeClass("hidden");
	$("#newGameButton").addClass("hidden");
	$("#loadGameButton").addClass("hidden");
	$("#howToButton").addClass("hidden");
	for(var levelCounter = 1; levelCounter <= totalLevels; levelCounter++){
		var divTemp = document.createElement("label");
		$divTemp = $(divTemp);
		$divTemp.html(levelCounter);
		//if(levelCounter <= levelToBeat2){
			$divTemp.css('background-color', 'tan');
			$divTemp.attr('onmousedown', 'loadGame(this.innerHTML, event)');
			if(timedRecords2[levelCounter] != null && timedRecords2[levelCounter] != undefined){
				var recordTemp = document.createElement("label");
				recordTime = modifyTime(timedRecords2[levelCounter]);
				$(recordTemp).html(recordTime);
				$divTemp.append($(recordTemp));
			}
			var message = '';

			// if(timedRecords2[0] <= 550 && timedRecords2.length > 20)
			// 	message = " ...Rampage!";
			// else if(timedRecords2[0] <= 600 && timedRecords2.length > 20)
			// 	message = " ...Wow, masterful!";
			// else if(timedRecords2[0] <= 600 && timedRecords2.length > 20)
			// 	message = " ...Impressive, most impressive!";
			// else if(timedRecords2[0] <= 900 && timedRecords2.length > 20)
			// 	message = " ...excellent!";
			// else if(timedRecords2[0] <= 1200 && timedRecords2.length > 20)
			// 	message = " ...Hey, good job!";
			// else if(timedRecords2.length > 20)
			// 	message = " ...Cut down some time, you can do it.";
			// else
			// 	message = " ...Keep it up, finish off those levels!";

			$("#totalTimeRecord").html("Total of all records:  " + modifyTime(timedRecords2[0]) + message);
		//}
		//else{
		//	$divTemp.addClass("wall");
		//}
		$('#gameDiv').append(divTemp);
	}
}

function loadGame(levelPicked, e){
	if(e.which == 1){
		levelNum = parseInt(levelPicked);
		startGame();
	}
}


function howTo(){				//teaches players how to play
	$("#mainMenuButton").removeClass("hidden");
	$("#newGameButton").addClass("hidden");
	$("#loadGameButton").addClass("hidden");
	$("#howToButton").addClass("hidden");
	$("#howToText").removeClass("hidden");
	$("#gameDiv").css("background", "none");
}



function loadMaze() {			//loads the elements of a given maze
	$('#gameDiv').html('');		//clears maze
	$('#gameDiv').css('background', 'none');
	if(mazeSizeX > 20)
		$('#totalDiv').css('width', (mazeSizeX*divSize));
	else
		$('#totalDiv').css('width', '900px');
	$('#gameDiv').css('width', (mazeSizeX*divSize));
	$('#gameDiv').css('height', (mazeSizeY*divSize));

	for (var Y = 0; Y < mazeSizeY; Y++) {		
		for (var X = 0; X < mazeSizeX; X++) {
			var divTemp = document.createElement("div");
			$divTemp = $(divTemp);
			$divTemp.attr('id', X+"-"+Y);
			$divTemp.css('background-color', 'tan');			
			if(isLoadingMaze){		//just for the mazeMaker.js loadingMaze function
				$divTemp.attr('onmousedown', 'changeDiv(this)');
				$divTemp.attr('onmouseup', 'makeUnclicked(this)');
				$divTemp.attr('onmouseover', 'hoverChangeDiv(this)');
			}
			$('#gameDiv').append(divTemp);
		}
	}
	for(var i = 0; i<mouseLocation.length; i++){
		var mouseDiv = "#" + mouseLocation[i];
		$(mouseDiv).addClass('mouse');
		if(i==0){
			$(mouseDiv).css("background-image", "url(images/mouseBlueDown.png)");
			$(mouseDiv).addClass("mouseBlue");
			mousesAlive[0] = true;
		}
		else{
			$(mouseDiv).css("background-image", "url(images/mouseRedDown.png)");
			$(mouseDiv).addClass("mouseRed");
			mousesAlive[1] = true;
		}
	}
	for (var i = 0; i < cheeseLocation.length; i++) {
		var cheeseDiv = "#" + cheeseLocation[i];
		$(cheeseDiv).addClass('cheese');
	}
	for (var i = 0; i < wallLocation.length; i++) {
		var divTemp = "#" + wallLocation[i];
		$divTemp = $(divTemp);
		$divTemp.addClass('wall');
		$divTemp.addClass('inaccessibleByCat');
		$divTemp.addClass('inaccessibleByMouse');
	}
	for (var i = 0; i < portalLocationBlue.length; i++) {
		var portalBlueDiv = "#" + portalLocationBlue[i];
		$(portalBlueDiv).addClass('portalBlue');
	}
	for (var i = 0; i < portalLocationRed.length; i++) {
		var portalRedDiv = "#" + portalLocationRed[i];
		$(portalRedDiv).addClass('portalRed');
	}
	for (var i = 0; i < key1Location.length; i++) {
		var keyDiv = "#" + key1Location[i];
		$(keyDiv).addClass('key1');
	}
	for (var i = 0; i < key2Location.length; i++) {
		var keyDiv = "#" + key2Location[i];
		$(keyDiv).addClass('key2');
	}
	for (var i = 0; i < key3Location.length; i++) {
		var keyDiv = "#" + key3Location[i];
		$(keyDiv).addClass('key3');
	}
	for (var i = 0; i < lock1Location.length; i++) {
		var lockDiv = "#" + lock1Location[i];
		$lockDiv = $(lockDiv);
		$lockDiv.addClass('locked1');
		$lockDiv.addClass('inaccessibleByCat');
		$lockDiv.addClass('inaccessibleByMouse');
	}
	for (var i = 0; i < lock2Location.length; i++) {
		var lockDiv = "#" + lock2Location[i];
		$lockDiv = $(lockDiv);
		$lockDiv.addClass('locked2');
		$lockDiv.addClass('inaccessibleByCat');
		$lockDiv.addClass('inaccessibleByMouse');
	}
	for (var i = 0; i < lock3Location.length; i++) {
		var lockDiv = "#" + lock3Location[i];
		$lockDiv = $(lockDiv);
		$lockDiv.addClass('locked3');
		$lockDiv.addClass('inaccessibleByCat');
		$lockDiv.addClass('inaccessibleByMouse');
	}
	for (var i = 0; i < pipeVertLocation.length; i++) {
		var pipeDiv = "#" + pipeVertLocation[i];
		$pipeDiv = $(pipeDiv);
		$pipeDiv.addClass('pipe');
		$pipeDiv.addClass('pipeVert');
		$pipeDiv.addClass('inaccessibleByCat');
		if(pipeVertAlignment[i] == 1){		//1 == vertical. 2 == horizotal.
			$pipeDiv.addClass('pipeUp');
			$pipeDiv.addClass('pipeDown');
		}
		else{
			$pipeDiv.addClass('rotate90');
			$pipeDiv.addClass('pipeLeft');
			$pipeDiv.addClass('pipeRight');
		}
	}
	for (var i = 0; i < pipeCornerLocation.length; i++) {
		var pipeDiv = "#" + pipeCornerLocation[i];
		$pipeDiv = $(pipeDiv);
		$pipeDiv.addClass('pipe');
		$pipeDiv.addClass('pipeCorner');
		$pipeDiv.addClass('inaccessibleByCat');
		if(pipeCornerAlignment[i] == 1){	//1 == left/up. 2 == up/right(90deg). 3 == right/down(180deg). 4 == down/left(270deg).
			$pipeDiv.addClass('pipeUp');
			$pipeDiv.addClass('pipeLeft');
		}
		else if(pipeCornerAlignment[i] == 2){
			$pipeDiv.addClass('rotate90');
			$pipeDiv.addClass('pipeUp');
			$pipeDiv.addClass('pipeRight');
		}
		else if(pipeCornerAlignment[i] == 3){
			$pipeDiv.addClass('rotate180');
			$pipeDiv.addClass('pipeRight');
			$pipeDiv.addClass('pipeDown');
		}
		else if(pipeCornerAlignment[i] == 4){
			$pipeDiv.addClass('rotate270');
			$pipeDiv.addClass('pipeDown');
			$pipeDiv.addClass('pipeLeft');
		}
	}
	for (var i = 0; i < pipeTLocation.length; i++) {
		var pipeDiv = "#" + pipeTLocation[i];
		$pipeDiv = $(pipeDiv);
		$pipeDiv.addClass('pipe');
		$pipeDiv.addClass('pipeT');
		$pipeDiv.addClass('inaccessibleByCat');
		if(pipeTAlignment[i] == 1){	//1 == not up(0deg). 2 == not right(90deg). 3 == not bottom(180deg). 4 == not left(270deg).
			$pipeDiv.addClass('pipeLeft');
			$pipeDiv.addClass('pipeRight');
			$pipeDiv.addClass('pipeDown');
		}
		else if(pipeTAlignment[i] == 2){
			$pipeDiv.addClass('rotate90');
			$pipeDiv.addClass('pipeLeft');
			$pipeDiv.addClass('pipeUp');
			$pipeDiv.addClass('pipeDown');
		}
		else if(pipeTAlignment[i] == 3){
			$pipeDiv.addClass('rotate180');
			$pipeDiv.addClass('pipeLeft');
			$pipeDiv.addClass('pipeRight');
			$pipeDiv.addClass('pipeUp');
		}
		else if(pipeTAlignment[i] == 4){
			$pipeDiv.addClass('rotate270');
			$pipeDiv.addClass('pipeRight');
			$pipeDiv.addClass('pipeUp');
			$pipeDiv.addClass('pipeDown');
		}
	}
	for (var i = 0; i < pipeFourWayLocation.length; i++) {
		var pipeDiv = "#" + pipeFourWayLocation[i];
		$pipeDiv = $(pipeDiv);
		$pipeDiv.addClass('pipe');
		$pipeDiv.addClass('pipeFourWay');
		$pipeDiv.addClass('inaccessibleByCat');
		$pipeDiv.addClass('pipeLeft');
		$pipeDiv.addClass('pipeRight');
		$pipeDiv.addClass('pipeUp');
		$pipeDiv.addClass('pipeDown');
	}
	for (var i = 0; i < cat1Location.length; i++) {
		var cat1Div = "#" + cat1Location[i];
		$(cat1Div).addClass('cat');
		$(cat1Div).addClass('cat1');
	}
	for (var i = 0; i < cat2Location.length; i++) {
		var cat2Div = "#" + cat2Location[i];
		$(cat2Div).addClass('cat');
		$(cat2Div).addClass('cat2');
	}
	for (var i = 0; i < cat3Location.length; i++) {
		var cat3Div = "#" + cat3Location[i];
		$(cat3Div).addClass('cat');
		$(cat3Div).addClass('cat3');
	}
}


function showAllCheese(time){
	if(!mazeVisible){			//reveals cheeses for 2 secs
		for (var i = 0; i < cheeseLocation.length; i++) {
				var divTemp = "#" + cheeseLocationX[i] +'-'+ cheeseLocationY[i];
				if ($(divTemp).hasClass('cheese'))
					$(divTemp).removeClass('dark');
			}
		setTimeout(function(){
			for (var i = 0; i < cheeseLocation.length; i++) {
				var divTemp = "#" + cheeseLocationX[i] +'-'+ cheeseLocationY[i];
				$(divTemp).addClass('dark');
			}
			
			updateLineOfSight();
		}, time);
		cheeseFlash();
	}
}


function showCheese(time){
	if(!mazeVisible){		//reveals one cheese
		var flashed = false;
		while(!flashed){
			var randomNum = Math.floor((Math.random()*cheeseLocationX.length));
			var randomCheese = "#" + cheeseLocationX[randomNum] +'-'+ cheeseLocationY[randomNum];
			if ($(randomCheese).hasClass('cheese')){
				$(randomCheese).removeClass('dark');
				flashed = true;
			}
		}
		setTimeout(function(){
			$(randomCheese).addClass('dark');
			updateLineOfSight();
		}, time);
		cheeseFlash();
	}
}




function visibleOn(){
	mazeVisible = true;
	if(gameReady)
		updateLineOfSight();
}
function visibleOff(){
	mazeVisible = false;
	if(gameReady)
		updateLineOfSight();
}



function cheeseFlash(){
	if(cheeseCount > 2)
		timeOuts['cheeseFlash'] = setTimeout('showCheese(700);',25000);
	else
		timeOuts['cheeseFlash'] = setTimeout('showCheese(400);',15000);
}



////////////////////////////////////////////////////////////////////////
/////////////////////////// map elements ///////////////////////////////
////////////////////////////////////////////////////////////////////////





function checkForCheese(mouseLocationSent){
	var $mouseLocationSent = $(mouseLocationSent);
	if($mouseLocationSent.hasClass("cheese")){
		$mouseLocationSent.removeClass('cheese');
		for(var j = 0; j < cheeseLocation.length; j++){
			if(mouseLocationSent == cheeseLocation[j])
				cheeseLocation.splice(i,1);
		}
		cheeseCount--;
		$("#cheeseCount").html("-" + cheeseCount);
		if(cheeseCount < 1) {
			if(timedRecords2[levelNum] == undefined || timedRecords2[levelNum] == null || timedRecords2[levelNum] > currentTimer){
					timedRecords2[levelNum] = currentTimer;
					//localStorage.timedRecords2[levelNum] = currentTimer;
					var totalTimerTemp = 0;
					for(var i = 1; i < timedRecords2.length; i++){
						totalTimerTemp += timedRecords2[i];
					}
					timedRecords2[0] = totalTimerTemp;

					localStorage.timedRecords2 = JSON.stringify(timedRecords2);
				}
				levelNum++;
				if(levelToBeat2 < levelNum){
					localStorage.levelToBeat2 = levelNum;
				}
				clearTimeOuts();
				$("#message").html("Mmmmm!");
				gameReady = false;
				visibleOn();
				document.getElementById("resetButton").innerHTML="Next Level";
				//$("#resetText").addClass('glow');   //makeObvious
				$("#resetButton").addClass('trail');
		}
	}
}


function checkForPortal(mouseLocationSent, i){
	if (mouseLocationSent.attr('id') == portalLocationRed[0]) {
		if(portalLocationRed.length < 2)
			return; 
		var newMouseLocation = "#" + portalLocationRed[1];
		var $newMouseLocation = $(newMouseLocation);
		mouseLocationSent.removeClass('mouse');
		$(newMouseLocation).addClass('mouse');
		if(i == 0){
			$newMouseLocation.addClass('portalRedWithMouseBlue');
			mouseLocationSent.removeClass('mouseBlue');
			$newMouseLocation.addClass('mouseBlue');
		}
		else{
			$newMouseLocation.addClass('portalRedWithMouseRed');
			mouseLocationSent.removeClass('mouseRed');
			$newMouseLocation.addClass('mouseRed');
		}
		mouseLocation[i] = portalLocationRed[1];
		mouseLocationX[i] = portalLocationRedX[1];
		mouseLocationY[i] = portalLocationRedY[1];
	}
	else if (mouseLocationSent.attr('id') == portalLocationRed[1]) {
		if(portalLocationRed.length < 2)
			return;
		var newMouseLocation = "#" + portalLocationRed[0];
		var $newMouseLocation = $(newMouseLocation);
		mouseLocationSent.removeClass('mouse');
		$newMouseLocation.addClass('mouse');
		if(i == 0){
			$newMouseLocation.addClass('portalRedWithMouseBlue');
			mouseLocationSent.removeClass('mouseBlue');
			$newMouseLocation.addClass('mouseBlue');
		}
		else{
			$newMouseLocation.addClass('portalRedWithMouseRed');
			mouseLocationSent.removeClass('mouseRed');
			$newMouseLocation.addClass('mouseRed');
		}
		mouseLocation[i] = portalLocationRed[0];
		mouseLocationX[i] = portalLocationRedX[0];
		mouseLocationY[i] = portalLocationRedY[0];
	}

	else if (mouseLocationSent.attr('id') == portalLocationBlue[0]) {
		if(portalLocationBlue.length < 2)
			return;
		var newMouseLocation = "#" + portalLocationBlue[1];
		var $newMouseLocation = $(newMouseLocation);
		mouseLocationSent.removeClass('mouse');
		$newMouseLocation.addClass('mouse');
		if(i == 0){
			$newMouseLocation.addClass('portalBlueWithMouseBlue');
			mouseLocationSent.removeClass('mouseBlue');
			$newMouseLocation.addClass('mouseBlue');
		}
		else{
			$newMouseLocation.addClass('portalBlueWithMouseRed');
			mouseLocationSent.removeClass('mouseRed');
			$newMouseLocation.addClass('mouseRed');
		}
		mouseLocation[i] = portalLocationBlue[1];
		mouseLocationX[i] = portalLocationBlueX[1];
		mouseLocationY[i] = portalLocationBlueY[1];
	}
	else if (mouseLocationSent.attr('id') == portalLocationBlue[1]) {
		if(portalLocationBlue.length < 2)
			return;
		var newMouseLocation = "#" + portalLocationBlue[0];
		var $newMouseLocation = $(newMouseLocation);
		mouseLocationSent.removeClass('mouse');
		$newMouseLocation.addClass('mouse');
		if(i == 0){
			$newMouseLocation.addClass('portalBlueWithMouseBlue');
			mouseLocationSent.removeClass('mouseBlue');
			$newMouseLocation.addClass('mouseBlue');
		}
		else{
			$newMouseLocation.addClass('portalBlueWithMouseRed');
			mouseLocationSent.removeClass('mouseRed');
			$newMouseLocation.addClass('mouseRed');
		}
		mouseLocation[i] = portalLocationBlue[0];
		mouseLocationX[i] = portalLocationBlueX[0];
		mouseLocationY[i] = portalLocationBlueY[0];
	}
}

function checkForKey(mouseLocationSent){
	if(mouseLocationSent.hasClass('key1')){
		mouseLocationSent.removeClass('key1');
		key1Count++;
		$("#key1Count").html("-" + key1Count);
	}
	if(mouseLocationSent.hasClass('key2')){
		mouseLocationSent.removeClass('key2');
		key2Count++;
		$("#key2Count").html("-" + key2Count);
	}
	if(mouseLocationSent.hasClass('key3')){
		mouseLocationSent.removeClass('key3');
		key3Count++;
		$("#key3Count").html("-" + key3Count);
	}

	// for (var i = 0; i < key1Location.length; i++) {
	// 	if (mouseLocationSent.attr('id') == key1Location[i]) {
	// 		var oldKeyLocation = "#" + key1Location[i];
	// 		$(oldKeyLocation).removeClass('key1');
	// 		key1Location.splice(i,1);
	// 		key1Count++;
	// 		$("#key1Count").html("Keys: " + key1Count);
	// 	}
	// }
}

function checkForLock(lookAheadTemp, i){
	if(lookAheadTemp.hasClass('locked1')){
			if(key1Count > 0){
				key1Count--;
				$("#key1Count").html("-" + key1Count);
				lookAheadTemp.removeClass('inaccessibleByCat');
				lookAheadTemp.removeClass('inaccessibleByMouse');
				lookAheadTemp.removeClass('locked1');
				lookAheadTemp.addClass('unlocked1');
				if(i==0)
					lookAheadTemp.addClass('unlocked1WithMouseBlue');
				else 
					lookAheadTemp.addClass('unlocked1WithMouseRed');
				return true; //you got through the lock with your key
			}
			return false;	//there was a lock, but you have no key
	}
	else if(lookAheadTemp.hasClass('unlocked1')){  //there was an opened lock, add pic of mouse on lock
		if(i==0)
			lookAheadTemp.addClass('unlocked1WithMouseBlue');
		else 
			lookAheadTemp.addClass('unlocked1WithMouseRed');
	}

	else if(lookAheadTemp.hasClass('locked2')){
			if(key2Count > 0){
				key2Count--;
				$("#key2Count").html("-" + key2Count);
				lookAheadTemp.removeClass('inaccessibleByCat');
				lookAheadTemp.removeClass('inaccessibleByMouse');
				lookAheadTemp.removeClass('locked2');
				lookAheadTemp.addClass('unlocked2');
				if(i==0)
					lookAheadTemp.addClass('unlocked2WithMouseBlue');
				else 
					lookAheadTemp.addClass('unlocked2WithMouseRed');
				return true; //you got through the lock with your key
			}
			return false;	//there was a lock, but you have no key
	}
	else if(lookAheadTemp.hasClass('unlocked2')){  //there was an opened lock, add pic of mouse on lock
		if(i==0)
			lookAheadTemp.addClass('unlocked2WithMouseBlue');
		else 
			lookAheadTemp.addClass('unlocked2WithMouseRed');
	}

	else if(lookAheadTemp.hasClass('locked3')){
			if(key3Count > 0){
				key3Count--;
				$("#key3Count").html("-" + key3Count);
				lookAheadTemp.removeClass('inaccessibleByCat');
				lookAheadTemp.removeClass('inaccessibleByMouse');
				lookAheadTemp.removeClass('locked3');
				lookAheadTemp.addClass('unlocked3');
				if(i==0)
					lookAheadTemp.addClass('unlocked3WithMouseBlue');
				else 
					lookAheadTemp.addClass('unlocked3WithMouseRed');
				return true; //you got through the lock with your key
			}
			return false;	//there was a lock, but you have no key
	}
	else if(lookAheadTemp.hasClass('unlocked3')){  //there was an opened lock, add pic of mouse on lock
		if(i==0)
			lookAheadTemp.addClass('unlocked3WithMouseBlue');
		else 
			lookAheadTemp.addClass('unlocked3WithMouseRed');
	}
	return true;			//there's no lock, proceed.
}


function checkForPipe(oldMouseLocation2, newMouseLocation2, i){
	if(i==0)
		var toCheck = mouseLocation[1];
	else
		var toCheck = mouseLocation[0];
	if(oldMouseLocation2.hasClass('pipeVertWithMouse') && (oldMouseLocation2.attr('id') != toCheck))
		oldMouseLocation2.removeClass('pipeVertWithMouse');
	if(oldMouseLocation2.hasClass('pipeCornerWithMouse') && (oldMouseLocation2.attr('id') != toCheck))
		oldMouseLocation2.removeClass('pipeCornerWithMouse');
	if(oldMouseLocation2.hasClass('pipeTWithMouse') && (oldMouseLocation2.attr('id') != toCheck))
		oldMouseLocation2.removeClass('pipeTWithMouse');
	if(oldMouseLocation2.hasClass('pipeFourWayWithMouse') && (oldMouseLocation2.attr('id') != toCheck))
		oldMouseLocation2.removeClass('pipeFourWayWithMouse');
	if(newMouseLocation2.hasClass('pipeVert'))
		newMouseLocation2.addClass('pipeVertWithMouse');
	if(newMouseLocation2.hasClass('pipeCorner'))
		newMouseLocation2.addClass('pipeCornerWithMouse');
	if(newMouseLocation2.hasClass('pipeT'))
		newMouseLocation2.addClass('pipeTWithMouse');
	if(newMouseLocation2.hasClass('pipeFourWay'))
		newMouseLocation2.addClass('pipeFourWayWithMouse');
}

function checkForDeadMouse(newMouseLocation2, i){
	var otherMouse;
	if(i == 0)
		otherMouse = 1;
	else
		otherMouse = 0;
	if(mousesAlive[i] && mousesAlive[otherMouse] == false && mouseLocation[0] == mouseLocation[1]){
		mousesAlive[otherMouse] = true;
		newMouseLocation2.removeClass('skullRed').removeClass('skullBlue');
	}
}

function checkSquare(oldMouseLocation2, newMouseLocation2, i){
	checkForCheese(newMouseLocation2);
	checkForKey(newMouseLocation2);
	checkForPortal(newMouseLocation2, i);
	checkForPipe(oldMouseLocation2, newMouseLocation2, i);
	checkSpotToFixPicAsMouse(oldMouseLocation2);
	checkForCatch();
	checkForDeadMouse(newMouseLocation2, i);
	updateLineOfSight();

	if(firstMove){
		letCatsLoose();
		startTimer();
	}
}


function letCatsLoose(){
	cat1Move(750);	
	cat2Move(600);
	cat3Move(500);
	firstMove = false;
}




function startTimer(){
	timeOuts['timerTimeOuts'] = setTimeout("tick()", 1000);
}

function tick(){
	currentTimer++;
    updateTimer();
    startTimer();
}

function updateTimer(){
	var time = modifyTime(currentTimer);
	var timerText = document.getElementById('timerID');
	if(timerText != null)
		timerText.innerHTML = 'Timer:  ' + time;
}

function modifyTime(time){
	var newTime = 0;
	var mins = 0;
	var secs = time;
	while(secs >= 60){
		mins++;
		secs -= 60;
	}
	if(secs < 10)
		newTime = mins + ":0" + secs;
	else
		newTime = mins + ":" + secs;

	return newTime;
}




$(document).keydown(function(e){
	//console.log(e.which);
	if(gameReady){
		if(!paused){
			// first mouse, with the 'wasd' controls
			if(mousesAlive[0]){
				if(e.which == 65) {  //a key
					moveLeft(0);
				}
				if(e.which == 87) {  //w key
					moveUp(0);
				}
				if(e.which == 68) {  //d key
					moveRight(0);
				}
				if(e.which == 83) {  //s key
					moveDown(0);
				}
			}

			// second mouse, with the arrow keys or the number pad arrow keys
			if(mousesAlive[1]){
				if(e.which == 37 || e.which == 100) {
					moveLeft(1);
				}
				if(e.which == 38 || e.which == 104) {
					moveUp(1);
				}
				if(e.which == 39 || e.which == 102) {
					moveRight(1);
				}
				if(e.which == 40 || e.which == 98) {
					moveDown(1);
				}
			}
		}

		if(e.which == 32) {  //space key for pausing
			pauseGame();
		}
	}
	if(e.which == 13) {	 //enter key for restarting/next level
		startGame();
	}
	if(e.which == 27){  //escape key for going to the main menu
		resetGame();
	}

});



$(function(){
	//localStorage.removeItem('timedRecords2');
	levelToBeat2 = localStorage.levelToBeat2;
	if(levelToBeat2 == undefined)
		levelToBeat2 = 1;

	timedRecords2 = eval('(' + localStorage.timedRecords2 + ')');
	if(timedRecords2 == undefined || timedRecords2 == null || timedRecords2.length == 0){
		timedRecords2 = new Array;
		timedRecords2[0] = 0;
	}
	localStorage.timedRecords2 = JSON.stringify(timedRecords2);
	//console.log("timedRecords2 " + timedRecords2.length + "   -" +timedRecords2);
});