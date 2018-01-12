/* !Date: 19.12.2017 Copyright ©2017 JavaScript Code by Cătălin Anghel-Ursu @Madness2aMaze (https://codepen.io/Madness2aMaze)
- All Rights Reserved!

MIT License

Copyright (c) 2017 Cătălin Anghel-Ursu (https://github.com/Madness2aMaze/Tic-Tac-Toe-Web-Game)

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
SOFTWARE. */

$(document).ready(function() {
  var uiPlayBox = $(".play-box"),
      uiCenter = $(".s-circle"),
      uiDisplay = $(".display"),
      uiOuter = $(".l-circle"),
      uiSwitch = $(".switch"),
      uiStrict = $(".strict"),
      uiFooter = $(".footer"),
      uiStart = $(".start"),
      uiLevel = $(".level"),
      uiGreen = $(".green"),
      uiYlow = $(".yellow"),
      index = [0, 1, 2, 3],
      uiOnOff = $(".knob"),
      uiPlay = $(".play"),
      uiBlue = $(".blue"),
      uiRed = $(".red"),
      strict = false,
      pushedPads = [],
      collector = [],
      pads = {
        "0": "#0",
        "1": "#1",
        "2": "#2",
        "3": "#3"
      },
      on = false,
      level = 1;

  level = level < 10 ? "0" + level : level;

  uiPlay.addClass("color-me"); //adds a 4 color animation on the play button
  uiPlayBox.addClass("color-border"); //adds a 4 color animation on the play-box border

  //starts the game wich in turn starts a couple of animations
  uiPlay.click(function() {
    uiPlayBox.css("transform", "scale(1.2, 1.2)");
    uiPlayBox.css("opacity", ".5");
    uiPlay.css("transform", "scale(1.2, 1.2)");
    uiPlay.css("opacity", ".5");

    setTimeout(function() {
      uiPlayBox.css("display", "none");
      uiOuter.css("display", "block");
    }, 100);

    setTimeout(function() {
      uiGreen.addClass("visible");
    }, 500);

    setTimeout(function() {
      uiRed.addClass("visible");
    }, 600);

    setTimeout(function() {
      uiYlow.addClass("visible");
    }, 700);

    setTimeout(function() {
      uiBlue.addClass("visible");
    }, 800);

    setTimeout(function() {
      uiCenter.addClass("zoom-in");
      uiCenter.removeClass("invisible");
      uiOuter.removeClass("invisible");
      uiFooter.css("display", "block");
      uiFooter.addClass("visible");
    }, 1000);

    setTimeout(function() {
      uiOuter.css("box-shadow", "inset 0px 0px 75px 10px rgba(0, 0, 0, 1)");
    }, 1500);
  });

  //function for checking if the strict mode is on or off
  uiStrict.click(function isStrict() {
    if (strict) {
      uiStrict.addClass("str-on");
      strict = false;
    } else {
      uiStrict.removeClass("str-on");
      strict = true;
    }
  });

  function toggleOffToOn() { //switching the game ON
    on = true;
    strict = true;
    uiLevel.html("..");
    pushedPads = [];
    uiLevel.removeClass("zoom-in");
    uiSwitch.css("background", "#91e842");
    uiOnOff.removeClass("slide-l");
    uiOnOff.addClass("slide-r");
    uiDisplay.removeClass("invisible");
    if (on) {
      uiStart.click(function() {
        //level = 1;
        uiLevel.addClass("zoom-in");
        uiLevel.html(level);
      });
    }
    $(this).one("click", toggleOnToOff);
  }

  function toggleOnToOff() { //switching the game OFF
    on = false;
    strict = false;
    pushedPads = [];
    uiLevel.html("..");
    uiLevel.removeClass("zoom-in");
    uiSwitch.css("background", "#f44242");
    uiOnOff.removeClass("slide-r");
    uiOnOff.addClass("slide-l");
    uiDisplay.addClass("invisible");
    uiStrict.removeClass("str-on");
    $(this).one("click", toggleOffToOn);
  }
  uiSwitch.one("click", toggleOffToOn);
  
  // the randomizer function that generates random numbers from a range
  function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  uiStart.click(function() {
    collector.push(randomizer(0, 3));
    console.log(collector);
    
    // a loop that controls the way the colored pads are highlighted during the random sequence
    $.each(collector, function(i) {
      setTimeout(function() {
        var padId = "#" + collector[i];
        console.log(padId);
        uiOuter.css("box-shadow", "none");
        $(padId).addClass("selected");
        setTimeout(function() {
          $(padId).removeClass("selected");
        }, 300);
      }, 1000);
    });
  });

  // looping through pads based on id
  $.each(index, function(i) {
    var uiPads = $(pads[i]);

    uiPads.click(function() {
      if (on) {
        pushedPads.push(uiPads.html());
        console.log(pushedPads);
        uiOuter.css("box-shadow", "inset 0px 0px 75px 10px rgba(0, 0, 0, 1)");
      }
    });
  });

  
