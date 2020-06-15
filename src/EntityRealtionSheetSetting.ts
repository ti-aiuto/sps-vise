interface EntityRelationSheetSettingArgs {
  relationName: string;
  sheetName?: string | undefined;
  baseRow: number | undefined;
  size?: number | undefined;
  homeIdColumnNumber: number;
  foreignIdColumnNumber: number;
  orderNumberColumnNumber?: number | undefined;
}

// TODO: ここ定数化
const MAX_SIZE = 50;

export class EntityRelationSheetSetting
  implements Required<EntityRelationSheetSettingArgs> {
  relationName: string;

  sheetName: string;

  baseRow: number;

  size: number;

  homeIdColumnNumber: number;

  foreignIdColumnNumber: number;

  orderNumberColumnNumber: number;

  constructor(args: EntityRelationSheetSettingArgs) {
    this.relationName = args.relationName;
    this.sheetName = args.sheetName ?? args.relationName;
    this.baseRow = args.baseRow ?? 1;
    this.size = args.size ?? MAX_SIZE;
    this.homeIdColumnNumber = args.homeIdColumnNumber ?? undefined;
    this.foreignIdColumnNumber = args.foreignIdColumnNumber ?? undefined;
    this.orderNumberColumnNumber = args.orderNumberColumnNumber ?? NaN;
  }
}
