/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $j, domready;

	domready = __webpack_require__(2);

	$j = jQuery;

	domready(function() {
	  return console.log('it works');
	});

	$j(function() {
	  var removeAllLiP, setPerson;
	  removeAllLiP = function() {
	    return $j('li, p').removeClass('active');
	  };
	  setPerson = function(src, title, name, email) {
	    $j('#active-img').attr('src', src);
	    $j('#active-title').text(title);
	    $j('#active-name').text(name);
	    $j('#active-email').attr('href', 'mailto:' + email);
	    $j('#active-email').text(email);
	    return window.scrollTo(0, 0);
	  };
	  $j('#analyse').click(function() {
	    removeAllLiP();
	    return $j('#analyse, #at').addClass('active');
	  });
	  $j('#recommend').click(function() {
	    removeAllLiP();
	    return $j('#recommend, #rec').addClass('active');
	  });
	  $j('#monthly').click(function() {
	    removeAllLiP();
	    return $j('#monthly, #mo').addClass('active');
	  });
	  $j('#who').click(function() {
	    removeAllLiP();
	    return $j('#who, #who-text').addClass('active');
	  });
	  $j("#chair").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#chair-p').addClass('active');
	    return setPerson('./img/chair.jpeg', 'Chair', 'Jordan Abdi', 'chair@lfsp.org.uk');
	  });
	  $j("#vice").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#vice-p').addClass('active');
	    return setPerson('./img/vice.jpg', 'Vice Chair', 'Sinziana Giju', 'vice_chair@lfsp.org.uk');
	  });
	  $j("#dir-pol").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#dir-pol-p').addClass('active');
	    return setPerson('./img/director-policy.jpg', 'Director for Policy', 'Bradley Lonergan', 'director_for_policy@lfsp.org.uk');
	  });
	  $j("#sec").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#sec-p').addClass('active');
	    return setPerson('./img/secretary.png', 'Secretary', 'Michael Edwards', 'secretary@lfsp.org');
	  });
	  $j("#tres").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#tres-p').addClass('active');
	    return setPerson('./img/treasurer.jpeg', 'Treasurer', 'Alice Tang', 'treasurer@lfsp.org');
	  });
	  $j("#DGDG").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#DGDG-p').addClass('active');
	    return setPerson('./img/DG.jpg', 'Director for Guests', 'Neelakshi Armugam', 'director_for_guests@lfsp.org.uk');
	  });
	  $j("#dir-for-pub1").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#dir-for-pub1-p').addClass('active');
	    return setPerson('./img/dir-for-pub.png', 'Director of Publicity', 'Elise Donaldson', 'director_of_publicity@lfsp.org');
	  });
	  $j("#dir-for-pub-aff").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#dir-for-pub-aff-p').addClass('active');
	    return setPerson('./img/public-affairs.jpeg', 'Director of Public Affairs', 'Hana Janedbar', 'director_for_pa@lfsp.org.uk');
	  });
	  $j("#pol-off1").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#pol-off1-p').addClass('active');
	    return setPerson('./img/pol-off-te.jpg', 'Policy Officer', 'Tom Evans', 'policy_officer1@lfsp.org.uk');
	  });
	  $j("#pub-off").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#pub-off-p').addClass('active');
	    return setPerson('./img/pub_off.jpg', 'Publicity Officer', 'Jasmine Munyard', 'publicity_officer@lfsp.org.uk');
	  });
	  $j("#pub-off2").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#pub-off2-p').addClass('active');
	    return setPerson('./img/pub_off2.jpg', 'Publicity Officer', 'Chris Worsfold', 'publicity_officer2@lfsp.org.uk');
	  });
	  $j("#pub-off3").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#pub-off3-p').addClass('active');
	    return setPerson('./img/editor.jpg', 'Newsletter Editor', 'Eduardo Conesa-Pietscheck', 'editor@lfsp.org.uk');
	  });
	  $j("#pol-off2").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#pol-off2-p').addClass('active');
	    return setPerson('./img/policy-officer2.jpg', 'Policy Officer', 'Jenny Mills', 'policy_officer2@lfsp.org.uk');
	  });
	  $j("#web").click(function() {
	    $j('.team-active, .person-active').addClass('active');
	    $j("p.dot").removeClass('active');
	    $j('#web-p').addClass('active');
	    return setPerson('./img/web-editor.jpg', 'Web Editor', 'Sean Harbison', 'webmaster@lfsp.org.uk');
	  });
	  $j("#active-img").click(function() {
	    return $j('.team-active, .person-active').removeClass('active');
	  });
	  $j("#change-page").click(function() {
	    $j(".committee").removeClass('active');
	    $j("#previous-committee").addClass('active');
	    return window.scrollTo(0, 0);
	  });
	  $j("#first-page").click(function() {
	    $j(".committee").removeClass('active');
	    $j("#current-committee").addClass('active');
	    return window.scrollTo(0, 0);
	  });
	  $j('#menu').click(function() {
	    $j('.menu').animate({
	      left: '0px'
	    }, 200);
	    return $j('body').animate({
	      left: '200%'
	    }, 200);
	  });
	  return $j('#close').click(function() {
	    $j('.menu').animate({
	      left: '-100%'
	    }, 200);
	    return $j('body').animate({
	      left: '0px'
	    }, 200);
	  });
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {

	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()

	}('domready', function () {

	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })

	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }

	});


/***/ }
/******/ ]);