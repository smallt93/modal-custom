import Modal from '../src/script.js';
// const { Modal } = LineModal;

// ALERT
document.getElementById('alert-btn').addEventListener('click', () => {
  const modal = new Modal();
  modal.alert('Hello world');
})

// CONFIRM
document.getElementById('confirm-btn').addEventListener('click', () => {
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
document.getElementById('prompt-btn').addEventListener('click', () => {
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
document.getElementById('modify-styling').addEventListener('click', () => {
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
document.getElementById('custom-render').addEventListener('click', () => {
  const modal = new Modal();
  
  modal.custom({
    msg: 'Custom element',
    classActive: 'my-modal',
    onOk: () => {
      console.log('callback onOk');
    },
    onCancel: () => {
      console.log('callback onCancel')
    },
  });
})

function onLogin() {
  const modal = new Modal();

  modal.close();
}