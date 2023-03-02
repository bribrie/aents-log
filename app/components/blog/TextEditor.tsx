import '@toast-ui/editor/dist/toastui-editor.css';
import Box from '@mui/material/Box';
import { Editor } from '@toast-ui/react-editor';
import { uploadImage } from '@/_lib/post';

export interface EditorProps {
  height?: string;
  placeholder?: string;
  handleUrl?: (imageUrl: string) => void;
}

const TextEditor = (props: any) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  const addImage = async (blob: Blob, dropImage: any) => {
    //storage에 업로드된 이미지 서버 url
    const url = await uploadImage(blob);
    props.handleUrl(url);
    dropImage(url, 'alt_text'); //에디터에 이미지 추가
  };

  return (
    <Box>
      <Editor
        ref={props.forwardedRef}
        placeholder={props.placeholder || '내용을 작성해주세요.'}
        initialEditType='wysiwyg'
        initialValue='내용을 입력해주세요.'
        height={props.height || '500px'}
        previewStyle='vertical'
        toolbarItems={toolbarItems}
        hooks={{
          addImageBlobHook: addImage,
        }}
      />
    </Box>
  );
};

export default TextEditor;
