import Image from 'next/image';
import { useEffect } from 'react';
import { Root, createRoot } from 'react-dom/client';

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

type UnitOfWork = { type: MessageType; msg: string };

type BaseMessageProps = {
  type: MessageType;
  msg: string;
};

type MessageContainer = {
  render: (unitOfWork: UnitOfWork) => void;
  unmount: () => void;
  destroy: () => void;
};

type Queues<T> = {
  push: (msg: T) => void;
  next: () => T | undefined;
  hasFull: () => boolean;
  isEmpty: () => boolean;
  queues: T[];
};

/**
 * 配置
 * @param maxTimeToLive 消息最大存活时间(s)
 * @returns
 */
function messageConfig(props?: MessageOptions): MessageConfig {
  const { maxTimeToLive, maxCount } = props ?? {};

  return { maxTimeToLive: maxTimeToLive ?? 3 * 1000, maxCount: maxCount ?? 3 };
}

let config = messageConfig();

function queues<T>(maxCount: number = 3): Queues<T> {
  const queues: T[] = [];

  /**
   * 入队
   * @param msg
   */
  const push = (msg: T) => {
    if (queues.length >= maxCount) {
      return;
    }
    queues.push(msg);
  };

  /**
   * 出队
   * @returns
   */
  const next = () => {
    if (queues.length > 0) {
      return queues.shift()!;
    }
    return undefined;
  };

  /**
   * 队列是否已满
   * @returns
   */
  const hasFull = () => {
    return queues.length >= maxCount;
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
    hasFull,
    isEmpty,
    queues,
  };
}

function messageContainer(): MessageContainer {
  let root: Root | null = null;
  const messageQueues = queues<UnitOfWork>(config.maxCount);

  const create = () => {
    // 创建 <div> 元素
    var divElement = document.createElement('div');
    // 添加 class 属性
    divElement.classList.add(
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
    const container = create();
    root = createRoot(container);
    document.body.appendChild(container);
  };

  function convertToComponents(queues: UnitOfWork[]) {
    const renderQueues = queues.map((nextUnitOfWork, index) => {
      return <BaseMessage key={nextUnitOfWork.msg + nextUnitOfWork.type + index} {...nextUnitOfWork} />;
    });

    return renderQueues;
  }

  const render = (unitOfWork: UnitOfWork) => {
    if (!root) {
      initailize();
    }

    messageQueues.push(unitOfWork);
    const nodes = convertToComponents(messageQueues.queues);
    root?.render(nodes);
  };

  const unmount = () => {
    if (!root) {
      initailize();
    }

    messageQueues.next();
    const nodes = convertToComponents(messageQueues.queues);
    root?.render(nodes);
  };

  const destroy = () => {};

  return {
    render,
    unmount,
    destroy,
  };
}

const container = messageContainer();

function BaseMessage(props: BaseMessageProps) {
  const { type, msg } = props;

  useEffect(() => {
    setTimeout(() => {
      container.unmount();
    }, config.maxTimeToLive); // 设置消息最大存消息时间
  }, []);

  return (
    <div className='bg-white text-black px-4 py-1 rounded-sm shadow-md pointer-events-auto max-w-sm flex flex-row space-x-2'>
      <Image src={`/message/${type}.svg`} alt='' width={20} height={20} />
      <span className='text-sm font-medium'>{msg}</span>
    </div>
  );
}

export function setConfig(options: MessageOptions) {
  config = messageConfig(options);
}

const create = (): Message => {
  const list: MessageType[] = ['info', 'success', 'warn', 'error'];

  const fn = (type: MessageType) => (msg: string) => {
    const unitOfWork: UnitOfWork = {
      type,
      msg,
    };

    container.render(unitOfWork);
  };

  return list.reduce((msg: Partial<Message>, type) => ((msg[type] = fn(type)), msg), {}) as Message;
};

const message: Message = create();

export default message;
