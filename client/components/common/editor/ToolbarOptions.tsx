import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Quote,
  List,
  ListOrdered,
  Minus,
  Link,
  UnderlineIcon,
} from "lucide-react";
import { type Editor } from "@tiptap/react";

const Options = (editor: Editor | null, setLink: () => void) => [
  {
    icon: <Heading1 className="size-4" />,
    onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    preesed: editor?.isActive("heading", { level: 1 }),
  },
  {
    icon: <Heading2 className="size-4" />,
    onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    preesed: editor?.isActive("heading", { level: 2 }),
  },
  {
    icon: <Heading3 className="size-4" />,
    onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    preesed: editor?.isActive("heading", { level: 3 }),
  },
  {
    icon: <Bold className="size-4" />,
    onClick: () => editor?.chain().focus().toggleBold().run(),
    preesed: editor?.isActive("bold"),
  },
  {
    icon: <Italic className="size-4" />,
    onClick: () => editor?.chain().focus().toggleItalic().run(),
    preesed: editor?.isActive("italic"),
  },
  {
    icon: <Strikethrough className="size-4" />,
    onClick: () => editor?.chain().focus().toggleStrike().run(),
    preesed: editor?.isActive("strike"),
  },
  {
    icon: <UnderlineIcon className="size-4" />,
    onClick: () => editor?.chain().focus().toggleUnderline().run(),
    preesed: editor?.isActive("underline"),
  },
  {
    icon: <AlignLeft className="size-4" />,
    onClick: () => editor?.chain().focus().setTextAlign("left").run(),
    preesed: editor?.isActive({ textAlign: "left" }),
  },
  {
    icon: <AlignCenter className="size-4" />,
    onClick: () => editor?.chain().focus().setTextAlign("center").run(),
    preesed: editor?.isActive({ textAlign: "center" }),
  },
  {
    icon: <AlignRight className="size-4" />,
    onClick: () => editor?.chain().focus().setTextAlign("right").run(),
    preesed: editor?.isActive({ textAlign: "right" }),
  },
  {
    icon: <List className="size-4" />,
    onClick: () => editor?.chain().focus().toggleBulletList().run(),
    preesed: editor?.isActive("bulletList"),
  },
  {
    icon: <ListOrdered className="size-4" />,
    onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    preesed: editor?.isActive("orderedList"),
  },
  {
    icon: <Code className="size-4" />,
    onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
    preesed: editor?.isActive("code"),
  },
  {
    icon: <Highlighter className="size-4" />,
    onClick: () => editor?.chain().focus().toggleHighlight().run(),
    preesed: editor?.isActive("highlight"),
  },
  {
    icon: <Quote className="size-4" />,
    onClick: () => editor?.chain().focus().toggleBlockquote().run(),
    preesed: editor?.isActive("blockquote"),
  },
  {
    icon: <Minus className="size-4" />,
    onClick: () => editor?.chain().focus().setHorizontalRule().run(),
  },

  {
    icon: <Link className="size-4" />,
    onClick: setLink,
  },
];

export default Options;
