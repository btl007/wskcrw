// Editor.jsx
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  KEY_ENTER_COMMAND,
  COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_CRITICAL,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  ParagraphNode,
  $getRoot,
} from 'lexical';
import { $getNearestNodeOfType } from '@lexical/utils';
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom'; // Added this import
import { BlockManagementMenu } from '../components/BlockManagementMenu'; // Added this import
import { $createScriptContainerNode, $isScriptContainerNode, ScriptContainerNode } from '../nodes/ScriptContainerNode';

const STORAGE_KEY = 'lexical-editor-content';

//저장 플러그인
function SavePlugin() {
  const handleChange = (editorState) => {
    editorState.read(() => {
      const json = editorState.toJSON();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
      console.log("Saved to localStorage:", json);
    });
  };
  return <OnChangePlugin onChange={handleChange} />;
}

// onReady를 처리하는 플러그인
function OnReadyPlugin({ onReady }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (onReady) {
      onReady(editor);
    }
  }, [editor, onReady]);
  return null;
}

function EnterKeyPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        }

        // Handle Shift+Enter: Let Lexical handle it (insert line break)
        if (event.shiftKey) {
          return false;
        }

        // Handle Enter: Create a new ScriptContainerNode
        const anchorNode = selection.anchor.getNode();
        const scriptContainerNode = $getNearestNodeOfType(anchorNode, ScriptContainerNode);

        if (scriptContainerNode) {
          // If we are inside a ScriptContainerNode
          editor.update(() => {
            const newScriptContainerNode = $createScriptContainerNode();
            const newParagraphNode = $createParagraphNode();
            newScriptContainerNode.append(newParagraphNode);

            // Insert the new block after the current one
            scriptContainerNode.insertAfter(newScriptContainerNode);

            // Ensure the selection is correctly placed at the start of the new paragraph
            newParagraphNode.selectStart();

            // Defensive cleanup: Check if an empty paragraph was implicitly created
            // by Lexical's default Enter behavior (or other interactions)
            // immediately before the new block, and remove it to ensure a clean structure.
            const previousSibling = newScriptContainerNode.getPreviousSibling();
            if (previousSibling && previousSibling.isEmpty() && previousSibling.getType() === 'paragraph') {
                previousSibling.remove();
            }
          });
          event.preventDefault(); // Prevent default browser Enter behavior
          return true; // Consume the event
        }

        // If not inside a ScriptContainerNode, let Lexical handle it (e.g., create a new paragraph)
        return false;
      },
      COMMAND_PRIORITY_CRITICAL // Critical priority to ensure override of default Enter behavior
    );
  }, [editor]);

  return null;
}

// New Plugin: Automatically wraps top-level ParagraphNodes in ScriptContainerNodes
function ParagraphToScriptBlockPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Register a node transform for ParagraphNode
    return editor.registerNodeTransform(ParagraphNode, (paragraphNode) => {
      // Only transform if it's a direct child of the RootNode
      const parent = paragraphNode.getParent();
      if (!parent || parent.getType() !== 'root') {
        return; // Not a top-level paragraph
      }

      // Create a new ScriptContainerNode
      const scriptContainerNode = $createScriptContainerNode();

      // Replace the original ParagraphNode with the new ScriptContainerNode
      // This effectively moves the paragraphNode out of its current parent
      // and places scriptContainerNode in its place.
      paragraphNode.replace(scriptContainerNode);

      // Append the original paragraphNode (with its content) into the new scriptContainerNode
      scriptContainerNode.append(paragraphNode);

            // Check if the paragraphNode is empty and not dirty (i.e., not actively being typed into)
      // This helps prevent transforming the initial empty paragraph.
      if (paragraphNode.isEmpty() && !paragraphNode.isDirty()) {
        return; // Don't transform empty, clean paragraphs
      }
    });
  }, [editor]);

  return null;
}

// New Plugin: Renders BlockManagementMenu for each ScriptContainerNode
// This has been refactored to be more robust and avoid race conditions.
function BlockManagementMenuPortal({ editor, nodeKey }) {
  const [domElement, setDomElement] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const show = () => {
    clearTimeout(timerRef.current);
    setIsHovered(true);
  };

  const hide = () => {
    timerRef.current = setTimeout(() => setIsHovered(false), 100);
  };

  useEffect(() => {
    const element = editor.getElementByKey(nodeKey);
    setDomElement(element);
  }, [editor, nodeKey]);

  useEffect(() => {
    if (!domElement) return;

    domElement.addEventListener('mouseenter', show);
    domElement.addEventListener('mouseleave', hide);

    return () => {
      domElement.removeEventListener('mouseenter', show);
      domElement.removeEventListener('mouseleave', hide);
    };
  }, [domElement]);

  if (!domElement) {
    return null;
  }

  const rect = domElement.getBoundingClientRect();

  return isHovered
    ? createPortal(
        <BlockManagementMenu
          editor={editor}
          nodeKey={nodeKey}
          rect={rect}
          show={show}
          hide={hide}
        />,
        document.body
      )
    : null;
}

function BlockManagementRendererPlugin() {
  const [editor] = useLexicalComposerContext();
  const [nodeKeys, setNodeKeys] = useState([]);

  useEffect(() => {
    // Listen to updates and get the keys of all ScriptContainerNodes
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const newKeys = [];
        const root = $getRoot();
        root.getChildren().forEach((node) => {
          if ($isScriptContainerNode(node)) {
            newKeys.push(node.getKey());
          }
        });

        // Update state only if the keys have changed
        if (JSON.stringify(newKeys) !== JSON.stringify(nodeKeys)) {
          setNodeKeys(newKeys);
        }
      });
    });
  }, [editor, nodeKeys]); // Rerun if editor or keys change

  // For each key, render a portal. The portal component handles the DOM lookup.
  return (
    <>
      {nodeKeys.map((key) => (
        <BlockManagementMenuPortal key={key} editor={editor} nodeKey={key} />
      ))}
    </>
  );
}


export default function Editor({ onChange, onReady, customChildren }) {
  const initialConfig = {
    namespace: 'MinimalEditor',
    theme: {
      paragraph: 'text-base text-white',
      scriptContainer: 'script-container bg-[rgb(25,25,25)] rounded-lg px-4 py-1',
    },
    onError: (error) => {
      console.error('Lexical Error:', error);
    },
    nodes: [ScriptContainerNode],
    initialEditorState: (editor) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const editorState = editor.parseEditorState(parsed);
          editor.setEditorState(editorState);
        } catch (e) {
          console.warn("Failed to parse saved state", e);
        }
      }
      
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative p-4 rounded-lg bg-[rgb(25,25,25)] min-h-[300px]">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none w-full text-[rgb(212,212,212)] min-h-[250px]" />
          }
          placeholder={
            <div className="text-gray-500 absolute top-4 left-4 pointer-events-none">
              <span className="block">💡 여기에 입력하세요</span>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <SavePlugin />
        <OnReadyPlugin onReady={onReady} />
        <EnterKeyPlugin />
        <ParagraphToScriptBlockPlugin />
        <BlockManagementRendererPlugin /> {/* Add the new plugin here */}
        {customChildren} {/* Render custom children here */}
      </div>
    </LexicalComposer>
  );
}