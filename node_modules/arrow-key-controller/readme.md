# Arrow Key Controller

Super simple controller designed for canvas games that only use the arrow keys. While an arrow key is pressed down, it is true;

To use:

```javascript
import { Controller } from 'arrow-key-controller';

const controller = new Controller();

controller.init(); // adds event listener to document

controller.up; // false
controller.down; // false
controller.right; // false
controller.left; // false
```
