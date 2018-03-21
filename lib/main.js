import DOMNodeCollection from './dom_node_collection.js';

function $l(selector) {
  let queue = [];
  if (selector instanceof Function) {
    queue.push(selector);
    document.addEventListener("DOMContentLoaded", () => {
      return queue.forEach(fn => {
        fn();
      });
    });
  } else {
    let selected = document.querySelectorAll(selector);
    if (selected[0] instanceof HTMLElement) {
      return new DOMNodeCollection(selected);
    }

    const converted = [];
    $.each(selected, (idx, val) => {
      converted.push(val);
    });

    return converted;
  }


}

$l.extend = (...args) => {
  const merged = {};
  let key;
  let value;
  args.forEach(obj => {
    key = Object.keys(obj)[0];
    value = Object.values(obj)[0];
    if (!Object.keys(merged).includes(key)) {
      merged[key] = value;
    }
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
    options = $l.extend(options, defaultOptions);
  } else {
    options = defaultOptions;
  }

  request.open(options.method, options.url);

  request.onload = () => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.errors);
    }
  };

  request.send(JSON.stringify(options.data));
};

window.$l  = $l;
