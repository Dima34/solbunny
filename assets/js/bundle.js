
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


(function() {

var header = document.querySelector(".header");
if(document.addEventListener){
    window.addEventListener("scroll", function (e) {
        if (document.documentElement.scrollTop > 0) {
            window.classFunction.addClass(header, 'scrolled');
        } else {
            window.classFunction.removeClass(header, 'scrolled');
        }
    })
    
    if(document.dataset){
        var parralaxElems = document.querySelectorAll('.background');
    
    
        window.addEventListener("scroll", function (e) {
            for (var el = 0; el < parralaxElems.length; el++) { 
                
                if(this.window.innerWidth >840){
                    var speedEl = (parralaxElems[el].dataset.speed);
                    var yPos = -(window.pageYOffset / speedEl);
                    var coords = parralaxElems[el].dataset.orientation +" " + yPos + 'px' + ', center center';
                    parralaxElems[el].style.backgroundPosition = coords;
                }
                
            }
         
        });
        
        
        var enchancedParralaxElems = document.querySelectorAll('.backgroundEnchanced');
        
        window.addEventListener("scroll", function (e) {
            for (var el = 0; el < enchancedParralaxElems.length; el++) {
                
                var blockCenter;
        
                if(window.innerWidth > 660){
                    blockCenter =  window.getComputedStyle(enchancedParralaxElems[el]).height.slice(0, -2)/2;
                } else{
                    blockCenter =  window.innerHeight;
                }
                var speedEl = +(parralaxElems[el].dataset.speed);
                var yPos = (-(window.pageYOffset / speedEl)) + blockCenter;
                var coords = enchancedParralaxElems[el].dataset.orientation+" " + yPos + 'px';
                
                enchancedParralaxElems[el].style.backgroundPosition = coords;
            }
        });
        
        var transitionParallaxEls = document.querySelectorAll('.about__image_wrapper');
        
        
        function transitionParallaxElsCheck(parallaxEl){
            if(this.window.innerWidth <840){
                var speedEl = (parallaxEl.dataset.speed);
                var yPos = -(window.pageYOffset / speedEl/2);
                var coords = "translateY(" + Math.round(yPos) + 'px)';
                parallaxEl.style.transform = coords;
            } else{
                parallaxEl.style.transform = "translateY(0px)";
            }
        }
        
        
        window.addEventListener("scroll", function (e) {
            for (var el = 0; el < transitionParallaxEls.length; el++) {
                transitionParallaxElsCheck(transitionParallaxEls[el])
            }
        });
        
        window.addEventListener("resize", function (e) {
            for (var el = 0; el < transitionParallaxEls.length; el++) {
                transitionParallaxElsCheck(transitionParallaxEls[el])
            }
        });
    }
   
}
})();


window.width = function() {
    var widnowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    return widnowWidth;
};
  
window.height = function() {
    var widnowWidth = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    return widnowWidth;
};
  
window.scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);
// Checking if the browser supports media queries.
window.isMediaQueriesSupported = function() {
  return (typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined' ||  typeof window.MediaError != 'undefined');
};
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
}
// Add a getElementsByClassName function if the browser doesn't have one
// Limitation: only works with one class name
// Copyright: Eike Send http://eike.se/nd
// License: MIT License

if (!document.getElementsByClassName) {
  document.getElementsByClassName = function(search) {
    var d = document, elements, pattern, i, results = [];
    if (d.querySelectorAll) { // IE8
      return d.querySelectorAll("." + search);
    }
    if (d.evaluate) { // IE6, IE7
      pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
      elements = d.evaluate(pattern, d, null, 0, null);
      while ((i = elements.iterateNext())) {
        results.push(i);
      }
    } else {
      elements = d.getElementsByTagName("*");
      pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
      for (i = 0; i < elements.length; i++) {
        if ( pattern.test(elements[i].className) ) {
          results.push(elements[i]);
        }
      }
    }
    return results;
  }
}
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#polyfill

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
(function() {
  var submenusLinks = document.getElementsByClassName('main-menu__link--submenu');
  var submenus = document.getElementsByClassName('main-menu__submenu');
  var submenuItems = document.getElementsByClassName('main-menu__item--submenu');

  var addSubmenuClickHandler = function(link, submenu, item) {
    link.onclick = function() {
      if(window.classFunction.hasClass(link, 'main-menu__link--submenu-opened')) {
        TwoLevelMenu.closeSubmenu(link, submenu, item);
      } else {
        TwoLevelMenu.openSubmenu(link, submenu, item);
      }
    };
  };

  for(var i = 0; i < submenusLinks.length; i++) {
    // submenusLinks[i].setAttribute('tabIndex', 0);
    submenusLinks[i].setAttribute('aria-expanded','false');
    submenusLinks[i].setAttribute('aria-haspopup','true');
    addSubmenuClickHandler(submenusLinks[i], submenus[i], submenuItems[i]);
  }
})();

(function(){
  if(window.supportsCSS('position', 'sticky') || window.supportsCSS('position', '-webkit-sticky')) {
    var stickyHeader = document.querySelector('.header');
    stickyHeader.classList.add('header--sticky');
    var mainMenuContainer = stickyHeader.querySelector('.header__main-menu-container');
    var burgerButton = stickyHeader.querySelector('.burger');
    function calcMenuHeight() {
      // If the device/browser has a small screen height, then the sticky header will cover the entire screen and some of the bottom links will not fit on the screen.
      // To see the bottom menu link, user will first have to scroll through the entire page. So, you need to add a scroll to the menu itself.
      // mainMenuContainer.style.maxHeight = window.height() - stickyHeader.offsetHeight + 'px';
    }

    calcMenuHeight();
    window.addEventListener('resize', calcMenuHeight);
    burgerButton.addEventListener('click', calcMenuHeight);
  }
})();

(function(){
  if(document.addEventListener){
    var targets = document.querySelectorAll('.anchor-target');
    var links = document.querySelectorAll('.main-menu__link');
    var sideLinks = document.querySelectorAll(".section-navigation__link");

    var visible = function (target, link) {
      var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      };

      windowPosition = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

    
      if(Math.round(windowPosition.bottom) == Math.round(window.getComputedStyle(document.documentElement).height.slice(0,-2))){
        console.log(`bottom`);
        var previousLink = document.querySelector('.main-menu__link--current');
        var previousSideLink = document.querySelector('.section-navigation__link--current');
        
        window.classFunction.removeClass(previousLink, 'main-menu__link--current');
        window.classFunction.removeClass(previousSideLink, 'section-navigation__link--current');
        window.classFunction.addClass(targets[targets.length-1], 'main-menu__link--current');
        window.classFunction.addClass(sideLinks[sideLinks.length-1], 'section-navigation__link--current');        
        return link;
      } else if (targetPosition.bottom > windowPosition.top &&
        targetPosition.top < windowPosition.bottom) {
        var previousLink = document.querySelector('.main-menu__link--current');
        var previousSideLink = document.querySelector('.section-navigation__link--current');

        if(link != undefined){
          if(previousLink && !link.isEqualNode(previousLink)) {
            window.classFunction.removeClass(previousLink, 'main-menu__link--current');
            window.classFunction.removeClass(previousSideLink, 'section-navigation__link--current');
            
            window.classFunction.addClass(link, 'main-menu__link--current');
            if(window.history.pushState){
              window.history.pushState('', '', link.getAttribute('href'));
            }
          } else if(!previousLink) {
            window.classFunction.addClass(link, 'main-menu__link--current');
            if(window.history.pushState){
              window.history.pushState('', '', link.getAttribute('href'));
            }
          }

          for (var i = 0; i < sideLinks.length; i++) {
            if(sideLinks[i].getAttribute("href") == link.getAttribute('href')){
              window.classFunction.addClass(sideLinks[i], 'section-navigation__link--current');
            }
          };
        }
        
        return link;
      }

      
    };
    
    var currentLink;
    function setCurrentLink() {
      currentLink = null;
      for (var i = 0; i < targets.length; i++) {
        currentLink = visible(targets[i], links[i]);
        if(currentLink) {
          return;
        }
      }

      if(!currentLink) {
        var previousLink = document.querySelector('.main-menu__link--current');
        var previousSideLink = document.querySelector('.section-navigation__link--current');
        if(previousLink) {
          window.classFunction.removeClass(previousLink, 'main-menu__link--current');
         
        }

        if(previousSideLink) {
          window.classFunction.removeClass(previousSideLink, 'section-navigation__link--current');
          
        }

        if(document.location.href !== document.location.protocol + '//' + document.location.host + document.location.pathname) {
          if(window.history.pushState){
            window.history.pushState('', '', link.getAttribute('href'));
          }  
      
        }

      }
    }
    
    setCurrentLink();
    window.addEventListener('scroll', setCurrentLink);
    window.addEventListener('resize', setCurrentLink);
  }
})();

(function() {
  if(window.animation === true) { // Проверяю, работает ли в браузере анимация.э
    var animationTargets = [];
    // Нахожу все элементы, которые должны быть анимированы.
    var elements = document.querySelectorAll('.animation-target');
    for (var i = 0; i < elements.length; i++) {
      var animationTarget = {};

      animationTarget.element = elements[i];
      var animationChild = elements[i].querySelectorAll('.animating-counter');
      if(animationChild.length > 0) { // И их дочерние анимации, которые зависят от родителя.
        animationTarget.child = animationChild;
        for (var ii = 0; ii < animationTarget.child.length; ii++) {
          var start = +(animationTarget.child[ii].getAttribute('data-start'));
          animationTarget.child[ii].textContent = start;
        }
      }

      animationTargets.push(animationTarget);
    }
    
    var visibleAnimated = function(target) { // Проверка, попал ли элемент в экран.
      var targetPosition = { // Позиция элемента.
        top: window.pageYOffset + target.getBoundingClientRect().top,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      }

      var windowPosition = { // Позиция окна.
        top: window.pageYOffset,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

      if(targetPosition.top < windowPosition.top && targetPosition.bottom <= windowPosition.top &&
        !target.classList.contains('scrolled') && !target.classList.contains('animated')) { // Если проскроллен - задать сразу финальное значение.
        target.classList.add('scrolled');
        return 'scrolled';
      } else if (
        (targetPosition.top < windowPosition.bottom && targetPosition.bottom > windowPosition.bottom ||
        targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.top ||
        targetPosition.top > windowPosition.top && targetPosition.bottom < windowPosition.bottom ) &&
        !target.classList.contains('scrolled') && !target.classList.contains('animated')
        ) { // Если попал - запустить анимацию.
        target.classList.add('animated');
        return 'animated';
      }
    };

    // https://css-tricks.com/animating-number-counters/#the-new-school-css-solution - Анимация счетчика.

    var animateValue = function (obj, start, end, duration, delay, rounding) {
      setTimeout(function() {
      var startTimestamp = null;
      var step = function(timestamp) {
        if (!startTimestamp) {
          startTimestamp = timestamp;
        }
        var progress = Math.min((timestamp - startTimestamp) / duration, 1);

        if(rounding === 0) {
          obj.innerHTML = Math.floor(progress * (end - start) + start);
        } else {
          obj.innerHTML = (progress * (end - start) + start).toFixed(rounding);
        }
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
     window.requestAnimationFrame(step)}, delay);
    };

    var runAnimation = function() {
      var isAllElementsAnimated = true;

      for(var i = 0; i < animationTargets.length; i++) {

        var state = visibleAnimated(animationTargets[i].element);
        if(!(state)) {
          isAllElementsAnimated = false;
        }

        if(animationTargets[i].hasOwnProperty('child')) {
          for (var ii = 0; ii < animationTargets[i].child.length; ii++) {

            var end = +(animationTargets[i].child[ii].getAttribute('data-end'));

            if(state === 'animated') {
              var start = +(animationTargets[i].child[ii].getAttribute('data-start'));
              var duration = +(animationTargets[i].child[ii].getAttribute('data-duration'));
              var delay = 0;
              if(animationTargets[i].child[ii].getAttribute('data-delay')) {
                delay = +(animationTargets[i].child[ii].getAttribute('data-delay'));
              }
              var rounding = 0;
              if(animationTargets[i].child[ii].getAttribute('data-rounding')) {
                rounding = +(animationTargets[i].child[ii].getAttribute('data-rounding'));
              }
              animateValue(animationTargets[i].child[ii], start, end, duration, delay, rounding);
            }

            if(state === 'scrolled') {
              animationTargets[i].child[ii].textContent = end;
            } 
          }
          
        }
      }

      if(isAllElementsAnimated) {
        window.removeEventListener('scroll', runAnimation);
        window.removeEventListener('resize', runAnimation);
        document.removeEventListener("DOMContentLoaded", runAnimation);
      }
    };

    window.addEventListener('scroll', runAnimation);
    window.addEventListener('resize', runAnimation);
    document.addEventListener("DOMContentLoaded", runAnimation);
  }
})();

