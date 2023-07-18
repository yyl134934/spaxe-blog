type MessageType = 'info' | 'success' | 'warn' | 'error';

type Message = {
  [P in MessageType]: (msg: string) => void;
};

type MessageConfig = {
  maxTimeToLive: number;
  maxCount: number;
};

type MessageOptions = {
  maxTimeToLive?: number;
  maxCount?: number;
};

/**
 * 配置
 * @param maxTimeToLive 消息最大存活时间(s)
 * @returns
 */
function messageConfig({ maxTimeToLive, maxCount }: MessageOptions): MessageConfig {
  return { maxTimeToLive: maxTimeToLive ?? 3 * 1000, maxCount: maxCount ?? 3 };
}

const config = messageConfig({ maxCount: 4 });

type Queues<T> = {
  push: (msg: T) => void;
  next: () => T | undefined;
  nextAsnyc: () => T | undefined;
  movePointer: () => void;
  hasFull: () => boolean;
  hasFullAsync: () => boolean;
  isEmpty: () => boolean;
};

function queues<T>(maxCount: number = 3): Queues<T> {
  const queues: T[] = [];
  let pointer: number = -1;

  /**
   * 入队
   * @param msg
   */
  const push = (msg: T) => {
    if (pointer >= maxCount) {
      return;
    }
    pointer++;
    queues.push(msg);
  };

  /**
   * 出队
   * @returns
   */
  const next = () => {
    if (queues.length > 0) {
      pointer--;
      return queues.shift()!;
    }
    return undefined;
  };

  /**
   * 异步出队
   * @returns
   */
  const nextAsnyc = () => {
    if (queues.length > 0) {
      return queues.shift()!;
    }
    return undefined;
  };

  /**
   * 用于异步时移动指针
   * @returns
   */
  const movePointer = () => {
    pointer--;
  };

  /**
   * 队列是否已满
   * @returns
   */
  const hasFull = () => {
    return queues.length >= maxCount;
  };

  /**
   * 队列是否已满
   * @returns
   */
  const hasFullAsync = () => {
    return pointer >= maxCount;
  };

  /**
   * 队列是否为空
   * @returns
   */
  const isEmpty = () => {
    return queues.length === 0;
  };

  return {
    push,
    next,
    nextAsnyc,
    movePointer,
    hasFull,
    hasFullAsync,
    isEmpty,
  };
}

const messageQueues = queues<string>(config.maxCount);

type MessageBox = {
  initailize: () => void;
  push: (ele: HTMLElement) => void;
  remove: (ele: HTMLElement) => void;
  destroy: () => void;
};

function messageBox(): MessageBox {
  let box: HTMLDivElement | null = null;
  let isInitailized = false;

  const create = () => {
    // 创建 <div> 元素
    var divElement = document.createElement('div');
    // 添加 class 属性
    divElement.classList.add(
      'msg-box',
      'fixed',
      'top-10',
      'right-1/2',
      'translate-x-self',
      'space-y-4',
      'flex',
      'flex-col',
      'items-center',
    );

    return divElement;
  };

  const initailize = () => {
    box = create();
    document.body.appendChild(box);

    isInitailized = true;
  };

  const push = (ele: HTMLElement) => {
    isInitailized || initailize();

    box?.appendChild(ele);
  };

  const remove = (ele: HTMLElement) => {
    isInitailized || initailize();

    box?.removeChild(ele);
  };

  const destroy = () => {
    box && document.body.removeChild(box);
  };

  return {
    initailize,
    push,
    remove,
    destroy,
  };
}

const box = messageBox();

type ClassMap = {
  [P in MessageType]: string[];
};

const classMap: ClassMap = {
  info: ['消息', 'bg-blue-400'],
  success: ['成功', 'bg-green-400'],
  warn: ['警告', 'bg-yellow-400'],
  error: ['错误', 'bg-red-400'],
};

function createMessageElement(msgInfo: string, type: MessageType) {
  // 创建 <div> 元素
  const divElement = document.createElement('div');

  const [tag, bgColor] = classMap[type];

  // 添加 class 属性
  divElement.classList.add(
    bgColor,
    'text-white',
    'px-4',
    'py-1',
    'rounded-sm',
    'shadow-md',
    'pointer-events-auto',
    'max-w-sm',
  );

  // 设置内容
  divElement.textContent = `${tag}：${msgInfo}`;

  return divElement;
}

type UnitOfWork = { type: MessageType; msg: string };

function loopWork(unitOfWork: UnitOfWork) {
  // 入队
  messageQueues.push(unitOfWork.msg);

  while (!messageQueues.isEmpty() && !messageQueues.hasFullAsync()) {
    // 创建message节点
    const currentMsg = messageQueues.nextAsnyc() ?? '';
    const msgElement = createMessageElement(currentMsg, unitOfWork.type);
    box.push(msgElement);

    setTimeout(() => {
      box.remove(msgElement);
      messageQueues.movePointer();
    }, config.maxTimeToLive); // 设置消息最大存消息时间
  }
}

const create = (): Message => {
  const list: MessageType[] = ['info', 'success', 'warn', 'error'];
  let message: Message | {} = {};

  const fn = (type: MessageType) => (msg: string) => {
    const unitOfWork: UnitOfWork = {
      type,
      msg,
    };

    loopWork(unitOfWork);
  };

  for (const type of list) {
    message = { [type]: fn(type), ...message };
  }

  return message as Message;
};

const message: Message = create();

export default message;
