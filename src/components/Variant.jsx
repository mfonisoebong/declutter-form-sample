import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { VariantSchema } from "../utils/productFormSchema";
import { useDropzone } from "react-dropzone";

export default function Variant() {
  const variantForm = useForm({
    resolver: zodResolver(VariantSchema),
  });
  const parentForm = useFormContext();

  const {
    formState: { errors },
    watch,
    clearErrors,
  } = variantForm;

  const image = watch("image");
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
      variantForm.setValue("image", url);
      clearErrors("image");
    },
    onDropRejected(fileRejections) {
      const error = fileRejections[0].errors[0].message;
      setError("image", {
        message: error,
      });
    },
  });

  const onVariantSubmit = (data) => {
    const prevVariants = parentForm.getValues("variants") ?? [];
    parentForm.setValue("variants", [...prevVariants, data]);
    variantForm.reset();
  };

  return (
    <div>
      <h3>Variant</h3>

      <label>
        Color:
        <input type="text" {...variantForm.register("color")} />
        <small style={{ color: "red" }}>{errors?.color?.message}</small>
      </label>
      <label>
        Quantity:
        <input
          type="number"
          {...variantForm.register("quantity", {
            valueAsNumber: true,
          })}
        />
        <small style={{ color: "red" }}>{errors?.quantity?.message}</small>
      </label>
      <label>
        <input {...getInputProps()} />
        <p>
          <small style={{ color: "red" }}>{errors?.image?.message}</small>
        </p>
        <button style={{ display: "block" }} type="button" onClick={open}>
          Upload cover Image
        </button>
        {image && (
          <img
            width={80}
            height={80}
            src={image}
            loading="lazy"
            alt="Cover image"
          />
        )}
      </label>
      <label>
        Unlimited:
        <input
          type="checkbox"
          {...variantForm.register("unlimited", {
            onChange(e) {
              if (e.target.checked) {
                variantForm.setValue("quantity", 0);
              }
            },
          })}
        />
        <small style={{ color: "red" }}>{errors?.unlimited?.message}</small>
      </label>

      <div style={{ marginBlock: 20 }}>
        <button
          onClick={variantForm.handleSubmit(onVariantSubmit)}
          type="button"
        >
          Add variant
        </button>
      </div>
    </div>
  );
}
