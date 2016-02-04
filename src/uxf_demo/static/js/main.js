// Hive Colony Framework
// Copyright (c) 2008-2016 Hive Solutions Lda.
//
// This file is part of Hive Colony Framework.
//
// Hive Colony Framework is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Hive Colony Framework is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Hive Colony Framework. If not, see <http://www.gnu.org/licenses/>.

// __author__    = João Magalhães <joamag@hive.pt> & Marco Sousa <v-msousa@hive.pt>
// __version__   = 1.0.0
// __revision__  = $LastChangedRevision$
// __date__      = $LastChangedDate$
// __copyright__ = Copyright (c) 2008-2016 Hive Solutions Lda.
// __license__   = GNU General Public License (GPL), Version 3

// the style to be used from the
// begining of the page loading
var INITIAL_STYLE = "omni-style";

(function(jQuery) {
    jQuery.fn.udemosidemenu = function(options) {
        // retrieves the reference to the currently matched object
        // that is going to be used in the function
        var matchedObject = this;

        // retrieves the various elements that are going to be used
        // in the extension for event registration
        var _body = jQuery("body");
        var menu = jQuery(".side-menu", matchedObject);
        var menuButton = jQuery(".button-side-menu", matchedObject);
        var overlay = jQuery(".overlay", matchedObject);
        var menuLinks = jQuery(".link", menu);

        // registers for the click event on button
        menuButton.click(function() {
            // shows the menu with an overlay
            menu.addClass("open");
            _body.addClass("menu-open");

            // registers for the click event on
            // the overlay to close the menu
            overlay.one("click", function() {
                menu.triggerHandler("hide", [500]);
            });

            // registers for the post hide event on
            // overlay to be able to hide the menu
            // whenever the overlay is hidden
            overlay.one("post_hide", function() {
                menu.triggerHandler("hide", [500]);
            });

            // triggers the "initial" show operation/event
            // an ensures that the dark version of the overlay
            // is displayed to have the proper layout
            overlay.triggerHandler("show", [500, "dark"]);
        });

        // converts the links present in the
        // side menu into smooth based links
        // that respect the offset to the top
        menuLinks.attr("data-duration", "500");
        menuLinks.attr("data-offset", "-42");
        menuLinks.uxlink();

        // hides the menu when
        // a menu link is clicked
        menuLinks.click(function() {
            menu.triggerHandler("hide");
        });

        // binds the hide event
        menu.bind("hide", function() {
            menu.removeClass("open");
            _body.removeClass("menu-open");
            overlay.triggerHandler("hide", [500]);
        });

        // returns the matched object to the caller function so
        // that it may be used in chained actions
        return matchedObject;
    };
})(jQuery);

(function(jQuery) {
    jQuery.fn.udemostack = function() {
        var matchedObject = jQuery(this);
        var _window = jQuery(window);

        var init = function() {
            if (!matchedObject || matchedObject.length == 0) {
                return;
            }

            // adds to extra elements to the stack representing the items
            // that are inside the stack and the ones that are outside it
            matchedObject.append("<div class=\"stack-in\"></div>");
            matchedObject.append("<div class=\"stack-out\"></div>");

            // iterates over each of the selected elements to start the
            // stack structure for each of them
            matchedObject.each(function(index, element) {
                var _element = jQuery(this);
                var stackOut = jQuery("> .stack-out", _element);
                var stackItems = jQuery("> .stack-item", _element);
                var stackTop = jQuery("> .stack-item.stack-top",
                    _element);
                stackTop = stackTop.length == 0 ? jQuery(
                    "> .stack-item:first", _element) : stackTop;
                stackOut.append(stackItems);
                push(_element, stackTop, false);
            });
        };

        var push = function(element, target, animated) {
            if (!target || target.length == 0) {
                return;
            }
            var stackIn = jQuery("> .stack-in", element);
            var inStack = jQuery("> .stack-item", stackIn);
            inStack.removeClass("stack-top");
            inStack.addClass("stack-bottom");
            target.addClass("stack-top");
            target.removeClass("stack-bottom");
            stackIn.append(target);
            _reposition(element);
        };

        var pop = function(element) {
            var stackIn = jQuery("> .stack-in", element);
            var stackOut = jQuery("> .stack-out", element);
            var stackItems = jQuery("> .stack-item", stackIn);
            var stackTop = jQuery("> .stack-item.stack-top", stackIn);
            if (stackItems.length == 1) {
                return;
            }
            var stackNext = stackTop.prev();
            var transition = stackIn.css("transition-duration");
            transition = transition ? parseFloat(transition) : 0;
            stackTop.addClass("stack-gc");
            stackTop.removeClass("stack-top");
            stackNext.addClass("stack-top");
            stackNext.removeClass("stack-bottom");
            _reposition(element);
            setTimeout(function() {
                _gc(element);
            }, transition * 1000);
        };

        var _reposition = function(element) {
            var stackIn = jQuery("> .stack-in", element);
            var stackItems = jQuery("> .stack-item", stackIn);
            var stackTop = jQuery("> .stack-item.stack-top", stackIn);
            var itemsWidth = 0;
            var itemsOffset = 0;
            var stackTopWidth = stackTop.outerWidth(true);
            stackItems.each(function(index, element) {
                var _element = jQuery(this);
                var isGarbage = _element.hasClass("stack-gc");
                var elementWidth = _element.outerWidth(true);
                itemsWidth += elementWidth;
                itemsOffset += isGarbage ? 0 : elementWidth;
            });
            stackIn.width(itemsWidth);
            stackIn.css("left", String((itemsOffset * -1) + stackTopWidth) + "px");
        };

        var _gc = function(element) {
            var stackIn = jQuery("> .stack-in", element);
            var stackOut = jQuery("> .stack-out", element);
            var garbage = jQuery("> .stack-item.stack-gc", stackIn);
            garbage.removeClass("stack-gc");
            stackOut.append(garbage);
        };

        // registers for the push event with the proper target
        // parameter that should push a stack item into the
        // curent included stack
        matchedObject.bind("push", function(event, target) {
            var element = jQuery(this);
            push(element, target);
        });

        // registers for the pop operation in the matched
        // object so that it's possible to remote an item
        // from the current "included" sequence
        matchedObject.bind("pop", function() {
            var element = jQuery(this);
            pop(element);
        });
        _window.bind("size", function() {
            matchedObject.each(function(index, value) {
                var _element = jQuery(this);
                _reposition(_element);
            });
        });
        init();
        return this;
    };
})(jQuery);

(function(jQuery) {
    jQuery.fn.udemostacknavigation = function(options) {
        // retrieves the reference to the currently matched object
        // that is going to be used in the function
        var matchedObject = this;

        // retrieves the stack navigation buttons
        var itemButton = jQuery(".stack-item-button", matchedObject);
        var popButton = jQuery(".stack-pop-button", matchedObject);

        // registers for the click event on button
        itemButton.click(function(event) {
            var element = jQuery(this);

            // retrieves the parent stack
            // and pushes the target item
            var stack = element.parents(".stack");
            var stackTarget = element.attr("data-target");
            stackTarget = jQuery(stackTarget);
            stack.triggerHandler("push", [stackTarget]);
        });

        popButton.click(function() {
            var element = jQuery(this);
            var stack = element.parents(".stack");
            stack.triggerHandler("pop");
        });

        // returns the matched object to the caller function so
        // that it may be used in chained actions
        return matchedObject;
    };
})(jQuery);

(function(jQuery) {
    jQuery.fn.udemobutton = function(options) {
        // retrieves the reference to the currently matched object
        // that is going to be used in the function
        var matchedObject = this;

        // retrieves the various elements that are going to be used
        // in the extension for event registration
        var button = jQuery("#button", matchedObject);

        // registers for the click event on button
        button.click(function() {
            alert("Button Clicked");
        });

        // returns the matched object to the caller function so
        // that it may be used in chained actions
        return matchedObject;
    };
})(jQuery);

(function(jQuery) {
    jQuery.fn.udemoslider = function(options) {
        // retrieves the reference to the currently matched object
        // that is going to be used in the function
        var matchedObject = this;

        // retrieves the various elements that are going to be used
        // in the extension for event registration
        var sliderButton = jQuery("#button-slider", matchedObject);

        // registers for the click event for the slider
        // button so that the slidder can be triggered
        sliderButton.click(function() {
            // shows the slider
            var element = jQuery(this);
            var _body = element.parents("body");
            var slider = jQuery("#slider", _body);
            slider.uxslider("show");

            // scrolls to the slider
            var settings = {
                offset: -42
            };
            _body.uxscrollto("#slider", 500, settings);
        });

        // returns the matched object to the caller function so
        // that it may be used in chained actions
        return matchedObject;
    };
})(jQuery);

(function(jQuery) {
    jQuery.fn.udemoprogress = function(options) {
        // retrieves the reference to the currently matched object
        // that is going to be used in the function
        var matchedObject = this;

        // retrieves the various elements that are going to be used
        // in the extension for event registration
        var buttonProgress = jQuery("#button-progress", matchedObject);
        var progressBar = jQuery("#progress-bar-row", matchedObject);

        // registers for the click event on button progress
        buttonProgress.click(function() {
            // sets the initial percentage value
            var percentage = progressBar.attr("data-percentage") || "0";
            percentage = parseInt(percentage);

            var _updatePercentage = function() {
                // increments the percentage value
                percentage += 1;

                // in case the percentage overflows returns
                // immediately as there's nothing else
                // remaining to be done in this function
                if (percentage > 100) {
                    return;
                }

                // sets the new percentage in the progress bar
                progressBar.uxprogressbar("change", {
                    percentage: percentage
                });

                // sets a timeout to update the percentage
                setTimeout(_updatePercentage, 10);
            };

            // calls the initial update percentage
            _updatePercentage();
        });
        // returns the matched object to the caller function so
        // that it may be used in chained actions
        return matchedObject;
    };
})(jQuery);

(function(jQuery) {
    jQuery.fn.udemonotification = function(options) {
        // retrieves the reference to the currently matched object
        // that is going to be used in the function
        var matchedObject = this;

        // retrieves the various elements that are going to be used
        // in the extension for event registration
        var buttonNotification = jQuery("#button-notification", matchedObject);

        // registers for the click event on button notification
        buttonNotification.click(function() {
            jQuery("body").uxnotification({
                title: "Notification Test",
                message: "Don't read this dummy text, it's a waste of your time.",
                timeout: 50000
            });
        });

        // returns the matched object to the caller function so
        // that it may be used in chained actions
        return matchedObject;
    };
})(jQuery);

(function(jQuery) {
    jQuery.fn.udemo = function(options) {
        // retrieves the reference to the currently matched object
        // that is going to be used in the function
        var matchedObject = this;

        /**
         * Changes the current style to the style with the defined name.
         *
         * @param {String}
         *            The name of the style to be used for the current document.
         */
        var changeStyle = function(style) {
            // retrieves the reference to the body element and
            // uses it to retrieve the currently set style
            var _body = jQuery("body");
            var currentStyle = _body.data("style");

            // updates the style classes by removing the current
            // style's class and adding the new one
            currentStyle && _body.removeClass(currentStyle);
            _body.addClass(style);

            // updates the style reference in the body so that it
            // may retrieved latter if that's required
            _body.data("style", style);
        };

        // retrieves the various elements that are going to be used
        // in the extension for event registration
        var contents = matchedObject.filter("body");
        var links = jQuery(".container a:not(.tab-selector, .calendar-arrow)",
            matchedObject);
        var headers = jQuery("h1.line", matchedObject);
        var styleField = jQuery("#drop-field-style", matchedObject);
        var sections = jQuery("section", matchedObject);
        var search = jQuery("#search", matchedObject);
        var searchField = jQuery("> .drop-field", search);
        var searchSource = jQuery(".data-source", search);
        var searchItems = searchSource.data("items");
        var stack = jQuery(".stack", matchedObject);

        // converts the complete set of links present in the container
        // into the appropriate layout and converts them into smooth
        // based links that already respect the offset to the top
        links.addClass("link");
        links.addClass("link-blue");
        links.attr("data-duration", "500");
        links.attr("data-offset", "-42");
        links.uxlink();

        // iterates over the complete set of sections in order to be able
        // to index them under the search items in the data source
        sections.each(function(index, element) {
            // retrieves the current element (section) in iteration
            // and uses it to retrieve its title value
            var _element = jQuery(this);
            var title = jQuery("> h1", _element);

            // retrieves the identifier of the section from the
            // the id attribute of it and the name of it as the
            // text of the title
            var id = _element.attr("id");
            var name = title.text();

            // validates that both the id and the name of the section
            // are valid an in case they are not valid returns immediately
            // because there's nothing to be done in iteration
            if (!id || !name) {
                return;
            }

            // creats the link value be prepending the cardinal value to
            // the idetifier of the section and uses it together with the
            // name of the section to create the item map and adds it to
            // the list of search items in the data source
            var link = "#" + id;
            searchItems.push({
                link: link,
                name: name
            });
        });

        // registers for the value selection changed in the style field
        // so that it's possible to change the style of the current page
        styleField.bind("value_select", function(event, value, valueLogic) {
            // retrieves the current style field that has just been
            // triggered and resets it to the original value (as expected)
            var element = jQuery(this);
            element.uxreset();

            // triggers a new alert window indicating the chaning of the
            // style and changes the style on confirmation
            alert("Changing value to <b>" + value + "</b>", function() {
                changeStyle(valueLogic);
            });
        });

        // registers for the show event in the search overlay panel
        // so that the text field is restored to the original value
        search.bind("shown", function() {
            var element = jQuery(this);
            var textField = jQuery(".text-field", element);
            textField.uxreset();
        });

        // registers for the value selection changed in the search field
        // in search field to be able to close the search field
        searchField.bind("value_select", function() {
            var element = jQuery(this);
            var search = element.parents("#search");
            search.triggerHandler("hide");
        });

        // registers for the click event in the complete set of headers
        // so that it's possible to toggle it's visibility
        headers.click(function() {
            var element = jQuery(this);
            var section = element.parents("section");
            var sectionContents = jQuery(".section-contents", section);
            var isVisible = sectionContents.is(":visible");
            if (isVisible) {
                sectionContents.slideUp(350);
            } else {
                sectionContents.slideDown(500);
            }
        });

        // initializes the demo stack
        stack.udemostack();

        // runs the various domain specific extensions so that
        // all of the demo logic is correctly loaded
        matchedObject.udemosidemenu();
        matchedObject.udemobutton();
        matchedObject.udemoslider();
        matchedObject.udemoprogress();
        matchedObject.udemonotification();
        matchedObject.udemostacknavigation();

        // changes the style to the initial style so that the contents
        // of the current page are changed accordingly
        contents.length > 0 && changeStyle(INITIAL_STYLE);

        // returns the matched object to the caller function so
        // that it may be used in chained actions
        return matchedObject;
    };
})(jQuery);

(function(jQuery) {
    jQuery.fn.uapply = function(options) {
        // sets the jquery matched object
        var matchedObject = this;

        // applies the global demo plugin to the currently
        // matched object so that all the specific behaviour
        // of the demo is applied to it as a consequence
        matchedObject.udemo();
    };
})(jQuery);

jQuery(document).ready(function() {
    var _body = jQuery("body");
    _body.bind("applied", function(event, base) {
        base.uapply();
    });
});
