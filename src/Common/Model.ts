import {nanoid} from "nanoid";

type FilterFlags<Base, Condition> = {
    [Key in keyof Base]:
    Base[Key] extends Condition ? Key : never
};

type AllowedNames<Base, Condition> =
    FilterFlags<Base, Condition>[keyof Base];

export type SubType<Base, Condition> =
    Pick<Base, AllowedNames<Base, Condition>>;

export interface Model {
    id: string;
    name: string;
}

// https://github.com/ai/nanoid
export const newModelId = () => nanoid();
