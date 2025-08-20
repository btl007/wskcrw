// Editor.jsx
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import React, { useEffect } from 'react';
import { ScriptContainerNode } from '../nodes/ScriptContainerNode';

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

export default function Editor({ onChange, onReady }) {
  const initialConfig = {
    namespace: 'MinimalEditor',
    theme: {
      paragraph: 'text-base text-white',
      scriptContainer: 'bg-[rgb(25,25,25)] rounded-lg px-4',
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
      </div>
    </LexicalComposer>
  );
}