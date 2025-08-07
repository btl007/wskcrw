// Editor.jsx
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot } from 'lexical';

const STORAGE_KEY = 'lexical-editor-content';

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

export default function Editor() {
  const initialConfig = {
    namespace: 'MinimalEditor',
    theme: {
      paragraph: 'text-base text-white',
    },
    onError: (error) => {
      console.error('Lexical Error:', error);
    },
    nodes: [],
    editorState: () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn("Failed to parse saved state", e);
        }
      }
      return null;
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
      </div>
    </LexicalComposer>
  );
}