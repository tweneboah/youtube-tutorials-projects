import cloudinary from "./cloudinary";

export async function uploadImage(file: File) {
  try {
    console.log("Starting image upload process...");
    console.log("File type:", file.type);
    console.log("File size:", file.size);

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;
    console.log("File converted to base64");

    // Upload to Cloudinary
    console.log("Attempting to upload to Cloudinary...");
    const result = await cloudinary.uploader.upload(base64File, {
      folder: "portfolio-projects",
      resource_type: "auto",
    });
    console.log("Upload successful:", result.secure_url);

    return result.secure_url;
  } catch (error) {
    console.error("Detailed upload error:", error);
    if (error instanceof Error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
    throw new Error("Failed to upload image: Unknown error");
  }
}
