import React, { useState } from 'react';
import { validateSchema } from './utils/validateSchema';
import Editor from './components/Editor';
import FormPreview from './components/FormPreview';

const initialSchema = `{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    { "id": "name", "type": "text", "label": "Full Name", "required": true, "placeholder": "Enter your full name" },
    { "id": "email", "type": "email", "label": "Email Address", "required": true, "placeholder": "you@example.com" },
    { "id": "companySize", "type": "select", "label": "Company Size", "required": true, "options": [
      { "value": "1-50", "label": "1-50 employees" },
      { "value": "51-200", "label": "51-200 employees" }
    ]}
  ]
}`;

export default function App() {
  const [schema, setSchema] = useState(initialSchema);
  const [isValid, setIsValid] = useState(true);

  const handleSchemaChange = (newSchema: string) => {
    setSchema(newSchema);
    const validation = validateSchema(newSchema);
    setIsValid(validation.isValid);
  };

  return (
    <div className="app-container">
      <div className="editor-container">
        <Editor value={schema} onChange={handleSchemaChange} isValid={isValid} />
      </div>
      <div className="preview-container">
        <FormPreview schema={schema} />
      </div>
    </div>
  );
}
