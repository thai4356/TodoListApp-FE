import { ImageFormat, ImageWithStyle, modules } from 'components/TextEditor/configQuill';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import { useTranslation } from 'react-i18next';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type QuillProps = React.ComponentProps<typeof ReactQuill>;

Quill.register({
  'formats/image': ImageFormat,
  'modules/imageResize': ImageResize,
});
Quill.register(ImageWithStyle, true);

function ReactQuillCustom({ className, ...props }: QuillProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ReactQuill
      placeholder={t('content')}
      modules={modules}
      theme="snow"
      style={{ height: 300 }}
      className={`h-full ${className} mb-10`}
      {...props}
    />
  );
}

export default ReactQuillCustom;
