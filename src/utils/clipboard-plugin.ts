import { visit } from 'unist-util-visit';
import ClipboardJS from 'clipboard';

function addCopyButton() {
  return function transformer(tree: any, file: any) {
    visit(tree, 'element', (node: any) => {
      const test = () => {
        console.error('Copy code');
      };
      if (node.tagName === 'pre') {
        node.properties['class'] = ['copyable-code']; // 添加自定义类名
        node.properties['data-clipboard-target'] = 'code';
        const copyButtonNode = {
          type: 'element',
          tagName: 'button',
          properties: {
            class: ['copy-button btn btn-sm border mr-2 hover:bg-gray-500 rounded'],
            'aria-label': 'Copy code',
          },
          children: [
            {
              type: 'text',
              value: 'Copy',
            },
          ],
        };
        node.children.unshift(copyButtonNode);
      }
    });
  };
}

export default addCopyButton;
