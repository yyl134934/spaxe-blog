import { visit } from 'unist-util-visit';

function addCopyButton() {
  return function transformer(tree: any, file: any) {
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'pre') {
        node.properties['class'] = ['copyable-code']; // 添加自定义类名
        node.properties['data-clipboard-target'] = 'code';
        const copyButtonNode = {
          type: 'element',
          tagName: 'button',
          properties: {
            class: ['copy-button btn btn-sm border mr-2 hover:bg-gray-500 rounded absolute top-3 right-3 hidden'],
            'aria-label': 'Copy code',
          },
          // children: [
          //   {
          //     type: 'text',
          //     value: '复制',
          //   },
          // ],
        };
        node.children.unshift(copyButtonNode);
      }
    });
  };
}

export default addCopyButton;
