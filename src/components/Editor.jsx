import { useBlockNote } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/react";
import "@blocknote/core/style.css";

// Our <Editor> component we can reuse across our app
export default function Editor() {
  // Creates a new editor instance.
  const editor = useBlockNote();

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />;
}
