import { Injectable, Injector } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BaseTabComponent, ConfigService, LogService, Logger, TranslateService } from "tabby-core";
import { BaseSession, BaseTerminalTabComponent, TerminalDecorator } from "tabby-terminal";
import { debounce } from "utils-decorators";
import CharsetMiddleware from "./charset.middleware";
import { CharsetEngagedTab } from "./api";

@Injectable()
export class CharsetDecorator extends TerminalDecorator {
  private logger: Logger;
  constructor(
    private config: ConfigService,
    private logService: LogService,
    private toastr: ToastrService,
    private translate: TranslateService,
    protected injector: Injector
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
      tab.charset = {
        name: "UTF-8",
        charset: "utf-8",
      };
    }
    const middleware = new CharsetMiddleware(this.injector, tab);
    session.middleware.push(middleware);
  }

  @debounce(500)
  toast(message: string) {
    this.toastr.info(this.translate.instant(message));
  }
}
