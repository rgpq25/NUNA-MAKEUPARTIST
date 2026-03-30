export interface LexicalRootNode {
	type: "root";
	children: LexicalNode[];
	direction?: "ltr" | "rtl" | null;
	format?: "" | "left" | "center" | "right" | "justify";
	indent?: number;
	version?: number;
}

export interface LexicalRichText {
	root: LexicalRootNode;
}

export interface LexicalParagraphNode {
	type: "paragraph";
	children: LexicalNode[];
	format?: "" | "left" | "center" | "right" | "justify" | "start" | "end";
	version?: number;
}

export interface LexicalHeadingNode {
	type: "heading";
	tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	children: LexicalNode[];
	format?: "" | "left" | "center" | "right" | "justify" | "start" | "end";
	version?: number;
}

export interface LexicalTextNode {
	type: "text";
	text: string;
	format?: number;
	style?: string;
	mode?: string;
	detail?: number;
	version?: number;
}

export interface LexicalLineBreakNode {
	type: "linebreak";
	version?: number;
}

export interface LexicalListNode {
	type: "list";
	listType?: "bullet" | "number" | "check";
	children: LexicalListItemNode[];
	format?: "" | "left" | "center" | "right" | "justify" | "start" | "end";
	version?: number;
}

export interface LexicalQuoteNode {
	type: "quote";
	children: LexicalNode[];
	format?: "" | "left" | "center" | "right" | "justify" | "start" | "end";
	version?: number;
}

export interface LexicalHorizontalRuleNode {
	type: "horizontalrule";
	version?: number;
}

export interface LexicalListItemNode {
	type: "listitem";
	children: LexicalNode[];
	checked?: boolean;
	value?: number;
	version?: number;
}

export interface LexicalLinkNode {
	type: "link" | "autolink";
	fields?: {
		url?: string;
		newTab?: boolean;
	};
	children: LexicalNode[];
	version?: number;
}

export type LexicalNode =
	| LexicalParagraphNode
	| LexicalHeadingNode
	| LexicalTextNode
	| LexicalLineBreakNode
	| LexicalListNode
	| LexicalQuoteNode
	| LexicalHorizontalRuleNode
	| LexicalListItemNode
	| LexicalLinkNode;

export function createLexicalParagraphs(paragraphs: string[]): LexicalRichText {
	return {
		root: {
			type: "root",
			children: paragraphs.map((paragraph) => ({
				type: "paragraph",
				version: 1,
				children: [
					{
						type: "text",
						version: 1,
						text: paragraph,
						format: 0,
						style: "",
						mode: "normal",
						detail: 0,
					},
				],
			})),
			direction: "ltr",
			format: "",
			indent: 0,
			version: 1,
		},
	};
}
