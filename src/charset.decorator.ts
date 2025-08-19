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
import { CharsetEngagedTab } from "./api";
import CharsetMiddleware from "./charset.middleware";

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
    } else if (tab.charset.charset !== "utf-8") {
      const stack = (tab.session.middleware as any).stack as SessionMiddleware[];
      const utf8SplitterMiddleware = stack.find((value) => value instanceof UTF8SplitterMiddleware);
      if (utf8SplitterMiddleware) {
        tab.session.middleware.remove(utf8SplitterMiddleware);
      }
    }
    const middleware = new CharsetMiddleware(this.injector, tab);
    session.middleware.push(middleware);
  }

  @debounce(500)
  toast(message: string) {
    this.toastr.info(this.translate.instant(message));
  }
}
