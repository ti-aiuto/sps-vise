import { SpreadsheetWrapper } from "./SpreadsheetWrapper";
import { EntitySheetSettings } from "./EntitySheetSetting";

// const ERROR_COLOR = '#e57373';

interface SpreadsheetBuilderArgs {
  spreadsheet: SpreadsheetWrapper;
  entitySheetSettings: EntitySheetSettings[];
}

export class SpreadsheetBuilder implements Required<SpreadsheetBuilderArgs>{
  spreadsheet: SpreadsheetWrapper;

  entitySheetSettings: EntitySheetSettings[];

  constructor(
    args: SpreadsheetBuilderArgs
  ) {
    this.spreadsheet = args.spreadsheet;
    this.entitySheetSettings = args.entitySheetSettings;
  }

  build(): void {
    this.initSheets();
  }

  // this.sheet.setRegexConditionalFormatRulesNegative(rowFrom, columnFrom, rowTo, columnTo, "[+-]?\d+", ERROR_COLOR);
  // this.sheet.setRegexConditionalFormatRulesNegative(rowFrom, columnFrom, rowTo, columnTo, "[+-]?(?:\d+\.?\d*|\.\d+)", ERROR_COLOR);

  private initSheets() {
    this.entitySheetSettings.forEach((entitySheetSetting) => {
      const sheet = this.spreadsheet.getSheetByName(entitySheetSetting.sheetName);
      if (!sheet) {
        throw new Error(`未定義のシート名：${entitySheetSetting.sheetName}`);
      }
      sheet.clearConditionalFormatRules();
      sheet.setValue(entitySheetSetting.baseRow + 0, entitySheetSetting.baseColumn + 0, entitySheetSetting.entityDef.name);
      entitySheetSetting.entityDef.fields.forEach((field, index) => {
        sheet.setValue(entitySheetSetting.baseRow + 1, entitySheetSetting.baseColumn + index, field.comment);
        sheet.setValue(entitySheetSetting.baseRow + 2, entitySheetSetting.baseColumn + index, field.name);
      });
      sheet.setTableBorderRange(
        entitySheetSetting.baseRow,
        entitySheetSetting.baseColumn,
        entitySheetSetting.size + 3,
        entitySheetSetting.entityDef.fields.length
      );
      sheet.setNumberFormatRange(
        entitySheetSetting.baseRow,
        entitySheetSetting.baseColumn,
        entitySheetSetting.size + 3,
        entitySheetSetting.entityDef.fields.length, 
        '@'
      );
    });
  }
}
