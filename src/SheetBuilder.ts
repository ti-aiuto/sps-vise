import { EntityDef } from "./EntityDef";
import { EntityValue } from "./EntityValue";
import { SheetWrapper } from "./SheetWrapper";

interface SheetBuilderArgs {
  sheet: SheetWrapper;
  entityDef: EntityDef;
  baseX?: number | undefined;
  baseY?: number | undefined;
  values?: EntityValue[] | undefined;
}

export class SheetBuilder implements Required<SheetBuilderArgs>{
  sheet: SheetWrapper;
  entityDef: EntityDef;
  baseX: number;
  baseY: number;
  values: EntityValue[];

  constructor(
    private args: SheetBuilderArgs
  ) {
    // TODO: ここに定義のバリデーション入れる
    this.sheet = args.sheet;
    this.entityDef = args.entityDef;
    this.baseX = args.baseX ?? 0;
    this.baseY = args.baseY ?? 0;
    this.values = args.values ?? [];
  }

  build() {
  }
}
