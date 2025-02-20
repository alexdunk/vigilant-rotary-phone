import { IOcrService } from "../../domain/services/IOcrService.js";
import { IOcrAdapter } from "../../domain/infrastructureServices/IOcrAdapter.js";

export class OcrService extends IOcrService {
    async ocrDocument({ documentUrl }) {
        const _exec = async () => {
            return await this._ocrAdapter.OcrDocument({ documentUrl });
        }
        return await _exec();
    }

    constructor(ocrAdapter, config) {
        super();
        /** @type {IOcrAdapter} */ this._ocrAdapter = ocrAdapter;
        /** @type {object.<string, object} */ this._config = config;
    }
}

// const { app } = require('@azure/functions');
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const mammoth = require('mammoth');

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
// const client = genAI.getGenerativeModel({
//     model: process.env.GOOGLE_GEMINI_MODEL, generationConfig: {
//         temperature: 1,
//         topP: 0.95,
//         topK: 40,
//         maxOutputTokens: 8192,
//         responseMimeType: "text/plain",
//     }
// });

// const DOC_TYPE = {
//     DOCX: 'docx',
//     PDF: 'pdf',
//     PNG: 'png',
//     JPG: 'jpg',
//     TXT: 'txt',
//     RTF: 'rtf'
// }

// const getDocType = (documentUrl) => {
//     if (documentUrl.toLowerCase().endsWith('.docx')) {
//         return DOC_TYPE.DOCX;
//     } else if (documentUrl.toLowerCase().endsWith('.pdf')) {
//         return DOC_TYPE.PDF;
//     } else if (documentUrl.toLowerCase().endsWith('.doc')) {
//         return DOC_TYPE.DOCX;
//     } else if (documentUrl.toLowerCase().endsWith('.txt')) {
//         return DOC_TYPE.TXT;
//     } else if (documentUrl.toLowerCase().endsWith('.rtf')) {
//         return DOC_TYPE.RTF;
//     } else if (documentUrl.toLowerCase().endsWith('.png')) {
//         return DOC_TYPE.PNG;
//     } else if (documentUrl.toLowerCase().endsWith('.jpg')) {
//         return DOC_TYPE.JPG;
//     }
//     return null;
// }

// app.http('ocr', {
//     methods: ['POST'],
//     authLevel: 'anonymous',
//     handler: async (request, context) => {
//         context.log(`Http function processed request for url "${request.url}"`);

//         const documentUrl = request?.query?.get('documentUrl') ?? null;

//         const documentBuffer = await fetch(documentUrl).then((response) => response.arrayBuffer());

//         const docType = getDocType(documentUrl);

//         let result;

//         if ([DOC_TYPE.DOCX, DOC_TYPE.RTF, DOC_TYPE.TXT].includes(docType)) {
//             result = await mammoth.extractRawText({ buffer: documentBuffer });
//             return { body: result.value };
//         }

//         if ([DOC_TYPE.PDF, DOC_TYPE.PNG, DOC_TYPE.JPG].includes(docType)) {
//             result = await client.generateContent([
//                 {
//                     inlineData: {
//                         data: Buffer.from(documentBuffer).toString("base64"),
//                         mimeType: "application/pdf",
//                     },
//                 },
//                 'Extract all text from the document and return it.',
//             ]);
//             return { body: result.response.text() };
//         }

//         return { status: 400, body: "Unsupported document type." };
//     }
// });
