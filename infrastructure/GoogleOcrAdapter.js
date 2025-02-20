import { IGoogleClient } from "./IGoogleClient.js";
import { IOcrAdapter } from "../domain/infrastructureServices/IOcrAdapter.js";

export class GoogleOcrAdapter extends IOcrAdapter {
    async OcrDocument({ documentUrl }) {
        const _exec = async () => {
            const imageResp = await fetch(documentUrl).then((response) => response.arrayBuffer());
            return await this._googleClient.OcrDocument({ documentBuffer: imageResp });
        }
        return await _exec();
    }

    constructor(googleClient, config) {
        super();
        /** @type {IGoogleClient} */ this._googleClient = googleClient;
        /** @type {object.<string, object} */ this._config = config;
    }
}