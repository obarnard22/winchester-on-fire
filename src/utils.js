import * as crypto from "crypto";

export function generate_uuid() {
    return crypto.randomBytes(128 / 8).toString("base64url");
}
