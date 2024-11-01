"use client";
import { Toggle } from "@/components/ui/toggle";
import { useCallback, useState } from "react";
import { Popover } from "@/components/ui/popover";
import { type Editor } from "@tiptap/react";
import Options from "./ToolbarOptions";
import ImageUploadPopover from "./ImageUploadPopover";
import ColorPickerPopover from "./ColorPickerPopover";

type Props = {
  editor: Editor | null;
};

export default function ToolBar({ editor }: Props) {
  const [imagePopOverOpen, setImagePopOver] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const setLink = useCallback(() => {
    if (!editor) return null;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-md p-1.5 mb-1 space-x-1 sticky top-10 z-50 toolbar-bg mt-6">
      {Options(editor, setLink).map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}

      <ImageUploadPopover
        editor={editor}
        imagePopOverOpen={imagePopOverOpen}
        setImagePopOver={setImagePopOver}
      />

      <ColorPickerPopover
        editor={editor}
        colorPickerOpen={colorPickerOpen}
        setColorPickerOpen={setColorPickerOpen}
      />
    </div>
  );
}
