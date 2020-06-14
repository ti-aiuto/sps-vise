import { EntityDef } from "./EntityDef";
import { EntityValue } from "./EntityValue";

interface SpreadsheetBuilderArgs {
  entityDef: EntityDef;
  sheetName: string;
  baseX?: number | undefined;
  baseY?: number | undefined;
  values?: EntityValue[] | undefined;
}

export class SpreadsheetBuilder implements Required<SpreadsheetBuilderArgs>{
  entityDef: EntityDef;
  sheetName: string;
  baseX: number;
  baseY: number;
  values: EntityValue[];

  constructor(
    private args: SpreadsheetBuilderArgs
  ) {
    // TODO: ここに定義のバリデーション入れる
    this.entityDef = args.entityDef;
    this.sheetName = args.sheetName;
    this.baseX = args.baseX ?? 0;
    this.baseY = args.baseY ?? 0;
    this.values = args.values ?? [];
  }

  build() {
  }
}
