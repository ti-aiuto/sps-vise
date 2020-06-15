interface EntityRelationSheetSettingArgs {
  relationName: string;
  sheetName?: string | undefined;
  baseRow?: number | undefined;
  baseColumn?: number | undefined;
  size?: number | undefined;
}

// TODO: ここ定数化
const MAX_SIZE = 50;

export class EntityRelationSheetSetting implements Required<EntityRelationSheetSettingArgs> {
  relationName: string;

  sheetName: string;

  baseRow: number;

  baseColumn: number;

  size: number;

  constructor(args: EntityRelationSheetSettingArgs) {
    this.relationName = args.relationName;
    this.sheetName = args.sheetName ?? args.relationName;
    this.baseRow = args.baseRow ?? 1;
    this.baseColumn = args.baseColumn ?? 1;
    this.size = args.size ?? MAX_SIZE;
  }
}
