var boxes = $(".box");
var resetbtn = $("#reset-btn");

let turn0 = true;

let winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function allBoxesClicked() {
    let allClicked = true;
    $(".box").each(function() {
      if ($(this).text() === "") {
        allClicked = false;
        return false; // Break the loop if any box is empty
      }
    });
    return allClicked;
  }
//win patterns [0,3,6]  [1,4,7] [2,5,8]
// [0,1,2] [3,4,5] [6,7,8]
// [0,4,8] [2,4,6]
boxes.each(function () {
  $(this).on("click", function () {
    $(this).text("X");
    if (turn0) {
      $(this).text("0");
      turn0 = false;
    } else {
      $(this).text("X");
      turn0 = true;
    }
    $(this).prop("disabled", "true");
    checkWinner();
  });
});
function resetGame() {  
  turn0 = true;
  enableBoxes();
  $("h2").text("");
  $("#new-btn").addClass("hide");
  $("#reset-btn").removeClass("hide2");

}
function showWinner(winner) {
  $("h2").text("Congratulations winner is " + winner);
  $("#new-btn").removeClass("hide");
  $("#reset-btn").addClass("hide2");
}
function enableBoxes() {
  $(".box").text("");
  $(".box").prop("disabled", false);
}
function checkWinner() {
  for (pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        $(".box").prop("disabled", "true");
        showWinner(pos1Val);
      }
      else if(allBoxesClicked()) {
        $("h2").text("Match is Tied");
        $("#new-btn").removeClass("hide");
        $("#reset-btn").addClass("hide2");
      }
    }
  }
}
$("#reset-btn").on("click", function()
{
    resetGame();
    $("#reset-btn").addClass("pressed");
    setTimeout(function()
{
    $("#reset-btn").removeClass("pressed");
}, 100)
});

$("#new-btn").on("click", resetGame);
