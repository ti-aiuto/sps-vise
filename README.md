# Sps Vise - スプレッドシート万力

# 概要

スプレッドシート入稿で苦しむ全ての人のためのお助けツール

# 使用例

## Entity定義例

```TS
const VideoSubCategory = new SpsVise.EntityDef({
  name: 'VideoSubCategory',
  fields: [
    new SpsVise.EntityFieldDef({
      name: 'id',
      dataType: 'string',
      comment: 'ID（変更不可）'
    }),
    new SpsVise.EntityFieldDef({
      name: 'name',
      dataType: 'string',
      comment: 'サブカテゴリ名'
    }),
  ],
  relations: [
    new SpsVise.EntityRelationDef({
      relationType: 'one_to_many',
      targetEntityName: 'Video',
      name: 'videoIds'
    })
  ]
});
const Video = new SpsVise.EntityDef({
  name: 'Video',
  fields: [
    new SpsVise.EntityFieldDef({
      name: 'id',
      dataType: 'string',
      comment: 'ID（変更不可）'
    }),
    new SpsVise.EntityFieldDef({
      name: 'title',
      dataType: 'string',
      comment: 'ビデオタイトル'
    }),
  ]
});
const googleSpreadsheet = new SpsVise.GoogleSpreadsheetWrapper(SpreadsheetApp.openById("%%ID%%"));
const settings = [
  new SpsVise.EntitySheetSettings({
    entityDef: VideoSubCategory,
    sheetName: 'data',
    baseRow: 1,
    baseColumn: 1,
    size: 15
  }),
  new SpsVise.EntitySheetSettings({
    entityDef: Video,
    sheetName: 'data',
    baseRow: 1,
    baseColumn: 9,
    size: 40
  })
];
```

## JSON出力

### GAS用関数

```TS
var exportJson = function () {
  console.log(JSON.stringify(new SpsVise.JSONBuilder({
    spreadsheet: googleSpreadsheet,
    entitySheetSettings: settings,
    entityName: 'VideoSubCategory'
  }).build(), null, "  "));
  console.log(JSON.stringify(new SpsVise.JSONBuilder({
    spreadsheet: googleSpreadsheet,
    entitySheetSettings: settings,
    entityName: 'Video'
  }).build(), null, "  "));
}
```

### コンソール出力

```JSON
[
  {
    "id": "1",
    "name": "test",
    "videoIds": [
      "2",
      "5"
    ]
  },
  {
    "id": "2",
    "name": "test2",
    "videoIds": [
      "1",
      "4"
    ]
  },
  {
    "id": "3",
    "name": "blue",
    "videoIds": [
      "3"
    ]
  },
  {
    "id": "4",
    "name": "red",
    "videoIds": []
  },
  {
    "id": "5",
    "name": "white",
    "videoIds": []
  }
]
```

```JSON
[
  {
    "id": "1",
    "title": "第一和"
  },
  {
    "id": "2",
    "title": "台に和"
  },
  {
    "id": "3",
    "title": "第三話"
  },
  {
    "id": "4",
    "title": "第四話"
  },
  {
    "id": "5",
    "title": "第五話"
  }
]
```

# 開発

## ビルド
```
npm run build
```

## テスト
```
npm run test
```

## lint

```
npm run lint
```
