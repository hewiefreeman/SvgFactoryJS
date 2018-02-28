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
    svgFactory.load(destination, url, onComplete, cache, hideForLoad, svgID, width, height, color);

If you have an SVG on your site that has not been injected using SvgFactoryJS, not to worry! You can still use SvgFactoryJS to manipulate it as long as you have the <b>ID String</b> or <b>Element</b> reference to the SVG:

    //...
    var svg1 = svgFactory.get("svg_id");
    
    //or as an SVG Element reference:
    var svg2 = svgFactory.get(svg2Element);
    
<b>svgFactory.get()</b> returns an <b>SvgFactoryImage</b>. You can use an <b>SvgFactoryImage</b> to access all the features to manipulate the underlying SVG with SvgFactoryJS. This makes it fast and easy to remove SVG elements (and it's garbage) from your site, or set the SVG's color, size, or ID:
    
    //...
    var svg = svgFactory.get("theSvg");
    svg.setColor("#123456");
    svg.setSize(125, 352);
    svg.setId("new_svg_id");
    svg.remove();
    
If your SVG has multiple <b>Path</b> tags, you can change the color of all the <b>Path</b>s individually by making an <b>Array</b> of colors:

    //...
    svg.setColor(["#7c2af9", "rgb(120, 65, 200)", "rgba(74, 179, 7, 0.5)"]);
    
> NOTE: The colors are applied in the order the <b>Path</b>s appear in the SVG.

<hr>

# Documentation

## SvgFactory(*String* unitType)
   Initializes an instance of <b>SvgFactory</b>.

<hr>

# MIT License

Copyright (c) 2018 Dominique Debergue

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
