function updateOrbCount(orbtype) {
  //find count for orb type
  let counter = $("#" + orbtype + "Counter");
  let currentCount = 0;

  if(counter.length != 0){
    //update
    currentCount = counter.text();
    counter.text(++currentCount);
  }
  else{
    //else create it, then update
    let newCounter = $('<p>' + orbtype + ': <span id="' + orbtype + 'Counter">1</span></p>');
    $("#counters").append(newCounter);
  }
}

function addToHistory(newPrize){
  let name = newPrize.prize.char;
  //remove spaces and periods to use as ID names
  name = name.replace(/\s+|\./g, '');

  let prevCharDrops = $("#chestbox").find("#"+ name);

  if(prevCharDrops.length > 0){
    let prevAmt = +(prevCharDrops.find("#"+ name +"Amt").text());
    let newAmt = prevAmt + newPrize.prize.amt;
    prevCharDrops.find("#"+ name +"Amt").text(newAmt);
  }
  else{
    //create new element
    let newChar = $('<div id="' + name + '" class="historicDrop grid-item">');
    let newCharText = $('<div class="portraitName">' + newPrize.prize.char.toUpperCase() + '</div><div>x<span id="' + name + 'Amt">' + newPrize.prize.amt + '</span></div></div>');
    let newCharDiv = $('<div class="historic-image"></div>');
    let newCharImg = $('<img src="/images/roster.png">');
    newCharImg.css({"margin-top": "-" + newPrize.prize.BGPosition + "px"});


    newCharDiv.append(newCharImg);
    newChar.append(newCharDiv);
    newChar.append(newCharText);
    $("#chestbox").prepend(newChar);
  }
}

function clearHistory() {
  $("#chestbox").empty();
  $("#counters").empty();
}
