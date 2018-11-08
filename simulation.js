
var doors;//an array to hold the door values
var firstChoiceCounter = 0;//number of times the first choice was right
var secondChoiceCounter = 0;//number of times the second choice was right
var numberOfInstancesCounter = 0;//total number of simulations run
var gameState = "1stChoice";
var prizePlace;
var firstDoorChosen;

function PlayAgain(){
  gameState = "1stChoice";
  var instructions = "behind one of these doors is a prize, behind the other two, nothing."
  document.getElementById("instructions").innerHTML = instructions;


  var door0 = document.getElementById("door0");
  door0.disabled = false;
  door0.className = "door";

  var door1 = document.getElementById("door1");
  door1.disabled = false;
  door1.className = "door";

  var door2 = document.getElementById("door2");
  door2.disabled = false;
  door2.className = "door";

  document.getElementById("btmMessage").innerHTML = "<b>choose a door</b>";
}
function CalculateStats(){
  var percentFirstChoice = Math.floor((firstChoiceCounter/numberOfInstancesCounter)*1000)/10;
  var percentSecondChoice = Math.floor((secondChoiceCounter/numberOfInstancesCounter)*1000)/10;

  var statBox = '<h3>Statistics</h3><div id="statbar1">Stay with first door</div><div id="statbar2">Change door</div><div id="readOut"></div><button type="button" class="" onclick="ResetData()">reset all data</button>';
  document.getElementById("stats").innerHTML = statBox;

  document.getElementById("statbar1").style.width = ""+percentFirstChoice +"%";
  document.getElementById("statbar2").style.width = ""+percentSecondChoice +"%";

  document.getElementById("statbar1").innerHTML = "<h3>1st Choice</h3>" +"<h2>"+percentFirstChoice +"%";
  document.getElementById("statbar2").innerHTML = "<h3>2nd Choice</h3>"+"<h2>"+percentSecondChoice +"%";

  document.getElementById("readOut").innerHTML = getReadout(percentFirstChoice,percentSecondChoice);
}
function DeactivateWrongDoor(wrongDoor){
  var door = document.getElementById(("door"+wrongDoor))
  door.disabled = true;
  door.className = "emptyDoor";
}
function openDoor(playerChoice){
  if(gameState == "1stChoice"){
    firstDoorChosen = playerChoice;
    //place the prize
    prizePlace = Math.floor(Math.random() *3);
    var instructions = "Great. You have chosen door number " + (playerChoice+1) +".";
    var wrongDoor = -1;//set to negative one to signify not yet assigned

    //TODO make it move in a random direction to avoid predictability
    for(var i=0;i<3;i++){
      if(i != playerChoice && i != prizePlace){
        wrongDoor = i;
      }

    }
    DeactivateWrongDoor(wrongDoor);
    instructions += "the host has revealed that the prize was not behind door number " + (wrongDoor+1) +".";

    console.log("plaerChoice: " + playerChoice + " wrongDoor: " + wrongDoor +  " prizePlae: " + prizePlace);
    document.getElementById("instructions").innerHTML = instructions;
    gameState = "2ndChoice";

    document.getElementById("btmMessage").innerHTML = "<b>you can keep the same door or change to another</b>" ;
  }else if(gameState == "2ndChoice"){

    //check if the prize was in the first choice or in the second choice given
    if(prizePlace == firstDoorChosen){
      firstChoiceCounter++;
    }else{
      secondChoiceCounter++;
    }
    numberOfInstancesCounter++;
    CalculateStats();

    if(playerChoice == prizePlace){
      console.log("you win!");
      var instructions = "you win!!!";

      document.getElementById("instructions").innerHTML = instructions;
    }else{
      console.log("sorry, the prize was behind door number "+ (prizePlace+1));
      var instructions = "sorry, the prize was behind door number "+ (prizePlace+1);

      document.getElementById("instructions").innerHTML = instructions;
    }
    gameState = "gameOver";
    //press reset to play again
    document.getElementById("btmMessage").innerHTML = '<button type="button"   onclick="PlayAgain()">Play Again?</button>' ;


  }

}
function ResetData(){
  firstChoiceCounter = 0;
  secondChoiceCounter = 0;
  numberOfInstancesCounter = 0;
  var statBox = '<h3>stats</h3><p>No data to display.  Run some simulations to collect some data.';
  document.getElementById("stats").innerHTML = statBox;
}

function RunSimulation(numToRun){
  console.log("running simulation...");
  doors = new Array();

  for(var i=0;i<numToRun;i++){
    RunInstance(doors);
  }
  //calculate the percent
  //use math.floor so only one decimal place
  CalculateStats();
}
function getReadout(percentFirstChoice,percentSecondChoice){
  //analyizes the data and returns text based on that
  var readout = "<p>After " + numberOfInstancesCounter + " simulations. "
  readout += "<p>The first door the player chose was correct " + firstChoiceCounter + " times, or " + percentFirstChoice +"% of the time."
  readout += "<p>The second choice the player was offered was correct " + secondChoiceCounter + " times, or " + percentSecondChoice +"% of the time."
  readout += "<p><b>The data suggests that "
  if(firstChoiceCounter > secondChoiceCounter){
    readout += "the player should have stayed with the first door they chose.";
  }else if(firstChoiceCounter < secondChoiceCounter){
    readout += "the player should have changed doors when given the option.";
  }else{
    readout += "it doesn't seem to matter what door the player chooses.</b></p>";
  }
  return readout;
}
function RunInstance(doors){
  //runs an instance of the simulation
  console.log("running instance of monty hall...");
  //place the prize
  var prizePlace = Math.floor(Math.random() *3);
  console.log("prizePlace = " + prizePlace);

  for(var i=0;i<3;i++){
    if(i == prizePlace){
      doors[i] = 1;
    }else{
      doors[i] = 0;
    }

  }
  console.log("doors = " + doors);

  //pick a random door

  var playerChoice = Math.floor(Math.random() *3);
  console.log("player's choice = " + playerChoice);

  //reveal one wrong door and find the second choice
  var secondOption = FindSecondOption(playerChoice,doors);
  console.log("second option = " + secondOption);

  //evaluate which was better choice
  if(playerChoice == prizePlace){
    console.log("player should have stayed with first choice");
    firstChoiceCounter++;
  }else if(secondOption == prizePlace){
    console.log("player should have changed doors");
    secondChoiceCounter++;
  }else{
    console.log("something went wrong...");
  }
  console.log("firstChoice = " + firstChoiceCounter + " secondOption = " + secondChoiceCounter);
  numberOfInstancesCounter++;
}
function FindSecondOption(playerChoice,doors){
  //opens one door that does not contain the prize that the the player has not choosen
  var wrongDoor;//the wrong door that is opened
  for(var i=0;i<3;i++){
    //don't open the door the player has chosen
    if(i != playerChoice && doors[i] == 0){
      wrongDoor = i;
      console.log("wrong door = " + wrongDoor);
      break;
    }
  }
  for(var i=0;i<3;i++){
    //find the other choice
    if(i != playerChoice && i != wrongDoor){
      return i;
    }
  }


}
