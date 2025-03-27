export const LOGIN_TOKEN_COOKIE = "loginToken";

// secrets
export const COOKIE_SECRET = getEnv("COOKIE_SECRET");
export const AZURE_SQL_SERVER = getEnv("AZURE_SQL_SERVER");
export const AZURE_SQL_DATABASE = getEnv("AZURE_SQL_DATABASE");
export const AZURE_SQL_PORT = Number(getEnv("AZURE_SQL_PORT"));
export const AZURE_SQL_USER = getEnv("AZURE_SQL_USER");
export const AZURE_SQL_PASSWORD = getEnv("AZURE_SQL_PASSWORD");

/**
 * @param {string} name
 * @returns {string}
 */
function getEnv(name) {
    const value = process.env[name];
    if (!value || value === "") {
        throw new Error(`required environment variable ${name} was not set`);
    }
    return value;
}
