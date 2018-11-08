
var doors;//an array to hold the door values

function RunSimulation(){
  console.log("running simulation...");
  doors = new Array();
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
}
