import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
  ClassicEditor, Bold, Essentials, Italic, Mention,
  Paragraph, Undo, Alignment, Font, Table, Heading, Image, Clipboard,
  LinkImage,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageInsert
} from 'ckeditor5';

// import { UploadAdapterPlugin } from '../api/Adapter';

import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import 'ckeditor5/ckeditor5.css';

import "./Editor.css"
import { UploadAdapterPlugin } from '@/api/Adapter';

function Editor({ value, onChange }: { value: string, onChange: (data: string) => void }) {
  const editorConfiguration: EditorConfig = {
    plugins: [Bold, Essentials, Italic, Mention, Paragraph,
      Undo, Alignment, Font, Table, Heading,
      Image, Clipboard, LinkImage,
      ImageInsert,
      ImageCaption, ImageResize, ImageCaption, ImageStyle, ImageToolbar,],
    extraPlugins: [UploadAdapterPlugin],
    toolbar: {
      items: [
        'heading', '|',
        'bold', 'italic', 'link', '|',
        'alignment', '|',
        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
        'insertImage', 'insertTable', '|',
        'undo', 'redo'
      ]
    },
    // image: {
    //   insert: {
    //     integrations: ['upload', 'assetManager', 'url']
    //   }
    // }
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
      onChange={handleEditorChange}
    />

  );
}
export default Editor;
