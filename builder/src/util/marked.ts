import marked from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-lua";
import "prismjs/themes/prism.css";

marked.setOptions({
	highlight: function (code, lang) {
		if (Prism.languages[lang]) {
			return Prism.highlight(code, Prism.languages[lang], lang);
		} else {
			return code;
		}
	},
});

export default marked;
