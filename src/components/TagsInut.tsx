import "./tag-input.less";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash";
interface TodoInputProps {
  placeholder?: string;
  value?: any;
  isNotDuplicate?: boolean;
  layout?: string;
  maxLength?: number;
  disabled?: boolean;
  onChange?: Function;
}
export const TodoInput = (props: TodoInputProps) => {
  const [tagsValue, setTagsValue] = useState<any>([]);
  const [text, setText] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!tagsValue?.length) {
      setTagsValue(props.value);
    }
  }, [tagsValue, props]);

  const removeTag = (index: number) => {
    const tags = tagsValue.filter((_, i: number) => i !== index);
    setTagsValue(tags);
    props.onChange && props.onChange(tags);

    (inputEl.current as HTMLInputElement).focus();
  };

  const handleKeyEvent = (event: any) => {
    console.log("handleKeyEvent : ", event);
    const { keyCode } = event;

    if ([13, 9].includes(keyCode)) {
      addTag(text);
    }

    if (keyCode === 8 && !text) {
      removeTag(tagsValue?.length - 1);
    }
  };

  const addTag = (val: any, focus = true) => {
    const isExist = tagsValue?.some((e: any) => e === val.trim());

    if (
      (!props.isNotDuplicate || (props.isNotDuplicate && !isExist)) &&
      !isEmpty(val.trim())
    ) {
      tagsValue?.push(val);
    }

    setTagsValue(tagsValue);
    props.onChange && props.onChange(tagsValue);

    setText("");
    focus && (inputEl.current as HTMLInputElement).focus();
  };

  return (
    <div>
      <div className="tag-input">
        {tagsValue?.length > 0 &&
          tagsValue.map((tag: any, index: number) => (
            <div className="tag-input__tag" key={index}>
              <span className="tag-input__tag-content">{tag}</span>
              <CloseOutlined
                className="tag-input__tag-remove"
                onClick={() => removeTag(index)}
              />
            </div>
          ))}
        <input
          ref={inputEl}
          className="tag-input__text"
          maxLength={props.maxLength}
          placeholder={tagsValue?.length > 0 ? "" : props.placeholder}
          disabled={props.disabled}
          value={text}
          onBlur={(event) => addTag(event.target.value, false)}
          onKeyUp={(event) => handleKeyEvent(event)}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TodoInput;
