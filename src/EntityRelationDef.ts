export interface EntityRelationDefArgs {
  relationType: 'one_to_many' | 'many_to_many';
  fieldName?: string | undefined;
  targetEntityName: string;
  targetFieldName: string;
}

export class EntityRelationDef implements EntityRelationDefArgs {
  relationType: 'one_to_many' | 'many_to_many';

  fieldName: string;

  targetEntityName: string;

  targetFieldName: string;

  constructor(args: EntityRelationDefArgs) {
    // TODO: ここに定義のバリデーション入れる
    this.relationType = args.relationType;
    this.fieldName = args.fieldName ?? 'id';
    this.targetEntityName = args.targetEntityName;
    this.targetFieldName = args.targetFieldName;
  }
}
