import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const CodeCompiler = () => {
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [theme, setTheme] = useState('vs-light');
  const [fontSize, setFontSize] = useState(14);
  const [code, setCode] = useState('// Write your code here');
  
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  const languages = [
    'javascript',
    'python',
    'java',
    'cpp',
    'typescript'
  ];

  useEffect(() => {
    // Load Monaco Editor from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.js';
    script.async = true;
    
    script.onload = () => {
      window.require.config({
        paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }
      });

      window.require(['vs/editor/editor.main'], () => {
        if (!containerRef.current) return;

        // Initialize the editor
        editorRef.current = window.monaco.editor.create(containerRef.current, {
          value: code,
          language,
          theme,
          fontSize: fontSize,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true
        });

        // Set up change event handler
        editorRef.current.onDidChangeModelContent(() => {
          setCode(editorRef.current.getValue());
        });
      });
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Update editor language when language prop changes
  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        window.monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  // Update editor theme when theme changes
  useEffect(() => {
    if (editorRef.current) {
      window.monaco.editor.setTheme(theme);
    }
  }, [theme]);

  const handleRun = () => {
    // This is a mock implementation
    // In a real app, you'd send the code to a backend service
    setOutput(`Running ${language} code...\nCode:\n${code}\nCustom input: ${customInput}`);
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.setValue('');
    }
    setOutput('');
    setCustomInput('');
  };

  const toggleTheme = () => {
    setTheme(theme === 'vs-light' ? 'vs-dark' : 'vs-light');
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Code Compiler</h1>

      {/* Language Selector */}
      <div className="relative w-48 mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 bg-gray-100 rounded appearance-none cursor-pointer"
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-3 w-4 h-4" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4">
        {/* Editor Section */}
        <div className="col-span-2 space-y-4">
          {/* Code Editor */}
          <div className="border rounded">
            <div className="bg-gray-100 p-2 border-b">Code Editor</div>
            <div 
              ref={containerRef} 
              className="h-96"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleRun}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Run
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Clear
            </button>
          </div>

          {/* Custom Input */}
          <div className="border rounded">
            <div className="bg-gray-100 p-2 border-b">Custom Input</div>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-full h-32 p-2 resize-none"
              placeholder="Enter your input here..."
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Output */}
          <div className="border rounded">
            <div className="bg-gray-100 p-2 border-b">Output</div>
            <div className="h-96 p-2 font-mono whitespace-pre-wrap">
              {output}
            </div>
          </div>

          {/* Settings */}
          <div className="border rounded">
            <div className="bg-gray-100 p-2 border-b">Settings</div>
            <div className="p-4 space-y-4">
              {/* Theme Toggle */}
              <div className="flex justify-between items-center">
                <span>Theme:</span>
                <button
                  onClick={toggleTheme}
                  className="text-blue-600 hover:underline"
                >
                  {theme === 'vs-light' ? 'Light/Dark' : 'Dark/Light'}
                </button>
              </div>

              {/* Font Size */}
              <div className="flex justify-between items-center">
                <span>Font Size:</span>
                <span>{fontSize}px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCompiler;