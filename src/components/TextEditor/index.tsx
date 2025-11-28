import Delta from "quill-delta";
import { useCallback } from "react";
import { UnprivilegedEditor } from "react-quill";
import ReactQuillCustom, { QuillProps } from "./ReactQuillCustom";

type OnChangeFunc = (
  value: string,
  delta: Delta,
  source: string,
  editor: UnprivilegedEditor
) => void;

interface ITextEditorProps extends QuillProps {
  defaultBehaviour?: boolean;
  bodyHeight?: number;
  hiddenToolbar?: boolean;
  hiddenBorder?: boolean;
}

function TextEditor({
  defaultBehaviour = false,
  ...restProps
}: ITextEditorProps): JSX.Element {
  const handleOnChange = useCallback<OnChangeFunc>(
    (value, delta, source, editor) => {
      if (defaultBehaviour) {
        restProps.onChange?.(value, delta, source, editor);
        return;
      }

      if (source === "user") {
        restProps.onChange?.(value, delta, source, editor);
      }
    },
    [defaultBehaviour, restProps]
  );

  return (
    <ReactQuillCustom
      {...restProps}
      onChange={handleOnChange}
      className={`${restProps?.className} text-editor-global`}
    />
  );
}

export default TextEditor;
