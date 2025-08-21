import { Injectable } from "@angular/core";
import {
  ConfigService,
  LogService,
  MenuItemOptions,
  TabContextMenuItemProvider,
  TranslateService,
} from "tabby-core";
import {
  BaseTerminalTabComponent,
  SessionMiddleware,
  UTF8SplitterMiddleware,
} from "tabby-terminal";
import { CharsetEngagedTab, SupportedCharsetGroups } from "./api";
import { CharsetService } from "./charset.service";

@Injectable()
export class CharsetContextMenu extends TabContextMenuItemProvider {
  weight = 1;
  charset: string;

  constructor(
    public config: ConfigService,
    private logService: LogService,
    private translate: TranslateService,
    private charsetService: CharsetService
  ) {
    super();
  }

  async getItems(tab: CharsetEngagedTab): Promise<MenuItemOptions[]> {
    if (!(tab instanceof BaseTerminalTabComponent)) {
      return [];
    }
    // console.log(tab);
    const groups = SupportedCharsetGroups;
    const submenu = [];
    for (const group of groups) {
      const { groupName, charset } = group;
      const groupCharset = charset.map((value) => ({
        type: "normal",
        label: this.translate.instant(value.name),
        click: () => {
          tab.charset = value;
          this.charsetService.setCharsetBySessionId(tab.profile.id, value);
        },
      }));
      const submenuGroup = {
        label: this.translate.instant(groupName),
        type: "submenu",
        submenu: groupCharset,
      };

      submenu.push(submenuGroup);
    }
    return [
      {
        label: this.translate.instant("Charset") + ` (${tab.charset.name})`,
        type: "submenu",
        submenu,
      },
    ];
  }
}
