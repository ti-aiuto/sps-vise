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
      sheet.setValue(entitySheetSetting.baseRow + 0, entitySheetSetting.baseColumn + 0, entitySheetSetting.entityDef.name);
      sheet.mergeRange(entitySheetSetting.baseRow + 0, entitySheetSetting.baseColumn + 0, 1, entitySheetSetting.entityDef.fields.length);

      let columnCount = 0;

      // Entityの定義
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
      columnCount += entitySheetSetting.entityDef.fields.length + 1;

      // Entityのリレーションの定義
      entitySheetSetting.entityDef.relations.forEach((relation) => {
        sheet.setValue(entitySheetSetting.baseRow + 0, entitySheetSetting.baseColumn + columnCount + 0, `${relation.relationType}`);
        sheet.mergeRange(entitySheetSetting.baseRow + 0, entitySheetSetting.baseColumn + columnCount + 0, 1, 4);

        sheet.setValue(entitySheetSetting.baseRow + 2, entitySheetSetting.baseColumn + columnCount + 0, `${entitySheetSetting.entityDef.name}#id`);
        sheet.mergeRange(entitySheetSetting.baseRow + 2, entitySheetSetting.baseColumn + columnCount + 0, 1, 2);
        sheet.setValue(entitySheetSetting.baseRow + 2, entitySheetSetting.baseColumn + columnCount + 2, `${relation.targetEntityName}#id`);
        sheet.mergeRange(entitySheetSetting.baseRow + 2, entitySheetSetting.baseColumn + columnCount + 2, 1, 2);
        sheet.setTableBorderRange(
          entitySheetSetting.baseRow,
          entitySheetSetting.baseColumn + columnCount,
          entitySheetSetting.size + 3,
          4
        );

        columnCount += 5;
      });

      sheet.setNumberFormatRange(
        entitySheetSetting.baseRow,
        entitySheetSetting.baseColumn,
        entitySheetSetting.size + 3,
        columnCount,
        '@'
      );
    });
  }
}
