function openOrb(e){
  e.preventDefault(); //prevent page refresh/POST to this page
  let button = $(this);
  button.attr("disabled", true).text("OPENING...");

  let orbtype = $("input[name=orbtype]:checked").val();

  var posting = $.ajax({
    type : 'POST',
    url: "/",
    timeout: 1000,
    dataType: 'json',
    data: JSON.stringify({"orbtype": orbtype}),
    contentType: 'application/json; charset=UTF-8'
  });

  posting.done(function (xhr) {
    if(xhr.prize != undefined){
      addToHistory(xhr);
      updateOrbCount(orbtype);

      //update the dropzone
      $("#char-name").text(xhr.prize.char.toUpperCase());
      $("#shard-amt").text("x"+xhr.prize.amt);

      if($("#char-image").html() == ""){
        $("#char-image").html('<img src="/images/roster.png">');
      }
      $("#char-image > img").css({"margin-top": "-" + xhr.prize.BGPosition + "px"});

      $("#prize").effect("bounce");
    }
  });

  posting.always(function (xhr){
    //stop people from spamming button and causing odd behavior
    setTimeout(function () {
      button.removeAttr("disabled").text("OPEN");
    }, 500);
  });
};
