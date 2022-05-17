// CSS class names
const classes = {
  MESSAGE: 'message',
  MESSAGE_CONTAINER: 'message-container',
  HIDDEN: 'hidden',
} 

export function showMessage(msg: string) {
  const msgContainer = document.querySelector('.' + classes.MESSAGE_CONTAINER) as HTMLElement;
  const divEl = document.querySelector('.' + classes.MESSAGE) as HTMLElement;
  msgContainer.classList.remove(classes.HIDDEN);
  divEl.innerText = msg;
}

export function hideMessage() {
  const msgContainer = document.querySelector('.' + classes.MESSAGE_CONTAINER) as HTMLElement;
  msgContainer.classList.add(classes.HIDDEN);
}
