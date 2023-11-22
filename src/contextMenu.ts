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

// import "./styles.scss";

const charsets = ["utf-8", "gbk", "gb2312"];

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

  async getItems(tab: BaseTabComponent): Promise<MenuItemOptions[]> {
    if (!(tab instanceof SplitTabComponent)) {
      return [];
    }
    return [
      {
        label: this.translate.instant("Charset"),
        type: "submenu",
        submenu: charsets.map((value) => ({
          type: "radio",
          label: this.translate.instant(value),
          checked: (tab as any)._charset === value,
          click: () => {
            (tab as any)._charset = value;
          },
        })),
      },
    ];
  }
}
