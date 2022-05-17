interface ButtonOptions {
  innnerText: string;
  className: string;
  onClick: EventListener;
}

export function createButton(opt: ButtonOptions) {
  const element = document.createElement('button');
  element.className = opt.className;
  element.innerText = opt.innnerText;
  element.addEventListener('click', opt.onClick);
  return element;
}
