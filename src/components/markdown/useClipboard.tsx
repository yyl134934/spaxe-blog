import ClipboardJS from 'clipboard';
import { useEffect } from 'react';
import message from '../Message';

function useClipboard() {
  const clipboard = () => {
    const buttons = document.getElementsByClassName('copy-button');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].innerHTML = 'Copy';
      buttons[i].parentElement?.classList.add('clipboard');
      new ClipboardJS(buttons[i], {
        target: function (trigger: any) {
          message.info('代码已复制到剪切板');

          return trigger.nextElementSibling;
        },
      });
    }
  };

  useEffect(() => {
    clipboard();
  }, []);
}

export default useClipboard;
