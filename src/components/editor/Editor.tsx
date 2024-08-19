import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
  ClassicEditor, Bold, Essentials, Italic, Mention,
  Paragraph, Undo, Alignment, Font, Table, Heading, Image, Clipboard,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  LinkImage,
  ImageCustomResizeUI
} from 'ckeditor5';

// import { UploadAdapterPlugin } from '../api/Adapter';

import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import 'ckeditor5/ckeditor5.css';

import "./Editor.css"
import { UploadAdapterPlugin } from '@/api/Adapter';

function Editor({ value, onChange }: { value: string, onChange: (data: string) => void }) {
  const editorConfiguration: EditorConfig = {
    plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo, Alignment, Font, Table, Heading, Image, Clipboard, ImageToolbar, ImageCaption, ImageStyle, ImageResize, LinkImage, ImageCustomResizeUI],
    // extraPlugins: [UploadAdapterPlugin],
    toolbar: {
      items: [
        'heading', '|',
        'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
        'alignment', '|',
        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
        'insertImage', 'mediaEmbed', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
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
        type: 'auto'
      }
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
      onChange={handleEditorChange}
    />

  );
}
export default Editor;
