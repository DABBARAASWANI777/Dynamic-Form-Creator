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