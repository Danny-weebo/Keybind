# Keybind Repository

call a function upon a set time of key press with optional "duration" animation on the element.

# Installation
- `git clone https://github.com/Danny-weebo/Keybind.git`

or using bower

- `bower install keybind`

# Documentation

make sure you include the keybind.js file
```HTML
<script src="/dist/keybind.min.js"></script>
<link rel="/dist/stylesheet" href="keybind.css" /> <!-- the css file is necessary only incase of the 'dev' option use -->
```

| Function name | Arg expected | Arg returned | Description   |
| ------------- | ------------ | ------------ | ------------- |
| **set methods** |
| setKey | String | - | Set a new bind key to existing object.
| setTime | Number(Int) | - | Set a new time (Seconds) to existing object.
| enableDraw | Boolean | - | Enable draw functionality.
| disableDraw | Boolean | - | Disable draw functionality.
| setElID | String | - | Attach the keybind on a different Element.
| setDeg | Number(Int) | - | Set new degree.
| setInitialColor | String | - | Set new Initial Color.
| setFillColor | String | - | Set new Fill Color.
| enableDev | Boolean | - | Enable dev mode.
| disableDev | Boolean | - | Disable dev mode.
| setOnCompleteFunction | Function | - | Set new on complete function.
| **get methods** |
| getKey | - | String | returns the current set key.
| getTime | - | Number(Seconds) | returns the current set time.
| isDrawEnabled | - | Boolean | returns true if draw is enabled.
| getElementId | - | String | returns the element ID.
| getDeg | - | Number(Int) | returns the degree.
| getInitialColor | - | String | returns the initial color.
| fillColor | - | String | returns the fill color.
| isDev | - | Boolean | returns true if dev is enabled.
| getOnCompleteFunction | - | Function | returns the function that will be called on complete.

# Options

| Option  | Arg expected | Initial value | Description 
| ------------- | ------------- | ------------- | ------------- |
| key | keydown's object key | " " | The key that you want to attach, the key is selected by the keydown's key element |
| time | number(Int) | 2 | The number of **seconds** for the keypress |
| **draw** | Object | -- | the draw will animate the duration of the pressing by background gradinant color between 2 selected colors on a selected element.
| **draw**.enabled | Boolean | false | Enable the draw function |
| **draw**.elID | String | " " | The element ID, can be used on every kind of element **for the draw to work you must enter elID value** |
| **draw**.deg | Number(Int) | 0 | The degree of the css gradinant |
| **draw**.initialColor | String | "#fff" | The initial background color of the attached element |
| **draw**.fillColor | String | "#888888" | The fill color of the attached element's background |
| dev | Boolean | false | Adding a winow that counts the number of the seconds the selected key is pressed |
| onComplete | Function | function() { console.log('Fire ball!'); } | The function that will be called after pressing enough as set |

# Example
## Example of creating Keybind object 
```Javascript
var myObj = new Keybind({
    time: 2,
    key: ' ',
    dev: true,
    draw: {
        enabled: true,
        elID: 'btn', // the element id
        deg: 0,
        initialColor: "#fff",
        fillColor: "#888888"
    }
});
```

## Example of using the Keybind's methods
```Javascript
// changing the time to 5
myObj.setTime(5);
// changing the function that will be called on complete.
myObj.setOnCompleteFunction(function() {
    console.log('Even bigger fire ball');
});

// enabling dev  - to see the time counter.
myObj.enableDev();
```

# TODO
- [x] Vanilla javascript plugin
- [ ] jQuery javascript plugin
