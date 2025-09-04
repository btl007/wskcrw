import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useSupabase } from '../components/SupabaseProvider';
import { useUser } from '@clerk/clerk-react';
import Editor from '../components/Editor';
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $createTextNode,
} from 'lexical';
import { $createScriptContainerNode } from '../nodes/ScriptContainerNode';

import sampleScripts from '../data/sampleScript';

// SaveButton Component
const SaveButton = () => {
  const [editor] = useLexicalComposerContext();
  const supabase = useSupabase();
  const { user } = useUser();

  const handleSave = async () => {
    if (!supabase || !user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const editorState = editor.getEditorState();
    const content = editorState.toJSON();

    const { data, error } = await supabase
      .from('scripts')
      .insert({
        user_id: user.id,
        title: 'My Script', // Placeholder title
        content: content,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving script:', error);
      alert(`저장에 실패했습니다: ${error.message}`);
    } else {
      console.log('Script saved:', data);
      alert('스크립트가 성공적으로 저장되었습니다!');
    }
  };

  return (
    <button
      onClick={handleSave}
      className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      저장
    </button>
  );
};

export default function ScriptEditor() {
  const [editorInstance, setEditorInstance] = useState(null);

  const insertNewScriptBlock = (content) => {
    if (!editorInstance) return;

    editorInstance.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const anchorNode = selection.anchor.getNode();
      const topLevelNode = anchorNode.getTopLevelElement();

      const containerNode = $createScriptContainerNode();
      const paragraphNode = $createParagraphNode();
      const textNode = $createTextNode(content);
      paragraphNode.append(textNode);
      containerNode.append(paragraphNode);

      if (topLevelNode && typeof topLevelNode.insertAfter === 'function') {
        if (topLevelNode.isEmpty() && topLevelNode.getType() === 'paragraph') {
          topLevelNode.replace(containerNode);
        } else {
          topLevelNode.insertAfter(containerNode);
        }
      } else {
        selection.insertNodes([containerNode]);
      }
      containerNode.selectEnd();
    });
  };

  return (
    <section className="w-full flex bg-[rgb(25,25,25)]">
      {/* 좌측 카드 리스트 */}
      <div className="w-1/4 bg-slate-900 p-4 space-y-4">
        <h2 className="text-lg font-semibold mb-2">예시 대본</h2>
        {sampleScripts.map((script) => (
          <button
            key={script.id}
            onClick={() => insertNewScriptBlock(script.content)}
            className="w-full text-left px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
          >
            <h4 className="text-lg font-bold text-white">
              {script.title}
            </h4>
            <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-lg">
              {script.props}
            </span>
            <p className="text-base text-gray-300">
              {script.content}
            </p>
          </button>
        ))}
      </div>

      <div className="flex-1 p-10 max-w-4xl mx-auto relative">
        <h1 className="text-3xl font-bold mb-6 text-white">Script Editor</h1>
        <Editor onReady={setEditorInstance} customChildren={<SaveButton />} />
      </div>
    </section>
  );
}
