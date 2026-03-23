import { z } from "zod";

export const userMappings = {
    1: "username",
    2: "id",
    3: "stars",
    4: "totalDemons",
    6: "ranking",
    7: "accountHighlight",
    8: "creatorPoints",
    9: "iconId",
    10: "primaryColor",
    11: "secondaryColor",
    13: "secretCoins",
    14: "iconType",
    15: "special",
    16: "accountId",
    17: "userCoins",
    18: "messageState",
    19: "friendsState",
    20: "youtube",
    21: "accIcon",
    22: "accShip",
    23: "accBall",
    24: "accBird",
    25: "accDart",
    26: "accRobot",
    28: "accGlow",
    29: "isRegistered",
    30: "globalRank",
    42: "age",
    43: "accSpider",
    44: "twitter",
    45: "twitch",
    46: "diamonds",
    48: "accExplosion",
    49: "moderatorLevel",
    50: "commentHistoryState",
    51: "glowColor",
    52: "moons",
    53: "accSwing",
    54: "accJetpack",
    55: "demons",
    56: "classicLevels",
    57: "platformerLevels",
};

export enum UserMessageState {
    All = 0,
    FriendsOnly = 1,
    None = 2,
}

export enum UserFriendsState {
    All = 0,
    None = 1,
}

export enum UserCommentHistoryState {
    All = 0,
    FriendsOnly = 1,
    None = 2,
}

export enum UserModeratorLevel {
    None = 0,
    Moderator = 1,
    ElderModerator = 2,
}

export const userSchema = z.object({
    /**
     * The name of player
     */
    username: z.string(),
    /**
     * The ID of player
     */
    id: z.coerce.number().int(),
    /**
     * The count of stars player have
     */
    stars: z.coerce.number().int(),
    /**
     * The count of diamonds player have
     */
    diamonds: z.coerce.number().int().optional(),
    /**
     * The amount of moons the player have
     */
    moons: z.coerce.number().int(),
    /**
     * The count of coins the player have
     */
    secretCoins: z.coerce.number().int(),
    /**
     * The count of usercoins player have
     */
    userCoins: z.coerce.number().int(),
    /**
     * First color of the player
     */
    primaryColor: z.coerce.number().int(),
    /**
     * Second color of the player
     */
    secondaryColor: z.coerce.number().int(),
    /**
     * Glow color of the player
     */
    glowColor: z.coerce.number().int().optional(),
    /**
     * The special number of the player
     */
    special: z.coerce.number().int().optional(),
    /**
     * The account ID of the player
     */
    accountId: z.coerce.number().int(),
    /**
     * @type {UserMessageState}
     */
    messageState: z.coerce.number().int().optional(),
    /**
     * @type {UserFriendsState}
     */
    friendsState: z.coerce.number().int().optional(),
    /**
     * The time since the last levelScore submit
     */
    age: z.string().optional(),
    /**
     * @type {UserModeratorLevel}
     */
    moderatorLevel: z.coerce.number().int().optional(),
    /**
     * @type {UserCommentHistoryState}
     */
    commentHistoryState: z.coerce.number().int().optional(),
    /**
     * If an account is registered or not
     */
    isRegistered: z.coerce.boolean().optional(),
    /**
     * The global rank of this player
     */
    globalRank: z.coerce.number().int().optional(),
    /**
     * The global leaderboard position of the player
     */
    ranking: z.coerce.number().int().optional(),
    /**
     * The count of creatorpoints player have
     */
    creatorPoints: z.coerce.number().int(),
    /**
     * The count of demons player have
     */
    totalDemons: z.coerce.number().int(),
    /**
     * Breakdown of the player's demons, in the format
     * `{easy},{medium},{hard},{insane},{extreme},{easyPlatformer},{mediumPlatformer},{hardPlatformer},{insanePlatformer},{extremePlatformer},{weekly},{gauntlet}`
     */
    demons: z
        .string()
        .transform(val => val.split(","))
        .pipe(z.array(z.coerce.number<string>().int()))
        .optional(),
    /**
     * Breakdown of the player's classic mode non-demons, in the format
     * `{auto},{easy},{normal},{hard},{harder},{insane},{daily},{gauntlet}`
     */
    classicLevels: z
        .string()
        .transform(val => val.split(","))
        .pipe(z.array(z.coerce.number<string>().int()))
        .optional(),
    /**
     * Breakdown of the player's platformer mode non-demons, in the format
     * `{auto},{easy},{normal},{hard},{harder},{insane}`
     */
    platformerLevels: z
        .string()
        .transform(val => val.split(","))
        .pipe(z.array(z.coerce.number<string>().int()))
        .optional(),
    /**
     * The youtube url of the player
     */
    youtube: z.coerce.string().optional(),
    /**
     * The twitter of the player
     */
    twitter: z.coerce.string().optional(),
    /**
     * The twitch of the player
     */
    twitch: z.coerce.string().optional(),
    iconId: z.coerce.number().int().optional(),
    /**
     * The iconType of the player
     */
    iconType: z.coerce.number().int().optional(),
    /**
     * The icon number of the player
     */
    accIcon: z.coerce.number().int().optional(),
    /**
     * The ship number of the player
     */
    accShip: z.coerce.number().int().optional(),
    /**
     * The ball number of the player
     */
    accBall: z.coerce.number().int().optional(),
    /**
     * The bird number of the player
     */
    accBird: z.coerce.number().int().optional(),
    /**
     * The dart (wave) number of the player
     */
    accDart: z.coerce.number().int().optional(),
    /**
     * The robot number of the player
     */
    accRobot: z.coerce.number().int().optional(),
    /**
     * The glow number of the player
     */
    accGlow: z.coerce.number().int().optional(),
    /**
     * The swing number of the player
     */
    accSwing: z.coerce.number().int().optional(),
    /**
     * The jetpack number of the player
     */
    accJetpack: z.coerce.number().int().optional(),
    /**
     * The spider number of the player
     */
    accSpider: z.coerce.number().int().optional(),
    /**
     * The explosion number of the player
     */
    accExplosion: z.coerce.number().int().optional(),
    /**
     * The accountID of the player. Is used for highlighting the player on the leaderboards
     */
    accountHighlight: z.coerce.number().int().optional(),
});

export type User = z.infer<typeof userSchema>;
