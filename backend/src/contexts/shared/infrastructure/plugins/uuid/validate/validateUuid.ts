import { validate } from 'uuid';

// export type uuidValidate = (value: string) => boolean;

export const uuidValidate = (value: string): boolean => validate(value);
