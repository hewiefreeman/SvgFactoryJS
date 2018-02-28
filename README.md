# SvgFactoryJS
A fast, easy, and lightweight vanilla Javascript SVG manipulator and external loader with cache control.

<h4>Are you looking for a loader, element manager, sizing tool, or even color changer for your SVGs? Well, look no further. This library is fast and efficient at what it does, and is coded with 100% vanilla javascript. Not to mention you can load your resources ignoring the cache if you want to, so you can easily implement with your own file versioning methods.</h4>

<hr>

# Installing

At the moment, the only way to install SvgFactoryJS is to download <b>SvgFactoryJs.min.js</b> and put it in one of your project folders. Then you can import it to your HTML page with (of course replacing <i>your_project_folder</i> with your actual path):

    <script type="text/javascript" src="your_project_folder/SvgFactoryJS.min.js"></script>
    
That's it!
    
<hr>

# Quick Start

Start by initializing the SvgFactory:

    var svgFactory = new SvgFactory();
    
You may also provide a <b>String</b> parameter for <b>SvgFactory()</b> to set it's unit type (for example: in, mm, em, pt, etc):

    var svgFactory = new SvgFactory("px");
    
To load an external SVG, first you need to get the <b>Element</b> reference of the container you'd like to inject it into. Then pass the container's <b>Element</b> reference and a <b>String</b> URL into <b>svgFactory.load()</b>:
    
    //...
    var container = document.getElementById("container_id");
    svgFactory.load(container, "the_url.svg");
    
It's easy to make a listener for when the SVG is done loading. Just pass the name of the callback function as the third parameter in <b>svgFactory.load()</b>:
    
    //...
    svgFactory.load(container, "the_url.svg", callbackFunction);
    
    function callbackFunction(e){
        //code for when the SVG is finished loading...
    }

> The parameter for <b>callbackFunction</b> is the <b>SvgFactoryImage</b> that was created along with the injected SVG. To learn more about the SvgFactoryImage type, see the Documentation or keep reading for a quick explanation.</div>

You can also pass additional parameters to <b>svgFactory.load()</b> (see Documentation):
    
    //...
    svgFactory.load(container, "the_url.svg", callbackFunction, null, false, "the_id", 50, 50, ["#ffffff", "#a3f4c1"]);

If you have an SVG on your site that has not been injected using SvgFactoryJS, not to worry! You can still use SvgFactoryJS to manipulate it as long as you have the <b>ID</b> or <b>Element</b> reference to the SVG:

    var svg1 = svgFactory.get("svg_id");
    //or
    var svg1 = svgFactory.get("svg_id");

<hr>

# Documentation
