import Editor from "../components/Editor";

export default function ScriptEditor() {
  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-bold text-center my-8 text-gray-200">My Notion-like Editor</h1>
      <div className="max-w-4xl mx-auto">
        <Editor />
      </div>
    </div>
  );
}
