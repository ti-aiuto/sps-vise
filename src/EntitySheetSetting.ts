import { EntityDef } from ".";

const MAX_SIZE = 50;

export interface EntitySheetSettingArgs {
  entityDef: EntityDef;
  sheetName?: string;
  baseRow?: number | undefined;
  baseColumn?: number | undefined;
  size?: number | undefined;
}

export class EntitySheetSettings implements Required<EntitySheetSettingArgs> {
  entityDef: EntityDef;
  sheetName: string;
  baseRow: number;
  baseColumn: number;
  size: number;

  constructor(args: EntitySheetSettingArgs) {
    this.entityDef = args.entityDef;
    this.sheetName = args.sheetName ?? args.entityDef.name;
    this.baseRow = args.baseRow ?? 1;
    this.baseColumn = args.baseColumn ?? 1;
    this.size = args.size ?? MAX_SIZE;
  }
}
