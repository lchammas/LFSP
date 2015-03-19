var main = function(){

  /*var Person = function(src, title, name, email){
    this.Src = src;
    this.Title = title;
    this.Name = name;
    this.email = email;
  };

  var chair = new Person('../img/chair.jpeg', 'Chair', 'Joeseph Gafton','joseph.gafton@lfsp.org.uk');
  var dir_pol = new Person('../img/policy-director.jpeg', 'Policy Director', 'Katherine Bettany', 'katherine.bettany@lfsp.org.uk');*/

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
    setPerson('../img/chair.jpeg', 'Chair', 'Joeseph Gafton', 'joseph.gafton@lfsp.org.uk');
  });

  $("#dir-pol").click(function(){
    $("p.dot").removeClass('active');
    $('#dir-pol-p').addClass('active');
    setPerson('../img/policy-director.jpeg', 'Policy Director', 'Katherine Bettany', 'katherine.bettany@lfsp.org.uk');
  });

  $("#sec").click(function(){
    $("p.dot").removeClass('active');
    $('#sec-p').addClass('active');
    setPerson('../img/secretary.jpeg', 'Secretary', 'Yun Xing', 'yun.xing@lfsp.org');
  });
      
  $("#tres").click(function(){
    $("p.dot").removeClass('active');
    $('#tres-p').addClass('active');
    setPerson('../img/treasurer.jpeg', 'Treasurer', 'Nimai Vadgama', 'nimai.vadgama@lfsp.org');
  });
     
  $("#DGDG").click(function(){
    $("p.dot").removeClass('active');
    $('#DGDG-p').addClass('active');
    setPerson('../img/DG.jpg', 'Director for Guests + Director of Digital Communications', 'Chris Meiring', 'chris.meiring@lfsp.org.uk');
  });

  $("#dir-for-pub1").click(function(){
    $("p.dot").removeClass('active');
    $('#dir-for-pub1-p').addClass('active');
    setPerson('../img/publicity-director.jpeg', 'Director for Publicity', 'Jordan Abdi', 'jordan.abdi@lfsp.org');
  });

  $("#dir-for-pub-aff").click(function(){
    $("p.dot").removeClass('active');
    $('#dir-for-pub-aff-p').addClass('active');
    setPerson('../img/public-affairs.jpeg', 'Director of Public Affairs', 'Hana Janedbar', 'hana.janebdar@lfsp.org.uk');
  }); 

  $("#dir-for-pub2").click(function(){
    $("p.dot").removeClass('active');
    $('#dir-for-pub2-p').addClass('active');
    setPerson('../img/secretary.jpeg', 'Director for Publicity', 'Alice Tang', 'alice.tang@lfsp.org.uk');
  });

  $("#pol-off1").click(function(){
    $("p.dot").removeClass('active');
    $('#pol-off1-p').addClass('active');
    setPerson('../img/policy-officer.jpg', 'Policy Officer', 'Angela Wipperman', 'angela.wipperman@lfsp.org.uk');
  });

  $("#dir-of-pub").click(function(){
    $("p.dot").removeClass('active');
    $('#dir-of-pub-p').addClass('active');
    setPerson('../img/director-publicity.jpg', 'Director of Publicity', 'Jasmine Munyard', 'jasmine.munyard@lfsp.org.uk');
  });

  $("#pol-off2").click(function(){
    $("p.dot").removeClass('active');
    $('#pol-off2-p').addClass('active');
    setPerson('../img/policy-officer2.jpg', 'Policy Officer', 'Jenny Mills', 'jenny.mills@lfsp.org.uk');
  });
}

$(document).ready(main);