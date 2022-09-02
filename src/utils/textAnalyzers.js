function getUniqueWords(text) {
  const filteredText = text.replace(/[^a-z0-9\s]/gi, '').split(' ');
  const wordSet = new Set(filteredText);
  wordSet.delete('');

  return wordSet;
}

function countWords(text) {
  const filteredText = text.replace(/[^a-z0-9\s]/gi, '').split(' ');
  const wordsQuantity = filteredText.filter(word => word !== '').length;

  return wordsQuantity;
}

function getCharFrequency(text) {
  let charFrequency = {};
  for (const char of text.replace(/\s/g, '')) {
    if (charFrequency[char])
      charFrequency[char]++;
    else
      charFrequency[char] = 1;
  }
  return charFrequency;
}

/* Chars Histogram  */
class DefaultMap extends Map {
  constructor(defaultValue) {
    super();
    this.defaultValue = defaultValue;
  }

  get(key) {
    if (this.has(key)) {
      return super.get(key);
    } else {
      return this.defaultValue;
    }
  }
}

class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0);
    this.totalLetters = 0;
  }

  add(text) {
    text = text.replace(/\s/g, "");
    for (const char of text) {
      const count = this.letterCounts.get(char); // take the previous count
      this.letterCounts.set(char, count + 1); // increment it
      this.totalLetters++;
    }
  }

  toString() {
    let entries = [...this.letterCounts]; // [key, value]
    // orders the array for number of instances, otherwise alphabetically
    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      } else {
        return b[1] - a[1];
      }
    })

    for (const entry of entries) {
      entry[1] = (entry[1] / this.totalLetters * 100).toFixed(2);
    }

    return entries;
  }
}

function getCharsHistogram(text) {
  const charsHistogram = new Histogram();
  charsHistogram.add(text)
  return charsHistogram.toString();
}

export { getUniqueWords, countWords, getCharFrequency, getCharsHistogram };