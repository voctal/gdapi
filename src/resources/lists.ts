import { z } from "zod";

export const listMappings = {
    1: "id",
    2: "name",
    3: "description",
    5: "version",
    7: "difficulty",
    10: "downloads",
    14: "likes",
    19: "rated",
    28: "uploadedAt",
    29: "updatedAt",
    49: "accountId",
    50: "username",
    51: "levels",
    55: "reward",
    56: "rewardRequirement",
};

export enum ListDifficulty {
    NA = -1,
    Auto = 0,
    Easy = 1,
    Normal = 2,
    Hard = 3,
    Harder = 4,
    Insane = 5,
    EasyDemon = 6,
    MediumDemon = 7,
    HardDemon = 8,
    InsaneDemon = 9,
    ExtremeDemon = 10,
}

export const listSchema = z.object({
    /**
     * The id of the list
     */
    id: z.coerce.number().int(),
    /**
     * The name of the list
     */
    name: z.string(),
    /**
     * The list description
     */
    description: z.string().transform(val => Buffer.from(val, "base64").toString("utf-8")),
    /**
     * The version of the list published
     */
    version: z.coerce.number().int(),
    /**
     * The difficulty of this list
     *
     * @type {ListDifficulty}
     */
    difficulty: z.coerce.number().int(),
    /**
     * The amount of times the list has been downloaded
     */
    downloads: z.coerce.number().int(),
    /**
     * likes - dislikes
     */
    likes: z.coerce.number().int(),
    /**
     * If the list is rated or not
     */
    rated: z.coerce.boolean(),
    /**
     * The timestamp of when the list was uploaded
     */
    uploadedAt: z.coerce.number().int(),
    /**
     * The timestamp of when the list was last updated
     */
    updatedAt: z.coerce.number().int(),
    /**
     * The account ID of the list author
     */
    accountId: z.coerce.number().int(),
    /**
     * The username of the list author
     */
    username: z.string(),
    /**
     * All level IDs in the list
     */
    levels: z
        .string()
        .transform(val => val.split(","))
        .pipe(z.array(z.coerce.number<string>().int())),
    /**
     * The amount of diamonds awarded upon beating the required amount of levels in the list
     */
    reward: z.coerce.number().int(),
    /**
     * The amount of levels needed to claim the list reward
     */
    rewardRequirement: z.coerce.number().int(),
});

export type List = z.infer<typeof listSchema>;
