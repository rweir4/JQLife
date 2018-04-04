import DOMNodeCollection from './dom_node_collection.js';

let queue = [];

document.addEventListener("DOMContentLoaded", () => {
  queue.forEach(fn => {
    fn();
  });
});

function $l(selector) {
  if (selector instanceof Function) {
    queue.push(selector);
  } else {
    let selected = document.querySelectorAll(selector);
    if (selected[0] instanceof HTMLElement) {
      return new DOMNodeCollection(selected);
    }
    debugger
    const converted = [];
    selected.forEach(selected, (idx, val) => {
      converted.push(val);
    });

    return new DOMNodeCollection(converted);
  }


}

$l.extend = (...args) => {
  const merged = {};
  let key;
  let value;
  args.forEach(obj => {
    key = Object.keys(obj).map(key => {
      merged[key] = obj[key];
    });
  });

  return merged;
};

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

window.$l = $l;
