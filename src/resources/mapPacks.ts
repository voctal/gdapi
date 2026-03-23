import { z } from "zod";

export const mapPacksMappings = {
    1: "id",
    2: "name",
    3: "levels",
    4: "stars",
    5: "coins",
    6: "difficulty",
    7: "textColor",
    8: "barColor",
};

export enum MapPackDifficulty {
    Auto = 0,
    Easy = 1,
    Normal = 2,
    Hard = 3,
    Harder = 4,
    Insane = 5,
    HardDemon = 6,
    EasyDemon = 7,
    MediumDemon = 8,
    InsaneDemon = 9,
    ExtremeDemon = 10,
}

export const mapPacksSchema = z.object({
    /**
     * The Map Pack ID
     */
    id: z.coerce.number().int(),
    /**
     * The Map Pack name
     */
    name: z.string(),
    /**
     * The level IDs
     */
    levels: z
        .string()
        .transform(val => val.split(","))
        .pipe(z.array(z.coerce.number<string>().int())),
    /**
     * Stars given when completed
     */
    stars: z.coerce.number().int(),
    /**
     * Coins given when completed
     */
    coins: z.coerce.number().int(),
    /**
     * The Map Pack difficulty
     *
     * @type {MapPackDifficulty}
     */
    difficulty: z.coerce.number().int(),
    /**
     * The RGB color of the title text
     */
    textColor: z
        .string()
        .transform(val => val.split(","))
        .pipe(z.array(z.coerce.number<string>().int()).length(3)),
    /**
     * The RGB color of the completion bar
     */
    barColor: z
        .string()
        .transform(val => val.split(","))
        .pipe(z.array(z.coerce.number<string>().int()).length(3)),
});

export type MapPack = z.infer<typeof mapPacksSchema>;
