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
      entitySheetSetting.baseRow + 3,
      entitySheetSetting.baseColumn,
      entitySheetSetting.size + 3,
      entitySheetSetting.entityDef.fields.length
    );

    entityCellValues.forEach((row) => {
      if (row.some((item) => item.length > 0)) {
        result.push(this.buildObject(entitySheetSetting.entityDef, row));
      }
    });

    // Entityのリレーションの定義
    entitySheetSetting.entityDef.relations.forEach((relation, index) => {
      result.forEach((item) => item[relation.name] = []);

      const currentColumnPosition = entitySheetSetting.entityDef.fields.length + 1 + index * 5;
      const relationCellValues = sheet.getValuesRange(
        entitySheetSetting.baseRow + 3,
        entitySheetSetting.baseColumn + currentColumnPosition,
        entitySheetSetting.size + 3,
        4 // TODO: この辺の値どこかに定数化する
      );

      relationCellValues.forEach((row, index) => {
        if (row.some((item) => item.length > 0)) {
          const homeId = row[0];
          const foreignId = row[2];
          if (homeId.length === 0 || foreignId.length === 0) {
            throw new Error(`${index + 1}番目の項目のIDが未入力`);
          }
          // TODO: ここの値の比較も切り出したい
          const entity = result.find((item) => item['id'] + '' === homeId + '');
          if (!entity) {
            throw new Error(`${index + 1}番目の項目のIDが不明`);
          }
          // NOTICE: idはstring固定仕様にしたい
          (entity[relation.name] as unknown as string[]).push(foreignId);
        }
      });
    });

    return result;
  }

  // TODO: ここの処理を切り出す
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
