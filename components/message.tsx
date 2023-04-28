const errorSvg = `<svg fill='rgb(200, 125, 125)' width='20' height='20' viewBox='0 0 512 512'>
<path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
</svg>`;

const successSvg = `<svg fill='rgb(100, 190, 100)' width='20' height='20' viewBox="0 0 512 512">
<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`;

export function createTemporaryNotification(status: boolean, text: string) {
  const audio = new Audio('/sound/notification.mp3');
  const notification = document.createElement('div');
  notification.innerHTML = status
    ? `<div>${successSvg}</div><div>${text}</div>`
    : `<div>${errorSvg}</div><div>${text}</div>`;
  status
    ? notification.classList.add('notificationSuccess')
    : notification.classList.add('notificationError');

  document.body.appendChild(notification);
  audio.play();
  setTimeout(() => {
    notification.style.animation = 'disappearance 0.5s ease-in-out forwards';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 2000);
}
