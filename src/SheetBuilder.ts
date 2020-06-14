import { EntityDef } from "./EntityDef";
import { SheetWrapper } from "./SheetWrapper";

const MAX_SIZE = 500;

interface SheetBuilderArgs {
  sheet: SheetWrapper;
  entityDef: EntityDef;
  baseX?: number | undefined;
  baseY?: number | undefined;
  size?: number | undefined;
}

export class SheetBuilder implements Required<SheetBuilderArgs>{
  sheet: SheetWrapper;
  entityDef: EntityDef;
  baseX: number;
  baseY: number;
  size: number;

  constructor(
    args: SheetBuilderArgs
  ) {
    // TODO: ここに定義のバリデーション入れる
    this.sheet = args.sheet;
    this.entityDef = args.entityDef;
    this.baseX = args.baseX ?? 1;
    this.baseY = args.baseY ?? 1;
    this.size = args.size ?? MAX_SIZE;
  }

  build() {
    this.entityDef.fields.forEach((field, index) => {
      this.sheet.setValue(index, 0, field.comment);
      this.sheet.setValue(index, 1, field.name);
    });
  }
}
