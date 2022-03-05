import React from "react";
const { CKEditor } = require("@ckeditor/ckeditor5-react");
const Editor = require("@ckeditor/ckeditor5-build-inline");
type Props = {
  text: string;
  onChange: Function;
};

export default function InlineEditor({ text, onChange }: Props) {
  return (
    <div className="editor border border-slate-300">
      <CKEditor editor={Editor} data={text} onChange={onChange} />
    </div>
  );
}
