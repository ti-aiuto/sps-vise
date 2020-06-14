export interface EntityFieldDefArgs {
  name: string;
  dataType: 'string' | 'number' | 'integer';
  allowBlank?: boolean | undefined;
  unique?: boolean | undefined;
  comment?: string | undefined;
}

export class EntityFieldDef implements Required<EntityFieldDefArgs> {
  name: string;

  dataType: 'string' | 'number' | 'integer';

  allowBlank: boolean;

  unique: boolean;

  comment: string;

  constructor(args: EntityFieldDefArgs) {
    // TODO: ここに定義のバリデーション入れる
    this.name = args.name;
    this.dataType = args.dataType;
    this.allowBlank = args.allowBlank ?? true;
    this.unique = args.unique ?? false;
    this.comment = args.comment ?? '';
  }
}
