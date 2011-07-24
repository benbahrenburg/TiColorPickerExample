demo.launchMainWindow=function(winConfig){
	//Use the helper function to build a window
	//This the easiest way to apply defaults
	var win = demo.myHelpers.makeWindow(winConfig);
	//set the layout to vertical, since in this window it makes life easier
	win.layout='vertical';
	
	if(demo.myHelpers.isAndroid()){
		//If we're compiling for Android
		//I like to build my own header
		var androidHeader = Ti.UI.createView({id:'androidHeader'});
		win.add(androidHeader);

		var androidHeaderLabel = Ti.UI.createLabel({
			text: win.title,
			id:'color_picker_androidHeaderLabel'
		});
		androidHeader.add(androidHeaderLabel);
	}
	
	
	//Now create the defaults for the color picker windows
	var pickerWinConfig = {
			title:Ti.Locale.getString('color_picker_win_title'),
			barColor:'#000',
			backgroundColor:'#fff',
			tabBarHidden:true,
			navBarHidden : (Ti.Platform.name == 'android')	
		};
	//Create the button that launches the callback example
	//Check out app.jss for the layout and i18n for the text
	var bSampleWithCallback = Ti.UI.createButton({
		title:Ti.Locale.getString('sample_button_callback'),
		id:'sample_launcher_button'
	});
	//Add the button to the window
	//Since we're in a vertical layout it will pad correctly
	win.add(bSampleWithCallback);

	//Create the button that launches the event example
	//Check out app.jss for the layout and i18n for the text
	var bSampleWithEvent = Ti.UI.createButton({
		title:Ti.Locale.getString('sample_button_event'),
		id:'sample_launcher_button'
	});
	//Add the button to the window
	//Since we're in a vertical layout it will pad correctly	
	win.add(bSampleWithEvent);
	
	//This is a sample callback function that is used in the callback sample
	//If you are in a parent child relationship this is the best approach
	//If you need to broadcast to many places use the event approach
	function sampleCallback(hexColorValue){
		Ti.API.info("We're now in the color picker's callback function");
		Ti.API.info("Now let's update the windows backgroundColor to show you it works");
		win.backgroundColor=hexColorValue;
	};
	
	//Add the event handler for the callback sample
	bSampleWithCallback.addEventListener('click', function(e) {
		var myPickerWindow = demo.launchPickerWindow(pickerWinConfig,demo.colorHelper,sampleCallback);
		if(myPickerWindow===null){
			alert(Ti.Locale.getString('forgot_return'));
		}
		myPickerWindow.open({modal:true});
	});
	
	//Add the event handler for the broadcast event sample
	bSampleWithEvent.addEventListener('click', function(e) {
		var myPickerWindow = demo.launchPickerWindow(pickerWinConfig,demo.colorHelper);
		if(myPickerWindow===null){
			alert(Ti.Locale.getString('forgot_return'));
		}		
		myPickerWindow.open({modal:true});
	});
			
//-------------------------------------------------------------
// 		Important !!!!!!
//		Don't forget to return the window
//-------------------------------------------------------------
	return win; 
};
