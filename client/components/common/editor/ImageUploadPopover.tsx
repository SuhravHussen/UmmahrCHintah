import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { type Editor } from "@tiptap/react";

type ImageUploadProps = {
  editor: Editor | null;
  imagePopOverOpen: boolean;
  setImagePopOver: (open: boolean) => void;
};

export default function ImageUploadPopover({
  editor,
  imagePopOverOpen,
  setImagePopOver,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState("");

  const addImage = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setImagePopOver(false);
    }
  };

  return (
    <Toggle size="sm" pressed={imagePopOverOpen}>
      <Popover open={imagePopOverOpen} onOpenChange={setImagePopOver}>
        <PopoverTrigger asChild>
          <Upload className="size-4" />
        </PopoverTrigger>
        <PopoverContent>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            type="text"
            placeholder="Image Link"
          />
          <Button className="w-full mt-4" onClick={addImage}>
            Add
          </Button>
        </PopoverContent>
      </Popover>
    </Toggle>
  );
}
