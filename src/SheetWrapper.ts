export interface SheetWrapper {
  setValue(row: number, column: number, value: string): void;
  setRegexConditionalFormat(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number, regex: string, backgroundColor: string): void;
  setRegexConditionalFormatNegative(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number, regex: string, backgroundColor: string): void;
  clearConditionalFormat(): void;
}

export class GoogleSheetWrpaper implements SheetWrapper {
  constructor(
    private googleSheet: GoogleAppsScript.Spreadsheet.Sheet
  ) {
  }

  setValue(row: number, column: number, value: string): void {
    this.googleSheet.getRange(row, column).setValue(value);
  }

  clearConditionalFormat(): void {
    this.googleSheet.setConditionalFormatRules([]);
  }

  setRegexConditionalFormat(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number, regex: string, backgroundColor: string): void {
    const rules = this.googleSheet.getConditionalFormatRules();
    for (let row = rowFrom; row <= rowTo; row++) {
      for (let column = columnFrom; column <= columnTo; column++) {
        const rule = SpreadsheetApp.newConditionalFormatRule()
          .whenFormulaSatisfied(`REGEXMATCH(INDIRECT(ADDRESS(${row}, ${column})), "${JSON.stringify(regex)}")`)
          .whenNumberBetween(1, 10)
          .setBackground(backgroundColor)
          .setRanges([this.googleSheet.getRange(row, column)])
          .build();
        rules.push(rule);
      }
    }
    this.googleSheet.setConditionalFormatRules(rules);
  }
  
  setRegexConditionalFormatNegative(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number, regex: string, backgroundColor: string): void {
    const rules = this.googleSheet.getConditionalFormatRules();
    for (let row = rowFrom; row <= rowTo; row++) {
      for (let column = columnFrom; column <= columnTo; column++) {
        const rule = SpreadsheetApp.newConditionalFormatRule()
          .whenFormulaSatisfied(`NOT(REGEXMATCH(INDIRECT(ADDRESS(${row}, ${column})), "${JSON.stringify(regex)}"))`)
          .whenNumberBetween(1, 10)
          .setBackground(backgroundColor)
          .setRanges([this.googleSheet.getRange(row, column)])
          .build();
        rules.push(rule);
      }
    }
    this.googleSheet.setConditionalFormatRules(rules);
  }
}
