import { ErrorMessage } from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'required',
    format: requiredFormat,
  },
];

export function requiredFormat(label: string, error: any): string {
  return `${label} é obrigatório!`;
}
