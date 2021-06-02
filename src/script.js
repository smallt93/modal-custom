import { isObject, isString, isFunc } from './typeof.js';
// import './style.css';
export default class Modal {
  constructor() {
    this.triggerEl = null;
    this.modalEl = null;
    this.defaultOpt = {
      visible: false,
      triggerId: null,
      styles: null,
      class: null,
      title: '',
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
      content: null,
      footer: null,
      position: 'top-center',
      afterElement: false,
    }
    this.options = { ...this.defaultOpt };
  }

  show() {
    if (this.modal) return;

    // create modal wrapper
    this.modalEl = document.createElement('div')
    this.modalEl.setAttribute('class', 'modal-container modal-fade')
    this.modal = document.createElement('modal')
    this.modal.setAttribute(
      'class',
      `modal-dialog modal-${this.options.position} ${this.options.class || ''}`
    )

    // set styles for modal wrapper
    if (this.options.styles) {
      this.modal.style.cssText = this.options.styles
    }

    this.modalEl.appendChild(this.modal)
    document.body.appendChild(this.modalEl);
  }

  /**
   * Define type of params
   * @param {string} type
   * @param {object} options
   */

  excute(type, options) {
    if (isObject(options)) {
      this.options = {
        ...this.options,
        ...options,
        type,
      }
  
      this.show()
      this.header()
      this.content()
    }
  }

  alert(options) {
    if (isString(options)) {
      this.excute('alert', { msg: options })
    } else {
      this.excute('alert', options)
    }
  }

  confirm(options) {
    this.excute('confirm', options);
  }

  prompt(options) {
    this.excute('prompt', options);
  }

  onOk() {
    this.btnSubmit.addEventListener('click', () => {
      if (isFunc(this.options.onOk)) {
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

  onCancel() {
    this.btnClose.addEventListener('click', () => {
      if (isFunc(this.options.onCancel)) {
        this.options.onCancel()
      }

      this.close()
    })
  }

  createContent(options) {
    // create message
    const content = document.createElement('p')
    content.textContent = options.msg
    this.contentEl.appendChild(content)

    // create prompt input
    if (options.type === 'prompt') {
      this.prompInput = document.createElement('input')
      this.prompInput.setAttribute('type', 'text')
      this.prompInput.setAttribute('class', 'modal-prompt-input')

      // set placeholder input
      if (this.options.textPlaceholder) {
        this.prompInput.setAttribute('placeholder', this.options.textPlaceholder)
      }
      
      this.contentEl.appendChild(this.prompInput)
      
      // focus input
      this.prompInput.focus()
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

  createCloseBtn() {
    this.btnClose = document.createElement('span')
    this.btnClose.setAttribute('class', 'modal-close-btn')
    this.headerEl.appendChild(this.btnClose)

    // event listener
    this.onCancel()
  }

  header() {
    this.headerEl = document.createElement('div')
    this.headerEl.setAttribute('class', 'modal-header')

    this.titleEl = document.createElement('p')
    // set title content 
    if (this.options.title) {
      this.titleEl.textContent = this.options.title
    }

    this.headerEl.appendChild(this.titleEl)
    this.createCloseBtn()

    this.modal.appendChild(this.headerEl)
  }

  content() {
    this.contentEl = document.createElement('div')
    this.contentEl.setAttribute('class', 'modal-content')

    this.modal.appendChild(this.contentEl)

    if (this.options.render) {
      this.contentEl.innerHTML += this.options.render()
    } else {
      // create content
      this.options.content
        ? this.contentEl.innerHTML += this.options.content()
        : this.createContent(this.options)
  
      // create footer
      this.options.footer
        ? this.actionsEl.innerHTML += this.options.footer()
        : this.footer()
    }
  }

  footer() {
    this.actionsEl = document.createElement('div')
    this.actionsEl.setAttribute('class', 'modal-btn-actions')
    this.createOkBtn()

    this.contentEl.appendChild(this.actionsEl)
  }

  close() {
    this.modalEl.remove()
    this.options = { ...this.defaultOpt }
  }
}





