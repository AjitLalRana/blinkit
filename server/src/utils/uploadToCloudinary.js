import cloudinary from '../db/cloudinary.js';

/* Upload Single Image (Avatar) */
const uploadAvatarToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {

    if (!fileBuffer) {
      return reject(new Error("File buffer is required"));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "blinkit/avatars",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};


/* Upload Multiple Product Images */
const uploadProductImagesToCloudinary = async (files) => {

  if (!files || files.length === 0) {
    throw new Error("No files provided");
  }

  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "blinkit/products",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(file.buffer);
    });
  });

  const results = await Promise.all(uploadPromises);

  return results.map(result => ({
    url: result.secure_url,
    public_id: result.public_id,
  }));
};

export {
  uploadAvatarToCloudinary,
  uploadProductImagesToCloudinary
};
