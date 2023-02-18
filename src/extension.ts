import {
  ExtensionContext,
  Position,
  TextDocumentChangeEvent,
  TextDocumentContentChangeEvent,
  window,
  workspace,
} from 'vscode';

import getCharactersBetweenActiveAndEnd from './utils/getCharactersBetweenActiveAndEnd';
import getNextCharacters from './utils/getNextCharacter';
import getPrevCharacters from './utils/getPrevCharacter';
import insertCharacters from './utils/insertCharacters';
import isFirstCharacter from './utils/isFirstCharacter';
import searchSpaceInCharacters from './utils/searchSpaceInCharacters';

const brackets = ['[', '(', '{'];

/**
 * 拡張機能のエントリーポイント
 * @param context
 */
export function activate(context: ExtensionContext) {
  workspace.onDidChangeTextDocument(
    (event: TextDocumentChangeEvent) => {
      if (!event.contentChanges[0]) return;
      // 括弧を閉じることができるか検証する
      if (checkBracketInsertion(event.contentChanges[0]) === false) return;

      // 閉じ括弧を insert する
      autoCloseBrackets(event.contentChanges[0]);
    },
    null,
    context.subscriptions
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}

/**
 * 括弧を insert 可能か検証する
 * @param contentChange
 * @returns
 */
const checkBracketInsertion = (contentChange: TextDocumentContentChangeEvent) => {
  // 入力された文字か確認する
  if (!isBracket(contentChange)) return false;
  // start.lineとend.lineが等しい場合に真。
  if (!contentChange.range.isSingleLine) return false;
  // 最初の文字じゃない場合、入力した文字の前がスペースか確認する
  if (!isFirstCharacter(contentChange.range.start)) {
    if (!/\s/.test(getPrevCharacters())) return false;
  }
  // 入力した文字の次に文字が存在するか確認する
  if (!getNextCharacters()) return false;

  return true;
};

/**
 * 閉じ括弧を自動で insert する
 * @param contentChange
 * @returns void
 */
const autoCloseBrackets = (contentChange: TextDocumentContentChangeEvent) => {
  // カーソルから行末までの文字列を取得する
  const activeToEndText = getCharactersBetweenActiveAndEnd();
  // カーソルから行末までの間にスペースが含まれているか確認する。
  const indexOfSpace = searchSpaceInCharacters(activeToEndText);
  // スペースが含まれていなかった場合は最後の文字の index を取得し、含まれている場合はスペースの index を取得する
  const insertBracketIndex = indexOfSpace ? indexOfSpace : Array.from(activeToEndText).length;

  const editor = window.activeTextEditor;
  if (!editor) return;
  // 閉じ括弧の insert 個所を作成
  const insertPosition = new Position(
    editor.selection.active.line,
    editor.selection.active.character + insertBracketIndex + 1
  );
  // 入力された括弧に対応した閉じ括弧を取得
  const closeBracekt = getCloseBracket(contentChange.text);
  // 閉じ括弧を取得した箇所に insert
  insertCharacters(insertPosition, closeBracekt);
};

/**
 * 入力した文字が bracket か判定する
 * @param text
 * @returns true: 入力した文字が括弧
 */
const isBracket = (contentChanges: TextDocumentContentChangeEvent) => {
  return brackets.includes(contentChanges.text);
};

/**
 * 引数で受け取った括弧に対応する閉じ括弧を返す
 * @param bracket
 * @returns string
 */
const getCloseBracket = (bracket: string) => {
  switch (bracket) {
    case '[':
      return ']';
    case '{':
      return '}';
    case '(':
      return ')';
    default:
      return '';
  }
};
