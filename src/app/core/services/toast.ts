import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastServcie {

  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    const toast = document.createElement('div');

    toast.className = `app-toast toast-${type}`;

    toast.innerHTML = `
      <div class="toast-wrapper">
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hide');
    }, 3000);

    setTimeout(() => {
      toast.remove();
    }, 3400);
  }

  success(message: string): void {
    this.showToast(message, 'success');
  }

  error(message: string): void {
    this.showToast(message, 'error');
  }
}