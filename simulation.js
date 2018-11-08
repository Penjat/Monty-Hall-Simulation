
var doors;//an array to hold the door values
var firstChoiceCounter = 0;//number of times the first choice was right
var secondChoiceCounter = 0;//number of times the second choice was right
var numberOfInstancesCounter = 0;//total number of simulations run

function RunSimulation(){
  console.log("running simulation...");
  doors = new Array();

  for(var i=0;i<100;i++){
    RunInstance(doors);
  }
  //calculate the percent
  //use math.floor so only one decimal place
  var percentFirstChoice = Math.floor((firstChoiceCounter/numberOfInstancesCounter)*1000)/10;
  var percentSecondChoice = Math.floor((secondChoiceCounter/numberOfInstancesCounter)*1000)/10;

  var statBox = '<h3>stats</h3><div id="statbar1">Stay with first door</div><div id="statbar2">Change door</div><div id="readOut"></div>';
  document.getElementById("stats").innerHTML = statBox;

  document.getElementById("statbar1").style.width = ""+percentFirstChoice +"%";
  document.getElementById("statbar2").style.width = ""+percentSecondChoice +"%";

  document.getElementById("statbar1").innerHTML = "<h3>1st Choice</h3>" +"<h2>"+percentFirstChoice +"%";
  document.getElementById("statbar2").innerHTML = "<h3>2nd Choice</h3>"+"<h2>"+percentSecondChoice +"%";

  document.getElementById("readOut").innerHTML = getReadout(percentFirstChoice,percentSecondChoice);
}
function getReadout(percentFirstChoice,percentSecondChoice){
  //analyizes the data and returns text based on that
  var readout = "<p>After " + numberOfInstancesCounter + " simulations. "
  readout += "<p>The first door the player chose was correct " + firstChoiceCounter + " times, or " + percentFirstChoice +"% of the time."
  readout += "<p>The second choice the player was offered was correct " + secondChoiceCounter + " times, or " + percentSecondChoice +"% of the time."
  readout += "<p>The data suggests that "
  if(firstChoiceCounter > secondChoiceCounter){
    readout += "the player should have stayed with the first door they chose.";
  }else if(firstChoiceCounter < secondChoiceCounter){
    readout += "the player should have changed doors when given the option.";
  }else{
    readout += "it doesn't seem to matter what door the player chooses.</p>";
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
