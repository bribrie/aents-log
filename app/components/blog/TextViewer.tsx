import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

interface ViewrProps {
  content: string;
}

const TextViewer = ({ content }: ViewrProps) => {
  return <Viewer initialValue={content} />;
};

export default TextViewer;
