import { Position } from 'vscode';

/**
 * 引数で受け取った position が１文字目か判定する
 * @param position
 * @returns true: １文字目 false: １文字目ではない
 */
const isFirstCharacter = (position: Position) => {
  return position.isEqual(new Position(position.line, 0));
};

export default isFirstCharacter;
