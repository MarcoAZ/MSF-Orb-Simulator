$(document).ready(init);

function init(){
  $("#openOrb").on("click", openOrb);
  $("#clear").on("click", clearHistory);

    $("#slider").on('input', function() {
      $("#simAmt").html(this.value)
    });
};
