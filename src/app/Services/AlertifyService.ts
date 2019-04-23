import {Injectable} from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() {
  }

  confirm(message: string, okCallbak: () => any) {
    alertify.set('notifier', 'position', 'top-left');
    alertify.confirm(message, function (e) {
      if (e) {
        okCallbak();
      } else {
      }
    });
  }

  success(message: string) {
    alertify.set('notifier', 'position', 'top-left');
    alertify.success(message);
  }

  error(message: string) {
    alertify.set('notifier', 'position', 'top-left');
    alertify.error(message);
  }

  waring(message: string) {
    alertify.set('notifier', 'position', 'top-left');
    alertify.warning(message);
  }

  message(message: string) {
    alertify.set('notifier', 'position', 'top-left');
    alertify.message(message);
  }
}
