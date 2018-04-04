# jQueryLife

jQueryLife is a lite version of jQuery using Vanilla Javascript.

<img src="https://img.shields.io/badge/NPM%20Version-3.10.10-blue.svg"/>

<p>It's use is demonstrated through this <a href="https://rweir4.github.io/jQueryLifeDemo/">Parks and Rec Giphy Demo.</a>, the repository for which can be found <a href="https://github.com/rweir4/jQueryLifeDemo">here</a>.</p>

<h3>To Use</h3>

<p>1) Download repo and copy and paste the jQueryLife.js file from the webpack bundle into a js file in your project folder.</p>

<p>2) In your index.html, add a js script that references the jQueryLife file.</p>



<h2>Demo</h2>

<p>The demo uses this library in place of jQuery to retrieve elements from the document and apply classes and listeners to them after information is retrieved from an AJAX request to Giphy.</p>

<center><img src="./parksAndRecGiphyDemo.gif" height="300px"/></center>

<h3>jQueryLife Code in Demo</h3>

  <h5>jQuery Wrapper</h5>

  ```
  function $l(selector) {
    if (selector instanceof Function) {
      queue.push(selector);
    } else {
      let selected = document.querySelectorAll(selector);
      if (selected[0] instanceof HTMLElement) {
        return new DOMNodeCollection(selected);
      }
    ```

<h5>Event Listener</h5>

    ```
    on(type, listener) {
      this.$els.forEach(el => {
        el.addEventListener(type, listener);
        if (el.eventListeners) {
          el.eventListeners[type] = listener;
        } else {
          el.eventListeners = {[type]: listener};
        }
      });
    }
    ```

<h5>Class Toggles</h5>

  ```
  addClass(className) {
    this.$els.forEach(el => {
      //
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.$els.forEach(el => {
      el.classList.remove(className);
    });
  }
  ```


<h5>Set Attribute</h5>

  ```
  attr(attribute, value) {
    if (typeof attribute === 'string') {
      if (value === undefined) {
        return this.$els.getAttribute(attribute);
      } else {
        for (let i = 0; i < this.$els.length; i++) {
          this.$els[i].setAttribute(attribute, value);
        }
      }
  ```

<h5>AJAX Request</h5>

  ```

  $l.ajax = (options) => {
    const request = new XMLHttpRequest();

    const defaultOptions = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'GET',
      url: 'window.location.href',
      data: {},
      success(data) { console.log(data); },
      error() { console.error("An error occurred."); },
    };

    if (options) {
      options = $l.extend(defaultOptions, options);
    } else {
      options = defaultOptions;
    }


    return new Promise ((resolve, reject) => {
      request.onload = () => {
        if (request.status === 200) {
          options.success(request.response);
          resolve(request.response);
        } else {
          options.error(request.errors);
          reject(reques.terrors);
        }
      };

      request.open(options.method, options.url);
      request.send(JSON.stringify(options.data));
    });
  };
  ```
