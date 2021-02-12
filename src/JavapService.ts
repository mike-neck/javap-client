import {Context} from "./Context";
import * as pako from "pako";

export type JavapSuccess = {
    contents: string,
};

export type JavapError = {
    error: string,
    cause: string,
}

export type JavapService = {
    call: (javaCode: string) => Promise<JavapSuccess | JavapError>
};

export function isJavapSuccess(some: JavapSuccess | JavapError): some is JavapSuccess {
    return "contents" in some;
}

export function isJavapError(some: JavapSuccess | JavapError): some is JavapError {
    return "error" in some && "cause" in some;
}

export function newJavapService(context: Context): JavapService {
    return {
        call(javaCode: string): Promise<JavapSuccess | JavapError> {
            return callApi(context, javaCode)
                .catch(reason => typeErrorToJavapError(reason));
        }
    };
}

async function callApi(context: Context, javaCode: string): Promise<JavapSuccess | JavapError> {
    const base64 = await deflateToBase64(javaCode);
    const url = `${context.apiUrl}/${base64}`;
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "accept": "application/json",
        }
    });
    const object = await response.json();
    if (response.status === 200 && "contents" in object) {
        return {
            contents: object["contents"]
        };
    } else if (response.status === 200) {
        return {
            cause: "server returns success but no contents found",
            error: "error, try again",
        };
    }
    const error = extractError(object);
    const cause = extractCause(object);
    return {
        cause: cause,
        error: error,
    };
}

async function deflateToBase64(javaCode: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const bytes = pako.gzip(textEncoder.encode(javaCode));
    // @ts-ignore
    const byteString = String.fromCharCode(...bytes);
    return btoa(byteString)
        .replaceAll('/', '_')
        .replaceAll('+', '-');
}

function extractError(object: any): string {
    if ("error" in object) return object["error"];
    return "error but no detail available";
}

function extractCause(object: any): string {
    if ("cause" in object) return object["cause"];
    return "unknown error";
}

function typeErrorToJavapError(e: any): Promise<JavapSuccess | JavapError> {
    return new Promise<JavapSuccess | JavapError>(resolve => {
        if ("message" in e) {
            resolve({
                error: e["message"],
                cause: e["message"],
            });
        } else {
            resolve({
                error: `error: ${e}`,
                cause: `${e}`,
            });
        }
    });
}
