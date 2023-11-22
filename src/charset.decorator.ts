import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BaseTabComponent, ConfigService, LogService, Logger, TranslateService } from "tabby-core";
import { BaseSession, BaseTerminalTabComponent, TerminalDecorator } from "tabby-terminal";
import { debounce } from "utils-decorators";
import CharsetMiddleware from "./charset.middleware";

@Injectable()
export class CharsetDecorator extends TerminalDecorator {
  private logger: Logger;
  constructor(
    private config: ConfigService,
    private logService: LogService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    super();

    this.logger = this.logService.create("tabby-terminal-charset");
  }

  attach(tab: BaseTerminalTabComponent<any>): void {
    if (tab.sessionChanged$) {
      // v136+
      tab.sessionChanged$.subscribe((session) => {
        if (session) {
          this.attachToSession(session, tab);
        }
      });
    }
    if (tab.session) {
      this.attachToSession(tab.session, tab);
    }
  }

  private attachToSession(session: BaseSession, tab: BaseTerminalTabComponent<any>) {
    if (!(tab.parent instanceof BaseTabComponent)) {
      return;
    }
    const middleware = new CharsetMiddleware(
      tab,
      this.config.store.charsetPlugin,
      this.logger,
      this.toast.bind(this)
    );
    session.middleware.push(middleware);
  }

  @debounce(500)
  toast(message: string) {
    this.toastr.info(this.translate.instant(message));
  }
}
