var showDesktopMenuClicked = false;

$(document).ready(function(){

	$('.lvl-two a').on('click', function(e){
		e.stopPropagation();
	});
	documentMapInit();
	
	var nua = navigator.userAgent;
	var ua = nua.toLowerCase();
	
	var isIE8 = nua.indexOf('MSIE 8') > 0;
	var isIE9 = nua.indexOf('MSIE 9') > 0;
	var isIphone = /iPhone/i.test(nua);
	var isIpad = /iPad/i.test(nua);
	
	var isNativeAndroid = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Mobile') > -1 && nua.indexOf('Version') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1));
	 
	 if(/msie/i.test(ua)){
		  if (ua.indexOf("msie") < ua.indexOf(";", ua.indexOf("msie"))) {
			var ieversion = ua.substring(ua.indexOf("msie"),ua.indexOf(";", ua.indexOf("msie")));
			/* only show the message if the ie version is below 9 */ 
			if (/8./i.test(ieversion)) {
				$("#incompBrowser").css("display", "block");
				$("#incompBrowser").css("font-size", "15px");
				$("#compBrowser").css("display", "none");
			}else{
				$("#incompBrowser").css("display", "none");
				$("#compBrowser").css("display", "block");
				$("#compBrowser").delay(20).fadeIn(20);
			}
			
		 }
		 
	}
	 else if(isNativeAndroid) {
		 	$("#incompBrowser").css("display", "block");
			$("#incompBrowser").css("font-size", "15px");
			$("#compBrowser").css("display", "none");
			
	}
	 else if(isIpad || isIphone) {
		$("#compBrowser").delay(20).fadeIn(20);
		
	}
	 else if( isIE9 || !isIE8 || !isNativeAndroid){
  		$("#incompBrowser").css("display", "none");
  		$("#compBrowser").delay(20).fadeIn(20);  		
  	}
    
    
	
});

var documentMap = {};

function documentMapInit(){
	documentMap["SCD"] = "Policy Schedule_";
	documentMap["CVN"] = "Covernotes_";
	documentMap["PRP home"] = "Home_Proposal_Confirmation_";
	documentMap["PRP motor"] = "Motor_Proposal_Confirmation_";
	documentMap["PRP home ren"] = "Home_Renewal_Confirmation_";
	documentMap["PRP motor ren"] = "Motor_Renewal_Confirmation_";
	
	documentMap["DDC"] = "Direct_Debit_Confirmation_";
	documentMap["SEC"] = "SECCI_";
	documentMap["CA"] = "Credit_Agreement_";
	documentMap["IS"] = "Installment_Schedule_";
	documentMap["DDM"] = "Direct_Debit_Mandate_";
	documentMap["CT"] = "Certificate_of_Motor_Insurance_";
	documentMap["DDI"] = "Direct_Debit_Instruction_";
}

function getDocumentNameFromCode(key, isHHRisk, packType){
	if (key == 'PRP'){

		if  (isHHRisk){
			
			
			if ((packType=="RN")||(packType=="AR")){
				key = "PRP home ren"; 	
			}
			
			else {
				key = "PRP home";
			}
		}
		 
		if  (!isHHRisk){
			
			if ((packType=="RN")||(packType=="AR")){
				key = "PRP motor ren" ;
			}
			
			else {
				key =	"PRP motor";
			}
				
			
		}
	}
	return documentMap[key];

	}

function ie_ver(){  
    var iev=0;
    var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
    var trident = !!navigator.userAgent.match(/Trident\/7.0/);
    var rv=navigator.userAgent.indexOf("rv:11.0");

    if (ieold) iev=new Number(RegExp.$1);
    if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
    if (trident&&rv!=-1) iev=11;

    return iev;         
}      


// date util func, get today as yyyymmdd
function yyyymmdd(dateIn) {
   var yyyy = dateIn.getFullYear();
   var mm = dateIn.getMonth()+1; // getMonth() is zero-based
   var dd  = dateIn.getDate();
   return String(10000*yyyy + 100*mm + dd); // Leading zeros for mm and dd
}

/* #################### Screensize checker ###################### */

//simply checks window size and returns desktop or mobile
function checkScreenSize(targetMobileSize){
	
	return $(window).width() > targetMobileSize ? 'desktop' : 'mobile';
	
}

/* #################### Screen Resize Function - VERY IMPORTANT ###################### */
//This function is IMPORTANT. It will run various event registration and style fixes when transitioning from mobile to desktop and visa versa
//Add any new resize methods to this function.

var resizeTimer; //used to ensure only one resize event fires
	
	
	function windowResizeChecker(){
		var resetNav2None = false;
		
		if(resizeTimer){ clearTimeout(resizeTimer)}
		
		resizeTimer = setTimeout(function(){	
			eventDelegation.unsetEventGroup();	
			eventDelegation.eventSetterAll();
			
			/* This and the if(resetNav2None) block below fix a problem with IE9 where the menu displays when the screen is resized (even if not logged in). It also uses a <!--[if IE 9]> <html class="lt-ie10" lang="en"> <![endif]--> tag in index.html. This not an ideal solution but avoids more drastic hacks. */
			if ($('HTML.lt-ie10').length) {
			  //this is IE9 and older
				if($('nav').css('display') == 'none') {
					resetNav2None = true;
				}
			}

			//reset all inline styles applied by jquery on nav elements
			if((checkScreenSize(690) == 'desktop' )&& !(isIpad)&&!(isIphone) ){		
				$('nav, nav ul, nav ul li, #blackout-xx').attr('style', '');		
			}

			/* Second part of hack for ie9 */
			if(resetNav2None){ 
				$('nav').css('display', 'none');
			}
			
			if(showDesktopMenuClicked){
				$( "#show-menu" ).trigger( "click" );
			}			
			//reset size of menu
			resetHeightonResize();
				
			}, 200);
				
		}
	

/* ############## NAVIGATION RELATED FUNCTIONS ###############*/

//show the desktop menu - shows popup menu and highlights the links
var menuTimer = false;
function showDesktopMenu(e){
	showDesktopMenuClicked = true;
	e.stopPropagation();	
	e.preventDefault();
	$('.lvl-one, nav').css('display', 'block');	
	 createBlackoutLayer(true, function(){closeBlackoutLayer(); hideDesktopMenu();},false);		
}



//Hide the desktop menu - removes highlight and hides the popup
function hideDesktopMenu(e){	
	$('nav').css('display','none');
	showDesktopMenuClicked = false;
}
	
// MOBILE Menu function that shows mobile menu and performs required dom adjustments
function showMobileNav(e){
	e.preventDefault();		 	
	
	 //first lock the body
	 $('body').css({'position':'fixed'});
	 
	//set nav height to extend the length of the document
	 $('nav').css({display: 'block', height: $(window).height()});
	

	//create blackout layer pass in associated callback functions for opening the menu and closing it
	 createBlackoutLayer(true, closeMenu,animateMenuIn);
	 
	 //appends the blackout to header to fix z-index issue
	 appendBlackout();
}
	
//Mobile Close menu - animates the menu out of view and resets the dom to it's original state
function closeMenu(e){	
	
	if(typeof e != 'undefined'){		
		e.preventDefault();
	}
	
	 $('nav').stop(true).animate({right:'-400px'}, 400, function(){
		resetMobileMenu();
		$('body').css({position:'relative'});			
		$('nav').css({display:'none', right: '-400px'});
		closeBlackoutLayer();
	 });
	 
	 showDesktopMenuClicked = false;
}
	
	
//Resets the mobile menu when the user clicks back, or on the blackout, or clicks on 'main menu' - essentially resets all child elements backt their original state
function resetMobileMenu(e){

	//stop event bubbling
	if(typeof e != 'undefined'){
		e.stopPropagation();
		e.preventDefault();
	}

	//this resets the onclick event for sub-menu elements and removes sub-menu-clicked which restores the arrow
	var subMenu = $('.sub-menu');
	subMenu.on('click', showSubMenu);
	subMenu.removeClass('sub-menu-clicked');
	
	//fades out the child levels and fades in the top level elements
	$('.lvl-two, .lvl-three').fadeOut(300, function(){												
		$('.lvl-one > li').not('.main-menu').fadeIn(1000); //fadeout old menu				
		$('.lvl-one').fadeIn(500); //fadeout old menu				
		$('.main-menu').css('display','none'); //hide the menu item								
	});				
}
	
//This method is used to test for child lists, displaying them if they exist and hiding the current level
function showSubMenu(e){			
	
	//stop event bubbling and default actions
	e.stopPropagation();
	e.preventDefault();

	//remove class because we want to then transform the li into a link
	$(this).addClass(' sub-menu-clicked');
	
	//remove click event
	$(this).off();
	
	var elem = $(this).find('a').first();
	eventDelegation.eventSetSingle(elem, 'click', function(e){e.preventDefault()}, 'mobile')

	
	//$(this).on('click', function(e){e.preventDefault()}); //kills the link

	//check whether the link has any children besides links
	if($(this).children().not('a').length){
		
		//child elements located so we descend into next level and hide current level
		hideCurrentLevel($(this));
		
		//locate child <ul> and display contents
		var nextLvl =  $(this).find('ul').first();
		
		//fade in the next level
		nextLvl.fadeIn(600);
		
		//fade in children
		nextLvl.children().fadeIn(600);
		
		//display main menu if it's on the same lvl
		if($(this).closest('ul').hasClass('lvl-one')){ $('.main-menu').css('display','block');}
						
	}			
}
	

//This method hide the curren level
function hideCurrentLevel(obj){	
	
	var parent = obj.closest('ul');
	
	var elementsToHide = parent.children().not(obj).not('.main-menu'); //this needs tidying once i can work out the syntax

	elementsToHide.css('display','none');		
}
	
	
//This method is responsible for animating the menu into view. Abstracted here for reuse.
function animateMenuIn(callback){

	$('nav').stop(true).animate({right:'0'}, 500, 'linear', function(){ 
 
		if(callback){				
			callback();
		}
	});	
}
	
function resetHeightonResize(){
	
	if(checkScreenSize(690) == 'mobile'){
		$('nav').css('height', $(window).height());
	 }
}
	
	
	
/*###########Create Blackout Screen##########*/
//This function both creates and displays the blackout layer and registers
//event handlers to closing the blackout layer with a callback

function createBlackoutLayer(closeOnClick, closeCallback, openCallback){
	
	//check if openCallback is provided. If not then provide empty function
	openCallback = openCallback || function(){}
	
	//check if the div already exists - display if it does
	//you may also pass in a callback when displaying the fadein layer
	var d = document.getElementById('blackout-xx');
	if(d){			
		fadeInBlackout(openCallback);		
	}
	//else create a div overlay element and fade in.
	else {	
		var blackoutDiv = document.createElement('div');
		blackoutDiv.setAttribute('class','blackoutScreen');
		blackoutDiv.setAttribute('id','blackout-xx');		
		document.body.appendChild(blackoutDiv);
		//$('#blackout-xx').css('display', 'block');
		fadeInBlackout(openCallback);
	}
	
	//applies onclick handler and uses supplied callback function when hiding the blackout layer
	if(closeOnClick && closeCallback){
		$('#blackout-xx').on('click',function(){				
			
			closeCallback();
			$(this).off();
		});		
	}	
}

//fades in the blackout layer in. You may provide an optional callback function
function fadeInBlackout(callback){
	$('#blackout-xx').fadeIn(200, function(){
		if(callback){
			callback();
		}
	});
}

//This fixes z-index problem between blackout and nav
function appendBlackout(){
	
	var b = document.getElementById('blackout-xx');
	var header = document.getElementsByTagName('header');
	header[0].appendChild(b);
	

}

//fades out the blackout layer in.
function closeBlackoutLayer(){
	$('#blackout-xx').fadeOut(400);

}
	




/* #################### EVENT DELEGATION ###################*/
	//Use this object to assign event handlers. The script will cycle through each and apply those are appropriate to screensize.
	//As part of a resize script this will also remove event handlers is the user moves to a screensize large than the one loaded in.
	var eventDelegation = {			
			
			//use this to apply all events - set events in order of: TargetElement | Event | Associated Function
			//'group' attribute may receive one of three params - mobile, desktop or both. Use 'both' in instances where the event is applicable to large and small screen.
			eventGroup : '' ,
			firstload: true,
			setEventGroup: function(){
			
			//	this.eventGroup = wWidth > 690 ? 'desktop':'mobile' ;
				//return 
			},
			
			eventArray : [		
																
							{target: window, event: 'resize', method: windowResizeChecker, group : 'both'}, // nav related - desktop only								
							{target: '.sub-menu', event: 'click', method: showSubMenu, group : 'mobile'}, //nav related - mobile only
							{target: 'nav .main-menu',	 event: 'click', method: resetMobileMenu, group : 'mobile'}, //nav related - mobile only
							{target: 'nav .back-button', event: 'click', method: closeMenu, group : 'mobile'}, //nav related - mobile only								
							{target: 'nav .back-button', event: 'click', method: closeMenu, group : 'mobile'}, //nav related - mobile only
							{target: '#show-menu',	event: 'click', method: showMobileNav, group : 'mobile'}, //nav related - mobile only
							{target: '#show-menu',	event: 'click', method: showDesktopMenu, group : 'desktop'}, //nav related - mobile only						
							{target: '.lvl-one',	event: 'click', method: samePageMenuCloser, group : 'both'},
							{target: '.external-link',	event: 'click', method: directExternalLinks, group : 'both'},
			],
			
			//cycles through eventArray to apply events
			eventSetterAll: function(){				
								
				var wWidth = $(window).width();
				
				if(!this.eventGroup.length){ 
									
					this.eventGroup = wWidth > 690 ? 'desktop':'mobile' ;
					
					}
							
				var group =  checkScreenSize(690); //function returns desktop or mobile
				
				//only set events if required - i.e. if we hve changed screen size				
				if(this.firstload  == true || this.eventGroup != group){
					
					//set the new event group
					this.eventGroup = wWidth > 690 ? 'desktop':'mobile' ;
					
					//set first load to false because its no longer		 the first load
					this.firstload = false;
					
					//remove any events associated with blackout later
					$('#blackout-xx').off();				
					
					
					//cycle through events array				
					for(var i=0,j=this.eventArray.length; i<j; i++){
						
						//test for existence of dom element matching the expression
						if( $(this.eventArray[i]['target']).length ){
								
											
						if ( (this.eventArray[i]['event'] == 'mouseenter' || this.eventArray[i]['event'] == 'mouseleave' ) && is_touch_device()) {						
						//	alert('I am not registering this event: ' + this.eventArray[i]['event'] );
							continue;
						}
						else if (this.eventArray[i]['device'] == 'touch' && !is_touch_device()){
				
							continue;
						}
					
							
							//two conditions under which we skip the loop and don't assign
							//don't set desktop events on smaller than 690
							if( (this.eventArray[i]['group'] == 'desktop' && wWidth < 690) || (this.eventArray[i]['group'] == 'mobile' && wWidth > 690) ){ continue;} 
						
							//set the event
							$( (this.eventArray[i]['target']) ).on( (this.eventArray[i]['event']), (this.eventArray[i]['method']) );		
					
						}					
					}
				}
			},
			
			
			eventSetSingle: function(element, type, method, screenSize){
			
					$( element).on(type, method);	
					var arr = {target: element, event: type, method: method, group : screenSize}//nav related - mobile only
					eventDelegation.eventArray.push(arr);
					
			},
		
			eventGetter: function(){},
			
			eventUnset: function(){},
			
			unsetEventGroup: function(){ //clear down unrequired event handlers. Used in conjunction with screen resize event
				
				var group =  checkScreenSize(690); //function returns desktop or mobile
			
				if(this.eventGroup != group){
				
					for(var i=0,j=this.eventArray.length; i<j; i++){
					
						if( this.eventArray[i]['group'] == this.eventGroup ){
							
						$( (this.eventArray[i]['target']) ).off( (this.eventArray[i]['event']), (this.eventArray[i]['method']) );
						}				
			
					}					
				}			
			}	
		}


/*#####################  External Link Redirector ##############################*/

function directExternalLinks(e){

	e.preventDefault();
	
	//possible brand prefixes - there are lots of variations across dev, MO and live so trying to acount for them all
	var brandPrefixes =  {
								admiral: 		['adm','admiral'],
								bell:			['bell'],
								diamond: 	['dia', 'diamond'],
								elephant:	['ele', 'elephant'],
								
	}
	
	//this object contains the links for each brand. Update this as required
	//NOTE: the names of the sub attributes correspond to the data-external-link attribute on the links in the html
	var linksObject = {
							admiral: {
										'updatePolicy': 'http://www.admiral.com/existing-customers/update-your-policy.php',
										'privacy': 'http://www.admiral.com/car-insurance/your-policy/your-privacy-and-security.php',
										},
							bell: {
										'updatePolicy': 'http://www.bell.co.uk/car-insurance/update-your-policy.php',
										'privacy': 'http://www.bell.co.uk/car-insurance/privacy-statement.php',
										},
							diamond: {
										'updatePolicy': 'http://www.diamond.co.uk/existing-customers/update-your-policy.php',
										'privacy': 'http://www.diamond.co.uk/existing-customers/legal-and-complaint-information/your-privacy-and-security.php',
										},
							elephant: {
										'updatePolicy': 'http://www.elephant.co.uk/car-insurance/customer-support/update-your-policy.php',
										'privacy': 'http://www.elephant.co.uk/car-insurance/customer-support/useful-information/your-privacy-and-security.php',
										}
							}
							
								
	//get the destination
	//NOTE: This must match the linksObject sub attribute names
	var destination = $(this).attr('data-external-link');
	
	//get the url
	var urlStrArr =  location.href.split('/');
	
	//regex to isolate the brand 
	var regex = /^[a-zA-Z0-9]+\.([^\.]+)/;
		
	//retrieve array of matches - in reality the match should appear at array index 1 otherwise it's null
	//NOTE: urlStrArr[2] should contain the sub-domain part of the url - e.g. mypolicy2.admiral.com. 
	var matches = urlStrArr[2].match(regex);
	
	
	//check that we even have a match
	if(matches){
		
		//resolve the various brands into one
		for (var brandKey in brandPrefixes) {
		  if (brandPrefixes.hasOwnProperty(brandKey) &&  (brandPrefixes[brandKey].indexOf(matches[1]) !== -1) ) {				
				var brand = brandKey;
				break;
		  }
		}
		
		//send the user on to the relevant link		
		window.open(linksObject[brand][destination],"Extlink");
		
	}
	

}



/*#####################  Same Page Menu Closer ##############################*/

function samePageMenuCloser(e){
		
	
	//split the url into an array of chunks at the slash char
	var urlStrArr =  location.href.split('/');
	
	//isolate the last item in the url - which should represent the page
	var lastUrlItem = urlStrArr[urlStrArr.length -1];
	
	//get the href of the linked clicked
	var targetHref = e.target.getAttribute('href');
	
	//clean target href of slash and hash
	targetHref = targetHref.replace(/[\/\#]/gi, '');
	
	//test the target link against the url
	if(targetHref == lastUrlItem) {
			
		//trigger the event that is attached to the blackout layer as if it were clicked
		$( "#blackout-xx" ).trigger( "click" );
	
	}
	
	showDesktopMenuClicked = false;
}

function hideNavIcons(){

	var navIcons = $('.nav-icons');
	navIcons.addClass(' nav-icons-hide');
}

function showNavIcons(){

	var navIcons = $('.nav-icons');
	navIcons.removeClass('nav-icons-hide');
}



/*########### Checks whether device is touch or not ############*/

function is_touch_device() {
		
	return (('ontouchstart' in window)
	|| (navigator.MaxTouchPoints > 0)
	|| (navigator.msMaxTouchPoints > 0));
}

/*########### Dat Layer Page View event############*/

function setTagManagerLoad(){
	
	dataLayer.push({'event': '_pageLoaded_x'});


}

/*########### Virtual Page View event for Google Tag Manager ############*/

function virtualPageview(){

	var page, urlArr = [];

	//grab the current url and split at #
	urlArr =  location.href.split('#');
	
	//Since the angular app always redirects to a format of /#/<root> we will only perform a push event when this is the case
	
	if(urlArr.length > 1 && urlArr[1].replace('/','') != ''){
		
		page = urlArr[1].replace('/','');
		
		
		//pass page value into dataLayer push call
		//as the pages don't have dynamic page titles setting same value for page and title		
		//This will get picked up by Google Tag Manager as an event when the value is added to the datalayer	
		dataLayer.push({
		  'event': 'pageView',
		  'pageViewName': page,
		  'pageViewTitle': page 
		});				
	}		
}

