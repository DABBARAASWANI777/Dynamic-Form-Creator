export function validateSchema(schema: string): { isValid: boolean; errors?: string[] } {
  try {
    JSON.parse(schema);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, errors: ['Invalid JSON'] };
  }
}