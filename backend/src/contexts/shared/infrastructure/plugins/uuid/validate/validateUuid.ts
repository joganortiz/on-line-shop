import { validate } from 'uuid';

export type uuidValidate = (value: string) => boolean;

export const uuidValidate: uuidValidate = (value: string) => validate(value);