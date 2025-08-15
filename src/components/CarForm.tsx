import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCar, type Car } from "../lib/cars";

export default function CarForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    brand: "",
    color: "",
    releaseDate: "",
    power: "",
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      setForm({
        name: "",
        price: "",
        brand: "",
        color: "",
        releaseDate: "",
        power: "",
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const payload: Car = {
          name: form.name,
          price: Number(form.price),
          brand: form.brand,
          color: form.color,
          releaseDate: form.releaseDate,
          power: Number(form.power),
        };
        mutation.mutate(payload);
      }}
      className="bg-white shadow-lg rounded-lg p-6 space-y-4 border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add New Car</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "name", type: "text", label: "Car Name" },
          { name: "price", type: "number", label: "Price" },
          { name: "brand", type: "text", label: "Brand" },
          { name: "color", type: "text", label: "Color" },
          { name: "releaseDate", type: "date", label: "Release Date" },
          { name: "power", type: "number", label: "Power (HP)" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-600 mb-1"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              value={form[field.name as keyof typeof form]}
              onChange={(e) =>
                setForm({ ...form, [field.name]: e.target.value })
              }
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
      >
        Add Car
      </button>
    </form>
  );
}
