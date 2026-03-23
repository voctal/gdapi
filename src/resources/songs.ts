import { z } from "zod";

export const songMappings = {
    1: "id",
    2: "name",
    3: "artistId",
    4: "artistName",
    5: "size",
    6: "videoId",
    7: "youtubeURL",
    8: "isVerified",
    9: "songPriority",
    10: "link",
    11: "nong",
    12: "extraArtistIds",
    13: "new",
    14: "newType",
    15: "extraArtistNames",
};

export enum SongNong {
    None = 0,
    NCS = 1,
}

export enum SongNewType {
    Yellow = 0,
    Blue = 1,
}

export const songSchema = z.object({
    /**
     * The ID of the song on Newgrounds
     */
    id: z.coerce.number().int().optional(),
    /**
     * The name of the song
     */
    name: z.string(),
    /**
     * Newgrounds Artist ID
     */
    artistId: z.coerce.number().int(),
    /**
     * The name of the artist who made the song
     */
    artistName: z.string(),
    /**
     * Size of the song in MB, rounded to two decimal places
     */
    size: z.coerce.number(),
    /**
     * The Video ID for the songs YouTube Video
     */
    videoId: z.string().optional(),
    /**
     * The URL of the newgrounds user's youtube channel
     */
    youtubeURL: z.string().optional(),
    /**
     * If the song artist is scouted on newgrounds
     */
    isVerified: z.coerce.boolean(),
    /**
     * Priority over the song list
     */
    songPriority: z.coerce.number().int().optional(),
    /**
     * Link to the song's mp3
     */
    link: z.string().transform(val => decodeURIComponent(val)),
    /**
     * Type of NONG (Not on Newgrounds)
     *
     * @type {SongNong}
     */
    nong: z.coerce.number().int().optional(),
    /**
     * IDs of extra artists
     */
    extraArtistIds: z
        .string()
        .transform(val => val.split("."))
        .pipe(z.array(z.coerce.number<string>().int()))
        .optional(),
    /**
     * Whether the NEW icon shows up or not
     */
    new: z.coerce.boolean(),
    /**
     * Type of NEW icon. 0 for Yellow, 1 for Blue
     *
     * @type {SongNewType}
     */
    newType: z.coerce.number().int().optional(),
    /**
     * Artist names in the format [id, name][]
     */
    extraArtistNames: z
        .string()
        .transform(val => {
            const result = [];
            const elements = val.split(",");
            for (let i = 0; i < elements.length; i += 2) {
                result.push(elements.slice(i, i + 2));
            }
            return result;
        })
        .pipe(z.array(z.tuple([z.coerce.number<string>().int(), z.string()])))
        .optional(),
});

export type Song = z.infer<typeof songSchema>;
