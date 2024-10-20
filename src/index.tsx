import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const fontSizeNameFlag = 'style-qqnt-fontsize';
const { plugin: pluginPath, data: dataPath } = LiteLoader?.plugins?.change_message_fontsize?.path;

interval();
function interval(try_count: number = 0) {
  try_count++;
  // const body: HTMLElement = document.querySelector('.group-box')!;
  const body: HTMLElement = document.querySelector('.chat-input-area > .operation')!;
  if (body) {
    setTimeout(() => {
      main(body);
    }, 100);
  } else if (try_count < 800 || window.location.hash.includes('main')) {
    setTimeout(() => {
      interval(try_count);
    }, 100);
  }
}

async function main(body: HTMLElement) {
  const old_list = document.querySelectorAll(`div[${fontSizeNameFlag}]`);
  for (const key in old_list) {
    if (Object.prototype.hasOwnProperty.call(old_list, key)) {
      const element = old_list[key];
      element.remove();
    }
  }
  const container = document.createElement('div');
  container.setAttribute(fontSizeNameFlag, '');
  container.style.width = '100%';
  const root = createRoot(container);
  root.render(<App fontSizeNameFlag={fontSizeNameFlag}></App>);
  // body.appendChild(container);
  body.insertBefore(container, body.childNodes[0]);
}

export const onSettingWindowCreated = (view: Element) => {
  console.log(view);

  // view 为 Element 对象，修改将同步到插件设置界面
  view.innerHTML = `<span>设置页面开发中，设置中更改后不会自动刷新</span>`;
  main(view as HTMLElement);
};
