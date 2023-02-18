// 引数で受け取った Position の次の文字を取得する
import { Range, window } from 'vscode';

/**
 * active の次の文字を返す
 * @returns active の次の文字または空文字
 */
const getNextCharacter = () => {
  const editor = window.activeTextEditor;
  if (!editor) return '';

  const translate = editor.selection.active.translate(0, 1);
  return editor.document.getText(new Range(editor.selection.active, translate)) ?? '';
};

export default getNextCharacter;
