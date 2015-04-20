function setUpMazeElements(levelNumSelected){

	switch(levelNumSelected){
		case 1:
			$("#message").html("");
			$("#level").html("Level: 1");
			$("#cheeseCount").html("Cheese Left: 1");
			mazeSizeX = 14;
			mazeSizeY = 14;
			mouseLocationX = [0,1];
			mouseLocationY = [0,0];
			mouseLocation = ['0-0','1-0'];
			cheeseLocationX = [9];
			cheeseLocationY = [11];
			cheeseLocation = ['9-11'];
			cheeseCount = 1;
			wallLocation = ['6-3','6-4','6-5','7-6','7-7','7-8','8-8'];
			break;

		case 1: 			// first maze made for testing, by Taft
			$("#message").html("I left you some cheese, good luck finding them. \n  -Squeaky");
			$("#level").html("Level: 1");
			$("#cheeseCount").html("Cheese Left: 4");
			mazeSizeX = 14;						//The Taft standard testing size.  X = width. Y = Height.
			mazeSizeY = 14;
			mouseLocationX = [0,12];
			mouseLocationY = [0,1];
			mouseLocation = ['0-0','12-1'];
			cheeseLocationX = [13,2,8,13];
			cheeseLocationY = [1,6,9,13];
			cheeseLocation = ['13-1','2-6','8-9','13-13'];
			cheeseCount = 4;
			wallLocation = ['1-0','5-0','6-0','7-0','11-0','12-0','13-0','1-1','3-1','7-1','9-1','3-2','4-2','5-2','9-2','11-2','12-2','13-2','0-3','1-3','3-3','7-3','9-3','11-3','12-3','3-4','4-4','5-4','7-4','1-5','3-5','7-5','8-5','9-5','11-5','12-5','1-6','3-6','5-6','7-6','1-7','2-7','3-7','5-7','7-7','9-7','10-7','12-7','13-7','5-8','7-8','8-8','9-8','0-9','2-9','4-9','5-9','9-9','11-9','12-9','13-9','5-10','6-10','8-10','9-10','1-11','2-11','3-11','8-11','11-11','12-11','3-12','5-12','7-12','8-12','10-12','11-12','12-12','0-13','1-13','5-13','7-13','12-13'];
			break;



/////////////////////////////////////////////////////////////////
////////////////////// Testing Mazes ////////////////////////////
/////////////////////////////////////////////////////////////////



		default: 
			$("#message").html("I said you win! Be patient, more will come.");
			visibleOn();
			loaded = false; 	//just for mazeMaker.js loadingMaze function
	}
}