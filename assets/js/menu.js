
// In this code, I use my functions instead of the default ones ("hasClass", "addClass", "removeClass"), because older versions of browsers do not support them.
// TODO: Approve this functions.
(function(){
    window.classFunction = {};

    window.classFunction.hasClass = function(elem, elemClass) {
        return !!elem.className.match(new RegExp('(\\s|^)'+ elemClass +'(\\s|$)'));
    };
    
    window.classFunction.addClass = function(elem, elemClass) {
        if (!window.classFunction.hasClass(elem,elemClass)) elem.className += " " + elemClass;
    };
    
    window.classFunction.removeClass = function(elem, elemClass) {
        if (window.classFunction.hasClass(elem, elemClass)) {
            var reg = new RegExp('(\\s|^)' + elemClass + '(\\s|$)');
            elem.className = elem.className.replace(reg,' ');
        }
    };
})();
// Function for calculating window width.
window.width = function() {
    var widnowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    return widnowWidth;
}
// Checking if the browser supports media queries.
window.isMediaQueriesSupported = function() {
    return (typeof window.matchMedia == 'function');
}

// https://habr.com/ru/post/336466/
window.supportsCSS = function (property, value) {
    var element = document.createElement('span');
    if (element.style[property] !== undefined) {
        element.style.cssText = property + ':' + value;
    } else {
        return false;
    }
    return element.style[property] === value;
};
var Keycode = {
    ARROW_DOWN: 40,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_LEFT: 37,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    HOME: 36,
    END: 35
};
(function() {
  if(document.addEventListener && window.isMediaQueriesSupported) {
    var header = document.querySelector('.header');
    var mainMenuContainer = document.querySelector('.header__main-menu-container');
    var burgerButtonContainer = document.querySelector('.header__main-menu-burger');
    var burgerButton = document.createElement('button');
    window.classFunction.addClass(burgerButton, 'burger__button');
    burgerButton.setAttribute('id', 'burger-button');
    burgerButton.setAttribute('aria-haspopup', 'true');
    burgerButton.setAttribute('aria-expanded', 'false');
    burgerButton.setAttribute('aria-label', 'Open menu');

    if(window.classFunction.hasClass(header, 'header--dark')) {
      window.classFunction.addClass(burgerButton, 'burger__button--dark');
    }

    // if(window.svg) {
    //   burgerButton.setAttribute('style', 'background-image: url("");');
    // } else {
    //   burgerButton.setAttribute('style', 'background-image: url("");');
    // }

    burgerButtonContainer.appendChild(burgerButton);

    var firstLink = mainMenuContainer.querySelector('.main-menu__link');

    // TODO: chacge comment for aria atributes.
    function toggleDropdownMenu() {
      if(burgerButton.getAttribute('aria-expanded') === 'true') { // If menu is already opened (check 'aria-expanded' attribute).
        burgerButton.setAttribute('aria-expanded', 'false');
        burgerButton.setAttribute('aria-label', 'Open menu');
        // if(window.svg) {
        //   burgerButton.setAttribute('style', 'background-image: url("{% include '../../img/buttons/burger-svg.njk' %}");');
        // } else {
        //   burgerButton.setAttribute('style', 'background-image: url("{% include '../../img/buttons/burger-png.njk' %}"); background-size: 14px 14px; background-position: center; background-repeat: no-repeat;');
        // }
        window.classFunction.removeClass(burgerButton, 'burger__button--opened');
        window.classFunction.removeClass(header, 'opened');
        window.classFunction.removeClass(mainMenuContainer, 'header__main-menu-container--opened');
        document.removeEventListener('click', window.emptySpaceClick);
      } else {
        burgerButton.setAttribute('aria-expanded', 'true');
        burgerButton.setAttribute('aria-label', 'Close menu');
        // if(window.svg) {
        //   burgerButton.setAttribute('style', 'background-image: url("{% include '../../img/buttons/cross-svg.njk' %}");');
        // } else {
        //   burgerButton.setAttribute('style', 'background-image: url("{% include '../../img/buttons/cross-png.njk' %}");');
        // }
        window.classFunction.addClass(header, 'opened');
        window.classFunction.addClass(burgerButton, 'burger__button--opened');
        window.classFunction.addClass(mainMenuContainer, 'header__main-menu-container--opened');
        document.addEventListener('click', window.emptySpaceClick);
      }
    };

    burgerButton.addEventListener('click', toggleDropdownMenu);

    // We handle not only a click, but also pressing Enter/Space.
    burgerButton.addEventListener('keydown', function(event) {
      if(event.keyCode === Keycode.SPACE || event.keyCode === Keycode.ENTER) {
        event.preventDefault();
        toggleDropdownMenu();

        if(burgerButton.getAttribute('aria-expanded') === 'true') {
          firstLink.focus();
        } else {
          burgerButton.focus();
        }
      }

      if(event.keyCode === Keycode.ESC) {
        window.closeDropdownMainMenu();
      }
    });
  }
})();
(function() {
    // If there is an anchor link in the menu, clicking on it should close the menu.
    var mainMenuContainer = document.getElementById('main-menu-container');
    var mainMenuLinks = mainMenuContainer.getElementsByTagName('a');
    var windowWidth = window.width();

    for (var i = 0; i < mainMenuLinks.length; i++) {
        mainMenuLinks[i].onclick = function() {
            if(window.isMediaQueriesSupported && windowWidth < 839) {
                window.closeDropdownMainMenu();
            }
        }
    }
})();
(function() {
  if(document.querySelector && window.isMediaQueriesSupported) { // This function is only need if there is support for media queries.
    var burgerButton = document.querySelector('.burger__button');
    var header = document.querySelector('.header');
    var mainMenuContainer = document.querySelector('.header__main-menu-container');
    
    window.closeDropdownMainMenu = function() {
      burgerButton.setAttribute('aria-expanded', 'false');
      burgerButton.setAttribute('aria-label', 'Open menu');
      window.classFunction.removeClass(burgerButton, 'burger__button--opened');
      window.classFunction.removeClass(header, 'opened');

      // if(window.svg) {
      //   burgerButton.setAttribute('style', 'background-image: url("{% include '../../img/buttons/burger-svg.njk' %}");');
      // } else {
      //   burgerButton.setAttribute('style', 'background-image: url("{% include '../../img/buttons/burger-png.njk' %}"); background-size: 14px 14px; background-position: center; background-repeat: no-repeat;');
      // }         
      window.classFunction.removeClass(mainMenuContainer, 'header__main-menu-container--opened');
      document.removeEventListener('click', window.emptySpaceClick);
    }
  }
})();



window.emptySpaceClick = function(){
    if (event.stopPropagation) {
        event.stopPropagation();
        var header = document.querySelector('.header');
        var burger = document.querySelector('.burger__button');
        var target = event.target;
        var isHeader = target == header || header.contains(target);
        var isBurger = target == burger;
    
        if(!isHeader && !isBurger) {
            window.closeDropdownMainMenu();
        }
    }
};
(function(){
    function getFirstSymbol(element) {
      var elementName = (element.textContent || element.innerText).toLowerCase().replace(/\s+/g, '');
      elementName = elementName.substr(0, 1)
      return elementName;
    }

    var mainMenuContainer = document.getElementById('main-menu-container');
    var mainMenuLinks = mainMenuContainer.getElementsByTagName('a');
    var mainMenuLinksSymbols = [];
    var burgerButton = document.getElementById('burger-button');
  
    function keyboardSupport(links, linksSymbols, i) {
      return function () {
        if (!event) { // If browser is IE8, or older the event object is a global property (window.event) and not an argument of the handler.
            event = window.event;
        } 
        var keyCode = event.keyCode || event.which; // Keycode (second condition for old browsers).
        var pressedKeySymbol = (event.key || String.fromCharCode(keyCode)).toLowerCase(); // The character of the pressed key (second condition for old browsers).
        var windowWidth = window.width();
        var shiftSymbolFlag; // User wants go to the link in the menu, and looks for it by the first letter in the name + shift, using keyboard (go backward).
        var symbolFlag; // User wants go to the link in the menu, and looks for it by the first letter in the name, using keyboard (go forward).
        var nextElement; // Menu link, that will be focused next.
          
        for(var j = 0; j < linksSymbols.length; j++) {
          if(linksSymbols[j] === pressedKeySymbol) { // If at least one link have the first letter, pressed by user - it means that user wanted go to this link. 
            if (event.shiftKey) {
              shiftSymbolFlag = true; // If the + shift key is pressed, the search will go backwards.
              break;
            } else {
              symbolFlag = true; // Otherwise, in the usual dirrection.
              break;
            }
          }
        }
  
        // There are two versions of keyboard support. The default is the desktop version: it will work when the browser does not support media queries, or when it support and screen larger than 839 px.
        // Otherwise the mobile version for menu will work.
        if(!window.isMediaQueriesSupported() || (windowWidth > 839 && window.isMediaQueriesSupported)) {
          if(keyCode === Keycode.ARROW_LEFT) {
            if(i === 0) {
              nextElement = links[links.length - 1];  // If user is at the first item, start at the last one.
            } else {
              nextElement = links[i - 1]; // Otherwise, from the current one.
            }
          }
          if(keyCode === Keycode.ARROW_RIGHT) {
            if(i === links.length - 1) {
              nextElement = links[0]; // If user is on the last item, start from the first.
            } else {
              nextElement = links[i + 1]; // Otherwise, from the current one.
            }
          }
        } else {
          if(keyCode === Keycode.ARROW_UP) {
            event.returnValue = false;  // Cancel the default action - scroll the page up.
            if(i === 0) {
                nextElement = links[links.length - 1];  // If user is at the first item, start at the last one.
            } else {
                nextElement = links[i - 1]; // Otherwise, from the current one.
            }
          }
  
          if(keyCode === Keycode.ARROW_DOWN) {
            event.returnValue = false;  // Cancel the default action - scroll the page down.
            if(i === links.length - 1) {
                nextElement = links[0]; // If user is on the last item, start from the first.
            } else {
                nextElement = links[i + 1]; // Otherwise, from the current one.
            }
          }
  
          if(keyCode === Keycode.ESC) {
            window.closeDropdownMainMenu();
            nextElement = burgerButton;
          }

          if(keyCode === Keycode.SPACE || keyCode === Keycode.ENTER) {
            window.closeDropdownMainMenu(); // For anchor links.
          }
        }

        if(keyCode === Keycode.SPACE || keyCode === Keycode.ENTER) {
          event.returnValue = false; // Space bar scrolls the page down - cancel the default behavior.
          document.location.href = links[i].href;
        }

        if(keyCode === Keycode.HOME) {
          event.returnValue = false;
          nextElement = links[0];
        }

        if(keyCode === Keycode.END) {
          event.returnValue = false;
          nextElement = links[links.length - 1];
        }
  
        if(symbolFlag) { // Go forward.
          var startLink;
          if(i === links.length - 1 ) { 
            startLink = 0; // If the current element is already the last one, start the search from the beginning.
          } else {
            startLink = i + 1;  // Otherwise, start the search from the next element.
          }
          while(startLink < links.length) {
            if(linksSymbols[startLink] === pressedKeySymbol) {
              nextElement = links[startLink]; // If the character of the pressed key is the first letter of the link, we have found the required link.
              break;
            }
            if(startLink === links.length - 1 ) {
              startLink = 0; // If we still have not found the desired link, it is in the previous ones. So let's start over again.
              continue; // Go to the next iteration without increasing the counter (so as not to miss startLink = 0).
            }
            if(startLink === links[i]) {
              break; // The cycle has come full circle and the link was never found. In order not to create an infinite cycle, we will interrupt it.
            }
            startLink++;
          }
        }
  
        if(shiftSymbolFlag) { // Go backward.
          var startLink;
          if(i === 0 ) {
            startLink = links.length - 1; // If the current element is already the first one, start the search from the end.
          } else {
            startLink = i - 1; // Otherwise, start the search from the previous element.
          }
          while(startLink >= 0) {
            if(linksSymbols[startLink] === pressedKeySymbol) { 
              nextElement = links[startLink]; // If the character of the pressed key is the first letter of the link, we have found the required link.
              break;
            }
            if(startLink === 0 ) {
              startLink = links.length - 1; // If we still have not found the desired link, it is somewhere forward. So let's start over again.
              continue;  // Go to the next iteration without decreasing the counter (so as not to miss startLink = links.length - 1).
            }
            if(startLink === links[i]) { // The cycle has come full circle and the link was never found. In order not to create an infinite cycle, we will interrupt it.
              break;
            }
            startLink--;
          }
        }
  
        if(nextElement) {
          nextElement.focus();
        }
      }
    }
  
    for (var i = 0; i < mainMenuLinks.length; i++) {
        mainMenuLinksSymbols.push(getFirstSymbol(mainMenuLinks[i]));
        if(i === 1) { // For all menu links, remove tabindex, except for the first one (I do my own way of navigating with the keyboard).
            mainMenuLinks[i].setAttribute('tabindex', 0);
          } else {
            mainMenuLinks[i].setAttribute('tabindex', -1);
          }
        mainMenuLinks[i].onkeydown = keyboardSupport(mainMenuLinks, mainMenuLinksSymbols, i);
    }
})();


