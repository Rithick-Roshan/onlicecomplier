import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import EditorArea from '../components/EditorArea';
import OutputArea from '../components/OutputArea';
import { LANGUAGE_VERSION, LANGUAGE_SNIPPETS } from '../constans';
import { runCode } from '../api';
import './Code.css';

function CodeEditor() {
    const [lang, setLang] = useState('javascript');
    const [input, setInput] = useState("");
    const [data, setData] = useState("");
    const [result, setResult] = useState("");
    const [isError, setIsError] = useState(false);
    const [theme, setTheme] = useState("vs-light");
    const [title, setTitle] = useState("");
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const languages = Object.entries(LANGUAGE_VERSION);

    const loadedSavedCode = useRef(false);

    useEffect(() => {
        if (location.state?.savedCode) {
            const savedCode = location.state.savedCode;
            console.log('Received saved code:', savedCode);

            const code = savedCode.code || savedCode.Code || savedCode.CODE || "";
            const language = savedCode.language || savedCode.Language || savedCode.LANGUAGE || 'javascript';
            const codeTitle = savedCode.title || savedCode.Title || savedCode.TITLE || "";

            setData(code || LANGUAGE_SNIPPETS[language] || "");
            setLang(language);
            setTitle(codeTitle);
            loadedSavedCode.current = true;
        } else {
            setData(LANGUAGE_SNIPPETS[lang] || "");
        }
    }, [location.state?.savedCode]);

    useEffect(() => {
        if (!loadedSavedCode.current) {
            setData(LANGUAGE_SNIPPETS[lang] || "");
        }
    }, [lang]);

    const handleSave = async () => {
        if (!title.trim()) {
            alert("Please enter a title for your code");
            return;
        }

        try {
            setSaving(true);
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            await axios.post('http://localhost:5000/save-code',
                { title: title.trim(), code: data, language: lang },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Code saved successfully!");
        } catch (error) {
            alert("Failed to save code");
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const execute = async () => {
        try {
            const response = await runCode(lang, data, input);
            if (response.run.code === 1) {
                setIsError(true);
            } else {
                setIsError(false);
            }
            setResult(response.run.output.split("\n") || response.run.error || "No output");
        } catch (e) {
            setIsError(true);
            console.error(e);
            setResult("Something went wrong");
        }
    };

    return (
        <div className={`editor_container ${theme}`}>
            <div className='editor_top'>
                <div className='editor_header'>
                    <h1>Code Compiler</h1>
                    <button
                        className='back-button'
                        onClick={() => navigate('/profile')}
                        style={{ marginLeft: 'auto', padding: '8px 16px' }}
                    >
                        Back to Profile
                    </button>
                </div>
                <label>
                    <p>Select your language:</p>
                    <select onChange={(e) => setLang(e.target.value)} value={lang}>
                        {languages.map(([key, value]) => (
                            <option key={key} value={key}>{`${key} ${value}`}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div className='editor_main'>
                <EditorArea
                    language={lang}
                    def={data || LANGUAGE_SNIPPETS[lang]}
                    senData={setData}
                    theme={theme}
                />
                <OutputArea rs={result} err={isError} />
            </div>
            <div className='editor_footer'>
                <div className='editor_footer_left'>
                    <div className='editor_footer_left_buttons'>
                        <button className='editor_run_button' onClick={execute}>Run</button>
                        <button className='editor_clear_button' onClick={() => setResult("")}>Clear</button>
                        <button
                            className='editor_save_button'
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                        <input
                            type="text"
                            placeholder="Enter title to save"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="title-input"
                        />
                    </div>
                </div>
                <div className='editor_footer_right'>
                    <h2>Select theme</h2>
                    <select onChange={(e) => setTheme(e.target.value)} value={theme}>
                        <option value="vs-light">Light</option>
                        <option value="vs-dark">Dark</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;
