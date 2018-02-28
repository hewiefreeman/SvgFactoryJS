# SvgFactoryJS
A fast, easy, and lightweight vanilla Javascript SVG manipulator and external loader with cache control.

<h4>Are you looking for a loader, element manager, sizing tool, or even color changer for your SVGs? Well, look no further. This library is fast and efficient at what it does, and is coded with 100% vanilla javascript. Not to mention you can load your resources ignoring the cache if you want to, so you can easily implement with your own file versioning methods.</h4>

<hr>

# Installing

At the moment, the only way to install SvgFactoryJS is to download <b>SvgFactoryJs.min.js</b> and put it in one of your project folders. Then you can import it to your HTML page with (of course replacing <i>your_project_folder</i> with your actual path):

    <script type="text/javascript" src="your_project_folder/SvgFactoryJS.min.js"></script>
    
<hr>

# Quick Start

Start by initializing the SvgFactory:

    var svgFactory = new SvgFactory();
    
You may also provide a <b>String</b> parameter for <b>SvgFactory()</b> to set it's unit type (for example: in, mm, em, pt, etc):

    var svgFactory = new SvgFactory("px");
    
Now you can freely use Sv

<hr>

# Documentation
