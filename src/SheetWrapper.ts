export interface SheetWrapper {
  setValue(row: number, column: number, value: string): void;
  setRegexCondition(row: number, column: number, regex: string, backgroundColor: string): void;
}

export class GoogleSheetWrpaper implements SheetWrapper {
  constructor(
    private googleSheet: GoogleAppsScript.Spreadsheet.Sheet
  ) {
  }

  setValue(row: number, column: number, value: string): void {
    this.googleSheet.getRange(row, column).setValue(value);
  }

  setRegexCondition(row: number, column: number, regex: string, backgroundColor: string): void {
    const rule = SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`REGEXMATCH(INDIRECT(ADDRESS(${row}, ${column})), "${JSON.stringify(regex)}")`)
      .whenNumberBetween(1, 10)
      .setBackground(backgroundColor)
      .setRanges([this.googleSheet.getRange(row, column)])
      .build();
    const rules = this.googleSheet.getConditionalFormatRules();
    rules.push(rule);
    this.googleSheet.setConditionalFormatRules(rules);
  }
}
