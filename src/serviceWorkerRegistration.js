import {Workbox} from 'workbox-window';

export default function serviceWorkerRegistration () {
  if(process.env.NODE_ENV !== 'production') {
    return;
  }

  if ('serviceWorker' in navigator) {
    const wb = new Workbox('./assets/serviceWorker.js');
    
    wb.addEventListener('installed', event => {
      if(event.isUpdate) {
        if(confirm('Приложение устарело. Нажмите окей, чтобы обновить!')) {
          window.location.reload();
        }
      }
    })
    wb.register();
  }
}