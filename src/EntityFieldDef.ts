export type EntityFieldValue = 'string' | 'number' | 'boolean';

export interface EntityFieldDefArgs {
  name: string;
  dataType: EntityFieldValue;
  allowBlank?: boolean | undefined;
  unique?: boolean | undefined;
  comment?: string | undefined;
  immutable?: boolean | undefined;
}

export class EntityFieldDef implements Required<EntityFieldDefArgs> {
  name: string;

  dataType: EntityFieldValue;

  allowBlank: boolean;

  unique: boolean;

  comment: string;

  immutable: boolean;

  constructor(args: EntityFieldDefArgs) {
    // TODO: ここに定義のバリデーション入れる
    this.name = args.name;
    this.dataType = args.dataType;
    this.allowBlank = args.allowBlank ?? true;
    this.unique = args.unique ?? false;
    this.comment = args.comment ?? '';
    this.immutable = args.immutable ?? false;
  }
}
