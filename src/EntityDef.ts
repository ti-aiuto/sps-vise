import { EntityFieldDef } from "./EntityFieldDef";
import { EntityRelationDef } from "./EntityRelationDef";

export interface EntityDefArgs {
  name: string;
  fields: EntityFieldDef[];
  relations?: EntityRelationDef[] | undefined;
}

export class EntityDef implements Required<EntityDefArgs> {
  name: string;
  fields: EntityFieldDef[];
  relations: EntityRelationDef[];

  constructor(args: EntityDefArgs) {
    // TODO: ここに定義のバリデーション入れる
    this.name = args.name;
    this.fields = args.fields;
    this.relations = args.relations ?? [];
  }
}
