import { ElementNode, $getNodeByKey } from 'lexical';

export class ScriptContainerNode extends ElementNode {
  static getType() {
    return 'script-container';
  }

  static clone(node) {
    return new ScriptContainerNode(node.__key);
  }

  createDOM(config) {
    const dom = document.createElement('div');
    const className = config.theme.scriptContainer;
    if (className !== undefined) {
      dom.className = className;
    }

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'script-delete-button'; // For styling
    deleteButton.innerHTML = '삭제 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';

    // Add event listener
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent Lexical from handling the click
      const editor = this.getEditor(); // Get the editor instance
      const nodeKey = this.getKey(); // Get the key of this node

      editor.update(() => {
        const nodeToRemove = $getNodeByKey(nodeKey);
        if ($isScriptContainerNode(nodeToRemove)) {
          nodeToRemove.remove();
        }
      });
    });

    dom.appendChild(deleteButton); // Add button to the container
    return dom;
  }

  updateDOM(prevNode, dom, config) {
    return false;
  }

  static importJSON(serializedNode) {
    return new ScriptContainerNode();
  }

  exportJSON() {
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
