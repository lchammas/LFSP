var main = function(){

  $("#analyse").click(function(){
    $("li, p").removeClass('active');
    $("#analyse, #at").addClass('active');
  });

  $("#recommend").click(function(){
    $("li, p").removeClass('active');
    $("#rec, #recommend").addClass('active');
  });

  $("#monthly").click(function(){
    $("li, p").removeClass('active');
    $("#mo, #monthly").addClass('active');
  });

  $("#pub").click(function(){
    $("li, p").removeClass('active');
    $("#pub, #pubt").addClass('active');
  });

  $("#focus").click(function(){
    $("li, p").removeClass('active');
    $("#focus, #foct").addClass('active');
  });

  $("#who").click(function(){
    $("li, p").removeClass('active');
    $("#who, #who-text").addClass('active');
  });

}

$(document).ready(main);