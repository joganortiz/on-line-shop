import { v4 as uuidv4 } from 'uuid';

// export type uuidGenerate = () => Promise<string>;

export const uuidGenerate = async (): Promise<string> => uuidv4();
