import { EntityDef } from ".";

const MAX_SIZE = 50;

export interface EntitySheetSettingsArgs {
  entityDef: EntityDef;
  sheetName?: string;
  baseRow?: number | undefined;
  baseColumn?: number | undefined;
  size?: number | undefined;
}

export class EntitySheetSettings implements Required<EntitySheetSettingsArgs> {
  entityDef: EntityDef;
  sheetName: string;
  baseRow: number;
  baseColumn: number;
  size: number;

  constructor(args: EntitySheetSettingsArgs) {
    this.entityDef = args.entityDef;
    this.sheetName = args.sheetName ?? args.entityDef.name;
    this.baseRow = args.baseRow ?? 1;
    this.baseColumn = args.baseColumn ?? 1;
    this.size = args.size ?? MAX_SIZE;
  }
}
