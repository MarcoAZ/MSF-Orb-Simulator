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
    if(xhr.prize != undefined){
      addToHistory(xhr);
      updateOrbCount(orbtype);

      //update the dropzone
      $("#char-name").text(xhr.prize.char);
      $("#shard-amt").text("x"+xhr.prize.amt);
      $("#char-image").html('<img src="/images/roster.png">'); /*probably don't need this. need to set margin-top instead*/
      $("#char-image > img").css({"margin-top": "-" + xhr.prize.BGPosition + "px"});
    }

    $("#openOrb").removeAttr("disabled");
  });

  posting.always(function (xhr){
    $("#openOrb").removeAttr("disabled");
  });
};
