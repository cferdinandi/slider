# Slider (version 2 archive)
A simple, fluid, touch-enabled carousel.

Slider is a fork of the amazing [FlexSlider by Woo Themes](http://www.woothemes.com/flexslider/) that's been adapted to integrate more closely with the [Kraken boilerplate](http://cferdinandi.github.io/kraken/) and be easier to use.


## How It Works
Use Slider to show images, videos and other content.

    <div class="flexslider">
        <ul class="slides">
            <li><img src="img/cupcake1.jpg"></li>
            <li><img src="img/cupcake2.jpg"></li>
            <li><iframe width="560" height="315" src="http://www.youtube.com/embed/8qjge9U_MiA" frameborder="0" allowfullscreen></iframe></li>
        </ul>
    </div>


## Fluid Video
If you're including videos in your project, you also need to use [FluidVids.js](http://gomakethings.com/using-fluidvids-js/). Make sure it loads prior to Slider.


## Optional Advanced Features
Slider is a fork of the amazing [FlexSlider by WooThemes](http://www.woothemes.com/flexslider/) that's been adapted to integrate more closely with the [Kraken boilerplate](http://cferdinandi.github.io/kraken/) and be easier to use.

Slider has a bunch of optional settings and advanced features. For examples and documentation, visit the [FlexSlider documentation](http://www.woothemes.com/flexslider/) and click on "Advanced."

***A Quick Heads Up:*** *FlexSlider requires you to "hook up" the slider with inline JavaScript. For ease of use, I've baked that right into slider.js. If you want to adjust any of the features, you can do so in that file.*


## A More Usable Carousel
Slider modifies a few of FlexSlider's default settings to make it more usable and accessible:

* Auto-rotation is disabled by default.
* Navigation arrows are permanently visible.
* Navigation arrows are icons, not images, for crisp rendering on retina displays.
* Relative sizing so all elements scale proportionately.
* Progressive enhancement. By default, all images and videos are displayed. A small script adds a .js class to the body element, which applies the Slider styles.

For more on carousel usability, read these great articles by [Brad Frost](http://bradfrostweb.com/blog/post/carousels/), [Erik Runyons](http://weedygarden.net/2013/01/carousel-stats/), the [Nielsen Norman Group](http://www.nngroup.com/articles/auto-forwarding/), and the [University of York](http://yorkwebteam.blogspot.co.uk/2013/03/are-homepage-carousels-effective-aka.html).


## Browser Support
Slider works in all modern browsers, and IE 7 and above. Slider also requires [jQuery 1.4.2](http://jquery.com/) or higher.


## Changelog
* v2.1 (June 7, 2013)
  * Updated versioning to align with FlexSlider.
* v1.3 (March 19, 2013)
  * Re-released with as a new repo.
* v1.2 (March 18, 2013)
  * Added better image navigation buttons.
* v1.1 (February 5, 2013)
  * Added relative sizing to all elements.
  * Replaced navigation images with scalable unicode icons.
* v1.0 (January 31, 2013)
  * Initial Commit


## License
FlexSlider is licensed under [GNU General Public License](http://www.gnu.org/licenses/gpl-2.0.html).
