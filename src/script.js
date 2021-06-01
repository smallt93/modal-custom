import { isObject, isString } from './typeof.js';
import './style.css';

const defaultOpt = {
  styles: null,
  class: '',
  msg: `${window.location.origin} says`,
  onOk: () => {},
  onCancel: () => {},
  textOk: '',
  textCancel: '',
  textPlaceholder: '',
}

export class Modal {
  constructor() {
    this.modal = null;
    this.blocked = null;
    this.options = { ...defaultOpt };
  }

  show() {
    if (this.modal) return;

    // create modal wrapper
    this.modal = document.createElement('modal');
    this.blocked = document.createElement('div');

    // set class for modal wrapper
    this.modal.setAttribute('class',
      this.options.class ? `modal-fixed ${this.options.class}` : 'modal-fixed'
    );
    this.blocked.setAttribute('class', 'modal-blocked');

    // set styles for modal wrapper
    if (this.options.styles) {
      this.modal.style.cssText = this.options.styles;
    }

    document.body.appendChild(this.modal);
    document.body.appendChild(this.blocked);
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
    if (isString(options)) {
      this.excute('alert', { msg: options });
    } else if (isObject(options)) {
      this.excute('alert', options);
    }
  }

  confirm(options) {
    if (isObject(options)) {
      this.excute('confirm', options);
    }
  }

  prompt(options) {
    if (isObject(options)) {
      this.excute('prompt', options);
    }
  }

  onOk() {
    if (this.btnSubmit) {
      this.btnSubmit.addEventListener('click', () => {
        if (typeof this.options.onOk === 'function') {
          // get value in prompt input
          if (this.options.type === 'prompt') {
            const inputVal = this.prompInput.value;
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
    if (this.btnCancel) {
      this.btnCancel.addEventListener('click', () => {
        if (typeof this.options.onCancel === 'function') {
          this.options.onCancel();
        }

        this.close();
      });
    }
  }

  createContent(options) {
    const { type , msg } = options;
    const content = document.createElement('p');

    // set message
    content.textContent = msg;
    this.modal.appendChild(content);

    // create prompt input
    if (type === 'prompt') {
      this.prompInput = document.createElement('input');
      this.prompInput.setAttribute('type', 'text');
      this.prompInput.setAttribute('class', 'modal-prompt-input');
      this.modal.appendChild(this.prompInput);

      // focus input
      this.prompInput.focus();
    }
  }

  footer() {
    const actionEl = document.createElement('div');
    actionEl.setAttribute('class', 'modal-btn-actions');

    // create ok btn
    this.btnSubmit = document.createElement('button');
    this.btnSubmit.setAttribute('class', 'modal-btn modal-btn-submit');
    this.btnSubmit.textContent = this.options.textOk || 'Ok';
    actionEl.appendChild(this.btnSubmit);

    // create cancel btn
    if (this.options.type !== 'alert') {
      this.btnCancel = document.createElement('button');
      this.btnCancel.setAttribute('class', 'modal-btn');
      this.btnCancel.textContent = this.options.textCancel || 'Cancel';
      actionEl.appendChild(this.btnCancel);
    }

    this.modal.appendChild(actionEl);

    // event listener
    this.onOk();
    this.onCancel();
  }

  close() {
    this.modal.remove();
    this.blocked.remove();
    // set options default
    this.options = { ...defaultOpt };
  }
}




