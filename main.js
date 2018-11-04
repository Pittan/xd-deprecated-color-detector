const { alert, error } = require('./lib/dialogs.js')

const DEPRECATED_COLORS = ['#616161']

// interface LintResult {
//   objectName: string
//   objectType: string
//   resultItems: {
//     lintType: 'fill', 'stroke' // maybe more in future...?
//     detail: string
//   }[]
// }

/**
 * 非推奨の色を探します
 * @param {*} selection
 * @param {*} documentRoot
 */
async function searchDeprecatedColors (selection, documentRoot) {
  // アートボードごとに探していきたいので、アートボードを1つ以上しない場合は動かない
  if (!selection.hasArtboards) {
    await error('アートボードを1つ以上選択してください')
    return
  }

  // アートボードごとに探していく
  for(let i = 0; i < selection.items.length; i++) {
    const result = digChildNode(selection.items[i])
    if (result.length > 0) {
      const messages = [];
      result.forEach(r => messages.push(createErrorMessage(r)))
      await alert(`アートボード「${selection.items[i].name}」に以下の問題が見つかりました。`, messages)
    } else {
      await alert(`アートボード「${selection.items[i].name}」問題は見つかりませんでした。`)
    }
  }
}

function digChildNode (sceneNode) {
  let errors = []
  sceneNode.children.forEach((childNode, i) => {
    const result = {
      objectName: childNode.name,
      objectType: childNode.constructor.name,
      resultItems: []
    }

      // 塗り色に非推奨の色が使われていないかチェック
    if (childNode.fill && childNode.fill.toHex && childNode.fillEnabled) {
      DEPRECATED_COLORS.forEach(color => {
        if (color === childNode.fill.toHex(true)) {
          result.resultItems.push({
            lintType: 'fill',
            detail: color
          })
        }
      })
    }

    // 境界線色に非推奨の色が使われていないかチェック
    if (childNode.stroke && childNode.strokeEnabled) {
      DEPRECATED_COLORS.forEach(color => {
        if (color === childNode.stroke.toHex(true)) {
          result.resultItems.push({
            lintType: 'stroke',
            detail: color
          })
        }
      })
    }

    if (childNode.children.length > 0) {
      const childResult = digChildNode(childNode)
      errors = errors.concat(childResult)
    }
    if (result.resultItems.length > 0) {
      errors.push(result)
    }
  })
  return errors
}

/**
 * オブジェクトの名前をユーザーにわかりやすいように変換します
 * @param {*} string
 */
function translate (objectType) {
  // オブジェクトの名称
  // https://adobexdplatform.com/plugin-docs/reference/scenegraph.html
  if (objectType === 'Group') { return 'グループ' }
  if (objectType === 'Rectangle') { return '長方形' }
  if (objectType === 'Artboard') { return 'アートボード' }
  if (objectType === 'Ellipse') { return '円' }
  if (objectType === 'Line') { return '線' }
  if (objectType === 'Path') { return 'パス' }
  if (objectType === 'BooleanGroup') { return 'Boolean Group' }
  if (objectType === 'Text') { return 'テキスト' }
  if (objectType === 'SymbolInstance') { return 'シンボル' }
  if (objectType === 'RepeatGrid') { return 'リピートグリッド' }
  if (objectType === 'LinkedGraphic') { return 'Linked Graphic' }
  // GraphicNodeのプロパティ
  // https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#graphicnode
  if (objectType === 'fill') { return '塗り色' }
  if (objectType === 'stroke') { return '境界線色' }
  return objectType
}

/**
 * Lintエラーをもとにエラーダイアログ用のメッセージを作成する
 * @param {*} LintResult
 */
function createErrorMessage (lintResult) {
  let message = []
  message.push(`# ${translate(lintResult.objectType)}`)
  message.push(`## ${lintResult.objectName}`)
  lintResult.resultItems.forEach(item => {
    message.push(`* ${translate(item.lintType)}に ${item.detail} が使われています。`)
  })
  return message
}

module.exports.commands = {
  searchDeprecatedColors: searchDeprecatedColors
}
