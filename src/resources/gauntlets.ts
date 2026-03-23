import { z } from "zod";

export const gauntletMappings = {
    1: "id",
    3: "levels",
};

export enum GauntletName {
    Fire = 1,
    Ice = 2,
    Poison = 3,
    Shadow = 4,
    Lava = 5,
    Bonus = 6,
    Chaos = 7,
    Demon = 8,
    Time = 9,
    Crystal = 10,
    Magic = 11,
    Spike = 12,
    Monster = 13,
    Doom = 14,
    Death = 15,
    Forest = 16,
    Force = 18,
    Water = 21,
    Haunted = 22,
    Halloween = 29,
    Inferno = 33,
    Portal = 34,
    Strange = 35,
    Fantasy = 36,
    Christmas = 37,
    Mystery = 39,
    Cursed = 40,
    Cyborg = 41,
    Castle = 42,
    World = 46,
    Galaxy = 47,
    Universe = 48,
    Discord = 49,
    Split = 50,
    NCSI = 51,
    NCSII = 52,
}

export const gauntletSchema = z.object({
    /**
     * The gauntlet ID
     */
    id: z.coerce.number().int(),
    /**
     * The level IDs
     */
    levels: z
        .string()
        .transform(val => val.split(","))
        .pipe(z.array(z.coerce.number<string>().int())),
});

export type Gauntlet = z.infer<typeof gauntletSchema>;
