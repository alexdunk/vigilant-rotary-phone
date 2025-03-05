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

