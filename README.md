# DOM Event tracker

A little library to capture event analytics on a webpage (similar to Heap).

## Usage

```js
const det = new DomEventTracker()

// Which events you want to capture.
det.addSource("click")
det.addSource("keypress")

// Where we should write events to.
// (In this case we're just writing to the console)
det.addSink((ev) => console.log(ev))

// Start tracking events! Must happen after the </body> tag.
det.start()
```

...where `ev` looks like:
```js
{
  type: "click",
  selector: "body > ul.options > li.start > input[checkbox].toggleButton"
}
```

In reality, you would probably want to write to a database with `addSink`...

```js
det.addSink((ev) => writeEventToDatabase(ev))
```

...and then query your database for events:
```SQL
SELECT COUNT(DISTINCT type) AS number_of_cta_clicks
FROM DOM_EVENT_DB 
WHERE REGEXP_CONTAINS(selector, r'\.options .* \.toggleButton')
GROUP BY timestamp
```
