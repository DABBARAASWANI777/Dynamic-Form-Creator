import React from 'react';
import { MonacoEditor } from '@monaco-editor/react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

export default function Editor({ value, onChange, isValid }: EditorProps) {
  const handleEditorChange = (newValue: string | undefined) => {
    onChange(newValue || '');
  };

  return (
    <div className="editor">
      <h2>JSON Editor</h2>
      <MonacoEditor
        height="100%"
        defaultLanguage="json"
        value={value}
        onChange={handleEditorChange}
      />
      {!isValid && <p className="error-message">Invalid JSON schema</p>}
    </div>
  );
}
