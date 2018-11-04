# Deprecated Color Detector for Adobe XD

Adobe XD上で作られたアートボード内に非推奨の色が
使われていないかチェックするためのプラグインです。

デザインやアクセシビリティ上の理由で、とある色から別の色に移行する際に
デザイナーが誤って古い色を使ったままにしないようにする目的で作成しました。

※ リリース初期は#616161のみです。追って機能追加で対応します。

![one](https://user-images.githubusercontent.com/6269639/47960992-24879d00-e046-11e8-827c-6368f25dc8e2.png)
![two](https://user-images.githubusercontent.com/6269639/47960995-25203380-e046-11e8-82af-801d18ec2f44.png)
![three](https://user-images.githubusercontent.com/6269639/47960994-25203380-e046-11e8-84b6-277fa07aa7b1.png)
![four](https://user-images.githubusercontent.com/6269639/47960993-24879d00-e046-11e8-9d3f-0d43711bbfa9.png)

## インストール
1. [Releases](https://github.com/Pittan/xd-deprecated-color-detector/releases) より最新のバージョンの `.xdx` ファイルをダウンロードしてください。
2. ダウンロードしたファイルをダブルクリックすると、XDへ追加するか確認されます。

## 使い方
1. アートボードを選択します
2. 「プラグイン」→「非推奨の色が使われていないか探す」をクリックするとアートボード内の塗り・境界線色で非推奨の色が使われていないかをチェックできます。
3. 結果が表示されます。複数のアートボードを選択した場合にはその分だけメッセージが表示されます。

## 開発
1. XDのdevelopフォルダ内に直接cloneすると、そのままXDで使えるようになります。
2. `.xdx` ファイルを生成したい場合は `npm run build-prod` または `yarn build-prod` を叩きます。
3. `dist` フォルダ内のファイルをまとめて`zip`にし、拡張子を`.xdx`にすればOKです。

## 機能追加予定
- 非推奨の色を設定画面で変更できるようにする
