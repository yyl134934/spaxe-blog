type MessageType = 'info' | 'success' | 'warn' | 'error';

type Message = {
  [P in MessageType]: (msg: string) => void;
};

const msgStyles = {};

/**
 * 创建装message div 的盒子
 * @returns
 */
function createMsgBox() {
  // 创建 <div> 元素
  var divElement = document.createElement('div');
  // 添加 class 属性
  divElement.classList.add(
    'msg-box',
    'fixed',
    'top-10',
    'right-1/2',
    'translate-x-self',
    //     'w-full',
    'space-y-4',
    'flex',
    'flex-col',
    'items-center',
  );
  divElement.id = 'msg-box';

  return divElement;
}

/**
 * 初始化盒子message盒子
 * @returns
 */
function initailizeBox() {
  let msgBox = document.body.querySelector('#msg-box');
  if (msgBox) {
    return msgBox;
  }

  msgBox = createMsgBox();
  document.body.appendChild(msgBox);

  return msgBox;
}

function createMessageElement(msgInfo: string, type: MessageType) {
  // 创建 <div> 元素
  var divElement = document.createElement('div');
  // 添加 class 属性
  divElement.classList.add(
    'bg-white',
    'dark:text-black',
    'px-4',
    'py-1',
    'rounded-sm',
    'shadow-md',
    'pointer-events-auto',
    'max-w-sm',
  );

  // 设置内容
  divElement.textContent = msgInfo;

  return divElement;
}

let infoTimer: NodeJS.Timeout | null = null;
const queues: string[] = [];

let index = 0;
/**
 * 最大消息数量
 */
const maxMsgCount = 3;
/**
 * 消息最大存活时间(s)
 */
const maxTimeToLive = 3 * 1000;

// 1 2 3
const infoFn = (msg: string) => {
  // 控制最大message数量
  if (queues.length >= maxMsgCount && infoTimer) {
    return;
  }

  // 入队
  queues.push(msg);

  while (queues && queues.length > 0 && index < queues.length) {
    const curMsg = queues?.[index] || '';
    // 创建message节点
    const msgElement = createMessageElement(curMsg, 'info');
    const msgBox = initailizeBox();
    msgBox.appendChild(msgElement);

    // 设置消息最大存消息时间
    infoTimer = setTimeout(() => {
      msgBox.removeChild(msgElement);
      // 出队
      queues.shift();
      infoTimer = null;
      index--;
    }, maxTimeToLive);

    index++;
  }
};

const successFn = (msg: string) => {
  document.body.innerHTML += `<div class="fixed top-10 right-1/2 bg-slate-300 dark:bg-slate-600 dark:text-white">${msg}</div>`;
};

const warnFn = (msg: string) => {
  document.body.innerHTML += `<div class="fixed top-10 right-1/2 bg-slate-300 dark:bg-slate-600 dark:text-white">${msg}</div>`;
};

const errorFn = (msg: string) => {
  document.body.innerHTML += `<div class="fixed top-10 right-1/2 bg-slate-300 dark:bg-slate-600 dark:text-white">${msg}</div>`;
};

const message: Message = {
  info: infoFn,
  success: successFn,
  warn: warnFn,
  error: errorFn,
};

export default message;
