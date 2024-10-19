const addImageToCloudinary = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ummar-chintah");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_PRESET}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return data.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default addImageToCloudinary;
