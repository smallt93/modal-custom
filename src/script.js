export default class Modal {
  constructor() {
    this.modal = null;
    this.blockedEle = null;
    this.idElement = {
      modal: null,
      btnSubmit: this.hash('bth-submit'),
      btnCancel: this.hash('bth-cancel'),
      prompInput: this.hash('prompt-input'),
      blocked: this.hash('blocked'),
    };
    this.options = {
      styles: null,
      class: '',
      msg: `${window.location.origin} says`,
      onOk: () => {},
      onCancel: () => {},
      footerOrder: 0,
      isHiddenFooter: false,
    };
  }

  hash(value) {
    var hash = 0, i, chr;

    if (value.length === 0) return hash;
  
    for (i = 0; i < value.length; i++) {
      // convert to 32bit integer
      chr = value.charCodeAt(i).toString().slice(1) + value.charAt(i);
      hash = hash + chr;
    }
    
    return hash;
  }

  footer() {
    if (!this.options.isHiddenFooter) {
      const parent = document.getElementById(this.idElement.modal);
      const actionEl = document.createElement('div');
      actionEl.setAttribute('class', 'btn-actions');
      
      if (this.options.type === 'alert') {
        actionEl.innerHTML += `<button id="${this.idElement.btnSubmit}" class="btn btn-submit">OK</button>`;
      } else {
        actionEl.innerHTML += `
          <button id="${this.idElement.btnCancel}" class="btn btn-order-${this.options.footerOrder}">Cancel</button>
          <button id="${this.idElement.btnSubmit}" class="btn btn-submit">OK</button>
        `;
      }
  
      parent.appendChild(actionEl);
  
      // event listener
      this.onOk();
      this.onCancel();
    }
  }

  onOk() {
    const okBtn = document.getElementById(this.idElement.btnSubmit);

    if (okBtn) {
      okBtn.addEventListener('click', () => {
        if (typeof this.options.onOk === 'function') {
          if (this.options.type === 'prompt') {
            const inputVal = document.getElementById(this.idElement.prompInput).value;
            this.options.onOk(inputVal);
          } else {
            this.options.onOk();
          }
        }
  
        this.close();
      })
    }
  }

  onCancel() {
    const closeBtn = document.getElementById(this.idElement.btnCancel);

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (typeof this.options.onCancel === 'function') {
          this.options.onCancel();
        }

        this.close();
      });
    }
  }

  createContent(options) {
    const { type , msg } = options;

    const parent = document.getElementById(this.idElement.modal);
    const content = document.createElement('p');

    // set message
    content.textContent = msg;
    parent.appendChild(content);

    if (type === 'prompt') {
      const input = document.createElement('input');
      input.setAttribute('id', this.idElement.prompInput);
      input.setAttribute('type', 'text');
      input.setAttribute('class', 'prompt-input');
      parent.appendChild(input);

      // focus input
      input.focus();
    }
  }

  excute(type, options) {
    this.options = {
      ...this.options,
      ...options,
      type,
    };

    this.show();
    this.createContent(this.options);
    this.footer();
  }

  alert(options) {
    this.excute('alert', options);
  }

  confirm(options) {
    this.excute('confirm', options);
  }

  prompt(options) {
    this.excute('prompt', options);
  }

  show() {
    if (this.modal) return;

    // create modal wrapper
    this.modal = document.createElement('div');
    this.blockedEle = document.createElement('div');

    if (this.options.type) {
      // hasd id element
      this.idElement.modal = this.hash(this.options.type);

      // set attribute for modal wrapper
      this.blockedEle.setAttribute('id', this.idElement.blocked);
      this.modal.setAttribute('id', this.idElement.modal);
      this.modal.setAttribute('class',
        this.options.class ? `fixed ${this.options.class}` : 'fixed'
      );
      // set styles for modal wrapper
      if (this.options.styles) {
        this.modal.style.cssText = this.options.styles;
      }

      // append child
      document.body.appendChild(this.modal);
      document.body.appendChild(this.blockedEle);
    }
  }

  close() {
    const el = document.getElementById(this.idElement.modal)
    const blockedEl = document.getElementById(this.idElement.blocked);
    blockedEl.remove();
    el.remove();
    this.options = {};
    this.idElement = '';
  }
}




