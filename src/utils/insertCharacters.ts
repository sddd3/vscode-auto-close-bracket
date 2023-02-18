import { Position, TextEditorEdit, window } from 'vscode';

/**
 * characters を position に insert する
 * @param position
 * @param characters
 * @returns void
 */
const insertCharacters = (position: Position, characters: string) => {
  const editor = window.activeTextEditor;
  if (!editor) return;

  editor.edit((editBuilder: TextEditorEdit) => {
    editBuilder.insert(position, characters);
  });
};

export default insertCharacters;
