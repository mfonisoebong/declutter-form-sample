import React from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export default function CoverImage() {
  const {
    setValue,
    clearErrors,
    setError,
    formState: { errors },
    watch,
  } = useFormContext();
  const { getInputProps, open } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDropAccepted(files) {
      const image = files[0];

      //   Upload image to cloudinary

      //   get the public_id and url from cloudinary response

      const url =
        "https://res.cloudinary.com/dhqr7eax5/image/upload/v1706634712/product_image/k90xsgwzgt1ret0bppxl.jpg";
      setValue("image", url);
      clearErrors("image");
    },
    onDropRejected(fileRejections) {
      const error = fileRejections[0].errors[0].message;
      setError("image", {
        message: error,
      });
    },
  });

  const image = watch("image");

  return (
    <div>
      <h3>Cover image</h3>
      <input {...getInputProps()} />
      <p>
        <small style={{ color: "red" }}>{errors?.image?.message}</small>
      </p>
      <button style={{ display: "block" }} type="button" onClick={open}>
        Upload cover Image
      </button>
      {image && (
        <img
          width={150}
          height={150}
          src={image}
          loading="lazy"
          alt="Cover image"
        />
      )}
    </div>
  );
}
