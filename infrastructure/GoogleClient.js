import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { IGoogleClient } from "./IGoogleClient.js";

/** @type {GenerativeModel} */
let _cachedClient = null;

export class GoogleClient extends IGoogleClient {
    async OcrDocument({ documentBuffer }) {
        const _exec = async () => {
            const result = await this._getClient().generateContent([
                {
                    inlineData: {
                        data: Buffer.from(documentBuffer).toString("base64"),
                        mimeType: "application/pdf",
                    },
                },
                'Extract all text from the document and return it.',
            ]);
            return result.response.text();
        }
        return await _exec();
    }

    constructor(config) {
        super();
        this._config = config;
    }

    _getClient() {
        if (!_cachedClient) {
            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
            const client = genAI.getGenerativeModel({
                model: process.env.GOOGLE_GEMINI_MODEL, generationConfig: {
                    temperature: 1,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 8192,
                    responseMimeType: "text/plain",
                }
            });
            _cachedClient = client;
        }
        return _cachedClient;
    }
}