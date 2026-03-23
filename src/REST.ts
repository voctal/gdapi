import { APIError } from "./APIError";
import { BOOMLINGS_URL } from "./constants";

/**
 * Use to interact with the Geometry Dash API.
 *
 * @see https://wyliemaster.github.io/gddocs/#/endpoints/generic
 */
export class REST {
    /**
     * Throws {@link APIError} if the request fail
     *
     * @param path - Must start with `/`
     */
    public async request(method: string, path: string, body?: Record<string, string>): Promise<Response> {
        if (!path.startsWith("/")) {
            throw new Error(`Invalid path: ${path}`);
        }

        const url = `${BOOMLINGS_URL}${path}`;
        const encodedBody = body ? new URLSearchParams(body).toString() : undefined;
        const headers = new Headers({
            "User-Agent": "",
            "Content-Type": "application/x-www-form-urlencoded",
        });

        let res;
        try {
            res = await fetch(url, { method, headers, body: encodedBody });
        } catch (err) {
            throw new APIError(`Failed to fetch ${url}`, { cause: err });
        }

        if (!res.ok) {
            throw new APIError(`Invalid response from ${url}: ${res.statusText} (Code: ${res.status})`, undefined, res);
        }

        return res;
    }

    public async post(path: string, body?: Record<string, string>): Promise<string> {
        const res = await this.request("POST", path, body);
        const text = await res.text();

        if (text.length <= 3 && text.startsWith("-")) {
            throw new APIError(`Invalid request (Error code: ${text})`, undefined, res);
        }

        return text;
    }
}
