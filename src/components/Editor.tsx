
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapterPlugin } from '../api/Adapter';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import "./Editor.css"
function Editor({ value, onChange }: { value: string, onChange: (data: string) => void }) {
  const editorConfiguration: EditorConfig = {

    extraPlugins: [UploadAdapterPlugin],
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
      'alignment', '|',
      'imageUpload', 'mediaEmbed', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
      'undo', 'redo'
    ],
    image: {
      toolbar: [
        'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
      ]
    },



  };

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    onChange(data);
  };

  return (


    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={value}
      onReady={editor => {
        console.log('Editor is ready to use!', editor);
      }}
      onChange={handleEditorChange}

    />

  );
}
export default Editor;
