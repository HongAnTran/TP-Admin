import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
  ClassicEditor, Bold, Essentials, Italic, Mention,
  Paragraph, Undo, Alignment, Font, Table, Heading, Clipboard,

  ImageInsert,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  LinkImage,
  ImageUpload
} from 'ckeditor5';

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
      ImageResize, ImageCaption, ImageStyle, ImageToolbar , ImageUpload],
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
    image: {
      toolbar: [
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'linkImage'
      ],
      insert: {
        // If this setting is omitted, the editor defaults to 'block'.
        // See explanation below.
        type: 'auto'
      }
    }
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
