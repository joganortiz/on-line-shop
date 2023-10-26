import { v4 as uuidv4 } from 'uuid';

export type uuidGenerate = () =>Promise<string>;

export const uuidGenerate: uuidGenerate = async () => await uuidv4();