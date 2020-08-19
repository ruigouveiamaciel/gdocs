import marked from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-lua";
import "prismjs/themes/prism.css"

marked.setOptions({
	highlight: function (code, lang = "lua") {
		return Prism.highlight(code, Prism.languages[lang], lang);
	},
});

export default marked;
