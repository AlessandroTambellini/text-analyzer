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
            entry[1]['occurrence'] = tmp;
			// entry[1] = (entry[1] / this.tot_chars * 100).toFixed(2);
		}

		return entries;
	}
}

// I modularize a bit by wrapping everything inside this listener
// and by using lambda functions inside it.
document.querySelector('#text-form').addEventListener("submit", (e) => {
	e.preventDefault();
	
	const text = e.target.querySelector("textarea").value;

	// 1) Get all words
	const get_all_words = (text) => {
		const filtered_text = text.replace(/[^a-z0-9\s]/gi, '').split(' ');
		const words_set = new Set(filtered_text);
		words_set.delete('');
		return words_set;
	}
	const words_set = get_all_words(text);

	// 2) Get chars histogram
	const get_chars_histogram = (text) => {
		const chars_histogram = new Histogram();
		chars_histogram.analyze(text);
		return chars_histogram.toString();
	}
	const chars_histogram = get_chars_histogram(text);

	/*
	 * 
	 * Now that I got all the data about the text
	 * I can show it to the user
	 * 
	 */ 

	const num_words_span = document.querySelector('#num-of-words > span');
	num_words_span.textContent = words_set.size;

	const words_set_p =  document.querySelector('#words-set');
	// First, remove the previous list
	if (words_set_p.querySelector('ul')) {
		words_set_p.querySelector('ul').remove();

		// Note: I could leave the <ul> element and remove just its childs
		// But it does not seem to be convinient to me
	}
	const words_set_ul = document.createElement('ul');
	words_set_p.appendChild(words_set_ul);
	for (const word of words_set) {
		const word_li = document.createElement('li');
		word_li.textContent = word;
		words_set_ul.appendChild(word_li);
	}

	const char_occurrence_p = document.querySelector('#char-occurrence');
	if (char_occurrence_p.querySelector('ul')) {
		char_occurrence_p.querySelector('ul').remove();
	}
	const char_occurrence_ul = document.createElement('ul');
	char_occurrence_p.appendChild(char_occurrence_ul);
	for (const char of chars_histogram) {
		const li = document.createElement('li');
		li.textContent = `${char[0]}: ${char[1]['occurrence']} (${char[1]['%']}%)`;
		char_occurrence_ul.appendChild(li);
	}

	const tot_num_chars_span = document.querySelector('#tot-num-chars > span');
	tot_num_chars_span.textContent = text.replace(/\s/g, "").length;
});

/*
(*1) 
In this case it's easy because I have to just substitute the last string.
In a real world scenario, in most cases the text to be substituted may be in any position,
so, in that case would be handy to have a special symbol to keep track of the position 
where to substitut the text. E.g. React uses '{{ variable }}'
*/

