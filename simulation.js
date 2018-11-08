
var doors;//an array to hold the door values
var firstChoiceCounter = 0;
var secondChoiceCounter = 0;

function RunSimulation(){
  console.log("running simulation...");
  doors = new Array();

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
