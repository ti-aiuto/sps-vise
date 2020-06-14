import { SheetWrapper, GoogleSheetWrpaper } from "./SheetWrapper";

export interface SpreadsheetWrapper {
  getSheetByName(name: string): SheetWrapper;
}

export class GoogleSpreadsheetWrapper implements SpreadsheetWrapper {
  constructor(
    private googleSpreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
  ) {
  }

  getSheetByName(name: string): SheetWrapper {
    return new GoogleSheetWrpaper(this.googleSpreadsheet.getSheetByName(name));
  }
}
