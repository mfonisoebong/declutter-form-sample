import React from "react";
import { useFormContext } from "react-hook-form";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function Sizes() {
  const {
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const sizes = watch("sizes");
  const handleSizeChange = (e) => {
    const size = e.target.name;

    if (sizes?.includes(size)) {
      setValue(
        "sizes",
        sizes.filter((s) => s !== size)
      );
      clearErrors("sizes");
      return;
    }
    const oldSizes = sizes ?? [];

    setValue("sizes", [...oldSizes, size]);
    clearErrors("sizes");
  };

  return (
    <div>
      <h3>Sizes</h3>

      {SIZES.map((size) => (
        <label key={size}>
          <input
            type="checkbox"
            onChange={handleSizeChange}
            checked={typeof sizes !== "undefined" && sizes.includes(size)}
            name={size}
            value={size}
          />
          {size}
        </label>
      ))}
      <small style={{ color: "red" }}>{errors?.sizes?.message}</small>
    </div>
  );
}
