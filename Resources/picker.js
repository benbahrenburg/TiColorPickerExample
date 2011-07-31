/*jslint maxerr:1000 */
if(typeof('demo')==='undefined'){
	var demo={};	
}
demo.launchPickerWindow=function(winConfig,colorHelper,callback){
	//We use our helper functions to create the window
	var win = demo.myHelpers.makeWindow(winConfig);
	var storedOrDefaultColor=Ti.App.Properties.getString('COLOR_PICKER_HEX','#52D874'); //USE A GREENISH COLOR AS DEFAULT
	Ti.API.info('We will set the picker to this color code ' + storedOrDefaultColor + ' to start with.');
	var rgbDefaults = colorHelper.HexToRGB(storedOrDefaultColor);
	Ti.API.info('Load my screen defaults, these will be used when we add the controls');
	Ti.API.info('Red=' + rgbDefaults.Red + ' Green=' + rgbDefaults.Green + ' Blue=' + rgbDefaults.Blue);
//-------------------------------------------------------------
//		START UI ELEMENTS SECTION
//		ALL OBJECTS ARE SCOPED WITHIN THE LAUNCH METHOD
//		CHECK OUT THE APP.JSS FILE FOR LAYOUT DETAILS 
//		AND THE STRINGS.XML FILE IN i18n for the text
//-------------------------------------------------------------		

	//Create a container for the page, this let's us organize things easier
	var pageContainer = Ti.UI.createView({id:'color_picker_pageContainer'});
	//Add this container to the window object
	win.add(pageContainer);
	
	if(demo.myHelpers.isAndroid()){
		//If we're compiling for Android
		//I like to build my own header
		var androidHeader = Ti.UI.createView({id:'androidHeader'});
		pageContainer.add(androidHeader);

		var androidHeaderLabel = Ti.UI.createLabel({
			text: win.title,
			id:'color_picker_androidHeaderLabel'
		});
		androidHeader.add(androidHeaderLabel);
	}else{
		//Since we're on iOS add some buttons to the NavBar
		var bDone = Ti.UI.createButton({systemButton:Ti.UI.iPhone.SystemButton.DONE});
		bDone.addEventListener('click', function(){
			win.close();
		});
		win.rightNavButton=bDone;
	}

	//Create the "Select your color" label, check out the app.jss and strings.xml file under i18n for details
	var instrLabel = Ti.UI.createLabel({text:'Select Your Color:' ,id:'color_picker_instrLabel'});
	//Add the label to the main container
	//Make sure you set the height or it will not work as expected
	pageContainer.add(instrLabel);
	
	//For each color we create a "row" that let's us treat each color as a format object
	//This is the "row" that contains all of the child controls for red
	var redRow = Ti.UI.createView({top:10,height:40,layout:'horizontal'});
	//Add the red container to the main page container
	//Make sure you set the height or it will not work as expected
	pageContainer.add(redRow);
	//This is the "red" label, check out the app.jss and strings.xml file under i18n for details 
	var redLabel = Ti.UI.createLabel({text:'Red:',id:'color_picker_redLabel'});
	//Add the red label to the red container
	redRow.add(redLabel);
	//This is the red slider, we mix using jss and inline parameters to handle
	//the value and width parameters that we want to set manually when the page renders
	var redSlider = Ti.UI.createSlider({
		width:200,
		value:rgbDefaults.Red, //This is from the default or the last time the color was set
		id:'color_picker_redSlider'
	});
	//Add the slider to the red container
	redRow.add(redSlider);

	//For each color we create a "row" that let's us treat each color as a format object
	//This is the "row" that contains all of the child controls for green
	var greenRow = Ti.UI.createView({height:40,layout:'horizontal'});
	//Add the green container to the main page container
	//Make sure you set the height or it will not work as expected
	pageContainer.add(greenRow);
	//This is the "green" label, check out the app.jss and strings.xml file under i18n for details 
	var greenLabel = Ti.UI.createLabel({id:'color_picker_greenLabel'});
	//Add to the green container
	greenRow.add(greenLabel);
	//This is the green slider, we mix using jss and inline parameters to handle
	//the value and width parameters that we want to set manually when the page renders			
	var greenSlider = Ti.UI.createSlider({
		width:200,
		value:rgbDefaults.Green,
		id:'color_picker_greenSlider'
	});
	//Add the green slider to the green container
	greenRow.add(greenSlider);

	//For each color we create a "row" that let's us treat each color as a format object
	//This is the "row" that contains all of the child controls for blue
	var blueRow = Ti.UI.createView({height:40,layout:'horizontal'});
	//Add the blue container to the overall page container
	pageContainer.add(blueRow);
	//This is the "blue" label, check out the app.jss and strings.xml file under i18n for details 
	var blueLabel = Ti.UI.createLabel({id:'color_picker_blueLabel'});
	//Add the blue label to the blue container
	blueRow.add(blueLabel);
	//This is the blue slider, we mix using jss and inline parameters to handle
	//the value and width parameters that we want to set manually when the page renders		
	var blueSlider = Ti.UI.createSlider({
		width:200,
		value:rgbDefaults.Blue,
		id:'color_picker_blueSlider'
	});
	//Add the blue slider to the blue container
	blueRow.add(blueSlider);
	
	//Add the sample label, check out the app.jss and strings.xml file under i18n for details 
	var sampleLabel = Ti.UI.createLabel({id:'color_picker_sampleLabel'});
	//Add the sample label to the overall page container
	pageContainer.add(sampleLabel);
	
	//Here we create a view to shows the color preview
	var colorPreview = Ti.UI.createView({
		id:'color_picker_sampleDisplay',
		borderRadius: demo.myHelpers.isAndroid() ? 3 : 5, //We set the borderRadius based on platform (Android doesn't do this well)
		backgroundColor:'#000'
	});
	//Add the preview panel to the page container
	pageContainer.add(colorPreview);	
	//We like to see the hex value of things
	//So add a label to display the code
	//check out the app.jss and strings.xml file under i18n for details 
	var hexLabel = Ti.UI.createLabel({id:'color_picker_hexLabel'});
	//Add the hex label into the page container
	pageContainer.add(hexLabel);
	//The Apply button will do what it says and apply our color updates.
	//check out the app.jss and strings.xml file under i18n for details 
	var bApply = Ti.UI.createButton({id:'color_picker_bDone'});
	//Add the apply button to our page container
	win.add(bApply);	
	
	//Create a helper function that handles how things work when we move the sliders
	function applySliderUpdates(){
		//Get the Red value from the red slider
		var redValue=parseInt(redSlider.value,10);
		//Get the Green Value from the green slider
        var greenValue=parseInt(greenSlider.value,10);
        //Get the Blue value form the blue slider
        var blueValue=parseInt(blueSlider.value,10);
        //Get the hex Color from the colorHelper ( see bColor.js for details)
		var hexCode =colorHelper.RGBToHex(redValue,greenValue,blueValue);
		//add the next code text so we can see what it is
		//Remember to add a space, iOS doens't Trim but Android does so we
		//add the space in the code instead of the strings.xml file
		hexLabel.text=Ti.Locale.getString('hex_code_label') + ' ' + hexCode;
		//Update the background color for the preview view
		colorPreview.backgroundColor=hexCode;
	};
	

//-------------------------------------------------------------
//		END UI ELEMENTS SECTION
//		ALL OBJECTS ARE SCOPED WITHIN THE LAUNCH METHOD
//		CHECK OUT THE APP.JSS FILE FOR LAYOUT DETAILS 
//		AND THE STRINGS.XML FILE IN i18n for the text
//-------------------------------------------------------------		

//-------------------------------------------------------------
//		START UI EVENTS SECTION
//		THIS SECTION HANDLES WHEN HAPPENS WHEN WE USE THE OBJECTS
//		ALL OBJECTS ARE SCOPED WITHIN THE LAUNCH METHOD
//-------------------------------------------------------------		

	redSlider.addEventListener('change',function(e){
		Ti.API.info("Red Slider is moving, it has a value of " + e.value);
		//Apply the new updates so we can see what they are
		applySliderUpdates();
	});
	
	greenSlider.addEventListener('change',function(e){	
		Ti.API.info("Green Slider is moving, it has a value of " + e.value);
		//Apply the new updates so we can see what they are		
		applySliderUpdates();
	});
	
	blueSlider.addEventListener('change',function(e){	
		Ti.API.info("Blue Slider is moving, it has a value of " + e.value);
		//Apply the new updates so we can see what they are					
		applySliderUpdates();
	});
	
	win.addEventListener('open', function(){		
		//When the window opens, we setup everything
		applySliderUpdates();
	});
	
	bApply.addEventListener('click', function(){
		//Get current color we're working with from the preview 
		var currentHexValue = colorPreview.backgroundColor;
		
		//The demo has two ways to apply the color
		//We can use the Ti.App.fireEvent or a callback function
		//To figure out which we're using check if the callback function is null or undefined
		//Based on this we know which method to use
		
		//Check if we're in the callback example
		if((callback!==undefined)&&(callback!==null)){
			//Ok looks like this is the callback example
			//We then just pass in the hex value
			Ti.API.info("We're going to pass the new hex value of " + currentHexValue + " to the callback function");
			callback(currentHexValue);
		}else{
			//Ok looks like we're in the Ti.App.fireEvent example
			//Fire an App event so everyone listening knows what to do
			Ti.API.info("We're going to broadcast the new hex value of " + currentHexValue + " using the Ti.App.fireEvent");
			Ti.App.fireEvent('color:update_color',{selectedColor:currentHexValue});			
		}
		
		
		Ti.API.info("Now time to store the new color hex for next time. We write the hex " + currentHexValue + ' to the property COLOR_PICKER_HEX');
		Ti.App.Properties.setString('COLOR_PICKER_HEX',currentHexValue);
		//Now all of our work is done we close the window
		win.close();
	});	

//-------------------------------------------------------------
//		END UI EVENTS SECTION
//		THIS SECTION HANDLES WHEN HAPPENS WHEN WE USE THE OBJECTS
//-------------------------------------------------------------		

//-------------------------------------------------------------
// 		Important !!!!!!
//		Don't forget to return the window
//-------------------------------------------------------------
	return win;
};
	