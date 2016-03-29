domready = require 'domready'
$j = jQuery

#analyse = $j '#analyse'

domready ->
  console.log 'it works'

$j ->
  #define local variables for use within jquery

  removeAllLiP = ->
    $j('li, p').removeClass 'active'

  setPerson = (src, title, name, email) ->
    $j('#active-img').attr('src', src)
    $j('#active-title').text(title)
    $j('#active-name').text(name)
    $j('#active-email').attr('href', 'mailto:' + email)
    $j('#active-email').text(email)
    window.scrollTo(0,0)


  $j('#analyse').click ->
    removeAllLiP()
    $j('#analyse, #at').addClass 'active'

  $j('#recommend').click ->
    removeAllLiP()
    $j('#recommend, #rec').addClass 'active'

  $j('#monthly').click ->
    removeAllLiP()
    $j('#monthly, #mo').addClass 'active'

  $j('#who').click ->
    removeAllLiP()
    $j('#who, #who-text').addClass 'active'

  $j("#chair").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#chair-p').addClass('active')
    setPerson('./img/chair.jpeg', 'Chair', 'Jordan Abdi', 'chair@lfsp.org.uk')

  $j("#vice").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#vice-p').addClass('active')
    setPerson('./img/vice.jpg', 'Vice Chair', 'Sinziana Giju', 'vice_chair@lfsp.org.uk')
  

  $j("#dir-pol").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#dir-pol-p').addClass('active')
    setPerson('./img/director-policy.jpg', 'Director for Policy', 'Bradley Lonergan', 'director_for_policy@lfsp.org.uk')
  

  $j("#sec").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#sec-p').addClass('active')
    setPerson('./img/secretary.png', 'Secretary', 'Michael Edwards', 'secretary@lfsp.org')
  
      
  $j("#tres").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#tres-p').addClass('active')
    setPerson('./img/treasurer.jpeg', 'Treasurer', 'Alice Tang', 'treasurer@lfsp.org')
  
     
  $j("#DGDG").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#DGDG-p').addClass('active')
    setPerson('./img/DG.jpg', 'Director for Guests', 'Neelakshi Armugam', 'director_for_guests@lfsp.org.uk')
  

  $j("#dir-for-pub1").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#dir-for-pub1-p').addClass('active')
    setPerson('./img/dir-for-pub.png', 'Director of Publicity', 'Elise Donaldson', 'director_of_publicity@lfsp.org')
  

  $j("#dir-for-pub-aff").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#dir-for-pub-aff-p').addClass('active')
    setPerson('./img/public-affairs.jpeg', 'Director of Public Affairs', 'Hana Janedbar', 'director_for_pa@lfsp.org.uk')
   

  $j("#pol-off1").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#pol-off1-p').addClass('active')
    setPerson('./img/pol-off-te.jpg', 'Policy Officer', 'Tom Evans', 'policy_officer1@lfsp.org.uk')
  

  $j("#pub-off").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#pub-off-p').addClass('active')
    setPerson('./img/pub_off.jpg', 'Publicity Officer', 'Jasmine Munyard', 'publicity_officer@lfsp.org.uk')
  

  $j("#pub-off2").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#pub-off2-p').addClass('active')
    setPerson('./img/pub_off2.jpg', 'Publicity Officer', 'Chris Worsfold', 'publicity_officer2@lfsp.org.uk')
  

  $j("#pub-off3").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#pub-off3-p').addClass('active')
    setPerson('./img/editor.jpg', 'Newsletter Editor', 'Eduardo Conesa-Pietscheck', 'editor@lfsp.org.uk')
  

  $j("#pol-off2").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#pol-off2-p').addClass('active')
    setPerson('./img/policy-officer2.jpg', 'Policy Officer', 'Jenny Mills', 'policy_officer2@lfsp.org.uk')
  

  $j("#web").click ->
    $j('.team-active, .person-active').addClass('active')
    $j("p.dot").removeClass('active')
    $j('#web-p').addClass('active')
    setPerson('./img/web-editor.jpg', 'Web Editor', 'Sean Harbison', 'webmaster@lfsp.org.uk')

  $j("#active-img").click ->
    $j('.team-active, .person-active').removeClass('active')
  
  $j("#change-page").click ->
    $j(".committee").removeClass('active')
    $j("#previous-committee").addClass('active')
    window.scrollTo(0,0)

  $j("#first-page").click ->
    $j(".committee").removeClass('active')
    $j("#current-committee").addClass('active')
    window.scrollTo(0,0)

  $j('#menu').click ->
    $j('.menu').animate({
      left: '0px'
      }, 200)
    $j('body').animate({
      left: '200%'
      }, 200)

  $j('#close').click ->
    $j('.menu').animate({
      left: '-100%'
      }, 200)
    $j('body').animate({
      left: '0px'
      }, 200)




