import { Injectable, Injector } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ConfigService, LogService, Logger, TranslateService } from "tabby-core";
import {
  BaseSession,
  BaseTerminalTabComponent,
  SessionMiddleware,
  TerminalDecorator,
  UTF8SplitterMiddleware,
} from "tabby-terminal";
import { debounce } from "utils-decorators";
import { CharsetEngagedTab, CharsetPluginConfig } from "./api";
import CharsetMiddleware from "./charset.middleware";
import { CharsetService } from "./charset.service";

@Injectable()
export class CharsetDecorator extends TerminalDecorator {
  private logger: Logger;
  get pluginConfig(): CharsetPluginConfig {
    return this.config.store.charsetPlugin as CharsetPluginConfig;
  }
  constructor(
    private config: ConfigService,
    private logService: LogService,
    private toastr: ToastrService,
    private translate: TranslateService,
    protected injector: Injector,
    private charsetService: CharsetService
  ) {
    super();

    this.logger = this.logService.create("tabby-terminal-charset");
  }

  attach(tab: BaseTerminalTabComponent<any>): void {
    if (tab.sessionChanged$) {
      // v136+
      tab.sessionChanged$.subscribe((session) => {
        if (session) {
          this.attachToSession(session, tab as any);
        }
      });
    }
    if (tab.session) {
      this.attachToSession(tab.session, tab as any);
    }
  }

  private attachToSession(session: BaseSession, tab: CharsetEngagedTab) {
    // if (!(tab.parent instanceof BaseTabComponent)) {
    //   return;
    // }
    if (!tab.charset) {
      const map = this.charsetService.getCharsetBySessionId(tab.profile.id);
      if (map) {
        tab.charset = map.charset;
      } else {
        tab.charset = {
          name: "UTF-8",
          charset: "utf-8",
        };
      }
    }
    const middleware = new CharsetMiddleware(this.injector, tab);
    session.middleware.unshift(middleware);
  }

  @debounce(500)
  toast(message: string) {
    this.toastr.info(this.translate.instant(message));
  }
}
