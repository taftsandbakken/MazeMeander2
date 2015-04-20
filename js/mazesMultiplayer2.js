function setUpMazeElements(levelNumSelected){

	switch(levelNumSelected){
		case 1: 			//a basic level to let two player warm up. by Taft
			$("#message").html("I left you some cheese, good luck finding them! -Squeaky");
			$("#level").html("Level: 1");
			$("#cheeseCount").html("-6");
			$("#key1Count").html("");
			$("#key2Count").html("");
			$("#key3Count").html("");
			mazeSizeX = 14;
			mazeSizeY = 14;
			mouseLocationX = [0,13];
			mouseLocationY = [0,0];
			mouseLocation = ['0-0','13-0'];
			cheeseLocationX = [6,0,9,1,13,6];
			cheeseLocationY = [0,3,5,12,12,13];
			cheeseLocation = ['6-0','0-3','9-5','1-12','13-12','6-13'];
			cheeseCount = 6;
			wallLocation = ['2-0','5-0','7-0','8-0','5-1','11-1','12-1','0-2','1-2','2-2','3-2','9-2','10-2','11-2','3-3','4-3','8-3','9-3','0-4','1-4','5-4','6-4','8-4','4-5','6-5','8-5','10-5','0-6','1-6','2-6','6-6','8-6','10-6','12-6','13-6','2-7','3-7','6-7','8-7','12-7','1-8','2-8','3-8','4-8','6-8','8-8','9-8','4-9','9-9','5-10','11-10','12-10','13-10','1-11','2-11','9-11','10-11','2-12','3-12','4-12','6-12','7-12','9-12','12-12','2-13','7-13','12-13','13-13'];
			break;


		case 2: 			//basic level where each mouse must find a key to let the other mouse through a lock to get all the cheeses. by Taft
			$("#message").html("You'll need to help each other out if you want all of the cheeses. Good thing you can share keys. -Squeaky");
			$("#level").html("Level: 2");
			$("#cheeseCount").html("-5");
			$("#key1Count").html("-0");
			$("#key2Count").html("-0");
			$("#key3Count").html("");
			mazeSizeX = 18;
			mazeSizeY = 12;
			mouseLocationX = [0,17];
			mouseLocationY = [0,5];
			mouseLocation = ['0-0','17-5'];
			cheeseLocationX = [9,9,13,1,13];
			cheeseLocationY = [0,2,9,11,11];
			cheeseLocation = ['9-0','9-2','13-9','1-11','13-11'];
			cheeseCount = 5;
			key1Location = ['17-10'];
			key1Count = 0;
			key2Location = ['10-5'];
			key2Count = 0;
			lock1Location = ['2-0'];
			lock2Location = ['9-7'];
			wallLocation = ['7-0','8-0','11-0','0-1','1-1','5-1','8-1','9-1','13-1','14-1','15-1','16-1','4-2','5-2','10-2','12-2','3-3','4-3','10-3','11-3','15-3','16-3','17-3','2-4','3-4','7-4','9-4','10-4','13-4','6-5','7-5','9-5','12-5','16-5','0-6','1-6','2-6','3-6','4-6','9-6','10-6','11-6','14-6','16-6','7-7','11-7','12-7','14-7','16-7','1-8','2-8','3-8','4-8','5-8','6-8','9-8','12-8','14-8','16-8','0-9','1-9','9-9','11-9','12-9','14-9','0-10','3-10','4-10','5-10','6-10','8-10','9-10','12-10','13-10','14-10','0-11','4-11','10-11','14-11','15-11','16-11','17-11'];
			break;
	

		case 3: 			//a maze requiring all three colors of keys to be found to get to the end. by Taft
			$("#message").html("Don't get lost as you help each other find all the keys. -Squeaky");
			$("#level").html("Level: 3");
			$("#cheeseCount").html("-1");
			$("#key1Count").html("-0");
			$("#key2Count").html("-0");
			$("#key3Count").html("-0");
			mazeSizeX = 18;
			mazeSizeY = 12;
			mouseLocationX = [0,17];
			mouseLocationY = [11,0];
			mouseLocation = ['0-11','17-0'];
			cheeseLocationX = [8];
			cheeseLocationY = [5];
			cheeseLocation = ['8-5'];
			cheeseCount = 1;
			portalLocationBlueX = [14,17];
			portalLocationBlueY = [11,11];
			portalLocationBlue = ['14-11','17-11'];
			portalLocationRedX = [11,8];
			portalLocationRedY = [0,6];
			portalLocationRed = ['11-0','8-6'];
			key1Location = ['15-11'];
			key1Count = 0;
			key2Location = ['1-0'];
			key2Count = 0;
			key3Location = ['0-7'];
			key3Count = 0;
			lock1Location = ['0-6'];
			lock2Location = ['17-7'];
			lock3Location = ['10-1'];
			wallLocation = ['4-0','9-0','12-0','16-0','1-1','3-1','4-1','5-1','6-1','7-1','9-1','11-1','12-1','14-1','16-1','15-2','16-2','1-3','2-3','3-3','4-3','5-3','6-3','8-3','13-3','8-4','10-4','11-4','14-4','16-4','1-5','3-5','5-5','7-5','9-5','14-5','1-6','3-6','5-6','6-6','7-6','9-6','10-6','11-6','12-6','14-6','16-6','1-7','3-7','5-7','8-7','10-7','16-7','0-8','1-8','7-8','10-8','12-8','14-8','16-8','5-9','7-9','8-9','12-9','14-9','16-9','2-10','4-10','5-10','10-10','11-10','14-10','15-10','16-10','2-11','4-11','7-11','8-11','13-11','16-11'];
			break;

		case 4:				//simple open maze with ominous cats. by Taft
			$("#message").html("These cats are simple minded and won't chase you, but they'll eat you if you get too close! -Squeaky");
			$("#level").html("Level: 4");
			$("#cheeseCount").html("-4");
			$("#key1Count").html("-0");
			$("#key2Count").html("");
			$("#key3Count").html("");
			mazeSizeX = 20;
			mazeSizeY = 12;
			mouseLocationX = [0,0];
			mouseLocationY = [4,6];
			mouseLocation = ['0-4','0-6'];
			cheeseLocationX = [0,12,10,0];
			cheeseLocationY = [2,6,7,10];
			cheeseLocation = ['0-2','12-6','10-7','0-10'];
			cheeseCount = 4;
			portalLocationBlueX = [0,19];
			portalLocationBlueY = [0,8];
			portalLocationBlue = ['0-0','19-8'];
			portalLocationRedX = [19,4];
			portalLocationRedY = [0,5];
			portalLocationRed = ['19-0','4-5'];
			key1Location = ['7-0'];
			key1Count = 0;
			lock1Location = ['16-7'];
			cat1LocationX = [11,1,11,5,14,15];
			cat1LocationY = [0,2,4,9,9,11];
			cat1Location = ['11-0','1-2','11-4','5-9','14-9','15-11'];
			wallLocation = ['2-0','3-0','9-0','15-0','9-1','4-2','6-2','12-2','13-2','14-2','18-2','19-2','0-3','1-3','7-3','9-3','10-3','11-3','14-3','16-3','2-4','3-4','4-4','9-4','15-4','16-4','5-5','9-5','12-5','16-5','17-5','2-6','3-6','4-6','9-6','10-6','13-6','14-6','17-6','0-7','1-7','11-7','12-7','13-7','15-7','17-7','5-8','7-8','0-9','1-9','3-9','6-9','9-9','17-9','1-10','3-10','6-10','7-10','8-10','9-10','13-10','14-10','15-10','17-10','18-10','6-11'];
			break;

		case 5: 			//introducing pipes and scary cats. by Taft
			$("#message").html("");
			$("#level").html("Level: 5");
			$("#cheeseCount").html("-4");
			$("#key1Count").html("");
			$("#key2Count").html("");
			$("#key3Count").html("");
			mazeSizeX = 18;
			mazeSizeY = 12;
			mouseLocationX = [0,0];
			mouseLocationY = [3,8];
			mouseLocation = ['0-3','0-8'];
			cheeseLocationX = [0,7,7,0];
			cheeseLocationY = [1,2,9,10];
			cheeseLocation = ['0-1','7-2','7-9','0-10'];
			cheeseCount = 4;
			pipeVertLocation = ['5-1','12-1','17-2','2-3','3-3','5-3','8-3','12-3','17-3','2-8','3-8','5-8','8-8','12-8','17-8','17-9','5-10','12-10'];
			pipeVertAlignment = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
			cat1LocationX = [2,15,2,15];
			cat1LocationY = [0,0,11,11];
			cat1Location = ['2-0','15-0','2-11','15-11'];
			cat2LocationX = [12,2,17,8];
			cat2LocationY = [4,5,6,7];
			cat2Location = ['12-4','2-5','17-6','8-7'];
			wallLocation = ['1-1','6-1','7-1','8-1','0-2','1-2','2-2','3-2','4-2','5-2','8-2','9-2','10-2','11-2','12-2','13-2','14-2','15-2','16-2','4-3','0-9','1-9','2-9','3-9','4-9','5-9','8-9','9-9','10-9','11-9','12-9','13-9','14-9','15-9','16-9','1-10','6-10','7-10','8-10'];
			break;



		case 6: 				//very complex pipe maze. by Taft
			$("#message").html("Human plumbing is nice for us, but can be a headache to navigate. -Squeaky");
			$("#level").html("Level: 6");
			$("#cheeseCount").html("-7");
			$("#key1Count").html("");
			$("#key2Count").html("");
			$("#key3Count").html("");
			mazeSizeX = 20;
			mazeSizeY = 12;
			mouseLocationX = [0,9];
			mouseLocationY = [0,11];
			mouseLocation = ['0-0','9-11'];
			cheeseLocationX = [18,19,5,18,19,16,0];
			cheeseLocationY = [0,0,1,1,1,8,11];
			cheeseLocation = ['18-0','19-0','5-1','18-1','19-1','16-8','0-11'];
			cheeseCount = 7;
			pipeVertLocation = ['3-0','4-0','5-0','6-0','7-0','8-0','9-0','12-0','13-0','14-0','15-0','16-0','1-1','6-1','7-1','9-1','12-1','13-1','14-1','1-2','2-2','5-2','6-2','8-2','10-2','11-2','13-2','14-2','17-2','0-3','2-3','3-3','5-3','7-3','13-3','0-4','7-4','8-4','11-4','13-4','15-4','19-4','12-5','13-5','14-5','0-6','3-6','8-6','10-6','13-6','14-6','18-6','1-7','2-7','6-7','12-7','13-7','18-7','1-8','2-8','3-8','4-8','6-8','7-8','8-8','9-8','11-8','17-8','18-8','0-9','2-9','3-9','4-9','7-9','8-9','12-9','13-9','0-10','1-10','3-10','4-10','6-10','10-10','12-10','13-10','14-10','1-11','3-11','4-11','6-11','12-11','13-11','14-11','15-11','16-11'];
			pipeVertAlignment = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,1,2,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,1,1,1,2,2,2,1,2,2,2,1,1,2,2,1,1,2,2,1,2,2,2,2,1,2,2,2,2,2,2,2,2];
			pipeCornerLocation = ['2-0','10-0','11-0','17-0','2-1','3-1','4-1','8-1','10-1','11-1','16-1','17-1','3-2','7-2','9-2','12-2','18-2','19-2','1-3','6-3','8-3','9-3','10-3','11-3','14-3','15-3','16-3','17-3','18-3','19-3','1-4','2-4','3-4','5-4','6-4','9-4','12-4','14-4','16-4','18-4','0-5','1-5','5-5','6-5','7-5','8-5','9-5','10-5','11-5','15-5','16-5','17-5','18-5','1-6','2-6','5-6','6-6','7-6','9-6','11-6','12-6','15-6','17-6','19-6','0-7','4-7','5-7','7-7','10-7','11-7','14-7','16-7','17-7','19-7','0-8','10-8','15-8','19-8','1-9','6-9','9-9','10-9','11-9','14-9','15-9','16-9','2-10','5-10','15-10','16-10','2-11','7-11','11-11'];
			pipeCornerAlignment = [3,4,3,4,1,3,4,4,1,2,4,2,1,4,3,4,4,3,3,4,2,1,3,1,4,3,1,3,2,1,2,4,3,4,2,4,1,1,3,4,2,4,3,4,3,4,2,1,3,1,3,1,2,1,1,1,2,1,3,1,3,1,4,1,3,1,3,4,3,1,2,1,2,4,3,2,1,1,3,4,2,4,3,1,3,3,3,4,1,2,2,1,2];
			pipeTLocation = ['0-1','15-1','0-2','4-2','15-2','12-3','10-4','2-5','19-5','4-6','3-7','8-7','15-7','12-8','13-8','14-8','5-9','17-9','18-9','19-9','7-10','8-10','9-10','18-10','19-10','5-11','17-11','18-11','19-11'];
			pipeTAlignment = [4,1,4,4,3,4,4,4,2,4,3,4,1,3,3,1,3,1,1,1,4,3,1,4,2,3,3,3,2];
			pipeFourWayLocation = ['16-2','4-3','4-4','17-4','3-5','4-5','16-6','9-7','5-8','11-10','17-10'];
			wallLocation = ['1-0','8-11','10-11'];
			break;


/////////////////////////////////////////////////////////////////
////////////////////// Testing Mazes ////////////////////////////
/////////////////////////////////////////////////////////////////



		case 100:
			$("#message").html("");
			$("#level").html("Level: 100");
			$("#cheeseCount").html("-4");
			$("#key1Count").html("-0");
			$("#key2Count").html("-0");
			$("#key3Count").html("-0");
			mazeSizeX = 14;
			mazeSizeY = 14;
			mouseLocationX = [0,1];
			mouseLocationY = [0,0];
			mouseLocation = ['0-0','1-0'];
			cheeseLocationX = [10,11,12,13];
			cheeseLocationY = [13,13,13,13];
			cheeseLocation = ['10-13','11-13','12-13','13-13'];
			cheeseCount = 4;
			portalLocationBlueX = [6,11];
			portalLocationBlueY = [7,11];
			portalLocationBlue = ['6-7','11-11'];
			portalLocationRedX = [10,3];
			portalLocationRedY = [4,13];
			portalLocationRed = ['10-4','3-13'];
			key1Location = ['5-0','7-0','9-4','0-9'];
			key1Count = 0;
			key2Location = ['9-0','10-0'];
			key2Count = 0;
			key3Location = ['11-0','12-0'];
			key3Count = 0;
			lock1Location = ['10-5','11-5','1-6','12-6','2-11'];
			lock2Location = ['13-2','13-3'];
			lock3Location = ['13-0','13-1'];
			pipeVertLocation = ['0-2','0-3','2-3','4-3','0-4','5-5','6-5','6-11','7-11'];
			pipeVertAlignment = [1,1,2,2,1,1,1,2,2];
			pipeCornerLocation = ['5-3','8-10','8-11'];
			pipeCornerAlignment = [4,3,1];
			pipeTLocation = ['5-1','7-2','3-3','3-5'];
			pipeTAlignment = [4,2,3,1];
			pipeFourWayLocation = ['5-4','6-4'];
			cat1LocationX = [3];
			cat1LocationY = [9];
			cat1Location = ['3-9'];
			cat3LocationX = [8];
			cat3LocationY = [8];
			cat3Location = ['8-8'];
			wallLocation = ['0-6','2-6','3-6','4-6','5-6','6-6','7-6','9-6','10-6','11-6','13-6','7-7','8-7','9-7','7-8','7-9','7-10','6-12','6-13'];
			break;


		default: 
			$("#message").html("I said you win! Be patient, more will come.");
			visibleOn();
			loaded = false; 	//just for mazeMaker.js loadingMaze function
	}
}