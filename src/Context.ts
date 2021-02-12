export type Context = {
    apiUrl: string,
    apiKey: string | undefined,
};

export function loadContext(): Context {
    if (process.env.NODE_ENV === "development") {
        return {
            apiKey: undefined,
            apiUrl: "http://localhost:8080/javap",
        };
    } else {
        throw new Error(`not implemented yet env for ${process.env.NODE_ENV}`);
    }
}
