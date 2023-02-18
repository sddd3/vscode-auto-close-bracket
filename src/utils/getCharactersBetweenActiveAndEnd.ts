import { window } from 'vscode';

/**
 * active と end の間の文字列を取得する
 * @returns active と end の間の文字列
 */
const getCharactersBetweenActiveAndEnd = () => {
  const editor = window.activeTextEditor;
  if (!editor) return '';

  const line = editor.document.lineAt(editor.selection.active.line);
  return line.text.substring(editor.selection.active.character + 1);
};

export default getCharactersBetweenActiveAndEnd;
