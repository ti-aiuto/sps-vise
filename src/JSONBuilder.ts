import { SpreadsheetWrapper } from "./SpreadsheetWrapper";
import { EntityValue } from "./EntityValue";
import { EntitySheetSettings } from "./EntitySheetSetting";
import { EntityDef } from "./EntityDef";

interface JSONBuilderArgs {
  spreadsheet: SpreadsheetWrapper;
  entitySheetSettings: EntitySheetSettings[];
  entityName: string;
}

export class JSONBuilder implements JSONBuilderArgs {
  spreadsheet: SpreadsheetWrapper;

  entitySheetSettings: EntitySheetSettings[];

  entityName: string;

  constructor(
    args: JSONBuilderArgs
  ) {
    this.spreadsheet = args.spreadsheet;
    this.entitySheetSettings = args.entitySheetSettings;
    this.entityName = args.entityName;
  }

  build(): EntityValue[] {
    const entitySheetSetting = this.entitySheetSettings.find((item) => item.entityDef.name === this.entityName);
    if (!entitySheetSetting) {
      throw new Error(`未定義のEntity名：${this.entityName}`);
    }
    const sheet = this.spreadsheet.getSheetByName(entitySheetSetting.sheetName);
    if (!sheet) {
      throw new Error(`未定義のシート名：${entitySheetSetting.sheetName}`);
    }

    const result: EntityValue[] = [];
    const entityCellValues = sheet.getValuesRange(
      entitySheetSetting.baseRow,
      entitySheetSetting.baseColumn,
      entitySheetSetting.size + 3,
      entitySheetSetting.entityDef.fields.length
    );

    entityCellValues.forEach((row) => {
      if (row.every((item) => item.length > 0)) {
        result.push(this.buildObject(entitySheetSetting.entityDef, row));
      }
    });

    // // Entityのリレーションの定義
    // entitySheetSetting.entityDef.relations.forEach((relation, index) => {
    //   const currentColumnPosition = entitySheetSetting.entityDef.fields.length + 1 + index * 5;

    //   sheet.getValuesRange(
    //     entitySheetSetting.baseRow,
    //     entitySheetSetting.baseColumn + currentColumnPosition,
    //     entitySheetSetting.size + 3,
    //     4
    //   );
    // });

    return result;
  }

  private buildObject(entityDef: EntityDef, row: string[]): EntityValue {
    const result: EntityValue = {};
    entityDef.fields.forEach((field, index) => {
      const rawValue = row[index];
      if (rawValue === '') {
        if (field.allowBlank) {
          result[field.name] = null;
          return;
        } else {
          throw new Error(`${field.name}の値が空白です:${JSON.stringify(row)}`);
        }
      }
      if (field.dataType === 'string') {
        result[field.name] = rawValue;
      } else if (field.dataType === 'number') {
        const numberParsed = Number(rawValue);
        if (numberParsed === NaN) {
          throw new Error(`数値型${field.name}の形式が不正です：${rawValue}`);
        }
        result[field.name] = rawValue;
      }
    });
    return result;
  }
}
