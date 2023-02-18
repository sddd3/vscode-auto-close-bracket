import { Position } from 'vscode';

/**
 * 引数で受け取った position が１行目の１文字目かどうか
 * @param position
 * @returns true: １文字目 false: １文字目ではない
 */
const isFirstLineFirstCharactor = (position: Position) => {
  return position.isEqual(new Position(0, 0));
};

export default isFirstLineFirstCharactor;
