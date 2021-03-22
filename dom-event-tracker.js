/**
 * A hacky little library to track all desired events on a webpage.
 *
 * Usage:
 *   const t = new DomEventTracker()
 *
 *   // Which events you want to capture.
 *   t.addSource("click")
 *   t.addSource("keypress")
 *
 *   // Where we should write events to.
 *   t.addSink((ev) = console.log(ev))
 *
 *   // Start tracking events! Must happen after the </body> tag.
 *   t.start()
 */
class DomEventTracker {
  constructor() {
    this.eventTypes = []
    this.sinks = []
  }

  start() {
    this.eventTypes.forEach(evName => {
      document.body.addEventListener(evName, ev => this.parseEvent(ev))
    })
  }

  addSink(fn) {
    this.sinks.push(fn)
    return this
  }

  addSource(evName) {
    this.eventTypes.push(evName)
    return this
  }

  /**
   * Given an event, return something like:
   * {
   *   type: "click",
   *   selector: "body > ul.options > li.start > input[checkbox].toggleButton"
   * }
   */
  parseEvent(ev) {
    const cleanedEvent = {
      type: ev.type,
      selector: getSelectorPath(ev.path),
    }
    this.sinks.forEach(fn => {
      window.setTimeout(() => fn(cleanedEvent), 0)
    })
  }
}

/**
 * Given an event.path, return a CSS selector representing that path.
 * For example:
 *   body > div.main > section.primary.fullWidth > button
 */
function getSelectorPath(path) {
  const selectorPath = []
  let el;

  for (let i = 0; i < path.length; i++) {
    el = path[i]
    selectorPath.unshift(getElementSelector(el))

    if (el.tagName === "BODY") {
      break
    }
  }

  return selectorPath.join(" > ")
}

/**
 * Given a DOM element, return tagname.class1.class2.classEtc
 * For example:
 *   div.menu.rightAligned
 *   input[checkbox].toggleButton
 */
function getElementSelector(el) {
  const tagSelector = el.tagName == "INPUT" ? `INPUT[${el.type}]` : el.tagName
  const selector = [tagSelector.toLowerCase()]
  el.classList.forEach(className => selector.push(className))
  return selector.join(".")
}
