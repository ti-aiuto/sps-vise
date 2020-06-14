import { EntityDef } from "./EntityDef";
import { EntityValue } from "./EntityValue";

interface SpreadsheetBuilderArgs {
  entityDef: EntityDef;
  sheetName: string;
  baseX?: string | undefined;
  baseY?: string | undefined;
  values?: EntityValue[] | undefined;
}

export class SpreadsheetBuilder implements Required<SpreadsheetBuilderArgs>{
  entityDef: EntityDef;
  sheetName: string;
  baseX: string;
  baseY: string;
  values: EntityValue[];

  constructor(
    private args: SpreadsheetBuilderArgs
  ) {
    // TODO: ここに定義のバリデーション入れる
    this.entityDef = args.entityDef;
    this.sheetName = args.sheetName;
    this.baseX = args.baseX ?? '';
    this.baseY = args.baseY ?? '';
    this.values = args.values ?? [];
  }

  build() {
  }
}
