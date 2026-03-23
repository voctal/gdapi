import { z } from "zod";

/**
 * Threw when the GD response data could not be parsed
 */
export class ParseError extends Error {}

/**
 * Parse a GD object in the format `key:value:key:value`
 */
export const parseRawObject = (data: string): [string, string][] => {
    const elements = data.split(":");
    if (elements.length % 2 !== 0)
        throw new ParseError(`Invalid GD object, got ${elements.length} elements. [${data}]`);

    const props: [string, string][] = [];

    for (let i = 0; i < elements.length; i += 2) {
        const key = elements[i];
        const value = elements[i + 1];

        props.push([key, value]);
    }

    return props;
};

/**
 * Parse and validate a GD object in the format `key:value:key:value`
 */
export const parseObject = <T extends z.ZodObject>(
    data: string,
    mappings: Record<number, string>,
    schema: T,
): z.infer<T> => {
    const entries = parseRawObject(data);
    const object: Record<string, string> = {};

    for (const [key, value] of entries) {
        if (!(key in mappings)) continue;
        object[mappings[+key]] = value;
    }

    return schema.parse(object);
};

/**
 * Parse and validate a GD tuple list in the format `value:value:value|value:value:value`
 */
export const parseTupleList = <T extends z.ZodTuple>(list: string, schema: T): z.infer<T>[] => {
    const rawTuples = list.split("|");
    const tuples: z.infer<T>[] = [];

    for (const rawTuple of rawTuples) {
        const tuple = parseTuple(rawTuple, schema);
        tuples.push(tuple);
    }

    return tuples;
};

/**
 * Parse and validate a GD object list in the format `<object>|<object>`
 */
export const parseObjectList = <T extends z.ZodObject>(
    list: string,
    mappings: Record<number, string>,
    schema: T,
): z.infer<T>[] => {
    const rawObjects = list.split("|");
    const objects = [];

    for (const rawObject of rawObjects) {
        const object = parseObject(rawObject, mappings, schema);
        objects.push(object);
    }

    return objects;
};

/**
 * Parse and validate a GD tuple in the format `value:value:value`
 */
export const parseTuple = <T extends z.ZodTuple>(data: string, schema: T): z.infer<T> => {
    const rawTuple = data.split(":");
    return schema.parse(rawTuple);
};

/**
 * Parse a GD groups in the format `data#data#data`
 * @param count - The expected group count
 */
export const parseGroups = (data: string, count: number): string[] => {
    const groups = data.split("#");

    if (groups.length !== count) {
        throw new ParseError(`Invalid group count, expected ${count} but got ${groups.length}`);
    }

    return groups;
};

/**
 * Parse a GD song in the format `key~|~value~|~key~|~value`
 */
export const parseRawSong = (data: string): [string, string][] => {
    const elements = `~${data}~`.split("|");
    if (elements.length % 2 !== 0)
        throw new ParseError(`Invalid GD object, got ${elements.length} elements. [${data}]`);

    const props: [string, string][] = [];

    for (let i = 0; i < elements.length; i += 2) {
        const key = elements[i].slice(1, -1);
        const value = elements[i + 1].slice(1, -1);

        props.push([key, value]);
    }

    return props;
};

/**
 * Parse and validate a GD song in the format `key~|~value~|~key~|~value`
 */
export const parseSong = <T extends z.ZodObject>(
    data: string,
    mappings: Record<number, string>,
    schema: T,
): z.infer<T> => {
    const entries = parseRawSong(data);
    const object: Record<string, string> = {};

    for (const [key, value] of entries) {
        if (!(key in mappings)) continue;
        object[mappings[+key]] = value;
    }

    return schema.parse(object);
};

/**
 * Parse and validate a GD song list in the format `<song>:<song>`
 */
export const parseSongList = <T extends z.ZodObject>(
    list: string,
    mappings: Record<number, string>,
    schema: T,
): z.infer<T>[] => {
    const rawSongs = list.split(":");
    const songs = [];

    for (const rawSong of rawSongs) {
        const song = parseSong(rawSong, mappings, schema);
        songs.push(song);
    }

    return songs;
};
