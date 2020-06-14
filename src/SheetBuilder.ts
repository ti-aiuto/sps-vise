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

  build(): void {
    this.sheet.clearConditionalFormat();
    this.entityDef.fields.forEach((field, index) => {
      this.sheet.setValue(this.baseY + 0, this.baseX + index, field.comment);
      this.sheet.setValue(this.baseY + 1, this.baseX + index, field.name);
      if (field.dataType === 'integer') {
        this.sheet.setRegexConditionalFormat(this.baseY + 2, this.baseY + 2 + MAX_SIZE - 1, this.baseX + index, this.baseX + index, "[+-]?\\d+", "#00F");
      } else if (field.dataType === 'number') {
        this.sheet.setRegexConditionalFormat(this.baseY + 2, this.baseY + 2 + MAX_SIZE - 1, this.baseX + index, this.baseX + index, " [+-]?(?:\\d+\\.?\\d*|\\.\\d+)", "#00F");
      }
    });
  }
}
