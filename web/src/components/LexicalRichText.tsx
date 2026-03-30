import { Fragment } from "react";

import type {
	LexicalHeadingNode,
	LexicalHorizontalRuleNode,
	LexicalLinkNode,
	LexicalListItemNode,
	LexicalListNode,
	LexicalNode,
	LexicalQuoteNode,
	LexicalRichText,
	LexicalTextNode,
} from "../types/richtext";

interface LexicalRichTextProps {
	content: LexicalRichText;
	className?: string;
}

const textClassName = "font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70";
const headingClassNames: Record<LexicalHeadingNode["tag"], string> = {
	h1: "font-['Cormorant_Garamond'] text-4xl leading-none text-[#2a2a2a]",
	h2: "font-['Cormorant_Garamond'] text-3xl leading-none text-[#2a2a2a]",
	h3: "font-['Cormorant_Garamond'] text-2xl leading-none text-[#2a2a2a]",
	h4: "font-['Cormorant_Garamond'] text-xl leading-none text-[#2a2a2a]",
	h5: "font-['Cormorant_Garamond'] text-lg leading-none text-[#2a2a2a]",
	h6: "font-['Cormorant_Garamond'] text-base leading-none text-[#2a2a2a]",
};

export default function LexicalRichText({ content, className }: LexicalRichTextProps) {
	if (!content?.root?.children?.length) {
		return null;
	}

	return (
		<div className={className}>
			{content.root.children.map((node, index) => renderBlockNode(node, `${node.type}-${index}`))}
		</div>
	);
}

function renderBlockNode(node: LexicalNode, key: string) {
	switch (node.type) {
		case "paragraph":
			return (
				<p key={key} className={withAlignmentClass(textClassName, node.format)}>
					{renderInlineNodes(node.children, key)}
				</p>
			);
		case "heading": {
			const Tag = node.tag;

			return (
				<Tag
					key={key}
					className={withAlignmentClass(headingClassNames[node.tag], node.format)}
				>
					{renderInlineNodes(node.children, key)}
				</Tag>
			);
		}
		case "list":
			return renderListNode(node, key);
		case "quote":
			return renderQuoteNode(node, key);
		case "horizontalrule":
			return renderHorizontalRuleNode(node, key);
		default:
			return null;
	}
}

function renderListNode(node: LexicalListNode, key: string) {
	const Tag = node.listType === "number" ? "ol" : "ul";
	const className =
		node.listType === "number"
			? withAlignmentClass(`${textClassName} list-decimal space-y-2 pl-5`, node.format)
			: withAlignmentClass(`${textClassName} list-disc space-y-2 pl-5`, node.format);

	return (
		<Tag key={key} className={className}>
			{node.children.map((item, index) => renderListItemNode(item, `${key}-${index}`))}
		</Tag>
	);
}

function renderQuoteNode(node: LexicalQuoteNode, key: string) {
	return (
		<blockquote
			key={key}
			className={withAlignmentClass(
				"border-l-2 border-[#c9a96e] pl-5 italic font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70",
				node.format,
			)}
		>
			{renderInlineNodes(node.children, key)}
		</blockquote>
	);
}

function renderHorizontalRuleNode(_: LexicalHorizontalRuleNode, key: string) {
	return <hr key={key} className="border-0 border-t border-[#2a2a2a]/12" />;
}

function renderListItemNode(node: LexicalListItemNode, key: string) {
	return <li key={key}>{renderInlineNodes(node.children, key)}</li>;
}

function renderInlineNodes(nodes: LexicalNode[], keyPrefix: string) {
	return nodes.map((node, index) => renderInlineNode(node, `${keyPrefix}-${index}`));
}

function renderInlineNode(node: LexicalNode, key: string) {
	switch (node.type) {
		case "text":
			return renderTextNode(node, key);
		case "linebreak":
			return <br key={key} />;
		case "link":
		case "autolink":
			return renderLinkNode(node, key);
		default:
			return <Fragment key={key}>{renderNestedNode(node, key)}</Fragment>;
	}
}

function renderNestedNode(node: LexicalNode, key: string) {
		switch (node.type) {
			case "paragraph":
			case "heading":
			case "list":
			case "quote":
			case "horizontalrule":
				return renderBlockNode(node, key);
			case "listitem":
				return renderListItemNode(node, key);
		default:
			return null;
	}
}

function renderTextNode(node: LexicalTextNode, key: string) {
	let content = <Fragment key={key}>{node.text}</Fragment>;

	if (hasTextFormat(node.format, 1)) {
		content = <strong key={`${key}-bold`}>{content}</strong>;
	}

	if (hasTextFormat(node.format, 2)) {
		content = <em key={`${key}-italic`}>{content}</em>;
	}

	if (hasTextFormat(node.format, 4)) {
		content = <s key={`${key}-strike`}>{content}</s>;
	}

	if (hasTextFormat(node.format, 8)) {
		content = <span key={`${key}-underline`} className="underline">{content}</span>;
	}

	return content;
}

function renderLinkNode(node: LexicalLinkNode, key: string) {
	const href = node.fields?.url;
	const children = renderInlineNodes(node.children, key);

	if (!href) {
		return <Fragment key={key}>{children}</Fragment>;
	}

	return (
		<a
			key={key}
			href={href}
			target={node.fields?.newTab ? "_blank" : undefined}
			rel={node.fields?.newTab ? "noreferrer" : undefined}
			className="underline underline-offset-4 transition-colors duration-300 hover:text-[#c9a96e]"
		>
			{children}
		</a>
	);
}

function hasTextFormat(format: number | undefined, flag: number) {
	return typeof format === "number" && (format & flag) === flag;
}

function withAlignmentClass(className: string, format?: string) {
	const alignmentClass = getAlignmentClass(format);

	return alignmentClass ? `${className} ${alignmentClass}` : className;
}

function getAlignmentClass(format?: string) {
	switch (format) {
		case "center":
			return "text-center";
		case "right":
		case "end":
			return "text-right";
		case "justify":
			return "text-justify";
		case "left":
		case "start":
			return "text-left";
		default:
			return "";
	}
}
