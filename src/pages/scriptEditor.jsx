// scriptEditor.jsx
import React from 'react';
import Editor from '../components/Editor';

export default function ScriptEditor() {
  return (
    <section className="w-full justify-center bg-[rgb(25,25,25)]">
      
      <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Script Editor</h1>
        <Editor />
      </div>
    </section>
  );
}