
import EditorArea from '../components/EditorArea';
import OutputArea from '../components/OutputArea';
import { useState } from 'react';
import './Code.css';
import { LANGUAGE_VERSION ,LANGUAGE_SNIPPETS} from '../constans';
import { runCode } from '../api';
function CodeEditor() {
  const [lang, setLang] = useState('javascript');
  const languages=Object.entries(LANGUAGE_VERSION);
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  const [iserror,setIsError]=useState(false);
  const [theme, setTheme] = useState("vs-light");
  // console.log(data);
 
  const excute = async()=>{
    try{
      const {run:response} = await runCode(lang,data,input);
      if(response.code ===1)  setIsError(true);
      else setIsError(false);
      setResult(response.output.split("\n") || response.error || "No output");
    }
    catch(e){
      setIsError(true);
      console.log(e);
      setResult("Something went wrong");
    }
  }
  return (
    <div className={`editor_container ${theme}`}>
    <div className='editor_top'>
      <div className='editor_header'>
        <h1>Code Compiler</h1>
      </div>
      <label>
          <p>Select your language:</p>
          <select onChange={(e)=>setLang(e.target.value)} value={lang}>
            {languages.map(([key,value])=>(
              <option key={key} value={key}>{key+" "+value}</option>
            ))}
            {/* <option value="javascript" >javascript</option>
            <option value="python">python</option>
            <option value="java">java</option>
            <option value="c">C</option>
            <option value="c++">C++</option> */}
          </select>
      </label>
    </div>
      <div className='editor_main'>
           <EditorArea language={lang} def={LANGUAGE_SNIPPETS[lang]}  senData={(e)=>setData(e)} theme={theme}/>
           <OutputArea rs={result} err={iserror}/>
      </div>
      <div className='editor_footer'>
          <div className='editor_footer_left'>
              <div className='editor_footer_left_buttons'>
                 <button className='editor_run_button' onClick={excute}>Run</button>
                 <button className='editor_clear_button'>clear</button>
              </div>
              <div className='editor_footer_left_input'>
                <input type="text" placeholder="Enter input here" value={input} onChange={(e)=>setInput(e.target.value)}/>
              </div>
          </div>
          <div className='editor_footer_right'>
              <h2>Select theme</h2>
              <select onClick={(e)=>setTheme(e.target.value)} >
                <option value="vs-light">Light</option>
                <option value="vs-dark">Dark</option>
              </select>
          </div>
      </div>
    </div>

  )
}

export default CodeEditor;
