class DOMNodeCollection {
  constructor($els) {
    this.$els = $els;
  }

  html(arg = "") {
    if (arg.length > 0) {
      this.$els.forEach(el => {
        el.innerHTML = arg;
      });
    } else {
      return this.$els[0].innerHTML;
    }
  }

  empty() {
    this.$els.forEach(el => {
      el.innerHTML = "";
    });
  }

  append(children) {
    for (let i = 0; i < this.$els.length; i++) {
      if (typeof children === 'string') {
        this.$els[i].innerHTML += children;
      } else if (children instanceof HTMLElement) {
        this.$els[i].innerHTML += children[i].outerHTML;
      } else {
        children.$els.forEach(child => {
          this.$els[i].innerHTML += child.outerHTML;
        });
      }
    }
  }

  attr(attribute, value) {
    if (typeof attribute === 'string') {
      if (value === undefined) {
        return this.$els.getAttribute(attribute);
      } else {
        for (let i = 0; i < this.$els.length; i++) {
          this.$els[i].setAttribute(attribute, value);
        }
      }
    } else {
      const attributes = Object.keys(attribute);
      const values = Object.values(attribute);
      for (let i = 0; i < attributes.length; i++) {
        for (let j = 0; j < this.$els.length; j++) {
          this.$els[j].setAttribute(attributes[i], values[i]);
        }
      }
    }
  }

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

  children() {
    const childNodes = [];
    this.$els.forEach(el => {
      childNodes.push(el.children);
    });

    return new DOMNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = [];
    this.$els.forEach(el => {
      parentNodes.push(el.parentNode);
    });

    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let result = [];
    this.$els.forEach(el => {
      result = result.concat(el.querySelectorAll(selector));
    });

    return new DOMNodeCollection(result);
  }

  remove() {
    const parent = this.parent();
    this.empty();
    this.$els.forEach(el => {
      parent.$els[0].removeChild(el);
    });
  }

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

  off(type) {
    let listener;
    this.$els.forEach(el => {
      listener = el.eventListeners[type];
      el.removeEventListener(type, listener);
      delete el.eventListeners[type];
    });
  }
}



export default DOMNodeCollection;
