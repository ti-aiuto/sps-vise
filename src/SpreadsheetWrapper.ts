import { SheetWrapper, GoogleSheetWrpaper } from "./SheetWrapper";

export interface SpreadsheetWrapper {
  getSheetByName(name: string): SheetWrapper | null;
}

export class GoogleSpreadsheetWrapper implements SpreadsheetWrapper {
  constructor(
    private googleSpreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
  ) {
  }

  getSheetByName(name: string): SheetWrapper | null {
    const googleSheet = this.googleSpreadsheet.getSheetByName(name);
    if (!googleSheet) {
      return null;
    }
    return new GoogleSheetWrpaper(googleSheet);
  }
}
