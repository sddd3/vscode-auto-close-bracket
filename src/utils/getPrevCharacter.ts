import { Range, window } from 'vscode';

/**
 * 引数で受け取った Position のひとつ前の文字を取得する
 * @returns 引数で受け取った Position のひとつ前の文字または空文字
 */
const getPrevCharacter = () => {
  const editor = window.activeTextEditor;
  if (!editor) return '';

  const selection = editor.selection;
  const translate = selection.active.translate(0, -1);
  return editor.document.getText(new Range(translate, selection.active)) ?? '';
};

export default getPrevCharacter;
