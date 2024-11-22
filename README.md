# Dynamic-Form-Creator

Here is the complete implementation for the *Dynamic Form Generator Challenge* with file breakdowns and details.  

---

### *1. Folder and File Structure*

src/
|-- components/
|   |-- Editor.tsx
|   |-- FormPreview.tsx
|   |-- FormField.tsx
|-- hooks/
|   |-- useDebouncedEffect.ts
|-- utils/
|   |-- validateSchema.ts
|-- tests/
|   |-- e2e/
|   |   |-- form.test.ts
|   |-- unit/
|       |-- formValidation.test.ts
|-- App.tsx
|-- index.tsx
|-- styles.css


---

### *2. Full Code*

#### *index.tsx*
tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


---

#### *App.tsx*
tsx
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


---

#### *components/Editor.tsx*
tsx
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


---

#### *components/FormPreview.tsx*
tsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormField from './FormField';

interface FormPreviewProps {
  schema: string;
}

export default function FormPreview({ schema }: FormPreviewProps) {
  const formMethods = useForm();
  let formSchema;

  try {
    formSchema = JSON.parse(schema);
  } catch (error) {
    return <p>Invalid JSON</p>;
  }

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="form-preview">
      <h2>{formSchema.formTitle}</h2>
      <p>{formSchema.formDescription}</p>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          {formSchema.fields.map((field: any) => (
            <FormField key={field.id} field={field} />
          ))}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
}


---

#### *components/FormField.tsx*
tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  field: any;
}

export default function FormField({ field }: FormFieldProps) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-field">
      <label>{field.label}</label>
      {field.type === 'text' && (
        <input {...register(field.id, { required: field.required })} placeholder={field.placeholder} />
      )}
      {field.type === 'email' && (
        <input type="email" {...register(field.id, { required: field.required })} placeholder={field.placeholder} />
      )}
      {field.type === 'select' && (
        <select {...register(field.id, { required: field.required })}>
          {field.options.map((option: any) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      )}
      {errors[field.id] && <p className="error-message">{errors[field.id].message}</p>}
    </div>
  );
}


---

#### *utils/validateSchema.ts*
tsx
export function validateSchema(schema: string): { isValid: boolean; errors?: string[] } {
  try {
    JSON.parse(schema);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, errors: ['Invalid JSON'] };
  }
}


---

#### *hooks/useDebouncedEffect.ts*
tsx
import { useEffect } from 'react';

export default function useDebouncedEffect(callback: () => void, delay: number, dependencies: any[]) {
  useEffect(() => {
    const handler = setTimeout(callback, delay);
    return () => clearTimeout(handler);
  }, [...dependencies, delay]);
}


---

#### *styles.css*
css
.app-container {
  display: flex;
  height: 100vh;
}

.editor-container, .preview-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.editor {
  border-right: 1px solid #ccc;
}

.form-preview {
  padding: 10px;
}

.error-message {
  color: red;
  font-size: 12px;
}

.submit-button {
  background-color: blue;
  color: white;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}
