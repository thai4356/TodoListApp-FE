import { default as DeltaStatic } from 'quill';
import { useCallback } from 'react';
import { UnprivilegedEditor } from 'react-quill';
import ReactQuillCustom, { QuillProps } from './ReactQuillCustom';

type OnChangeFunc = (value: string, delta: DeltaStatic, source: string, editor: UnprivilegedEditor) => void;

/**
 * Override default onChange behaviour, to only fire once user changes.
 * Reference: https://github.com/zenoamaro/react-quill/issues/259#issuecomment-343191875
 * @param props
 * @constructor
 */
interface ITextEditorProps extends QuillProps {
  defaultBehaviour?: boolean;
  bodyHeight?: number;
  hiddenToolbar?: boolean;
  hiddenBorder?: boolean;
}

function TextEditor({ defaultBehaviour = false, ...restProps }: ITextEditorProps): JSX.Element {
  const handleOnChange = useCallback<OnChangeFunc>((value, delta, source, editor) => {
    if (defaultBehaviour) {
      restProps.onChange?.(value, delta, source, editor);
      return;
    }
    // Reference here
    if (source === 'user') {
      restProps.onChange?.(value, delta, source, editor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactQuillCustom
      {...restProps}
      onChange={handleOnChange}
      className={`${restProps?.className} text-editor-global`}
    />
  );
}

export default TextEditor;
