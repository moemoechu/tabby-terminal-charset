import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  BaseTabComponent,
  ConfigService,
  LogService,
  MenuItemOptions,
  SplitTabComponent,
  TabContextMenuItemProvider,
  TranslateService,
} from "tabby-core";
import { ElectronService, ElectronHostWindow } from "tabby-electron";
import { BaseTerminalTabComponent } from "tabby-terminal";
import { CharsetEngagedTab, SupportedCharset } from "./api";

@Injectable()
export class CharsetContextMenu extends TabContextMenuItemProvider {
  weight = 1;
  charset: string;

  constructor(
    public config: ConfigService,
    private logService: LogService,
    private translate: TranslateService
  ) {
    super();
  }

  async getItems(tab: CharsetEngagedTab): Promise<MenuItemOptions[]> {
    if (!(tab instanceof BaseTerminalTabComponent)) {
      return [];
    }
    return [
      {
        label: this.translate.instant("Charset"),
        type: "submenu",
        submenu: SupportedCharset.map((value) => ({
          type: "radio",
          label: this.translate.instant(value.name),
          checked: tab.charset === value.charset,
          click: () => {
            tab.charset = value.charset;
          },
        })),
      },
    ];
  }
}
