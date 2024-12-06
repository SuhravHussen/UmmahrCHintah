"use client";

import { addAuthor } from "@/actions/addAuthor";
import addImageToCloudinary from "@/actions/addImage";
import getToken from "@/actions/getAccessToken";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import checkRole from "@/lib/roleCheck";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FormEvent, useState } from "react";
export default function AddAuthor({
  refreshData,
}: {
  refreshData: () => void;
}) {
  const [addingAuthor, setAddingAuthor] = useState(false);
  const { user } = useUser();

  const handleAddAuthor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAdmin = checkRole(user, "admin");
    const isModerator = checkRole(user, "moderator");
    if (!isAdmin && !isModerator) {
      toast({
        title: "Sorry!",
        description: "You don't have access to add author",
        className: "mt-4",
        variant: "destructive",
      });
      return;
    }

    setAddingAuthor(true);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      const image = formData.get("image");

      // Validate if name is provided
      if (!name) {
        toast({
          title: "Missing Name",
          variant: "destructive",
        });
        return;
      }

      // Initialize imageUrl
      let imageUrl = " ";

      // If an image is selected, upload it to Cloudinary
      if (image && image instanceof File && image.size > 0) {
        imageUrl = await addImageToCloudinary(image as File);

        // Handle image upload failure
        if (!imageUrl) {
          toast({
            title: "Error In uploading Image",
            variant: "destructive",
          });
          return;
        }
      }

      // Prepare the author data to be added
      const body = {
        name: name as string,
        image: imageUrl,
      };

      // Get access token and add the author
      const { accessToken } = await getToken();
      const data = await addAuthor(body, accessToken);

      // Check if the author was successfully added
      if (data.data && "id" in data.data) {
        toast({
          title: "Successfully Added the author",
        });

        // Refresh data after adding the author
        refreshData();
      } else {
        throw new Error("Error In adding author");
      }
    } catch (error) {
      console.error("Error adding author:", error);

      // Display error message
      toast({
        title: "Error In adding author",
        variant: "destructive",
      });
    } finally {
      setAddingAuthor(false);
    }
  };

  return (
    <form className="p-5" onSubmit={handleAddAuthor}>
      <h1 className="font-bold text-center text-2xl">ADD AUTHOR</h1>

      <Input name="name" className="mt-5" placeholder="Author Name..." />
      <Input
        id="picture"
        type="file"
        placeholder="Author's Image"
        className="cursor-pointer mt-4"
        name="image"
      />

      <Button type="submit" className="w-full mt-5" disabled={addingAuthor}>
        {addingAuthor ? "Adding Author...." : "Add Author"}
      </Button>
    </form>
  );
}
