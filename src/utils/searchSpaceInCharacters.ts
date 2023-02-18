/**
 * character の中にスペースが存在するか確認し index を返す。ただし、スペースの前後に , または ; がある場合はその index はスキップする
 * @param character
 * @returns -1：存在しない -1以外：存在する
 */
const searchSpaceInCharacters = (character: string) => {
  const length = Array.from(character).length;
  for (let i = 0; i < length; i++) {
    if (/\s/.test(character[i])) {
      if (
        (character[i - 1] && /[,;:]/.test(character[i - 1])) ||
        (character[i + 1] && /[,;:]/.test(character[i + 1]))
      ) {
        continue;
      }
      return i;
    }
  }
  return false;
};

export default searchSpaceInCharacters;
