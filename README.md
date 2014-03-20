# Slider
A simple, responsive, touch-enabled image slider. Slider is a fork of [Swipe](http://swipejs.com), modified for progressive enhancement, with a few added features and bug fixes. [View the demo](http://cferdinandi.github.io/slider/).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Options & Settings](#options-and-settings)
3. [Fluid Video](#fluid-video)
4. [What's Different](#whats-different)
5. [More Usable Sliders](#more-usable-sliders)
6. [Browser Compatibility](#browser-compatibility)
7. [How to Contribute](#how-to-contribute)
8. [License](#license)
8. [Changelog](#changelog)



## Getting Started

### 1. Include Slider on your site.

```html
<link rel="stylesheet" href="css/slider-css.css">
<script src="js/slider.js"></script>
```

Slider is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

The `_config.scss` and `_mixins.scss` files are the same ones used in [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_slider.css` file right into Kraken without making any updates. Or, adjust the variables to suit your own project.

### 2. Add the markup to your HTML.

```html
<div class="slider" data-slider>
	<div class="slides">
		<div><img src="#"></div>
		<div><img src="#"></div>
		<div><video src="#"></div>
		<div>Text content could go here, too.</div>
	</div>
	<div data-slider-nav></div>
	<div data-slider-count></div>
</div>
```

The `[slider-nav]` and `[slider-count]` sections are optional (though I'm assuming you'd want some type of navigation buttons). Slider will dynamically add navigation elements and slide position content to them.

They don't have to be `div` elements, as long as the data attributes are left intact and they're contained within the `[slider-nav]` section, and can be moved around or styled with CSS however you see fit.

### 3. Initialize Slider.

In the footer of your HTML document, activate Slider and configure your settings. This is where you can change the Slider navigation and position content, turn on auto-rotation (but please don't - that sucks), and more.

**Settings:**

`startSlide` (integer, default: 0) - index position Swipe should start at
`speed` (integer, default: 300) - speed of prev and next transitions in milliseconds.
`auto` (integer, begin with auto slideshow: time in milliseconds between slides)
`continuous` (boolean, default: true) - create an infinite feel with no endpoints
`disableScroll` (boolean, default: false) - stop any touches on this container from scrolling the page
`stopPropagation` (boolean, default: false) - stop event propagation
`callback` (function) - runs at slide change.
`transitionEnd` (function) - runs at the end slide transition.

Add this to your footer to get started:

```html
<script>
	window.sliderInit = (function (window, document, undefined) {

		'use strict';

		// Feature Test
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// SELECTORS
			var sliders = document.querySelectorAll('[data-slider]');
			var mySwipe = Array;


			// EVENTS, LISTENERS, AND INITS

			// Add class to HTML element to activate conditional CSS
			document.documentElement.className += ' js-slider';

			// Activate all sliders
			Array.prototype.forEach.call(sliders, function (slider, index) {

				// SELECTORS

				var slideCount = slider.querySelector('[data-slider-count]'); // Slider count wrapper
				var slideNav = slider.querySelector('[data-slider-nav]'); // Slider nav wrapper


				// METHODS

				// Display count of slides
				var createSlideCount = function () {
					var slideTotal = mySwipe[index].getNumSlides();
					var slideCurrent = mySwipe[index].getPos();
					if ( slideCount !== null ) {
						slideCount.innerHTML = slideCurrent + ' of ' + slideTotal;
					}
				};

				// Display Slider navigation
				var createNavButtons = function () {
					if ( slideNav !== null ) {
						slideNav.innerHTML = '<a data-slider-nav-prev href="#">Previous</a> | <a data-slider-nav-next href="#">Next</a>';
					}
				};

				// Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the slide
				var stopVideo = function () {
					var currentSlide = mySwipe[index].getPos() - 1;
					var iframe = slider.querySelector( '[data-index="' + currentSlide + '"] iframe');
					var video = slider.querySelector( '[data-index="' + currentSlide + '"] video' );
					if ( iframe !== null ) {
						var iframeSrc = iframe.src;
						iframe.src = iframeSrc;
					}
					if ( video !== null ) {
						video.pause();
					}
				};

				// Handle next button
				var handleNextBtn = function (event) {
					event.preventDefault();
					stopVideo();
					mySwipe[index].next();
				};

				// Handle previous button
				var handlePrevBtn = function (event) {
					event.preventDefault();
					stopVideo();
					mySwipe[index].prev();
				};

				// Handle keypress
				var handleKeypress = function (event) {
					if ( event.keyCode == 37 ) {
						mySwipe[index].prev();
					}
					if ( event.keyCode == 39) {
						mySwipe[index].next();
					}
				};


				// EVENTS, LISTENERS, AND INITS

				// Activate Slider
				mySwipe[index] = Swipe(slider, {
					// startSlide: 2,
					// speed: 400,
					// auto: 3000,
					continuous: true,
					// disableScroll: false,
					// stopPropagation: false,
					callback: function(index, elem) {
						createSlideCount(); // Update with new position on slide change
					},
					// transitionEnd: function(index, elem) {}
				});

				// Create slide count and nav
				createSlideCount();
				createNavButtons();
				var btnNext = slider.querySelector('[data-slider-nav-next]'); // Next slide button
				var btnPrev = slider.querySelector('[data-slider-nav-prev]'); // Previous slide button

				// Toggle Previous & Next Buttons
				if ( btnNext ) {
					btnNext.addEventListener('click', handleNextBtn, false);
				}
				if ( btnPrev ) {
					btnPrev.addEventListener('click', handlePrevBtn, false);
				}

				// Toggle Left & Right Keypress
				window.addEventListener('keydown', handleKeypress, false);

			});

		}

	})(window, document);
</script>
```

And that's it, you're done. Nice work!



## Options and Settings

The navigation elements, slide count and keyboard navigation for Slider were all created by tapping into the simple, powerful API included in [Swipe](http://swipejs.com/).

**Write your own functions using these API functions:**

`prev()` - Slide to prev
`next()` - Slide to next
`getPos()` - Returns current slide index position
`getNumSlides()` - Returns the total amount of slides
`slide(index, duration)` - Slide to set index position (duration: speed of transition in milliseconds)



## Fluid Video

If you're including videos in your project, you also need to use [FluidVids.js](https://github.com/toddmotto/fluidvids). Make sure it loads prior to Slider.

*Note There's a known bug with most touch-based sliders and video iframes. The iframe captures the entire touch event, making it impossible to swipe to the next slide. Accordingly, it's really important that you include an alternate means of navigation when including videos.*



## What's Different

**From Swipe?**
Swipe sliders with lots of slides crash Safari in iOS. Slider incorporates [Ron Ilan's bug fix](https://github.com/bradbirdsall/Swipe/pull/277). Swipe also does not support Windows Phone 8 touch events. Slider incorporates a [bug fix for that by Dinesh Duggal](https://github.com/bradbirdsall/Swipe/pull/405) as well. Slider includes built-in navigation buttons, slide position info, keyboard navigation, and progressive enhancement. Otherwise, not much.

**From the old version of Slider?**
Slider no longer requires jQuery, and is now powered entirely by modern, vanilla JavaScript. As a result, it's a lot faster, and works with any framework.



## More Usable Sliders

Used improperly, content sliders can have a negative impact on your site's usability and effectiveness. For more on carousel usability, read these great articles:

* [Carousels by Brad Frost](http://bradfrostweb.com/blog/post/carousels/)
* [Carousel Stats by Erik Runyons](http://weedygarden.net/2013/01/carousel-stats/)
* [Auto-Forwarding Carousels by Nielsen Norman Group](http://www.nngroup.com/articles/auto-forwarding/)
* [Are homepage carousels effective? by University of York](http://yorkwebteam.blogspot.co.uk/2013/03/are-homepage-carousels-effective-aka.html)



## Browser Compatibility

Slider works in all modern browsers, and IE 9 and above.

Slider is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default.



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Don't forget to update the version number, the changelog (in the `readme.md` file), and when applicable, the documentation.



## License

Slider is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

* v4.2 - March 15, 2014
  * [Added Windows Phone touch event support](https://github.com/cferdinandi/slider/issues/5).
* v4.1 - Feburary 7 2014
  * Added support to pause HTML5 videos on a slide transition.
* v4.0 - February 6, 2014
  * Switched to a data attribute for the toggle selector (separates scripts from styles).
  * Added namespacing to init IIFE.
  * Moved feature test to script itself for better progressive enhancement.
  * Updated looping method.
  * iFrame videos stop playing when user leaves current slide.
* v3.5 - December 6, 2013
  * Set img, video, and iframe width to 100%.
* v3.4 - December 6, 2013
  * Added Sass support.
* v3.3 - October 26, 2013
  * [Added transitionEnd bug fix](https://github.com/cferdinandi/slider/issues/1).
  * Converted from spaces to tabs.
  * Removed `*zoom: 1` IE hack.
* v3.2 - August 27, 2013
  * Ran through JSHint.
* v3.0 - August 5, 2013
  * Replaced core code from FlexSlider to Swipe.
  * Dropped support for IE 8 and lower.
  * Removed jQuery dependancy. Slider is now framework agnostic.
* v2.1 - June 7, 2013
  * Updated versioning to align with FlexSlider.
* v1.3 - March 19, 2013
  * Re-released with as a new repo.
* v1.2 - March 18, 2013
  * Added better image navigation buttons.
* v1.1 - February 5, 2013
  * Added relative sizing to all elements.
  * Replaced navigation images with scalable unicode icons.
* v1.0 - January 31, 2013
  * Initial Commit