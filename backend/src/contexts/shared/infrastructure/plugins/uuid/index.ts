import { uuidGenerate } from "./generate";
import { uuidValidate } from "./validate/validateUuid";

export interface uuid {
    validate: uuidValidate;
    generate: uuidGenerate
}

export const uuid = {
    validate: uuidValidate,
    generate: uuidGenerate
}