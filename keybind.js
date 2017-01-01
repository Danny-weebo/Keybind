/**
 * Keybind - Vanilla version
 * FIRE A FUNCTION ON SET TIME
 * - option for binding it on element.
 */

function Keybind(options) {

    // saving the pressing times and key into array
    // as obj {key: key, timestamp: seconds}
    this.savedPressing = []; 
    // will contain date object on first keydown.
    this.startedToPressTime;
    // flag variable, to track first keydown
    this.keyWasPressed = false;
    // flag variable, to check if it completed
    this.completed = false;

    // default options
    var defaults = {
        key: " ",
        time: 2, // seconds
        draw: {
            enabled: false,
            elID: " ",
            deg: 0,
            initialColor: "#fff",
            fillColor: "#888888"
        },
        dev: false,
        onComplete: function() {
            console.log('Fire ball!');
        }
    };

    // extending values
    this.options = {
        key: options.key    || defaults.key,
        time: options.time  || defaults.time,
        draw: {
            enabled: options.draw.enabled           || defaults.draw.enabled,
            elID: options.draw.elID                 || defaults.draw.enabled,
            deg: options.draw.deg                   || defaults.draw.deg,
            initialColor: options.draw.initialColor || defaults.draw.initialColor,
            fillColor: options.draw.fillColor       || defaults.draw.fillColor
        },
        dev: options.dev                || defaults.dev,
        onComplete: options.onComplete  || defaults.onComplete
    };

    // lets keep father obj on self -- so it will be reached everywhere
    var self = this;

    /**
     * Validating options
     */
   
    if(typeof options == 'undefined') {
        console.warn("Warning, can't find any options");
    } else {
        /**
         * Warnings
         */
         // check if a key was selected
        if(!(options.key)) {
            console.warn("Warning, key wasn't selected");
        }
        // check if time was set.
        if(!(options.time)) {
            console.warn("Warning, time wasn't set! the defualt is 5 seconds.");
        }
        /**
         * Errors
         */
        // checking if the object ID exist
        if(options.draw)
            if(options.draw.enabled && !(document.getElementById(this.options.draw.elID))) {
                throw "Error! the draw is set to enabled but couldn't find the element ID '"+this.options.elID+"'";
            }
    }
    
    if(this.options.dev) {
        if(!(document.getElementById("kb_timer")))
            this.UI.insertTimerElement();
    }

    /**
     * keydown - listener
     * start tracking the seconds on first key down, 
     * optional: drawing the seconds
     */
    document.addEventListener('keydown', function(keyDownEvent) {
        if(keyDownEvent.key == self.options.key) {
            // initalizing on first keydown.
            if(!(self.keyWasPressed)) {
                self.startedToPressTime = new Date();
                self.keyWasPressed = true;
            }

            // check if complete to fire the onComplete event.
            if(!(self.completed)) {
                if(Math.abs((self.startedToPressTime.getTime() - new Date().getTime())/1000) >= self.options.time) {
                    // the time has passed.

                    if(self.options.draw.enabled)
                        self.UI.fillTheElement(100, self.options.draw);

                    self.completed = true;
                    self.options.onComplete();
                }
            }
   
            if(self.options.draw.enabled) {
                // element drawing
                // calculation seconds into 0 to 100 present
                if(!(self.completed)) {
                    self.UI.fillTheElement(Math.floor(((Math.abs((self.startedToPressTime.getTime() - new Date().getTime())/1000)) / self.options.time) * 100)+1, self.options.draw);
                }
                // timer
                if(self.options.dev)
                    self.UI.updateTimer(Math.abs((self.startedToPressTime.getTime() - new Date().getTime())/1000));
            }
        }
    });

    /**
     * keyup - listener
     * saving into array the seconds the key was pressed.
     */
    document.addEventListener('keyup', function(keyUpEvent) {
        if(keyUpEvent.key == self.options.key) {
            // lets calculate how long did he press.
            self.savedPressing.push({
                key: keyUpEvent.key,
                timestamp: Math.abs((self.startedToPressTime.getTime() - new Date().getTime())/1000)
            });

            self.keyWasPressed = false;
            self.completed = false;

            if(self.options.dev) {
                self.UI.updateTimer(self.savedPressing[self.savedPressing.length-1].timestamp);
            }
        }
    });
}

/**
 * SET VALUES
 */
Keybind.prototype.setKey = function(newKey) {
    this.options.key = newKey;
};
Keybind.prototype.setTime = function(newTime) {
    if(!(isNaN(newTime)))
        this.options.time = newTime;
    else
        console.warn("Warning, setTime wasn't saved as the arg isn't a number, timer value return to default");
};
Keybind.prototype.enableDraw = function() {
    this.options.draw.enabled = true;
}
Keybind.prototype.disableDraw = function() {
    this.options.draw.enabled = false;
}
Keybind.prototype.setElID = function(newElID) {
    this.options.draw.elID = newElID;
}
Keybind.prototype.setDeg = function(newDeg) {
    this.options.draw.deg = newDeg;
}
Keybind.prototype.setInitialColor = function(newInitialColor) {
    this.options.draw.initialColor = newInitialColor;
}
Keybind.prototype.setFillColor = function(newFillColor) {
    this.options.draw.fillColor = newFillColor;
}
Keybind.prototype.enableDev = function() {
    this.options.dev = true;
}
Keybind.prototype.disableDev = function() {
    this.options.dev = false;
}
Keybind.prototype.setOnCompleteFunction = function(newFunction) {
    this.options.onComplete = newFunction;
}

/**
 * GET VALUES
 */
Keybind.prototype.getKey = function() {
    return this.options.key;
};
Keybind.prototype.getTime = function() {
    return this.options.time;
};
Keybind.prototype.isDrawEnabled = function() {
    return this.options.draw.enabled;
};
Keybind.prototype.getElementId = function() {
    return this.options.draw.elID;
};
Keybind.prototype.getDeg = function() {
    return this.options.draw.deg;
};
Keybind.prototype.getInitialColor = function() {
    return this.options.draw.initialColor;
};
Keybind.prototype.fillColor = function() {
    return this.options.draw.fillColor;
};
Keybind.prototype.isDev = function() {
    return this.options.dev;
};
Keybind.prototype.getOnCompleteFunction = function() {
    return this.options.onComplete();
}



/**
 * UI - drawing over objects.
 */
Keybind.prototype.UI = {
    "insertTimerElement": function() {
        // drawing the first element of the timer.
        document.getElementsByTagName("body")[0].innerHTML += "<div id='kb_timer'> 0s </div>";
    },
    "updateTimer": function(newTime) {
        // updating the timer with the new time.
        document.getElementById("kb_timer").innerHTML = Math.round(newTime) + "s";
    },
    "fillTheElement": function(orientation, options) {
        document.getElementById(options.elID).style.background = 'linear-gradient( '+options.deg+'deg, '+options.initialColor+' '+orientation+'%, '+options.fillColor+' )';
    }
};