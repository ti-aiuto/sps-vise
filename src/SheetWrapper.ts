export interface SheetWrapper {
  setValue(x: number, y: number, value: string): void;
}

export class GoogleSheetWrpaper implements SheetWrapper {
  constructor(
    private googleSheet: GoogleAppsScript.Spreadsheet.Sheet
  ) {
  }

  setValue(x: number, y: number, value: string): void {
    this.googleSheet.getRange(x, y).setValue(value);
  }
}
