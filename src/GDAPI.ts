import { z } from "zod";
import { MUSIC_LIBRARY_VERSION_URL, SFX_LIBRARY_VERSION_URL } from "./constants";
import {
    parseGroups,
    parseObject,
    parseObjectList,
    parseSong,
    parseSongList,
    parseTuple,
    parseTupleList,
} from "./parser";
import { GetUserLeaderboardOptions, SearchLevelsOptions, SearchListsOptions } from "./requests";
import { gauntletMappings, gauntletSchema } from "./resources/gauntlets";
import { levelMappings, levelSchema } from "./resources/levels";
import { listMappings, listSchema } from "./resources/lists";
import { mapPacksMappings, mapPacksSchema } from "./resources/mapPacks";
import { Song, songMappings, songSchema } from "./resources/songs";
import { User, userMappings, userSchema } from "./resources/users";
import { DailyLevel, GauntletsData, LevelsData, ListsData, MapPacksData } from "./responses";
import { REST } from "./REST";
import { COMMON_SECRET } from "./secrets";

const dailyOrWeeklySchema = z.tuple([z.coerce.number().int()]);
const paginationSchema = z.tuple([z.coerce.number().int(), z.coerce.number().int(), z.coerce.number().int()]);
const creatorSchema = z.tuple([z.coerce.number().int(), z.string(), z.coerce.number().int()]);
const versionSchema = z.coerce.number().int();

/**
 * The client to interact with the Geometry Dash API
 */
export class GDAPI {
    public readonly rest: REST;

    public constructor() {
        this.rest = new REST();
    }

    public async getDailyLevel(): Promise<DailyLevel> {
        const data = await this.rest.post("/database/getGJDailyLevel.php", {
            secret: COMMON_SECRET,
            weekly: "0",
        });

        const result = parseTupleList(data, dailyOrWeeklySchema);

        return {
            index: result[0][0],
            timeLeft: result[1][0],
        };
    }

    // TODO: this. Currently returns the same as the daily level, for some reasons
    /*public async getWeeklyLevel(): Promise<WeeklyLevel> {
        const data = await this.rest.post("/database/getGJDailyLevel.php", {
            secret: COMMON_SECRET,
            weekly: "1",
        });

        const result = parseTupleList(data, dailyOrWeeklySchema);

        return {
            index: result[0][0],
            timeLeft: result[1][0],
        };
    }*/

    public async getCurrentSFXLibraryVersion(): Promise<number> {
        const res = await fetch(SFX_LIBRARY_VERSION_URL);
        const data = await res.text();
        const version = versionSchema.parse(data);

        return version;
    }

    public async getCurrentMusicLibraryVersion(): Promise<number> {
        const res = await fetch(MUSIC_LIBRARY_VERSION_URL);
        const data = await res.text();
        const version = versionSchema.parse(data);

        return version;
    }

    public async getGauntlets(): Promise<GauntletsData> {
        const data = await this.rest.post("/database/getGJGauntlets21.php", {
            secret: COMMON_SECRET,
            special: "1",
        });

        const [rawGauntlets, hash] = parseGroups(data, 2);
        const gauntlets = parseObjectList(rawGauntlets, gauntletMappings, gauntletSchema);

        return {
            gauntlets,
            hash,
        };
    }

    /**
     * @example
     * ```ts
     * searchLevels({
     *    type: SearchLevelsType.Query,
     *    query: "bloodbath"
     * });
     * ```
     */
    public async searchLevels(options: SearchLevelsOptions): Promise<LevelsData> {
        const requestOptions: Record<string, string> = {
            secret: COMMON_SECRET,
            type: options.type.toString(),
        };
        if (options.page !== undefined) requestOptions.page = options.page.toString();
        if (options.query !== undefined) requestOptions.str = options.query;
        if (options.gauntlet !== undefined) requestOptions.gauntlet = options.gauntlet.toString();
        if (options.difficulty !== undefined) requestOptions.diff = options.difficulty.toString();
        if (options.demonFilter !== undefined) requestOptions.demonFilter = options.demonFilter.toString();
        if (options.length !== undefined) requestOptions.len = options.length.toString();
        if (options.featured !== undefined) requestOptions.featured = options.featured ? "1" : "0";
        if (options.original !== undefined) requestOptions.original = options.original ? "1" : "0";
        if (options.twoPlayer !== undefined) requestOptions.twoPlayer = options.twoPlayer ? "1" : "0";
        if (options.coins !== undefined) requestOptions.coins = options.coins ? "1" : "0";
        if (options.epic !== undefined) requestOptions.epic = options.epic ? "1" : "0";
        if (options.legendary !== undefined) requestOptions.legendary = options.legendary ? "1" : "0";
        if (options.mythic !== undefined) requestOptions.mythic = options.mythic ? "1" : "0";
        if (options.noStar !== undefined) requestOptions.noStar = options.noStar ? "1" : "0";
        if (options.star !== undefined) requestOptions.star = options.star ? "1" : "0";
        if (options.song !== undefined) requestOptions.song = options.song.toString();
        if (options.customSong !== undefined) requestOptions.customSong = options.customSong.toString();

        const data = await this.rest.post("/database/getGJLevels21.php", requestOptions);

        const [rawLevels, rawCreators, rawSongs, rawPagination, hash] = parseGroups(data, 5);
        const levels = parseObjectList(rawLevels, levelMappings, levelSchema);
        const creators = parseTupleList(rawCreators, creatorSchema);
        const songs = rawSongs ? parseSongList(rawSongs, songMappings, songSchema) : [];
        const pagination = parseTuple(rawPagination, paginationSchema);

        return {
            levels,
            creators: creators.map(c => ({
                userId: c[0],
                username: c[1],
                accountId: c[2],
            })),
            songs,
            page: {
                total: pagination[0],
                offset: pagination[1],
                amount: pagination[2],
            },
            hash,
        };
    }

    /**
     * @example
     * ```ts
     * searchLists({
     *    type: SearchListType.Query,
     *    query: "Name"
     * });
     * ```
     */
    public async searchLists(options: SearchListsOptions): Promise<ListsData> {
        const requestOptions: Record<string, string> = {
            secret: COMMON_SECRET,
            type: options.type.toString(),
        };
        if (options.page !== undefined) requestOptions.page = options.page.toString();
        if (options.query !== undefined) requestOptions.str = options.query;
        if (options.difficulty !== undefined) requestOptions.diff = options.difficulty.toString();
        if (options.demonFilter !== undefined) requestOptions.demonFilter = options.demonFilter.toString();
        if (options.rated !== undefined) requestOptions.rated = options.rated ? "1" : "0";

        const data = await this.rest.post("/database/getGJLevelLists.php", requestOptions);

        const [rawLists, rawCreators, rawPagination, hash] = parseGroups(data, 4);
        const lists = parseObjectList(rawLists, listMappings, listSchema);
        const creators = parseTupleList(rawCreators, creatorSchema);
        const pagination = parseTuple(rawPagination, paginationSchema);

        return {
            lists,
            creators: creators.map(c => ({
                userId: c[0],
                username: c[1],
                accountId: c[2],
            })),
            page: {
                total: pagination[0],
                offset: pagination[1],
                amount: pagination[2],
            },
            hash,
        };
    }

    /**
     * @param page - Starts at 0
     */
    public async getMapPacks(page = 0): Promise<MapPacksData> {
        const data = await this.rest.post("/database/getGJMapPacks21.php", {
            secret: COMMON_SECRET,
            page: page.toString(),
        });

        const [rawPacks, rawPagination, hash] = parseGroups(data, 3);
        const packs = parseObjectList(rawPacks, mapPacksMappings, mapPacksSchema);
        const pagination = parseTuple(rawPagination, paginationSchema);

        return {
            packs,
            page: {
                total: pagination[0],
                offset: pagination[1],
                amount: pagination[2],
            },
            hash,
        };
    }

    public async getSongById(songId: string): Promise<Song> {
        const data = await this.rest.post("/database/getGJSongInfo.php", {
            secret: COMMON_SECRET,
            songID: songId,
        });

        return parseSong(data, songMappings, songSchema);
    }

    public async getUserById(accountId: number): Promise<User> {
        const data = await this.rest.post("/database/getGJUserInfo20.php", {
            secret: COMMON_SECRET,
            targetAccountID: accountId.toString(),
        });

        return parseObject(data, userMappings, userSchema);
    }

    public async getUserByName(name: string): Promise<User> {
        const data = await this.rest.post("/database/getGJUsers20.php", {
            secret: COMMON_SECRET,
            str: name,
        });

        const [rawUser] = parseGroups(data, 2);

        return parseObject(rawUser, userMappings, userSchema);
    }

    public async getUserLeaderboard(options?: GetUserLeaderboardOptions): Promise<User[]> {
        const requestOptions: Record<string, string> = {
            secret: COMMON_SECRET,
            type: options?.type || "top",
        };
        if (options?.count !== undefined) requestOptions.count = options.count.toString();

        const data = await this.rest.post("/database/getGJScores20.php", requestOptions);

        // The data ends with `|`
        const realData = data.slice(0, -1);

        return parseObjectList(realData, userMappings, userSchema);
    }
}
