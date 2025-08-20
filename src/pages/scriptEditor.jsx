// scriptEditor.jsx
import React from 'react';
import Editor from '../components/Editor';
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $createTextNode,
} from 'lexical';
import { useState } from 'react';
import { $createScriptContainerNode } from '../nodes/ScriptContainerNode';

import sampleScripts from '../data/sampleScript';

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
        // 최상위 노드가 비어있는 문단이면, 그 노드를 교체합니다.
        if (topLevelNode.isEmpty() && topLevelNode.getType() === 'paragraph') {
          topLevelNode.replace(containerNode);
        } else {
          // 그렇지 않으면, 현재 노드 뒤에 삽입합니다.
          topLevelNode.insertAfter(containerNode);
        }
      } else {
        // 비어있는 에디터 등의 예외 상황을 위한 폴백 로직입니다.
        selection.insertNodes([containerNode]);
      }
      // 더 나은 사용자 경험을 위해 새로 만든 노드의 끝으로 커서를 이동합니다.
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

      <div className="flex-1 p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Script Editor</h1>
        <Editor onReady={setEditorInstance} />
      </div>
    </section>
  );
}
