import Modal from '../src/script.js';
// const { Modal } = LineModal;

// ALERT
document.querySelector('[data-modal-id="alert-btn"]').addEventListener('click', () => {
  const modal = new Modal();

  modal.alert('Hello world');
})

// CONFIRM
document.querySelector('[data-modal-id="confirm-btn"]').addEventListener('click', () => {
  const modal = new Modal();

  modal.confirm({
    msg: 'Are you sure?',
    onOk: () => {
      console.log('Sure');
    },
    onCancel: () => {
      console.log('Not yet');
    },
  });
})

// PROMPT
document.querySelector('[data-modal-id="prompt-btn"]').addEventListener('click', () => {
  const modal = new Modal();
  
  modal.prompt({
    msg: 'Where are you?',
    textPlaceholder: '...',
    onOk: (val) => {
      console.log(val);
    },
    onCancel: () => {
      console.log('Im from nowhere');
    },
  });
})

// Modify styling of modal
document.querySelector('[data-modal-id="modify-styling"]').addEventListener('click', () => {
  const modal = new Modal();
  
  modal.prompt({
    msg: 'Do you want modify styling for modal?',
    styles: `
      background-color: #666;
      color: #fff;
    `,
    buttonType: 'primary',
    onOk: (val) => {
      console.log(val);
    },
    onCancel: () => {
      console.log('Im from nowhere');
    },
  });
})

// Custom Content
document.querySelector('[data-modal-id="custom-content"]').addEventListener('click', () => {
  const modal = new Modal();
  
  modal.prompt({
    render: () => `
      <div>
        <h2>Login Form</h2>

        <form onsubmit="return false;">
          <div class="form-item">
            <label>User name</label>
            <input type="text" />
          </div>

          <div class="form-item">
            <label>Password</label>
            <input type="password" />
          </div>

          <button>Login</button>
        </form>
      </div>
    `,
    onOk: (val) => {
      console.log(val);
    },
    onCancel: () => {
      console.log('Im from nowhere');
    },
  });
})

// Custom Content
document.querySelector('[data-modal-id="after-element"]').addEventListener('click', () => {
  const modal = new Modal();
  
  modal.prompt({
    msg: 'The modal in your element',
    triggerId: 'after-element',
    position: 'top-right',
    afterElement: true,
    onOk: (val) => {
      console.log(val);
    },
    onCancel: () => {
      console.log('Im from nowhere');
    },
  });
})