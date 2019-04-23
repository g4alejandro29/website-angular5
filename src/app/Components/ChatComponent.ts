import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-component',
  templateUrl: '../Views/ChatComponent.html',
  styleUrls: ['../../assets/scss/chat.scss']
})

export class ChatComponent implements OnInit {
  public chat = false;
  message: String = null;
  public messages: Array<String> = [];

  openChat() {
    this.chat = true;
  }
  closeChat () {
    this.chat = false;
  }
  ngOnInit() {
  }

  submitForm() {
    if (this.message && this.message.length > 0) {
      this.messages.push(this.message);
      console.log(this.messages);
    }
  }

  setMessage($event) {
    const enter = $event.charCode;
    if (enter === 13) {
      console.log(this.message)
      this.submitForm();
    }
  }
}
