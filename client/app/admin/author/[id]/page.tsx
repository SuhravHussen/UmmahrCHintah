"use client";

import addImageToCloudinary from "@/actions/addImage";
import getToken from "@/actions/getAccessToken";
import { getSingleAuthor } from "@/actions/getSingleAuthor";
import { updateAuthor } from "@/actions/updateAuthor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import useAsync from "@/hooks/useAsync";
import { IAuthor } from "@/interfaces/Author.interface";
import { FormEvent, useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;

  const [author, setAuthor] = useState({
    name: "",
    id: "",
    image: "",
  });
  const [updatingAuthor, setUpdatingAuthor] = useState(false);

  // fetch article
  const fetchAUthor: () => Promise<IAuthor | {}> = async () => {
    const { data } = await getSingleAuthor(id);
    return data;
  };
  const {
    loading: authorDataLoading,
    data: authorData,
    execute: getSingleAuthorData,
  } = useAsync<IAuthor | {}, []>(fetchAUthor);

  useEffect(() => {
    if (authorData && "id" in authorData) {
      setAuthor(authorData);
    }
  }, [authorData]);

  useEffect(() => {
    getSingleAuthorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateAuthor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUpdatingAuthor(true);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      const image = formData.get("image");

      // Check if name exists
      if (!name) {
        toast({
          title: "Missing Name",
          variant: "destructive",
        });
        return;
      }

      // Initialize imageUrl with the current image
      let imageUrl = author.image;

      // Check if a new image is uploaded and needs to be processed
      if (image && image instanceof File && image.size > 0) {
        console.log(image);

        // Upload the image to Cloudinary
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

      // Prepare the data to update the author
      const body = {
        name: name as string,
        image: imageUrl,
      };

      // Get access token and update the author
      const { accessToken } = await getToken();
      const data = await updateAuthor(body, accessToken, author.id);
      console.log(data);
      // Check if update was successful
      if (data.data && "id" in data.data) {
        toast({
          title: "Successfully updated the author",
        });
      } else {
        throw new Error("Error in updating author");
      }
    } catch (error) {
      console.error("Error in updating author:", error);

      // Show error notification
      toast({
        title: "Error In updating author",
        variant: "destructive",
      });
    } finally {
      setUpdatingAuthor(false);
    }
  };
  return (
    <form className="mt-16 mb-8" onSubmit={handleUpdateAuthor}>
      <h1 className="font-bold text-center text-2xl">Edit Author</h1>

      <Input
        value={author.name}
        name="name"
        className="mt-5"
        onChange={(e) => {
          setAuthor({
            ...author,
            name: e.target.value,
          });
        }}
      />
      <Input
        id="picture"
        type="file"
        className="cursor-pointer mt-4"
        name="image"
      />

      <Button
        type="submit"
        className="w-full mt-5"
        disabled={authorDataLoading || updatingAuthor}
      >
        {updatingAuthor ? "Updating Author" : "update Author"}
      </Button>
    </form>
  );
}
