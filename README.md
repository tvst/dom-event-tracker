# DOM Event tracker

A hacky little library to track all desired events on a webpage.

## Usage

```js
const t = new DomEventTracker()

// Which events you want to capture.
t.addSource("click")
t.addSource("keypress")

// Where we should write events to.
// (In this case we're just writing to the console)
t.addSink((ev) = console.log(ev))

// Start tracking events! Must happen after the </body> tag.
t.start()
```
