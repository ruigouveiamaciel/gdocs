import Tag from "../classes/Tags/Tag";
import SelectorTag from "../classes/Tags/SelectorTag";
import BooleanTag from "../classes/Tags/BooleanTag";
import AliasTag from "../classes/Tags/AliasTag";
import DescriptionTag from "../classes/Tags/DescriptionTag";

export type AnyTag = Tag | SelectorTag | BooleanTag | AliasTag | DescriptionTag;
