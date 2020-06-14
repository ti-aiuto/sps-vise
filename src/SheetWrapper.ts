export interface SheetWrapper {
  setValue(row: number, column: number, value: string): void;
  setTableBorderRange(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number): void;
  setNumberFormatRange(rowFrom: number, columnFrom: number, rowSize: number, columnSize: number, format: string): void;
  mergeRange(rowFrom: number, columnFrom: number, rowSize: number, columnSize: number): void;
  getValuesRange(rowFrom: number, columnFrom: number, rowSize: number, columnSize: number): string[][];
}

export class GoogleSheetWrpaper implements SheetWrapper {
  constructor(
    private googleSheet: GoogleAppsScript.Spreadsheet.Sheet
  ) {
  }

  setValue(row: number, column: number, value: string): void {
    this.googleSheet.getRange(row, column).setValue(value);
  }

  setTableBorderRange(rowFrom: number, columnFrom: number, rowSize: number, columnSize: number): void {
    const range = this.googleSheet.getRange(rowFrom, columnFrom, rowSize, columnSize);
    range.setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);
  }

  setNumberFormatRange(rowFrom: number, columnFrom: number, rowSize: number, columnSize: number, format: string): void {
    const range = this.googleSheet.getRange(rowFrom, columnFrom, rowSize, columnSize);
    range.setNumberFormat(format);
  }

  mergeRange(rowFrom: number, columnFrom: number, rowSize: number, columnSize: number): void {
    const range = this.googleSheet.getRange(rowFrom, columnFrom, rowSize, columnSize);
    range.merge();
  }

  getValuesRange(rowFrom: number, columnFrom: number, rowSize: number, columnSize: number): string[][] {
    const range = this.googleSheet.getRange(rowFrom, columnFrom, rowSize, columnSize);
    return range.getValues();
  }
}
