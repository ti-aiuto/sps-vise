import { SpreadsheetWrapper } from "./SpreadsheetWrapper";
import { EntitySheetSettings } from ".";
import { EntityValue } from "./EntityValue";

interface JSONBuilderArgs {
  spreadsheet: SpreadsheetWrapper;
  entitySheetSettings: EntitySheetSettings[];
}

export class JSONBuilder {
  spreadsheet: SpreadsheetWrapper;

  entitySheetSettings: EntitySheetSettings[];

  constructor(
    args: JSONBuilderArgs
  ) {
    this.spreadsheet = args.spreadsheet;
    this.entitySheetSettings = args.entitySheetSettings;
  }

  build(): { [key: string]: EntityValue[] } {

    this.entitySheetSettings.forEach((entitySheetSetting) => {
      const sheet = this.spreadsheet.getSheetByName(entitySheetSetting.sheetName);
      if (!sheet) {
        throw new Error(`未定義のシート名：${entitySheetSetting.sheetName}`);
      }
      sheet.setTableBorderRange(
        entitySheetSetting.baseRow,
        entitySheetSetting.baseColumn,
        entitySheetSetting.size + 3,
        entitySheetSetting.entityDef.fields.length
      );

      // Entityのリレーションの定義
      entitySheetSetting.entityDef.relations.forEach((relation, index) => {
        const currentColumnPosition = entitySheetSetting.entityDef.fields.length + 1 + index * 5;

        sheet.setTableBorderRange(
          entitySheetSetting.baseRow,
          entitySheetSetting.baseColumn + currentColumnPosition,
          entitySheetSetting.size + 3,
          4
        );
      });
    });

    return {};
  }
}
