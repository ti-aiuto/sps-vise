import { SpreadsheetWrapper } from "./SpreadsheetWrapper";
import { EntitySheetSettings } from ".";
import { EntityValue } from "./EntityValue";

interface JSONBuilderArgs {
  spreadsheet: SpreadsheetWrapper;
  entitySheetSettings: EntitySheetSettings[];
}

export class JSONBuilder {
  spreadsheet: SpreadsheetWrapper;

  entitySheetSettings: EntitySheetSettings[];

  constructor(
    args: JSONBuilderArgs
  ) {
    this.spreadsheet = args.spreadsheet;
    this.entitySheetSettings = args.entitySheetSettings;
  }

  build(): { [key: string]: EntityValue[] } {
    return {};
  }
}
