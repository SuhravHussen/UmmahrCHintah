import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import colors from "./colors";
import { type Editor } from "@tiptap/react";

type ColorPickerProps = {
  editor: Editor | null;
  colorPickerOpen: boolean;
  setColorPickerOpen: (open: boolean) => void;
};

export default function ColorPickerPopover({
  editor,
  colorPickerOpen,
  setColorPickerOpen,
}: ColorPickerProps) {
  return (
    <Toggle size="sm" pressed={colorPickerOpen}>
      <Popover open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
        <PopoverTrigger asChild>
          <Palette className="size-4" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color, i) => (
              <Button
                key={i}
                style={{ backgroundColor: color }}
                className="p-2 h-4 w-4 rounded-none"
                onClick={() => editor?.chain().focus().setColor(color).run()}
              />
            ))}
          </div>
          <Button
            className="w-full mt-4"
            onClick={() => editor?.chain().focus().unsetColor().run()}
          >
            Reset
          </Button>
        </PopoverContent>
      </Popover>
    </Toggle>
  );
}
