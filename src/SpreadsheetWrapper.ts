export class SpreadsheetWrapper {
  private spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;

  constructor(id: string) {
    this.spreadsheet = SpreadsheetApp.openById(id);
  }
}
