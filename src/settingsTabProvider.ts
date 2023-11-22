import { Injectable } from "@angular/core";
import { SettingsTabProvider } from "tabby-settings";
import { CharsetSettingsTabComponent } from "./settingsTab.component";

/** @hidden */
@Injectable()
export class CharsetSettingsTabProvider extends SettingsTabProvider {
  id = "tabby-terminal-charset";
  icon = "fa-solid fa-language";
  title = "Charset";

  constructor() {
    super();
  }

  getComponentType(): any {
    return CharsetSettingsTabComponent;
  }
}
