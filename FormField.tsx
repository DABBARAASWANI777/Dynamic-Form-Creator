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