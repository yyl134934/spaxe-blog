import ClipboardJS from 'clipboard';
import { useEffect } from 'react';

function useClipboard() {
  const clipboard = () => {
    const buttons = document.getElementsByClassName('copy-button');
    for (let i = 0; i < buttons.length; i++) {
      new ClipboardJS(buttons[i], {
        target: function (trigger: any) {
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
