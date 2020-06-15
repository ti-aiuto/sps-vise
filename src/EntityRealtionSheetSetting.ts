interface EntityRelationSheetSettingArgs {
  relationName: string;
  sheetName?: string | undefined;
  baseRow: number | undefined;
  size?: number | undefined;
  homeIdColumnNumber: string;
  foreignIdColumnNumber: string;
  orderNumberColumnNumber?: string  | undefined;
}

// TODO: ここ定数化
const MAX_SIZE = 50;

export class EntityRelationSheetSetting implements Required<EntityRelationSheetSettingArgs> {
  relationName: string;

  sheetName: string;

  baseRow: number;

  size: number;

  homeIdColumnNumber: string;

  foreignIdColumnNumber: string;

  orderNumberColumnNumber: string | undefined;

  constructor(args: EntityRelationSheetSettingArgs) {
    this.relationName = args.relationName;
    this.sheetName = args.sheetName ?? args.relationName;
    this.baseRow = args.baseRow ?? 1;
    this.size = args.size ?? MAX_SIZE;
    this.orderNumberColumnNumber =  args.orderNumberColumnNumber ?? undefined;
    this.homeIdColumnNumber = args.homeIdColumnNumber ?? undefined;
    this.foreignIdColumnNumber = args.foreignIdColumnNumber ?? undefined;
  }
}
