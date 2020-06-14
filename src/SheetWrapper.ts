export interface SheetWrapper {
  setValue(row: number, column: number, value: string): void;
  setRegexConditionalFormatRules(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number, regex: string, backgroundColor: string): void;
  setRegexConditionalFormatRulesNegative(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number, regex: string, backgroundColor: string): void;
  clearConditionalFormatRules(): void;
}

export class GoogleSheetWrpaper implements SheetWrapper {
  constructor(
    private googleSheet: GoogleAppsScript.Spreadsheet.Sheet
  ) {
  }

  setValue(row: number, column: number, value: string): void {
    this.googleSheet.getRange(row, column).setValue(value);
  }

  clearConditionalFormatRules(): void {
    this.googleSheet.setConditionalFormatRules([]);
  }

  // TODO: 本当は正規表現などエスケープ必要

  setRegexConditionalFormatRules(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number, regex: string, backgroundColor: string): void {
    const rules = this.googleSheet.getConditionalFormatRules();
    for (let row = rowFrom; row <= rowTo; row += 1) {
      for (let column = columnFrom; column <= columnTo; column += 1) {
        const rule = SpreadsheetApp.newConditionalFormatRule()
          .whenFormulaSatisfied(`=REGEXMATCH(INDIRECT(ADDRESS(${row}, ${column})), "${regex}")`)
          .setBackground(backgroundColor)
          .setRanges([this.googleSheet.getRange(row, column)])
          .build();
        rules.push(rule);
      }
    }
    this.googleSheet.setConditionalFormatRules(rules);
  }

  setRegexConditionalFormatRulesNegative(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number, regex: string, backgroundColor: string): void {
    const rules = this.googleSheet.getConditionalFormatRules();
    for (let row = rowFrom; row <= rowTo; row += 1) {
      for (let column = columnFrom; column <= columnTo; column += 1) {
        const rule = SpreadsheetApp.newConditionalFormatRule()
          .whenFormulaSatisfied(`=NOT(REGEXMATCH(INDIRECT(ADDRESS(${row}, ${column})), "${regex}"))`)
          .setBackground(backgroundColor)
          .setRanges([this.googleSheet.getRange(row, column)])
          .build();
        rules.push(rule);
      }
    }
    this.googleSheet.setConditionalFormatRules(rules);
  }
}
