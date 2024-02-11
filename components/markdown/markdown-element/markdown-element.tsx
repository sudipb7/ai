import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

import { MarkdownElementProps } from "./markdown-element.type";
import { MarkdownHeading } from "../elements/heading";
import { MarkdownCode } from "../elements/code";
import Image from "next/image";

export const MarkdownElement = ({
  element,
  parent = null,
}: MarkdownElementProps) => {
  if (parent) {
    if (parent.type === "heading" && element.type === "text") {
      return (
        <MarkdownHeading
          depth={parent.depth}
          text={element.value}
        />
      );
    }

    if (
      parent.type === "blockquote" &&
      element.type === "paragraph" &&
      element.children[0].type === "text"
    ) {
      return (
        <p className="relative mt-6 border-l-2 pl-6 italic">
          {element.children[0].value}
        </p>
      );
    }

    if (parent.type === "paragraph") {
      if (element.type === "strong" && element.children[0].type === "text") {
        return (
          <strong className="font-bold text-white">
            {element.children[0].value}
          </strong>
        );
      }

      if (element.type === "link" && element.children[0].type === "text") {
        return (
          <Link
            href={element.url}
            target="_blank"
            className="text-white no-underline hover:underline inline-block"
          >
            <span>{element.children[0].value}</span>
            <ExternalLink
              className="text-white inline-block ml-1"
              size={16}
            />
          </Link>
        );
      }

      if (
        element.type === "link" &&
        element.children[0].children[0].type === "text"
      ) {
        return (
          <Link
            href={element.url}
            target="_blank"
            className="text-white no-underline hover:underline inline-block"
          >
            <span>{element.children[0].value}</span>
            <ExternalLink
              className="text-white inline-block ml-1"
              size={16}
            />
          </Link>
        );
      }

      if (element.type === "image") {
        return (
          <Image
            src={element.url}
            alt={element.alt ?? ""}
            className="lg:max-w-3xl mx-auto my-10 rounded"
            width={element.width ?? 900}
            height={element.height ?? 600}
          />
        );
      }

      if (element.type === "text") {
        return <>{element.value}</>;
      }

      if (element.type === "inlineCode") {
        return (
          <code className="bg-gray-800 text-white py-1 rounded">
            {element.value}
          </code>
        );
      }

      return (
        <>
          <p className="text-red-500">ERROR: Unsupported element</p>
          <pre>{JSON.stringify(element, null, 2)}</pre>
        </>
      );
    }

    if (element.type === "listItem") {
      return (
        <>
          {/* @ts-ignore */}
          {element.children.map((child, i) => {
            if (child.type === "paragraph") {
              return (
                <li
                  key={i}
                  className="text-muted-foreground mt-0.5 ml-5"
                >
                  <MarkdownElement element={child} />
                </li>
              );
            }

            if (child.type === "list") {
              return (
                <MarkdownElement
                  key={i}
                  element={child}
                />
              );
            }
          })}
        </>
      );
    }

    if (
      element.type == "paragraph" &&
      element.children[0].type === "link" &&
      element.children[0].children[0].type === "text"
    ) {
      return (
        <p className="text-muted-foreground">
          {/* @ts-ignore */}
          {element.children.map((child, i) => (
            <MarkdownElement
              key={i}
              parent={element}
              element={child}
            />
          ))}
        </p>
      );
    }

    return (
      <>
        <p className="text-red-500">ERROR: Unsupported element</p>
        <pre>{JSON.stringify(element, null, 2)}</pre>
      </>
    );
  }

  if (element.type === "thematicBreak") {
    return <hr className="border-gray-700 my-2" />;
  }

  if (element.type === "heading" || element.type === "blockquote") {
    return (
      <MarkdownElement
        parent={element}
        element={element.children[0]}
      />
    );
  }

  if (element.type === "paragraph") {
    return (
      <p className="text-muted-foreground">
        {/* @ts-ignore */}
        {element.children.map((child, i) => (
          <MarkdownElement
            key={i}
            parent={element}
            element={child}
          />
        ))}
      </p>
    );
  }

  if (element.type === "list") {
    const listStyle = cn("ml-6 text-muted-foreground", {
      "list-descimal": element.ordered,
      "list-disc": !element.ordered,
    });
    return (
      <ul className={listStyle}>
        {/* @ts-ignore */}
        {element.children.map((child, i) => (
          <MarkdownElement
            key={i}
            parent={element}
            element={child}
          />
        ))}
      </ul>
    );
  }

  if (element.type === "code") {
    return (
      <MarkdownCode
        lang={element.lang}
        value={element.value}
      />
    );
  }

  return (
    <>
      <p className="text-red-500">ERROR: Unsupported element</p>
      <pre>{JSON.stringify(element, null, 2)}</pre>
    </>
  );
};