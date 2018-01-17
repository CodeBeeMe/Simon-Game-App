/* !Date: 19.12.2017 Copyright ©2017-2018 JavaScript Code by Cătălin Anghel-Ursu @Madness2aMaze (https://codepen.io/Madness2aMaze)
- All Rights Reserved!

MIT License

Copyright (c) 2017-2018 Cătălin Anghel-Ursu (https://github.com/Madness2aMaze/Simon-Game-App)

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
      uiPad = $(".pad"),
      userCollector = [],
      aiCollector = [],
      strict = false,
      aiPick = "",
      userPick = "",
      pads = {
        "0": "#0",
        "1": "#1",
        "2": "#2",
        "3": "#3"
      },
      on = false,
      level = 0;

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
    if (on) {
      if (strict) {
      uiStrict.addClass("str-on");
      strict = false;
      } else {
      uiStrict.removeClass("str-on");
      strict = true;
      }
    }
  });

  function reset() {
    level = 0;
    on = false;
    strict = false;
    collector = [];
    pushedPads = [];
    uiLevel.html("00");
    uiOnOff.addClass("slide-l");
    uiOnOff.removeClass("slide-r");
    uiLevel.removeClass("zoom-in");
    uiStrict.removeClass("str-on");
    uiPad.css("cursor", "default");
    uiDisplay.addClass("invisible");
    uiSwitch.css("background", "#f44242");
  }

  function toggleOffToOn() {
    //switching the game ON
    on = true;
    strict = true;
    uiLevel.text();
    collector = [];
    pushedPads = [];
    uiLevel.addClass("zoom-in");
    uiOnOff.addClass("slide-r");
    uiOnOff.removeClass("slide-l");
    setTimeout(function() {
      uiLevel.removeClass("zoom-in");
    }, 1000);
    uiDisplay.removeClass("invisible");
    uiSwitch.css("background", "#91e842");
    if (on) {
      uiPad.css("cursor", "pointer");
    }
    $(this).one("click", toggleOnToOff);
  }

  function toggleOnToOff() {
    //switching the game OFF
    reset();
    $(this).one("click", toggleOffToOn);
  }
  uiSwitch.one("click", toggleOffToOn);

  // the randomizer function that generates random numbers from a range
  function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function startGame() {
    if (on) {
      level++;
      level = level < 10 ? "0" + level : level; // if less than 10 to add a "0" in front of the number
      setTimeout(function() {
        uiLevel.addClass("blink");
      }, 500);
      setTimeout(function() {
        uiLevel.removeClass("blink");
      }, 1800);
      aiCollector.push(randomizer(0, 3));
      aiPick = aiCollector[aiCollector.length - 1];
      console.log(aiCollector);
      console.log(aiPick);

      // a loop that controls the way the colored pads are highlighted during the random sequence
      $.each(aiCollector, function(i) {
        // function that flashes the coresponding pad based on the randomizer output
        setTimeout(function() {
          var id = aiCollector[i],
              uiPads = $(pads[id]);
          console.log(id);
          uiOuter.css("box-shadow", "none");
          //flasher(padId);
          uiPads.delay(500 * id).queue(function() {
            $(this)
              .addClass("selected")
              .delay(500)
              .queue(function() {
              $(this).removeClass("selected");
              $(this).dequeue();
            });
            $(this).dequeue();
          });
          uiLevel.html(level);
        }, 2000);
      });
    }
  }

  // looping through pads based on id
  $.each(index, function(i) {
    var uiPads = $(pads[i]);
    uiPads.click(function() {
      if (on) {
        userCollector.push(uiPads.html());
        userPick = userCollector[userCollector.length - 1];
        console.log(userCollector);
        console.log(userPick);
        console.log(aiPick);
        uiOuter.css("box-shadow", "inset 0px 0px 75px 10px rgba(0, 0, 0, 1)");
        if (aiPick == userPick) {
          startGame();
        };
      }
    });
  });

  uiStart.click(function() {
    startGame();
  });


