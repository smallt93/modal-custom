import { isObject, isString } from './typeof.js';
import './style.css';

export class Modal {
  constructor() {
    this.triggerEl = null;
    this.modal = null;
    this.blocked = null;
    this.defaultOpt = {
      triggerId: null,
      styles: null,
      class: null,
      msg: `${window.location.origin} says`,
      onOk: () => {},
      onCancel: () => {},
      textOk: 'Ok',
      textCancel: 'Cancel',
      textPlaceholder: '',
      okStyle: null,
      cancelStyle: null,
      buttonType: 'success',
      render: null,
      footer: null,
      position: 'top-center',
      isAccess: false,
      afterElement: false,
    }
    this.options = { ...this.defaultOpt };
  }

  show() {
    if (this.modal) return;

    // create modal wrapper
    this.modal = document.createElement('modal')
    this.modal.setAttribute(
      'class',
      `modal-container modal-${this.options.position} ${this.options.class || ''}`
    )

    // set absolute for modal
    if (this.options.afterElement) {
      this.modal.style.cssText = 'position: absolute;'
    }
    
    // set styles for modal wrapper
    if (this.options.styles) {
      this.modal.style.cssText = this.options.styles
    }

    if (!this.options.isAccess) {
      this.blocked = document.createElement('div')
      this.blocked.setAttribute('class', 'modal-blocked')
      this.createElement(this.blocked)
    }

    this.createElement(this.modal)
  }

  /**
   * Define type of params
   * @param {string} type
   * @param {object} options
   */

  excute(type, options) {
    this.options = {
      ...this.options,
      ...options,
      type,
    }

    this.show()
    this.createContent(this.options)
    this.footer()
  }

  alert(options) {
    if (isString(options)) {
      this.excute('alert', { msg: options })
    } else if (isObject(options)) {
      this.excute('alert', options)
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
            const inputVal = this.prompInput.value
            this.options.onOk(inputVal)
          } else {
            this.options.onOk()
          }
        }
  
        this.close()
      })
    }
  }

  onCancel() {
    if (this.btnCancel) {
      this.btnCancel.addEventListener('click', () => {
        if (typeof this.options.onCancel === 'function') {
          this.options.onCancel()
        }

        this.close()
      })
    }
  }

  createContent(options) {
    if (this.options.render) {
      this.modal.innerHTML += this.options.render()
    } else {
      const { type , msg } = options
      const content = document.createElement('p')
  
      // set message
      content.textContent = msg
      this.modal.appendChild(content)
  
      // create prompt input
      if (type === 'prompt') {
        this.prompInput = document.createElement('input')
        this.prompInput.setAttribute('type', 'text')
        this.prompInput.setAttribute('class', 'modal-prompt-input')
  
        // set placeholder input
        if (this.options.textPlaceholder) {
          this.prompInput.setAttribute('placeholder', this.options.textPlaceholder)
        }
        
        this.modal.appendChild(this.prompInput)
        
        // focus input
        this.prompInput.focus()
      }
    }
  }

  createOkBtn() {
    // create ok btn
    this.btnSubmit = document.createElement('button')
    this.btnSubmit.setAttribute(
      'class',
      `modal-btn modal-btn-${this.options.buttonType} modal-btn-submit-${this.options.buttonType}`
    )
    this.btnSubmit.textContent = this.options.textOk

    // set style for button
    if (this.options.okStyle) {
      this.btnSubmit.style.cssText = this.options.okStyle
    }

    this.actionsEl.appendChild(this.btnSubmit)
    // event listener
    this.onOk()
  }

  createCancelBtn() {
    // create cancel btn
    if (this.options.type !== 'alert') {
      this.btnCancel = document.createElement('button')
      this.btnCancel.setAttribute(
        'class',
        `modal-btn modal-btn-${this.options.buttonType}`)
      this.btnCancel.textContent = this.options.textCancel
  
      // set style for button
      if (this.options.cancelStyle) {
        this.btnCancel.style.cssText = this.options.cancelStyle
      }
  
      this.actionsEl.appendChild(this.btnCancel)
    // event listener
      this.onCancel()
    }
  }

  footer() {
    this.actionsEl = document.createElement('div')
    this.actionsEl.setAttribute('class', 'modal-btn-actions')

    if (this.options.footer) {
      this.actionsEl.innerHTML += this.options.footer()
    } else {
      this.createOkBtn()
      this.createCancelBtn()
    }

    this.modal.appendChild(this.actionsEl)
  }

  close() {
    this.modal.remove()
    this.blocked && this.blocked.remove()
    // set options default
    this.options = { ...this.defaultOpt }
  }

  createElement(element) {
    if (element) {
      if (this.options.afterElement) {
        this.triggerEl = document.querySelector(`[data-modal-id="${this.options.triggerId}"]`)
        this.triggerEl.after(element)
      } else {
        document.body.appendChild(element)
      }
    }
  }
}





