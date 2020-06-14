export interface EntityDefArgs {
  name: string;
}

export class EntityDef implements EntityDefArgs {
  name: string;

  constructor(args: EntityDefArgs) {
    // TODO: ここに定義のバリデーション入れる
    this.name = args.name;
  }
}
