var sessionTime = 25;
var sessionTimeSec = 00;
var breakTime = 3;
var count = 0;
var defaultSessionTime = 25;

$(document).ready(function() {
  $("#breakTimeMinus").on("click", function(){
    if (breakTime > 1){
      breakTime--;  
    } else {
      window.alert("Break Time Can't be Zero");
    }    
    $("#breakTime").html(breakTime);
  });
  $("#breakTimePlus").on("click", function(){
    if (breakTime >= sessionTime){
      window.alert("Break Time Can't be more than Pomodoro Time");
    } else {
      breakTime++;  
    }    
    $("#breakTime").html(breakTime);
  });
  $("#sessionTimeMinus").on("click", function(){
    if ( sessionTime <= breakTime ){
      window.alert("Pomodoro Time can't be smaller than Break Time");
    } else {
      sessionTime--;
      defaultSessionTime = sessionTime;
    }
    $("#sessionTime").html(sessionTime);
  });
  $("#sessionTimePlus").on("click", function(){
    if (sessionTime < breakTime){
      window.alert("Gimme a correct time");
    }
    sessionTime++;
    defaultSessionTime = sessionTime;
    $("#sessionTime").html(sessionTime);
  });
  $("#start").on("click", function(){
    $("#start").attr("disabled",true);
    $("#pause").attr("disabled",false);
    var x = setInterval(function() {
      if(sessionTimeSec == 0){
        if(sessionTime == 0 && count%2 == 0){
          $("#timerHeader").html("Take a break.");
          sessionTime = breakTime;
          count++;
        } else if (sessionTime == 0){
          $("#timerHeader").html("Do your task!.");
          sessionTime = defaultSessionTime;
          count++;
        }
        sessionTime -- ;
        sessionTimeSec = 59;
      } else {
        sessionTimeSec --;
      }
      if ( count%2 == 0 ){
        var barWidth = sessionTime / defaultSessionTime;
      } else {
         var barWidth = sessionTime / breakTime;
      }
      barWidth = 1 - barWidth;
      barWidth = parseFloat(barWidth*100).toFixed(2);
      var barWidthSec = 1 - parseFloat(sessionTimeSec / 60.00).toFixed(2);
      barWidth = Number(barWidth) + Number(barWidthSec);
      $("#timer").html(sessionTime + ":" + sessionTimeSec);
      $("#bar").css({"width":barWidth + "%"})
      $("#pause").on("click", function(){
        $("#pause").attr("disabled",true);
        $("#start").attr("disabled",false);
        clearInterval(x);
      });
      $("#reset").on("click", function(){
        clearInterval(x);
        sessionTime = 25;
        sessionTimeSec = 00;
        breakTime = 3;
        $("#pause").attr("disabled",true);
        $("#start").attr("disabled",false);
        $("#timer").html(sessionTime + ":" + sessionTimeSec);
        $("#bar").css({"width":"0%"});
        $("#breakTime").html(3);
        $("#sessionTime").html(25);
      });
    }, 1000);
  });
});