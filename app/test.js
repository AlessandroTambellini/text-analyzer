const text2 = "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const text = 'lorem ipsum ipsum'
const filtered_text = text2.replace(/[^a-z0-9\s]/gi, '').split(' ');

// 1) Get all words
const get_all_words = (text) => {
    const filtered_text = text.replace(/[^a-z0-9\s]/gi, '').split(' ');
    const words_set = new Set(filtered_text);
    words_set.delete('');
    return words_set;
}
const words_set = get_all_words(text2);
const ws_t = words_set.size;

// 2) Count words
const count_words = (text) => {
    const filtered_text = text.replace(/[^a-z0-9\s]/gi, '').split(' ');
    const num_words = filtered_text.filter(word => word !== '').length;
    return num_words;
}
const num_words = count_words(text);

// 3) Get char frequency
const get_char_frequency = (text) => {
    const chars = {};// Is an object in js a map or a set?
    for (const char of text.replace(/\s/g, '')) {
        if (chars[char]) {
            chars[char] += 1;
        } else {
            chars[char] = 1;
        }
    }
    console.log(typeof chars);
    return chars;
}
const chars = get_char_frequency(text2);


class CharMap extends Map {
    constructor(default_value) {
        super();
        this.default_value = default_value;
    }
    
    get(key) {
        return this.has(key) ? super.get(key) : this.default_value;
    }
}

class Histogram {
    constructor() {
        this.chars_map = new CharMap(0);
        this.tot_chars = 0;
    }
    
    analyze(text) {
        if (!text) {
            console.error("Error: no text passed as argument to be analyzed")
            return;
        }
        text = text.replace(/\s/g, "");
		for (const char of text) {
			const count = this.chars_map.get(char);
			this.chars_map.set(char, count + 1);
			this.tot_chars += 1;
		}
    }

    toString() {
		const entries = [...this.chars_map]; // [key, value]
		
        // Sort in descendent order based on the number of instances,
        // Otherwise alphabetically
		entries.sort((a, b) => {
			if (a[1] === b[1]) {
			    return a[0] < b[0] ? -1 : 1;
			} else {
			    return b[1] - a[1];
			}
		})

		for (const entry of entries) {
            const tmp = entry[1];
            entry[1] = {};
            entry[1]['%'] = (tmp / this.tot_chars * 100).toFixed(2);
            entry[1]['occurences'] = tmp;
			// entry[1] = (entry[1] / this.tot_chars * 100).toFixed(2);
		}

		return entries;
	}
}

const my_map = new CharMap(0);
const entries = [...my_map]

const my_histogram = new Histogram();
my_histogram.analyze(text2);
const mhs = my_histogram.toString();


let txt = 'Tot. Number of Chars: {}<br />(empty spaces are excluded)'
txt = txt.replace('{}', txt.length);


