$(document).ready(init);

function init(){
  $("#openOrb").on("click", openOrb);
};

function openOrb(e){
  e.preventDefault(); //prevent page refresh/POST to this page
  $(this).attr("disabled", true);

  let orbtype = $("input[name=orbtype]:checked").val();

  var posting = $.ajax({
    type : 'POST',
    url: "/",
    dataType: 'json',
    data: JSON.stringify({"orbtype": orbtype}),
    contentType: 'application/json; charset=UTF-8'
  });

  posting.done(function (xhr) {
    addToHistory(xhr);
    updateOrbCount();

    //update the dropzone
    $("#char-name").text(xhr.prize.char);
    $("#shard-amt").text("x"+xhr.prize.amt);
    $("#char-image").html('<img src="/images/roster.png">'); /*probably don't need this.
                                                              need to set margin-top instead*/

    $("#openOrb").removeAttr("disabled");
  });

  posting.always(function (xhr){
    $("#openOrb").removeAttr("disabled");
  });
};

function addToHistory(newPrize){
  let name = newPrize.prize.char;
  name = name.replace(/\s+/g, '');

  let prevCharDrops = $("#chestbox").find("#"+ name);

  if(prevCharDrops.length > 0){
    let prevAmt = +(prevCharDrops.find("#"+ name +"Amt").text());
    let newAmt = prevAmt + newPrize.prize.amt;
    prevCharDrops.find("#"+ name +"Amt").text(newAmt);
  }
  else{
    //create new element
    let newChar = $('<div id="' + name + '" class="historicDrop grid-item">');
    let newCharText = $('<div class="portraitName">' + newPrize.prize.char + '</div><div>x<span id="' + name + 'Amt">' + newPrize.prize.amt + '</span></div></div>');
    let newCharDiv = $('<div class="historic-image"></div>');
    let newCharImg = $('<img src="/images/roster.png">');


    newCharDiv.append(newCharImg);
    newChar.append(newCharDiv);
    newChar.append(newCharText);
    $("#chestbox").append(newChar);
  }
}

function updateOrbCount() {
  let currentCount = $("#orbCount").text();
   $("#orbCount").text(++currentCount);
}
