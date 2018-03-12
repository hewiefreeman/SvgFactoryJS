# SvgFactoryJS
A fast, easy, and lightweight vanilla Javascript SVG API for manipulating, managing, and externally loading SVGs with caching.

<h4><b>Main Features:</b></h4>

<ul>
    <li>Load and inject SVGs straight into your HTML from a URL</li>
    <li>Use SvgFactoryJS on any SVGs, even those not injected by SvgFactoryJS</li>
    <li>Methods to change the fills and stokes of entire SVGs or individual shapes with ease</li>
    <li>Generates a viewBox for SVGs without one for easy scaling</li>
    <li>Keeps track of all your SVGs</li>
    <li>And plenty of more helpful features!</li>
</ul>

<hr>

# Installing

At the moment, the only way to install SvgFactoryJS is to download <b>SvgFactoryJs.min.js</b> and put it in one of your project folders. Then you can import it to your HTML page with (of course replacing <i>your_project_folder</i> with your actual path):

    <script type="text/javascript" src="your_project_folder/SvgFactoryJS.min.js"></script>
    
That's it!
    
<hr>

# Quick Start

### Setting up...

Make a global SvgFactory reference:

    var svgFactory = new SvgFactory();
    
You may also provide a <b>String</b> parameter for <b>SvgFactory()</b> to set it's unit type (for example: in, mm, em, pt, etc):

    var svgFactory = new SvgFactory("em");
    
Or you can set the unit type with <b>setUnitType()</b>:

    svgFactory.setUnitType("px");

### Loading...

To load an external SVG, first you need to get the <b>Element</b> reference of the container you'd like to inject it into. Then pass the container's <b>Element</b> reference and a URL into <b>svgFactory.load()</b>:
    
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

You can also pass additional parameters to <b>svgFactory.load()</b>:
    
    //...
    svgFactory.load(destination, url, onComplete, cache, hideForLoad, svgID, width, height, fills, strokes);

If you have an SVG on your site that has not been injected using SvgFactoryJS, not to worry! You can still use SvgFactoryJS to manipulate it as long as you have the ID or <b>Element</b> reference to the SVG:

    //...
    //get the SVG by it's ID:
    var svg1 = svgFactory.get("svg_id");
    
    //or by it's SVG Element reference:
    var svg2 = svgFactory.get(svg2Element);
    
<b>svgFactory.get()</b> returns an <b>SvgFactoryImage</b>. You can use an <b>SvgFactoryImage</b> to access all the features to manipulate the underlying SVG with SvgFactoryJS. This makes it fast and easy to remove SVG elements (and it's garbage) from your site, or set the SVG's fills, strokes, size, or ID:
    
    //...
    var svg = svgFactory.get("theSvg");
    svg.setFills("#123456");
    svg.setStrokes([["#000000", 0.5]]);
    svg.setSize(125, 352);
    svg.setId("new_svg_id");
    svg.remove();
    
### Setting fills and strokes...

SvgFactoryJS uses an <b>Array</b> to define a fill or a stroke:

<ul>
    <li>Fill: [<b>color</b>, <b>opacity</b>]</li>
    <li>Stroke: [<b>color</b>, <b>opacity</b>, <b>width</b>, <b>miter-limit</b>, <b>dash-array</b>, <b>line-cap</b>, <b>line-join</b>]</li>
</ul>

The <b>color</b> is the only required property for either a fill or a stroke. Any other property can be set to null to skip it, but the fill or stroke <b>Array</b> must be in the same order shown above. You can also cut the <b>Array</b> short of properties starting from the end, as long as you maintain the order, and the <b>Array</b> starts with color.

A fill takes a <b>color</b> (<b>String</b>) and the <b>opacity</b> (<b>Number</b>) of the color. You can also supply an RGBA color, and take the <b>opacity</b> out of the <b>Array</b> or set it to null. Same goes for a stroke, but it also can take in a few other properties. You can think of strokes as outlines, or just lines in general:

<ul>
    <li>Width (<b>Number</b>): The thickness of the stroke</li>
    <li>Miter Limit (<b>Number</b>): <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-miterlimit">See Mozilla Docs</a></li>
    <li>Dash Array (<b>Array</b>): <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray">See Mozilla Docs</a></li>
    <li>Line Cap (<b>String</b>): <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap">See Mozilla Docs</a></li>
    <li>Line Join (<b>String</b>): <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin">See Mozilla Docs</a></li>
</ul>
    
If your SVG has multiple shapes, you can change the fill of each shape individually by making an <b>Array</b> of fills:

    //...
    svg.setFills([["#7c2af9", 1], ["rgb(120, 65, 200)", 0.6], ["rgba(74, 179, 7, 0.5)", 0.3]]);

Same goes for the SVG's strokes:

    //...
    svg.setStrokes([["#7c2af9", 1, 10], ["rgb(120, 65, 200)", 0.6, 3, null, [3, 5], "round", "bevel"], ["rgba(74, 179, 7, 0.5)"]]);

> <b>Note</b>: The fills and strokes are applied in the same order that each shape appears in the raw SVG file.

> <b>Warning</b>: If you pass a <b>String</b> to <b>setFills()</b> or <b>setStrokes()</b> for an SVG with more than one shape, the color will be applied to all the shapes in the SVG. Also, if you pass an <b>Array</b> that doesn't have as many fills or strokes as the SVG has shapes, it will cycle through the provided fills or strokes.

You can get an SVG's individual shape by it's id with <b>SvgFactoryImage.getElementById()</b>:

    //...
    var squareShape = the_svg.getElementById("square");
    
You can use this shape reference to to change it's fill or stroke with <b>SvgFactory.setFillOf()</b> and <b>SvgFactory.setStrokeOf()</b>:

    //...
    svgFactory.setFillOf(squareShape, ["#ffffff", 0.45]);
    svgFactory.setStrokeOf(squareShape, ["#000000", 1, 5, null, [5, 10]]);


<hr>

# Documentation (In progress)

<dl>
    <dt><h2>Class SvgFactory(unitType)</h2></dt>
    <dd>
        Initializes an instance of <b>SvgFactory</b>.
        <br>
        <table style="width:100%">
        <tr>
            <th>Parameter</th>
            <th>Description</th> 
        </tr>
        <tr>
            <td><b>unitType</b></td>
            <td><b>Optional</b>: (<i>String</i>) Defines the type of dimensional units the library will use for sizing. Accepted unit types are "px", "%", "em", "ex", "cm", "mm", "in", "pt", and "pc". Default is <b>"px"</b> (pixel value).</td>
        </tr>
        </table>
        <br>
        <h3><i>SvgFactory</i> Fields:</h3>
        <table style="width:100%">
        <tr>
            <th width="25%">Field</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>unitType</b></td>
            <td>(String) Defines the type of dimensional units the library will use for sizing. If you wish to manually set this field, <b>only</b> set to "px", "%", "em", "ex", "cm", "mm", "in", "pt", or "pc".</td>
        </tr>
        <tr>
            <td><b>loadedSvgs</b></td>
            <td>(Array) An <b>Array</b> of all the instances of <b>SvgFactoryImage</b> that SvgFactoryJS has created. <b>READ ONLY</b></td>
        </tr>
        </table>
        <br>
        <h3><i>SvgFactory</i> Methods:</h3>
        <table style="width:100%">
        <tr>
            <th width="30%">Method</th>
            <th>Description</th> 
        </tr>
        <tr>
            <td><b>load</b>(destination, url, onComplete, cache, hideForLoad, svgID, width, height, color)</td>
            <td><p>Loads an SVG from the <b>url</b> into the <b>destination</b>.</p>
                <p> </p>
                <ul>
                    <li><b>destination</b> (Element): The DOM element to inject the loaded SVG into.</li>
                    <li><b>url</b> (String): The URL path for the SVG image to load.</li>
                    <li><b>onComplete</b> (Function) <i>Optional</i>: The function to call when the SVG is done loading.</li>
                    <li><b>cache</b> (Boolean) <i>Optional</i>: Whether or not to use the cache. Default is <b>true</b>.</li>
                    <li><b>hideForLoad</b> (Boolean) <i>Optional</i>: Whether or not to make the <b>destination</b> invisible while loading the SVG. <b>destination</b> is shown again only after the SVG has loaded and all modifications (provided by <b>load()</b>) have been applied. Default is <b>false</b>.</li>
                    <li><b>svgID</b> (String) <i>Optional</i>: The ID to be given to the injected SVG tag.</li>
                    <li><b>width</b> (Number) <i>Optional</i>: The width to be given to the injected SVG tag. Negative numbers are handled as percentage, otherwise <b>SvgFactory.unitType</b> is used.</li>
                    <li><b>height</b> (Number) <i>Optional</i>: The height to be given to the injected SVG tag. Negative numbers are handled as percentage, otherwise <b>SvgFactory.unitType</b> is used.</li>
                    <li><b>fills</b> (String or [[String, Number], ]) <i>Optional</i>: See <b>SvgFactoryImage.setFills()</b> for a detailed explanation of setting the fills of an SVG.</li>
                    <li><b>strokes</b> (String or [[String, Number], ]) <i>Optional</i>: See <b>SvgFactoryImage.setStrokes()</b> for a detailed explanation of setting the strokes of an SVG.</li>
                </ul>
            </td> 
        </tr>
        <tr>
            <td><b>get</b>(idOrElement)</td>
            <td><p>Returns the <b>SvgFactoryImage</b> for an SVG. Can use the SVG's ID as a <b>String</b>, or the SVG's <b>Element</b> reference.</p>
                <p></p>
                <ul>
                    <li><b>idOrElement</b> (String or Element): The SVG's ID or <b>Element</b> reference you wish to get the <b>SvgFactoryImage</b> for.</li>
                </ul>
            </td> 
        </tr>
        <tr>
            <td><b>setUnitType</b>(unitType)</td>
            <td><p>Sets the <b>unitType</b> of SvgFactoryJS.</p>
                <p></p>
                <ul>
                    <li><b>unitType</b> (String): The type of dimensional units the library will use for sizing. Can only set to "px", "%", "em", "ex", "cm", "mm", "in", "pt", or "pc".</li>
                </ul>
            </td> 
        </tr>
        </table>
        <br>
    </dd>
</dl>
<dl>
  <dt><h2>Class SvgFactoryImage()</h2></dt>
        <dd>There is an instance of <b>SvgFactoryImage</b> for every SVG injected and retrieved with SvgFactoryJS. You can think of an <b>SvgFactoryImage</b> as an actual SVG image, since you will use <b>SvgFactoryImage</b> to maniplulate an SVG instead of it's <b>Element</b>.
            <br>
        <h3><i>SvgFactoryImage</i> Fields:</h3>
        <table style="width:100%">
        <tr>
            <th width="25%">Field</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><b>element</b></td>
            <td>(SVGElement) The SVG DOM <b>Element</b> of the <b>SvgFactoryImage</b></td>
        </tr>
        <tr>
            <td><b>fills</b></td>
            <td>(Array of Array [[], ]) An <b>Array</b> of <i>fills</i> for the SVG. A <i>fill</i> is an <b>Array</b> defined like so [<b>color</b>, <b>opacity</b>]. A null property means it has not been defined.
            <p> </p>
            <ul>
                <li><b>color</b> (String): The color of the fill</li>
                <li><b>opacity</b> (Number): The opacity of the fill</li>
            </ul>
            </td>
        </tr>
        <tr>
            <td><b>strokes</b></td>
            <td>(Array of Array [[], ]) An <b>Array</b> of strokes for the SVG. A stroke is an <b>Array</b> defined like so [<b>color</b>, <b>opacity</b>, <b>width</b>, <b>miterlimit</b>, <b>dasharray</b>, <b>linecap</b>, <b>linejoin</b>]. A null property means it has not been defined.
            <p> </p>
            <ul>
                <li><b>color</b> (String): The color of the stroke</li>
                <li><b>opacity</b> (Number): The opacity of the stroke</li>
                <li><b>width</b> (Number): The width of the stroke</li>
                <li><b>miterlimit</b> (Number): The miterlimit of the stroke</li>
                <li><b>dasharray</b> (Array): The dasharray of the stroke</li>
                <li><b>linecap</b> (String): The linecap of the stroke</li>
                <li><b>linejoin</b> (String): The linejoin of the stroke</li>
            </ul>
            </td>
        </tr>
        <tr>
            <td><b>url</b></td>
            <td>(String) The URL of the SVG image (null for objects that haven't been loaded with <b>SvgFactory.load()</b> method)</td>
        </tr>
        <tr>
            <td><b>id</b></td>
            <td>(String) The ID of the <b>SvgFactoryImage</b> and underlying <b>SVGElement</b></td>
        </tr>
        <tr>
            <td><b>width</b></td>
            <td>(String) The width of the <b>SVGElement</b> with it's <b>unitType</b> included. EG: "150px"</td>
        </tr>
        <tr>
            <td><b>height</b></td>
            <td>(String) The height of the <b>SVGElement</b> with it's <b>unitType</b> included. EG: "340in"</td>
        </tr>
        </table>
        <br>
        <h3><i>SvgFactoryImage</i> Methods:</h3>
        <table style="width:100%">
        <tr>
            <th width="30%">Method</th>
            <th>Description</th> 
        </tr>
        <tr>
            <td><b>setSize</b>(width, height)</td>
            <td><p>Sets the <b>width</b> and <b>height</b> of the SVG <b>Element</b> and <b>SvgFactoryImage</b> using the <b>unitType</b> of <b>SvgFactory</b>. Providing a <b>String<b> will override the <b>unitType</b> of <b>SvgFactory</b>.</p>
             <p> </p>
            <ul>
                <li><b>width</b> (Number or String): The desired width</li>
                <li><b>height</b> (Number or String): The desired height</li>
            </ul>
            </td>
        </tr>
        <tr>
            <td><b>setWidth</b>(width)</td>
            <td><p>Sets the <b>width</b> of the SVG <b>Element</b> and <b>SvgFactoryImage</b> using the <b>unitType</b> of <b>SvgFactory</b>. Providing a <b>String<b> will override the <b>unitType</b> of <b>SvgFactory</b>.</p>
             <p> </p>
            <ul>
                <li><b>width</b> (Number): The desired width</li>
            </ul>
            </td>
        </tr>
        <tr>
            <td><b>setHeight</b>(height)</td>
            <td><p>Sets the <b>height</b> of the SVG <b>Element</b> and <b>SvgFactoryImage</b> using the <b>unitType</b> of <b>SvgFactory</b>. Providing a <b>String<b> will override the <b>unitType</b> of <b>SvgFactory</b>.</p>
             <p> </p>
            <ul>
                <li><b>height</b> (Number or String): The desired height</li>
            </ul>
            </td>
        </tr>
        <tr>
            <td><b>setFills</b>(fills)</td>
            <td><p>Sets the fill color and opacity of all <b>Elements</b> in the SVG.</p>
                <p>EG: [["blue", 1], ["red", 0.2], ["green", 0.8]]</p>
             <p> </p>
            <ul>
                <li><b>fills</b> (Array[Fill, ...]): An <b>Array</b> of <b>Fill</b>. A <b>Fill</b> is also an Array structured like so: [fill-color, fill-opacity]</i>
            </ul>
            </td>
        </tr>
        </table>
        <br>
        </dd>
</dl>

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
