//////////////////////////////////////////////////////////////////////////////////////////////////
// SvgFactory JS Classes /////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

function SvgFactory(unitType){
	this.err = "SvgFactoryJS.js";
	this.unitTypesArray = ["", "", "%", "em", "ex", "px", "cm", "mm", "in", "pt", "pc"];
	this.loadedSvgs = [];
	if(unitType != null){
		this.setUnitType(unitType);
	}else{
		this.unitType = "px";
	}
}

function SvgFactoryImage(img, fills, strokes, url, width, height, factory){
	this.element = img;
	this.fills = fills;
	this.strokes = strokes;
	this.url = url;
	this.id = img.id;
	this.width = width;
	this.height = height;
	this.factory = factory;
	//
	factory.loadedSvgs.push(this);
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Loading Functionality /////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

SvgFactory.prototype.load = function(destination, url, onComplete, cache, hideForLoad, svgID, width, height, fills, strokes){
	if(window.XMLHttpRequest){
		if(destination == null){
			var message = ["Destination is null.", [this.err]];
			throw new Error([message]);
			return;
		}else if((url == null) || (url == "")){
			var message = ["URL is null or empty.", [this.err]];
			throw new Error([message]);
			return;
		}else if(!this.checkIfSvg(url)){
			var message = ["URL does not point to an SVG file.", [this.err]];
			throw new Error([message]);
			return;
		}
		//
		this.loadXHR(destination, url, onComplete, cache, hideForLoad, svgID, width, height, fills, strokes);
	}else{
		var message = ["Browser does not support SvgFactoryJS.", [this.err]];
		throw new Error([message]);
		return;
	}
}

SvgFactory.prototype.loadXHR = function(destination, url, onComplete, cache, hideForLoad, svgID, width, height, fills, strokes) {
	if((hideForLoad != null) && (hideForLoad)){
		destination.style.visibility = "hidden";
	}
	//
	var xhttp = new XMLHttpRequest();
	var self = this;
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			destination.innerHTML += xhttp.responseText;
			//
			var svgsInDest = destination.getElementsByTagName("svg");
			var newSvgImage = svgsInDest[svgsInDest.length-1];
			var newFactoryImage = self.loadRef(newSvgImage);
			//set fills + strokes
			newFactoryImage.setFills(fills);
			newFactoryImage.setStrokes(strokes);
			//set size
			newFactoryImage.setSize(width, height);
			//set id
			newFactoryImage.setId(svgID);
			//set URL
			newFactoryImage.url = url;
			//
			if((hideForLoad != null) && (hideForLoad)){
				destination.style.visibility = "visible";
			}
			//
			if((onComplete != null) && (onComplete.constructor === Function)){
				                              //img, fills, strokes, url, width, height, factory
				onComplete(newFactoryImage);
			}
		}else if (this.readyState == 4 && this.status != 200){
			var message = ["Could not load SVG from: \""+url+"\"", [self.err]];
			throw new Error([message]);
			return;
		}
	}
	//
	xhttp.open("GET", url, true);
	if((cache != null) && (cache == false)){
		xhttp.setRequestHeader('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
		xhttp.setRequestHeader('cache-control', 'max-age=0');
		xhttp.setRequestHeader('expires', '0');
		xhttp.setRequestHeader('expires', 'Tue, 01 Jan 1980 1:00:00 GMT');
		xhttp.setRequestHeader('pragma', 'no-cache');
	}
	//
	xhttp.send();
}

SvgFactory.prototype.loadRef = function(svgImage){
	var fills = null;
	var strokes = null;
	var elements = this.getSvgElements(svgImage);
	if(elements.length == 1){
		//
		fills = [this.getFillOf(elements[0])];
		strokes = [];
		if(elements[0].tagName.toLowerCase() == "path"){
			strokes = [[elements[0].style.stroke, elements[0].style.strokeOpacity, elements[0].style.strokeMiterlimit, elements[0].style.strokeDasharray, elements[0].style.strokeLinejoin]];
		}
	}else if(elements.length > 1){
		//
		fills = [];
		strokes = [];
		for(var i = 0; i < elements.length; i++){
			fills.push(this.getFillOf(elements[i]));
			if(elements[i].tagName.toLowerCase() == "path"){
				strokes.push([[elements[i].style.stroke, elements[i].style.strokeOpacity, elements[i].style.strokeMiterlimit, elements[i].style.strokeDasharray, elements[0].style.strokeLinejoin]]);
			}
		}
	}
	//
	if(!svgImage.hasAttribute("viewBox")){
		svgImage.setAttribute("viewBox", "0 0 "+svgImage.width.baseVal.value+" "+svgImage.height.baseVal.value+"");
	}
	var width = svgImage.width.baseVal.value+this.unitTypesArray[svgImage.width.baseVal.unitType];
	var height = svgImage.height.baseVal.value+this.unitTypesArray[svgImage.height.baseVal.unitType];
	//
	                          //img, fills, strokes, url, width, height, factory
	return new SvgFactoryImage(svgImage, fills, strokes, null, width, height, this);
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Get Methods ///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

SvgFactory.prototype.getSvgElements = function(svgImage){
	var svgElementsCluster = [
		svgImage.getElementsByTagName("path"),
		svgImage.getElementsByTagName("ellipse"),
		svgImage.getElementsByTagName("text"),
		svgImage.getElementsByTagName("rect"),
		svgImage.getElementsByTagName("circle"),
		svgImage.getElementsByTagName("line"),
		svgImage.getElementsByTagName("polygon"),
		svgImage.getElementsByTagName("polyline")
	];
	//
	var elements = [];
	for(var i = 0; i < svgElementsCluster.length; i++){
		for(var o = 0; o < svgElementsCluster[i].length; o++){
			elements.push(svgElementsCluster[i][o]);
		}
	}
	//
	return elements;
}

SvgFactory.prototype.getFillOf = function(element){
	if(element.hasAttribute("style")){
		return [element.style.fill, element.style.fillOpacity];
	}else{
		return [element.getAttribute("fill"), 1];
	}
}

SvgFactory.prototype.get = function(idOrElement){
	if(idOrElement == null){
		var message = ["SVG reference is null.", [this.err]];
		throw new Error([message]);
		return null;
	}
	//
	if(idOrElement.constructor === String){
		for(var i = 0; i < this.loadedSvgs.length; i++){
			if(this.loadedSvgs[i].id == idOrElement){
				return this.loadedSvgs[i];
			}
		}
	}else if(idOrElement instanceof SVGElement){
		if(this.loadedSvgs.length > 0){
			for(var i = 0; i < this.loadedSvgs.length; i++){
				if(this.loadedSvgs[i].element == idOrElement){
					return this.loadedSvgs[i];
				}else if(i == this.loadedSvgs.length-1){
					//Reached the end if list. Load this SVGElement reference into an SvgFactoryImage
					return this.loadRef(idOrElement);
				}
			}
		}else{
			//SvgFactory hasn't loaded any SVGs. Load this SVGElement reference into an SvgFactoryImage
			return this.loadRef(idOrElement);
		}
	}
	//
	return null;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// SvgFactoryImage Get Methods ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

SvgFactoryImage.prototype.getElementById = function(id){
	elements = this.factory.getSvgElements(this.element);
	for(var i = 0; i < elements.length; i++){
		if(elements[i].id == id){
			return elements[i];
		}
	}
	//
	return null;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// SvgFactoryImage Set Methods ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

SvgFactoryImage.prototype.setSize = function(width, height){
	if(width != null){
		if(width >= 0){
			this.element.setAttribute("width", width+this.factory.unitType);
			this.width = width+this.factory.unitType;
		}else{
			this.element.setAttribute("width", (width*(-1))+"%");
			this.width = (width*(-1))+"%";
		}
	}
	//
	if(height != null){
		if(height >= 0){
			this.element.setAttribute("height", height+this.factory.unitType);
			this.height = height+this.factory.unitType;
		}else{
			this.element.setAttribute("height", (height*(-1))+"%");
			this.height = (height*(-1))+"%";
		}
	}
}

SvgFactoryImage.prototype.setWidth = function(width){
	if(width != null){
		if(width >= 0){
			this.element.setAttribute("width", width+this.factory.unitType);
			this.width = width+this.factory.unitType;
		}else{
			this.element.setAttribute("width", (width*(-1))+"%");
			this.width = (width*(-1))+"%";
		}
	}
}

SvgFactoryImage.prototype.setHeight = function(height){
	if(height != null){
		if(height >= 0){
			this.element.setAttribute("height", height+this.factory.unitType);
			this.height = height+this.factory.unitType;
		}else{
			this.element.setAttribute("height", (height*(-1))+"%");
			this.height = (height*(-1))+"%";
		}
	}
}

SvgFactoryImage.prototype.setFills = function(fills){
	if(fills != null){
		// order: color, opacity
		//color EX: [["#5af3d9", 1], ["#5af3d9", 0.3]]
		var elements = this.factory.getSvgElements(this.element);
		var lessFills = false;
		var fillOn = 1;
		if(fills.length < elements.length){
			lessFills = true;
		}
		//
		for(var i = 0; i < elements.length; i++){
			if(lessFills){
				this.setFillOf(elements[i], fills[fillOn-1]);
				//
				if(fillOn == fills.length){
					fillOn = 1;
				}else{
					fillOn++;
				}
			}else{
				this.setFillOf(elements[i], fills[i]);
			}
		}
		this.fills = fills;
	}
}

SvgFactoryImage.prototype.setFillOf = function(element, fill){
	if(element.hasAttribute("style")){
		if(fill[0] != null){
			element.style.fill = fill[0];
		}
		if(fill[1] != null){
			element.style.fillOpacity = fill[1];
		}
	}else{
		if(fill[0] != null){
			element.setAttribute("fill", fill[0]);
		}
		if(fill[1] != null){
			element.setAttribute("fill-opacity", fill[1]);
		}
	}
}

SvgFactoryImage.prototype.setStrokes = function(strokes){
	if(strokes != null){
		// order: color, opacity, width, miterlimit, dasharray, linejoin
		//stroke EX: [["#5af3d9", 1, 4, 4, "none"], ["#5af3d9", 0.3, 2, 4, "none"]]
		var paths = this.factory.getSvgElements(this.element);
		var lessStrokes = false;
		var strokeOn = 1;
		if(strokes.length < paths.length){
			lessStrokes = true;
		}
		//
		for(var i = 0; i < paths.length; i++){
			if(lessStrokes){
				this.setStrokeOf(paths[i], strokes[strokeOn-1]);
				//
				if(strokeOn == strokes.length){
					strokeOn = 1;
				}else{
					strokeOn++;
				}
			}else{
				this.setStrokeOf(paths[i], strokes[i]);
			}
		}
		this.strokes = strokes;
	}
}

SvgFactoryImage.prototype.setStrokeOf = function(element, stroke){
	if(element.hasAttribute("style")){
		if(stroke[0] != null){
			element.style.stroke = stroke[0];
		}
		if(stroke[1] != null){
			element.style.strokeOpacity = stroke[1];
		}
		if(stroke[2] != null){
			element.style.strokeWidth = stroke[2];
		}
		if(stroke[3] != null){
			element.style.strokeMiterlimit = stroke[3];
		}
		if(stroke[4] != null){
			element.style.strokeDasharray = stroke[4];
		}
		if(stroke[5] != null){
			element.style.strokeLinecap = stroke[5];
		}
		if(stroke[6] != null){
			element.style.strokeLinejoin = stroke[6];
		}
	}else{
		if(stroke[0] != null){
			element.setAttribute("stroke", stroke[0]);
		}
		if(stroke[1] != null){
			element.setAttribute("stroke-opacity", stroke[1]);
		}
		if(stroke[2] != null){
			element.setAttribute("stroke-width", stroke[2]);
		}
		if(stroke[3] != null){
			element.setAttribute("stroke-miterlimit", stroke[3]);
		}
		if(stroke[4] != null){
			element.setAttribute("stroke-dasharray", stroke[4]);
		}
		if(stroke[5] != null){
			element.setAttribute("stroke-linecap", stroke[5]);
		}
		if(stroke[6] != null){
			element.setAttribute("stroke-linejoin", stroke[6]);
		}
	}
}

SvgFactoryImage.prototype.setId = function(id){
	if(id != null){
		this.element.id = id;
		this.id = id;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Misc Methods //////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

SvgFactory.prototype.checkIfSvg = function(url){
	var slashSplit = url.split("/");
	var dotSplit = slashSplit[slashSplit.length-1].split(".");
	return (dotSplit[dotSplit.length-1].toLowerCase() == "svg");
}

SvgFactory.prototype.setUnitType = function(unitType){
	if((unitType == "px") || (unitType == "%") || (unitType == "em")
	|| (unitType == "ex") || (unitType == "cm") || (unitType == "mm") || (unitType == "in")
	|| (unitType == "pt") || (unitType == "pc")){
		this.unitType = unitType;
	}else{
		var message = ["Unsupported unit type: \""+unitType+"\"", [this.err]];
		throw new Error([message]);
	}
}

SvgFactoryImage.prototype.remove = function(){
	this.element.parentNode.removeChild(this.element);
	for(var i = 0; i < this.factory.loadedSvgs.length; i++){
		if(this.id == this.factory.loadedSvgs[i].id){
			var theFactoryImage = this.factory.loadedSvgs[i];
			theFactoryImage = null;
			this.factory.loadedSvgs.splice(i, 1);
		}
	}
}
