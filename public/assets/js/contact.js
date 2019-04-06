class Send {
    constructor(subject, name, msg, phone, email) {
      this.subject = subject;
      this.name = name;
      this.msg = msg;
      this.phone = phone;
      this.email = email;
    }
  }
  
  class UI {
    static displaySends() {
       
      const sends = Store.getSends();
  
      sends.forEach((send) => UI.addSendToList(send));
    }
  
    static addSendToList(send) {
      const list = document.querySelector('#send-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${send.subject}</td>
        <td>${send.name}</td>
        <td>${send.msg}</td>
        <td>Male</td>
        <td>${send.phone}</td>
        <td>${send.email}</td>
        <td><a href="#send-list" class="btn alertmsg btn-sm delete"> Delete </a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteSend(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
    static showAlert() {
      alert("Please fill in all fields");
    }
  
    static clearFields() {
      document.querySelector('#subject').value = '';
      document.querySelector('#name').value = '';
      document.querySelector('#msg').value = '';
      document.querySelector('#phone').value = '';
      document.querySelector('#email').value = '';
    }
  }
  
  class Store {
    static getSends() {
      let sends;
      if(localStorage.getItem('sends') === null) {
        sends = [];
      } else {
        sends = JSON.parse(localStorage.getItem('sends'));
      }
  
      return sends;
    }
  
    static addSend(send) {
      const sends = Store.getSends();
      sends.push(send);
      localStorage.setItem('sends', JSON.stringify(sends));
    }
  
    static removeSend(msg) {
      const sends = Store.getSends();
  
      sends.forEach((send, index) => {
        if(send.msg === msg) {
          sends.splice(index, 1);
        }
      });
  
      localStorage.setItem('sends', JSON.stringify(sends));
    }
  }
  
  document.addEventListener('DOMContentLoaded', UI.displaySends);
  
  document.querySelector('#send-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const subject = document.querySelector('#subject').value;
    const name = document.querySelector('#name').value;
    const msg = document.querySelector('#msg').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;

    if(subject === '' || name === '' || msg === '' || phone === '' || email === '') {
      UI.showAlert();
    } else {
      const send = new Send(subject, name, msg, phone, email);
  
      UI.addSendToList(send);
  
      Store.addSend(send);
  
      UI.clearFields();
    }
  });
  
  document.querySelector('#send-list').addEventListener('click', (e) => {
    
    UI.deleteSend(e.target);
  
    Store.removeSend(e.target.parentElement.previousElementSibling.textContent);
  
  });
  