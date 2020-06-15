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

  constructor(args: JSONBuilderArgs) {
    this.spreadsheet = args.spreadsheet;
    this.entitySheetSettings = args.entitySheetSettings;
    this.entityName = args.entityName;
  }

  build(): EntityValue[] {
    const entitySheetSetting = this.entitySheetSettings.find(
      (item) => item.entityDef.name === this.entityName
    );
    if (!entitySheetSetting) {
      throw new Error(`未定義のEntity名：${this.entityName}`);
    }

    const result: EntityValue[] = [];
    {
      const entitySheet = this.spreadsheet.getSheetByName(
        entitySheetSetting.sheetName
      );
      if (!entitySheet) {
        throw new Error(`未定義のシート名：${entitySheetSetting.sheetName}`);
      }

      const entityCellValues = entitySheet.getValuesRange(
        entitySheetSetting.baseRow + 3,
        entitySheetSetting.baseColumn,
        entitySheetSetting.size,
        entitySheetSetting.entityDef.fields.length
      );

      entityCellValues.forEach((row) => {
        if (row.some((item) => item.length > 0)) {
          result.push(this.buildObject(entitySheetSetting.entityDef, row));
        }
      });
    }

    // Entityのリレーションの定義
    entitySheetSetting.relationSheetSettings.forEach((relationSheetSetting) => {
      const relation = entitySheetSetting.entityDef.relations.find(
        (item) => item.name === relationSheetSetting.relationName
      );
      if (!relation) {
        throw new Error(
          `リレーション定義が不明：${relationSheetSetting.relationName}`
        );
      }
      const relationSheet = this.spreadsheet.getSheetByName(
        relationSheetSetting.sheetName
      );
      if (!relationSheet) {
        throw new Error(`未定義のシート名：${relationSheetSetting.sheetName}`);
      }

      const relationCellValues: string[][] = [];
      for (let i = 1; i <= relationSheetSetting.size; i++) {
        relationCellValues.push([]);
      }
      relationSheet
        .getValuesRange(
          relationSheetSetting.baseRow + 3,
          relationSheetSetting.homeIdColumnNumber,
          relationSheetSetting.size,
          1
        )
        .forEach((item, index) => relationCellValues[index].push(item[0]));
      relationSheet
        .getValuesRange(
          relationSheetSetting.baseRow + 3,
          relationSheetSetting.foreignIdColumnNumber,
          relationSheetSetting.size,
          1
        )
        .forEach((item, index) => relationCellValues[index].push(item[0]));
      if (!Number.isNaN(relationSheetSetting.orderNumberColumnNumber)) {
        relationSheet
          .getValuesRange(
            relationSheetSetting.baseRow + 3,
            relationSheetSetting.orderNumberColumnNumber,
            relationSheetSetting.size,
            1
          )
          .forEach((item, index) => relationCellValues[index].push(item[0]));
      }

      const filteredRealtionCellValues: string[][] = [];
      relationCellValues.forEach((row, cellIndex) => {
        if (row.some((item) => item.length > 0)) {
          const homeId = row[0];
          const foreignId = row[1];
          const orderNumber = row[2];
          if (homeId.length === 0 || foreignId.length === 0) {
            throw new Error(`${cellIndex + 1}番目の項目のIDが未入力`);
          }
          // TODO: ここの値の比較も切り出したい
          const entity = result.find((item) => `${item.id}` === `${homeId}`);
          if (!entity) {
            throw new Error(`${cellIndex + 1}番目の項目のIDが未入力`);
          }
          if (orderNumber !== undefined && Number.isNaN(Number(orderNumber))) {
            throw new Error(`${cellIndex + 1}番目の項目の並び順が未入力`);
          }
          filteredRealtionCellValues.push(row);
        }
      });

      result.forEach((entity) => {
        const entityMatchedRows = filteredRealtionCellValues.filter(
          (row) => `${row[0]}` === `${entity.id}`
        );
        const entityMatchedRowsSorted = Number.isNaN(relationSheetSetting.orderNumberColumnNumber) ? entityMatchedRows :  this.sortBy<string[]>(
          entityMatchedRows,
          (item) => Number(item[2])
        );
        const relationResult = entityMatchedRowsSorted.map((item) => item[1]);
        // eslint-disable-next-line no-param-reassign
        entity[relation.name] = relationResult;
      });
    });
    return result;
  }

  // TODO: ここの処理を切り出す
  private buildObject(entityDef: EntityDef, row: string[]): EntityValue {
    const result: EntityValue = {};
    entityDef.fields.forEach((field, index) => {
      const rawValue = row[index];
      if (rawValue === "") {
        if (field.allowBlank) {
          result[field.name] = null;
          return;
        }
        throw new Error(`${field.name}の値が空白です:${JSON.stringify(row)}`);
      }
      if (field.dataType === "string") {
        result[field.name] = rawValue;
      } else if (field.dataType === "number") {
        const numberParsed = Number(rawValue);
        if (Number.isNaN(numberParsed)) {
          throw new Error(`数値型${field.name}の形式が不正です：${rawValue}`);
        }
        result[field.name] = rawValue;
      }
    });
    return result;
  }

  private sortBy<T>(array: T[], f: (item: T) => any): T[] {
    const cloned = [...array];
    cloned.sort(function (a, b) {
      // NOTICE: 本当はここ非効率だけどそもそもこのメソッドを自力で書いてるのを直したい
      const aComparable = f(a);
      const bComparable = f(b);
      if (aComparable > bComparable) {
        return 1;
      }
      if (aComparable < bComparable) {
        return -1;
      }
      return 0;
    });
    return cloned;
  }
}
