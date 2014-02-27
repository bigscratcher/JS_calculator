/**
	Enable to use keyboard through CalcController
	Call callEvent to invoke button click event
*/
(function (Controller) {

	// Key codes from the keyboard (Some are double for double keyboards alpha/numeric)
	var calculatorKeys = {
        48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6",
        55: "7", 56: "8", 57: "9", 96: "0", 97: "1", 98: "2", 99: "3",
        100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9",
        106: "x", 107: "+", 109: "-", 8: "backspace",
        13: "=", 46: "c", 67: "c", 27: "c"
    }

    //Check if has Class boolean
    function hasClass(elm, cls){
   		return elm.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
    }
    //Add class to button - pressed like (active)
    function addClass(elm, cls){
    	if(!hasClass(elm, cls)) elm.className += " " + cls
    }
    //Remove class to button - pressed like (active)
	function removeClass(elm, cls){		
		if(hasClass(elm, cls)){			
			var rExp = new RegExp('(\\s|^)' + cls + '(\\s|$)')
			elm.className = elm.className.replace(rExp, '')
		}
	}

	// Fire dynamicaly event on element (click in this case)   
    function callEvent(elm, evtName) {
       if(document.createEvent){
       		//For modern browsers
       		var evt = document.createEvent('HTMLEvents')
       		evt.initEvent(evtName, true, true)
       		return !elm.dispatchEvent(evt)
       }else {
       		//For IE
       		var evt = document.createEventObject()
       		return elm.fireEvent('on' + evtName, evt)
       }
    }


    // Callback for every key stroke
    var keycallback = function (e) {
    	
        if(e.keyCode in calculatorKeys){
        	var element = document.getElementById("button-" + calculatorKeys[e.keyCode])
        	
        	//Add or remove classes to simulate the button pressed
        	addClass(element, 'active')
        	//Remove active class after time - simulate real press (wrapped in anonymous function)
        	setTimeout(function() { removeClass(element, 'active') } , 110)

        	callEvent(element, 'click')
        }     
    }
   
    // Attach a keyup-event listener on the document   
  	if(document.addEventListener){
  		document.addEventListener('keyup', keycallback, false)
  	}else if(document.attachEvent){
  		document.attachEvent('keyup', keycallback)
  	} 

  	//Present initial values
  	Controller.getInitial()
  	
  	//On click of a button do the stuff
	var buttons = document.getElementsByTagName('button')  	
	for( var x=0; x < buttons.length; x++ ) {
		buttons[x].onclick = function(){
			Controller.getPressed(this)
		}
	}   	   
})(CalcController)