import { EntityDef } from "./EntityDef";
import { SheetWrapper } from "./SheetWrapper";

const MAX_SIZE = 300;
const ERROR_COLOR = '#e57373';

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
    this.sheet.clearConditionalFormatRules();
    this.entityDef.fields.forEach((field, index) => {
      this.sheet.setValue(this.baseY + 0, this.baseX + index, field.comment);
      this.sheet.setValue(this.baseY + 1, this.baseX + index, field.name);
      const rowFrom = this.baseY + 2;
      const columnFrom = this.baseX + index;
      const rowTo = this.baseY + 2 + MAX_SIZE - 1;
      const columnTo = this.baseX + index;
      if (field.dataType === 'integer') {
        this.sheet.setRegexConditionalFormatNegative(rowFrom, columnFrom, rowTo, columnTo, "[+-]?\d+", ERROR_COLOR);
      } else if (field.dataType === 'number') {
        this.sheet.setRegexConditionalFormatNegative(rowFrom, columnFrom, rowTo, columnTo, "[+-]?(?:\d+\.?\d*|\.\d+)", ERROR_COLOR);
      }
    });
  }
}
