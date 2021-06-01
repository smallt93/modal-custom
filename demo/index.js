import Modal from '../src/script.js';

// ALERT
document.getElementById('alert-btn').addEventListener('click', () => {
  const modal = new Modal();

  modal.alert({
    msg: 'Hello world',
  });
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
    }
  });
})


// PROMPT
document.getElementById('prompt-btn').addEventListener('click', () => {
  const modal = new Modal();
  
  modal.prompt({
    msg: 'Where are you?',
    footerOrder: 1,
    onOk: (val) => {
      console.log(val);
    },
    onCancel: () => {
      console.log('Im from nowhere');
    },
  });
})