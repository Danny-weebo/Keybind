# Keybind Repository

call a function upon a set time of key press with optional "duration" animation on the element.

# Documentation

make sure you include the keybind.js file
```HTML
<script src="keybind.js"></script>
<link rel="stylesheet" href="keybind.css" /> <!-- the css file is necessary only incase of the 'dev' option use -->
```

| Arg  | Value expected | Initial value | Description 
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
## Example of simple use of on a button element
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

# TODO
- [x] Vanilla javascript plugin
- [ ] jQuery javascript plugin
