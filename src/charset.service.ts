import { Injectable } from "@angular/core";
import { ConfigService, LogService, Logger, TranslateService } from "tabby-core";
import { translations } from "./translations";

@Injectable({ providedIn: "root" })
export class CharsetService {
  private logger: Logger;
  constructor(
    public config: ConfigService,
    private logService: LogService,
    private translate: TranslateService
  ) {
    this.logger = this.logService.create("tabby-terminal-charset");
    this.logger.info("CharsetService ctor");

    this.config.ready$.subscribe(() => {
      this.logger.info("config ready");
      setImmediate(() => {
        for (const translation of translations) {
          const [lang, trans] = translation;
          this.translate.setTranslation(lang, trans, true);
          this.logger.info("translate applied");
        }
      });
    });
  }
}
