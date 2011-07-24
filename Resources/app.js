// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#000');
Ti.UI.iPhone.statusBarStyle = Ti.UI.iPhone.StatusBar.OPAQUE_BLACK;
//Create main app namespace
var demo={};
//Create a few helpers
demo.myHelpers = {
	isAndroid : function(){
		return (Ti.Platform.name == 'android');
	},
	makeWindow : function(a){
		a = a || {};
		var win = Ti.UI.createWindow(a);
		//Force the orientations
		win.orientationModes = [
			Ti.UI.PORTRAIT,
			Ti.UI.UPSIDE_PORTRAIT
		];
		return win;	
	}	
};

//Bring in the child windows
Ti.include('main.js','picker.js');

//Bring in the color picker functions (CommonJS format)
demo.colorHelper = require('colorhelper');

//Create our configs
var winConfig = {
	title:Ti.Locale.getString('sample_win_title'),
	barColor:'#000',
	backgroundColor:'#fff',
	tabBarHidden:true,
	fullscreen:false,
	navBarHidden : (Ti.Platform.name == 'android')	
};

//Create the main launch window
demo.mainWindow = demo.launchMainWindow(winConfig);

//Check if we didn't return the window correctly
if(demo.mainWindow===null){
	alert(Ti.Locale.getString('forgot_return'));
}

//Add an app listener for the event sample		
Ti.App.addEventListener('color:update_color', function(e){
	demo.mainWindow.backgroundColor=e.selectedColor;
});
	
//Based on platfomr launch the App in a specific way
if(Ti.Platform.name!=='android'){
	var tabGroup = Ti.UI.createTabGroup();
	var tab1 = Ti.UI.createTab({window:demo.mainWindow});
    tabGroup.addTab(tab1); 
	// open tab group
	tabGroup.open();	
}else{
	demo.mainWindow.open();
}
