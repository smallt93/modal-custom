import { isObject, isString, isFunc } from './typeof.js';
// import './style.css';
export default class Modal {
  constructor() {
    this.triggerEl = null;
    this.modalEl = null;
    this.defaultOpt = {
      styles: null,
      class: null,
      title: '',
      msg: `${window.location.origin} says`,
      onOk: () => {},
      onCancel: () => {},
      textOk: 'Ok',
      textPlaceholder: '',
      okStyle: null,
      buttonType: 'success',
      position: 'top-center',
      classHeader: '',
      classActive: '',
    }
    this.options = { ...this.defaultOpt };
  }

  show() {
    if (this.modal) return;

    // create modal wrapper
    this.modalEl = document.createElement('div')
    this.modalEl.setAttribute('data-modal-id', this.options.classActive || 'modal-custom')
    this.modalEl.setAttribute('class', 'modal-container modal-fade')
    this.modal = document.createElement('modal')
    this.modal.setAttribute(
      'class',
      `modal-dialog modal-${this.options.position} ${this.options.class || ''}`
    )

    // set styles for modal wrapper
    this.options.styles && (this.modal.style.cssText = this.options.styles)

    this.modalEl.appendChild(this.modal)
    this.createEl(this.modalEl);
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

      type === 'custom'
        ? this.customContent()
        : this.content()

      this.addEvListener()
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

  custom(options) {
    this.excute('custom', options);
  }

  onOk() {
    if (isFunc(this.options.onOk)) {
      const inputVal = this.prompInput?.value
      inputVal || inputVal === '' ? this.options.onOk(inputVal) : this.options.onOk()
      
      this.close()
    }
  }

  onCancel() {
    isFunc(this.options.onCancel) && this.options.onCancel()
    this.close()
  }

  customContent() {
    // custom render by 'classActive' option
    this.modal.innerHTML += this.customEl.outerHTML
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
    this.btnSubmit.setAttribute('data-submit-modal', 'modal-submit-btn')
    this.btnSubmit.textContent = this.options.textOk

    // set style for button
    this.options.okStyle && (this.btnSubmit.style.cssText = this.options.okStyle)

    this.actionsEl.appendChild(this.btnSubmit)
  }

  createCloseBtn() {
    this.btnClose = document.createElement('span')
    this.btnClose.setAttribute('class', 'modal-close-btn')
    this.btnClose.setAttribute('data-close-modal', 'modal-close-btn')
    this.headerEl.appendChild(this.btnClose)
  }

  createEl(el) {
    if (this.options.classActive) {
      this.customEl = document.querySelector(`[data-element-id="${this.options.classActive}"]`)
      this.customEl.setAttribute('modal-open', 'active')
      this.customEl.after(el);
    } else {
      document.body.appendChild(el)
    }
  }

  header() {
    this.headerEl = document.createElement('div')
    this.headerEl.setAttribute('class', 'modal-header')

    this.titleEl = document.createElement('p')
    // set title content 
    this.options.title && (this.titleEl.textContent = this.options.title)

    this.headerEl.appendChild(this.titleEl)
    this.createCloseBtn()

    this.modal.appendChild(this.headerEl)
  }

  content() {
    // create modal wrapper content
    this.contentEl = document.createElement('div')
    this.contentEl.setAttribute('class', 'modal-content')
    this.modal.appendChild(this.contentEl)

    this.createContent(this.options)
    this.footer()
  }

  footer() {
    this.actionsEl = document.createElement('div')
    this.actionsEl.setAttribute('class', 'modal-btn-actions')
    this.createOkBtn()

    this.contentEl.appendChild(this.actionsEl)
  }

  close() {
    this.options.classActive && this.customEl.removeAttribute('modal-open')
    this.modalEl.remove();
    this.options = { ...this.defaultOpt }
    this.removeEvListener();
  }

  addEvListener() {
    const modalEl = document.querySelector(`[data-modal-id="${this.options.classActive || 'modal-custom'}"]`)
    this.closeEl = modalEl.querySelector('[data-close-modal');
    this.submitEl = modalEl.querySelector('[data-submit-modal');

    if (this.closeEl) {
      this.closeEl.addEventListener('click', () => {
        this.onCancel();
      })
    }

    if (this.submitEl) {
      this.submitEl.addEventListener('click', () => {
        this.onOk();
      })
    }
  }

  removeEvListener() {
    this.closeEl.removeEventListener('click', () => {
      this.onCancel();
    })

    this.submitEl.removeEventListener('click', () => {
      this.onOk();
    })
  }
}





