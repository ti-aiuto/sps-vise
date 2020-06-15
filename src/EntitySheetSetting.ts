import { EntityDef } from ".";
import { EntityRelationSheetSetting } from "./EntityRealtionSheetSetting";

const MAX_SIZE = 50;

export interface EntitySheetSettingArgs {
  entityDef: EntityDef;
  sheetName?: string;
  baseRow?: number | undefined;
  baseColumn?: number | undefined;
  size?: number | undefined;
  relationSheetSettings?: EntityRelationSheetSetting[] | undefined;
}

export class EntitySheetSettings implements Required<EntitySheetSettingArgs> {
  entityDef: EntityDef;

  sheetName: string;

  baseRow: number;

  baseColumn: number;

  size: number;

  relationSheetSettings: EntityRelationSheetSetting[];

  constructor(args: EntitySheetSettingArgs) {
    this.entityDef = args.entityDef;
    this.sheetName = args.sheetName ?? args.entityDef.name;
    this.baseRow = args.baseRow ?? 1;
    this.baseColumn = args.baseColumn ?? 1;
    this.size = args.size ?? MAX_SIZE;
    this.relationSheetSettings = args.relationSheetSettings ?? [];
  }
}
