import Editor from '@monaco-editor/react';
import { useState,useRef ,useEffect} from 'react';
function EditorArea({language,def,senData,theme}) {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  function onMount(editor){
    editorRef.current = editor;
    editor.focus();
  }

  useEffect(()=>{
    setValue(def);
  },[def,language]);

  useEffect(()=>{
     senData(value);
  },[value]);

  return (
  <>
    <Editor
      height="70vh"
      language={language}
      width="70%"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      onMount={onMount}
      theme={theme}
    />
  </>
  );

}

export default EditorArea;