exports.hasProperPrefix=function(value) {
	return (value.charAt(0)==="#");
};		
function stripLeadingHexFormat(value) {
	return (value.charAt(0)==="#") ? value.substring(1,7):value;
};

exports.HexToRed=function(value) {
	return parseInt((stripLeadingHexFormat(value)).substring(0,2),16);
};

exports.HexToGreen=function(value) {
	return parseInt((stripLeadingHexFormat(value)).substring(2,4),16);
};

exports.HexToBlue=function(value) {
	return parseInt((stripLeadingHexFormat(value)).substring(4,6),16);
};

exports.integerToHex=function(value) {  
    var hex = parseFloat(value).toString(16);  
    return (hex.length < 2) ? "0" + hex : hex;  
};

exports.hexToInteger=function(hex) {  
   return parseFloat("0x" + hex);  
};

exports.HexToRGB=function(hexColorCode){
	var results = {
		Red: exports.HexToRed(hexColorCode),
		Green: exports.HexToGreen(hexColorCode),
		Blue: exports.HexToBlue(hexColorCode)
	};
	
	return results;
};
exports.RGBToHex=function(redValue,greenValue,blueValue){
	    var decToHex="";
		var code1, code2; 
		var hexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" ];
		var colorString = redValue + ',' + greenValue + ',' + blueValue;
	    var colorSplit = colorString.split(",");

	    for(var iLoop=0;iLoop<3;iLoop++){
	    	code1 = Math.floor(colorSplit[iLoop] / 16);
	    	code2 = colorSplit[iLoop] - code1 * 16;
		    decToHex += hexArray[code1];
		    decToHex += hexArray[code2];
	    }
	    return ('#' + decToHex);
};


// function HueShift(h,s) {h+=s; while (h>=360.0) h-=360.0; while (h<0.0) h+=360.0; return h; };
//  
// exports.hexComplement=function(value){
	// var rgbResults = exports.HexToRGB(value);
	// var rgbCompliment = exports.rgbComplement(rgbResults.Red,rgbResults.Green,rgbResults.Blue);
	// return exports.RGBToHex(rgbCompliment.Red,rgbCompliment.Green,rgbCompliment.Blue);
// };
// 
// exports.rgbComplement=function(redValue,greenValue,blueValue){
	// var colorString = redValue + ',' + greenValue + ',' + blueValue;
	// var temphsv=exports.RGB2HSV(colorString);
	// temphsv.hue=HueShift(temphsv.hue,180.0);
	// return exports.HSV2RGB(temphsv);
// };
// 
// exports.RGB2HSV=function(rgb) {
    // var hsv = new Object();
    // var max=max3(rgb.Red,rgb.Green,rgb.Blue);
    // var dif=max-min3(rgb.Red,rgb.Green,rgb.Blue);
    // hsv.saturation=(max==0.0)?0:(100*dif/max);
    // if (hsv.saturation==0) hsv.hue=0;
    // else if (rgb.Red==max) hsv.hue=60.0*(rgb.Green-rgb.Blue)/dif;
    // else if (rgb.Green==max) hsv.hue=120.0+60.0*(rgb.Blue-rgb.Red)/dif;
    // else if (rgb.Blue==max) hsv.hue=240.0+60.0*(rgb.Red-rgb.Green)/dif;
    // if (hsv.hue<0.0) hsv.hue+=360.0;
    // hsv.value=Math.round(max*100/255);
    // hsv.hue=Math.round(hsv.hue);
    // hsv.saturation=Math.round(hsv.saturation);
    // return hsv;
// };


// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
// exports.HSV2RGB=function(hsv) {
    // var rgb=new Object();
    // if (hsv.saturation==0) {
        // rgb.Red=rgb.Green=rgb.Blue=Math.round(hsv.value*2.55);
    // } else {
        // hsv.hue/=60;
        // hsv.saturation/=100;
        // hsv.value/=100;
        // i=Math.floor(hsv.hue);
        // f=hsv.hue-i;
        // p=hsv.value*(1-hsv.saturation);
        // q=hsv.value*(1-hsv.saturation*f);
        // t=hsv.value*(1-hsv.saturation*(1-f));
        // switch(i) {
	        // case 0: rgb.Red=hsv.value; rgb.Green=t; rgb.Blue=p; break;
	        // case 1: rgb.Red=q; rgb.Green=hsv.value; rgb.Blue=p; break;
	        // case 2: rgb.Red=p; rgb.Green=hsv.value; rgb.Blue=t; break;
	        // case 3: rgb.Red=p; rgb.Green=q; rgb.Blue=hsv.value; break;
	        // case 4: rgb.Red=t; rgb.Green=p; rgb.Blue=hsv.value; break;
	        // default: rgb.Red=hsv.value; rgb.Green=p; rgb.Blue=q;
        // }
        // rgb.Red=Math.round(rgb.Red*255);
        // rgb.Green=Math.round(rgb.Green*255);
        // rgb.Blue=Math.round(rgb.Blue*255);
    // }
    // return rgb;
// };
