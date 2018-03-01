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

    var svgFactory = new SvgFactory("em");
    
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
    
If your SVG has multiple <b>Path</b> tags, you can change the color of all the <b>Path</b> tags individually by making an <b>Array</b> of colors:

    //...
    svg.setColor(["#7c2af9", "rgb(120, 65, 200)", "rgba(74, 179, 7, 0.5)"]);
    
> <b>Note</b>: The colors are applied in the order the <b>Path</b> tags appear in the SVG.

> <b>Warning</b>: If you pass a <b>String</b> (ex: `svg.setColor("#7c2af9")`) for an SVG with multiple <b>Path</b> tags, the color will be applied to them all. Also, if you pass an <b>Array</b> that doesn't have as many colors as the SVG has <b>Path</b> tags, you will be thrown an error.

<hr>

# Documentation

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
            <th width="30%">Field</th>
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
                    <li><b>hideForLoad</b> (Boolean) <i>Optional</i>: Whether or not to hide the container while loading the SVG. Container is shown again only after the SVG has loaded and all modifications (provided by <b>load()</b>) have been applied. Default is <b>false</b>.</li>
                    <li><b>svgID</b> (String) <i>Optional</i>: The ID to be given to the injected SVG tag.</li>
                    <li><b>width</b> (Integer) <i>Optional</i>: The width to be given to the injected SVG tag. Negative numbers are handled as percentage, otherwise <b>SvgFactory.unitType</b> is used.</li>
                    <li><b>height</b> (Integer) <i>Optional</i>: The height to be given to the injected SVG tag. Negative numbers are handled as percentage, otherwise <b>SvgFactory.unitType</b> is used.</li>
                    <li><b>color</b> (String or [String]) <i>Optional</i>: If a <b>String</b> is used, all <b>Path</b> tags will be set to that color. If an <b>Array</b> is used, the colors are applied in the order the <b>Path</b> tags appear in the SVG. <b>Do not</b> pass an <b>Array</b> of colors with less items than there are <b>Path</b> tags in the SVG image.</li>
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
        </table>
        <br>
  <dt><h2>Class SvgFactoryImage()</h2></dt>
        <dd>There is an instance of <b>SvgFactoryImage</b> for every SVG injected and retrieved with SvgFactoryJS. You can think of an <b>SvgFactoryImage</b> as an actual SVG image, since you will use <b>SvgFactoryImage</b> to maniplulate an SVG instead of it's <b>Element</b>.
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
