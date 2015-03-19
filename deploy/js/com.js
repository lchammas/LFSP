var committee_main = function(){

  /*function Person(src, title, name, email){
    this.Src = src;
    this.Title = title;
    this.Name = name;
    this.email = email;
  }

  var chair = new Person('../img/chair.jpeg', 'Chair', 'Joeseph Gafton','joseph.gafton@lfsp.org.uk');
  var dir_pol = new Person('../img/policy-director.jpeg', 'Policy Director', 'Katherine Bettany', 'katherine.bettany@lfsp.org.uk');

  var setPerson = function(p){
    $('#active-img').attr('src', p.Src);
    $('#active-title').text(p.Title);
    $('#active-name').text(p.Name);
    $('#active-email').attr('href', 'mailto:' + p.email);
    $('#active-email').text(p.email);
  }*/

  $(".person img").click(function(){
    var id = this.id
    $("p.dot").removeClass('active');
    switch(id){
      case "chair":
      $('#chair-p').addClass('active');
      //setPerson(chair);
      break;

      case "dir-pol":
      $('#dir-pol-p').addClass('active');
      //setPerson(dir_pol);
      break;

      case("sec"):
      $('#sec-p').addClass('active');
      break;

      case("tres"):
      $('#tres-p').addClass('active');
      break;

      case('DGDG'):
      $("DGDG-p").addClass('active');
      break;

      case('dir-for-pub1'):
      $("#dir-for-pub1-p").addClass('active');
      break;

      case("dir-for-pub-aff"):
      $("#dir-for-pub-aff-p").addClass('active');
      break;

      case("dir-for-pub2"):
      $("#dir-for-pub2-p").addClass('active');
      break;

      case("pol-off1"):
      $("#pol-off1-p").addClass('active');
      break;

      case("dir-of-pub"):
      $('#dir-of-pub-p').addClass('active');
      break;

      case("pol-off2"):
      $('#pol-off2-p').addClass('active');
      break;

    };
  });


}

$(document).ready(committee_main);