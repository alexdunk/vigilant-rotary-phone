import { handler } from "./index.js";

const info_event = {
    httpMethod: "GET",
    path: "/info",
    queryStringParameters: {
        test1: "test1"
    },
    headers: { authorization: "Bearer token here" },
    body: ""
}

const response = await handler(info_event);
console.log(response)