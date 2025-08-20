import { ElementNode } from 'lexical';

export class ScriptContainerNode extends ElementNode {
  static getType() {
    return 'script-container';
  }

  static clone(node) {
    return new ScriptContainerNode(node.__key);
  }

  createDOM(config) {
    const dom = document.createElement('div');
    // CSS 클래스를 테마에서 가져와 적용합니다.
    const className = config.theme.scriptContainer;
    if (className !== undefined) {
      dom.className = className;
    }
    return dom;
  }

  updateDOM(prevNode, dom, config) {
    // DOM 업데이트는 자식 노드들에게 위임하므로 여기서는 false를 반환합니다.
    return false;
  }

  static importJSON(serializedNode) {
    // JSON에서 노드를 다시 생성합니다.
    return new ScriptContainerNode();
  }

  exportJSON() {
    // 노드를 JSON으로 변환합니다.
    return {
      ...super.exportJSON(),
      type: 'script-container',
      version: 1,
    };
  }
}

export function $createScriptContainerNode() {
  return new ScriptContainerNode();
}

export function $isScriptContainerNode(node) {
  return node instanceof ScriptContainerNode;
}
