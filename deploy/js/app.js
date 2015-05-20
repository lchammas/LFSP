var main = function(){

  var setPerson = function(src, title, name, email){
    $('#active-img').attr('src', src);
    $('#active-title').text(title);
    $('#active-name').text(name);
    $('#active-email').attr('href', 'mailto:' + email);
    $('#active-email').text(email);
    window.scrollTo(0,0);
  };


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

  $("#chair").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#chair-p').addClass('active');
    setPerson('./img/chair.jpeg', 'Chair', 'Jordan Abdi', 'chair@lfsp.org.uk');
  });

  $("#vice").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#vice-p').addClass('active');
    setPerson('./img/vice.jpg', 'Vice Chair', 'Sinziana Giju', 'vice_chair@lfsp.org.uk');
  });

  $("#dir-pol").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#dir-pol-p').addClass('active');
    setPerson('./img/director-policy.jpg', 'Director for Policy', 'Bradley Lonergan', 'director_for_policy@lfsp.org.uk');
  });

  $("#sec").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#sec-p').addClass('active');
    setPerson('./img/secretary.png', 'Secretary', 'Michael Edwards', 'secretary@lfsp.org');
  });
      
  $("#tres").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#tres-p').addClass('active');
    setPerson('./img/treasurer.jpeg', 'Treasurer', 'Alice Tang', 'treasurer@lfsp.org');
  });
     
  $("#DGDG").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#DGDG-p').addClass('active');
    setPerson('./img/DG.jpg', 'Director for Guests', 'Neelakshi Armugam', 'director_for_guests@lfsp.org.uk');
  });

  $("#dir-for-pub1").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#dir-for-pub1-p').addClass('active');
    setPerson('./img/dir-for-pub.png', 'Director of Publicity', 'Elise Donaldson', 'director_of_publicity@lfsp.org');
  });

  $("#dir-for-pub-aff").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#dir-for-pub-aff-p').addClass('active');
    setPerson('./img/public-affairs.jpeg', 'Director of Public Affairs', 'Hana Janedbar', 'director_for_pa@lfsp.org.uk');
  }); 

  $("#pol-off1").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#pol-off1-p').addClass('active');
    setPerson('./img/policy-officer.jpg', 'Policy Officer', 'Angela Wipperman', 'policy_officer1@lfsp.org.uk');
  });

  $("#pub-off").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#pub-off-p').addClass('active');
    setPerson('./img/pub_off.jpg', 'Publicity Officer', 'Jasmine Munyard', 'publicity_officer@lfsp.org.uk');
  });

  $("#pub-off2").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#pub-off2-p').addClass('active');
    setPerson('./img/pub_off2.jpg', 'Publicity Officer', 'Chris Worsfold', 'publicity_officer2@lfsp.org.uk');
  });

  $("#pub-off3").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#pub-off3-p').addClass('active');
    setPerson('./img/pub_off3.jpg', 'Publicity Officer', 'Saliha Uludag', 'publicity_officer3@lfsp.org.uk');
  });

  $("#pol-off2").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#pol-off2-p').addClass('active');
    setPerson('./img/policy-officer2.jpg', 'Policy Officer', 'Jenny Mills', 'policy_officer2@lfsp.org.uk');
  });

  $("#web").click(function(){
    $('.team-active, .person-active').addClass('active');
    $("p.dot").removeClass('active');
    $('#web-p').addClass('active');
    setPerson('./img/web-editor.jpg', 'Web Editor', 'Sean Harbison', 'webmaster@lfsp.org.uk');
  });
}

$(document).ready(main);