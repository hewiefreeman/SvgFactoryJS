//Innitiate SvgFactory with pixels as the unit type
var svgFactory = new SvgFactory("px");

//Get elements of containers you want to put an SVG in
var svgHolder1 = document.getElementById("svgHolder1");
var svgHolder2 = document.getElementById("svgHolder2");

//The div in which testing data is put into
var testText = document.getElementById("testText");

//For testing get() with an Element in loadedSvg2
var svg1Element;

//load an svg into svgHolder1 and call loadedSvg1() when done loading
svgFactory.load(svgHolder1, "images/test.svg", loadedSvg1);

function loadedSvg1(returnedSvg){
	//Center firstSvg to container
	returnedSvg.setSize(-70, -70);
	returnedSvg.element.style = "position: relative; top: 15%; left: 15%;";

  //Set the svg's color and id
	returnedSvg.setColor("#b1b2b3");
	returnedSvg.setId("firstSvg");

	//Set svg1 to the Element reference of returnedSVG to test .get() for Element
	svg1Element = returnedSvg.element;

	//load an svg into svgHolder2, call loadedSvg2() when done loading, and ignore the cache
	svgFactory.load(svgHolder2, "images/test.svg", loadedSvg2, false, false, "secondSvg", 50, 50, ["rgb(90, 16, 16)", "rgb(16, 90, 16)", "rgb(16, 16, 90)"]);
}

function loadedSvg2(returnedSvg){
	//Trace data for testing
	testText.innerHTML = "Loaded: \""+returnedSvg.url+"\", \""+returnedSvg.id
						+"\", ("+returnedSvg.width+", "+returnedSvg.height+"), \""+returnedSvg.color+"\"";

	//Get the first svg by it's id and change it's color (once again)
	var svg1 = svgFactory.get("firstSvg");
	svg1.setColor(["rgb(255, 40, 40)", "rgb(40, 255, 40)", "rgb(40, 40, 255)"]);
}

//Use SvgFactory with an HTML document reference
var htmlElement = document.getElementById("square");
var htmlSvg = svgFactory.get(htmlElement);
htmlSvg.setWidth(50);
htmlSvg.setHeight(50);
htmlSvg.setColor("#1a5b9c");
