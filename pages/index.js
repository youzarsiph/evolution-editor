import React from "react";
import Head from "next/head";
import Color from "@tiptap/extension-color";
import { lowlight } from "lowlight/lib/core";
import StarterKit from "@tiptap/starter-kit";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Menu,
  MenuBar,
  BottomBar,
  TextStylesMenu,
  ParagraphMenu,
} from "../components/Menu";
import Superscript from "@tiptap/extension-superscript";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

let TipTap = () => {
  const content = `
      <h1>Evolution Editor</h1>
      <p>
          Enter some text here...
      </p>
      <br>
    `;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Highlight,
      TextStyle,
      Underline,
      Subscript,
      Superscript,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CharacterCount.configure({
        mode: "nodeSize",
        limit: null,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        // placeholder: "Write something …",
        // Use different placeholders depending on the node type:
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What is the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "editor",
      },
    },
    content: content,
  });

  return (
    <>
      <Head>
        <title>TipTap Editor</title>
      </Head>
      <div className="m-4 sm:mx-8 md:mx-16 lg:mx-32 lg:my-16 xl:mx-64 2xl:mx-96">
        <div className="rounded-lg border bg-slate-50 shadow-sm">
          <div className="rounded-t-lg border-b bg-white">
            <MenuBar editor={editor} />
          </div>

          {editor && (
            <div>
              <BubbleMenu
                editor={editor}
                tippyOptions={{ duration: 300 }}
                className="rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
              >
                <Menu>
                  <TextStylesMenu
                    editor={editor}
                    fontDropdownID="menuFonts"
                    colorDropdownID="menuColors"
                  />
                </Menu>
              </BubbleMenu>
            </div>
          )}

          {editor && (
            <div>
              <FloatingMenu
                editor={editor}
                tippyOptions={{ duration: 300 }}
                className="rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
              >
                <Menu>
                  <ParagraphMenu
                    editor={editor}
                    headingDropdownID="menuHeadings"
                  />
                </Menu>
              </FloatingMenu>
            </div>
          )}

          <EditorContent editor={editor} />

          <div className="rounded-b-lg border-t bg-white">
            <BottomBar editor={editor} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TipTap;