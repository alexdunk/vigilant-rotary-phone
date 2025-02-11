import { IAppService } from "../../domain/services/IAppService.js";

export class AppService extends IAppService {
    getAppInfo() {
        const _exec = () => {
            return {
                name: 'MyApp',
                version: this._config.appVersion
            }
        }

        return _exec();
    }

    constructor(config) {
        super();
        this._config = config;
    }
}