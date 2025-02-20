import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { handler } from "./index.js";

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables with explicit path
dotenv.config({
    path: join(__dirname, '.env'),
    debug: true  // Enable debug logging
});

const info_event = {
    httpMethod: "GET",
    path: "/info",
    queryStringParameters: {
        test1: "test1"
    },
    headers: { authorization: "Bearer token here" },
    body: ""
}

const ocr_event = {
    httpMethod: "POST",
    path: "/ocr",
    queryStringParameters: {
        documentUrl: "https://deedplotteraidev.blob.core.windows.net/documents/b64d062e-85da-4a42-a994-c81b3aa63bb0.pdf"
    },
    headers: { authorization: "Bearer token here" },
    body: ""
}

const response = await handler(ocr_event);
console.log(response)


