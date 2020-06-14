export interface EntityRelationDefArgs {
  relationType: 'one_to_many' | 'many_to_many';
  targetEntityName: string;
  name: string;
}

export class EntityRelationDef implements EntityRelationDefArgs {
  relationType: 'one_to_many' | 'many_to_many';

  targetEntityName: string;

  name: string;

  constructor(args: EntityRelationDefArgs) {
    // TODO: ここに定義のバリデーション入れる
    this.relationType = args.relationType;
    this.targetEntityName = args.targetEntityName;
    this.name = args.name;
  }
}
