import { Injectable } from "@angular/core";
import {
  ConfigService,
  LogService,
  MenuItemOptions,
  TabContextMenuItemProvider,
  TranslateService,
} from "tabby-core";
import { BaseTerminalTabComponent } from "tabby-terminal";
import { CharsetEngagedTab, SupportedCharsetGroups } from "./api";

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
    const groups = SupportedCharsetGroups;
    const submenu = [];
    for (const group of groups) {
      const { groupName, charset } = group;
      const groupCharset = charset.map((value) => ({
        type: "normal",
        label: this.translate.instant(value.name),
        // checked: tab.charset === value.charset,
        click: () => {
          tab.charset = value;
        },
      }));
      const submenuGroup = {
        label: this.translate.instant(groupName),
        type: "submenu",
        submenu: groupCharset,
      };

      submenu.push(submenuGroup);
    }
    // const menu =
    return [
      {
        label: this.translate.instant("Charset") + ` (${tab.charset.name})`,
        type: "submenu",
        submenu,
      },
    ];
  }
}
