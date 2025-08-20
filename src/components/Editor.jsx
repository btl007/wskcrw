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
  $getRoot,
} from 'lexical';
import { $getNearestNodeOfType } from '@lexical/utils';
import React, { useEffect } from 'react';
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

export default function Editor({ onChange, onReady }) {
  const initialConfig = {
    namespace: 'MinimalEditor',
    theme: {
      paragraph: 'text-base text-white',
      scriptContainer: 'script-container bg-slate-800 rounded-lg p-4 my-2',
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
      </div>
    </LexicalComposer>
  );
}