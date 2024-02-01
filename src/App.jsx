import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema } from "./utils/productFormSchema";
import CoverImage from "./components/CoverImage";
import Sizes from "./components/Sizes";
import Variant from "./components/Variant";

function App() {
  const productForm = useForm({
    resolver: zodResolver(ProductFormSchema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = productForm;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...productForm}>
        <CoverImage />
        <div>
          <label>
            Product name:
            <input type="text" {...register("name")} />
          </label>
          <small style={{ color: "red" }}>{errors?.name?.message}</small>
        </div>
        <div>
          <label>
            Product price:
            <input
              type="number"
              step={0.1}
              {...register("price", {
                valueAsNumber: true,
              })}
            />
          </label>
          <small style={{ color: "red" }}>{errors?.price?.message}</small>
        </div>
        <Sizes />
        <Variant />
      </FormProvider>

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
