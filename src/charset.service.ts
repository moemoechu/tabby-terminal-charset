import { Injectable } from "@angular/core";
import { ConfigService, LogService, Logger, ProfilesService, TranslateService } from "tabby-core";
import { translations } from "./translations";
import { Charset, CharsetPluginConfig } from "./api";

@Injectable({ providedIn: "root" })
export class CharsetService {
  private logger: Logger;
  get pluginConfig(): CharsetPluginConfig {
    return this.config.store.charsetPlugin as CharsetPluginConfig;
  }
  constructor(
    public config: ConfigService,
    private logService: LogService,
    private translate: TranslateService,
    private sessionService: ProfilesService
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

        this.prunePerSessionMap();
      });
    });
  }

  async prunePerSessionMap() {
    const sessions = await this.sessionService.getProfiles();
    const { perSessionCharsetMap } = this.pluginConfig;
    let newMap = perSessionCharsetMap;
    for (const session of perSessionCharsetMap) {
      if (!sessions.find((value) => value.id === session.sessionId)) {
        newMap = newMap.filter((value) => value.sessionId !== session.sessionId);
      }
    }
    this.pluginConfig.perSessionCharsetMap = newMap;
    this.config.save();
  }

  getCharsetBySessionId(sessionId: string) {
    return this.pluginConfig.perSessionCharsetMap.find((value) => value.sessionId === sessionId);
  }

  setCharsetBySessionId(sessionId: string, charset: Charset) {
    this.pluginConfig.perSessionCharsetMap = this.pluginConfig.perSessionCharsetMap
      .filter((value) => value.sessionId !== sessionId)
      .concat({ sessionId, charset });
    this.config.save();
  }
}
