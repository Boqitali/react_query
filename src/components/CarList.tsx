import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar, type Car } from "../lib/cars";
import CarForm from "./CarForm";

export default function CarList() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<Car[]>({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }),
  });

  const [editingCar, setEditingCar] = useState<Car | null>(null);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="mt-6">
      <CarForm
        editingCar={editingCar}
        clearEditing={() => setEditingCar(null)}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((car) => (
          <div
            key={car.id}
            className="bg-white shadow-md rounded-lg p-4 border"
          >
            <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
            <p className="text-gray-600">{car.brand}</p>
            <p className="text-gray-500">Color: {car.color}</p>
            <p className="text-gray-500">
              Price:{" "}
              <span className="font-semibold text-green-600">${car.price}</span>
            </p>
            <p className="text-gray-500">Power: {car.power} HP</p>
            <p className="text-sm text-gray-400">
              Release Date: {car.releaseDate}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setEditingCar(car)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg shadow"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(car.id!)}
                disabled={deleteMutation.isPending}
                className={`flex-1 ${
                  deleteMutation.isPending
                    ? "bg-gray-400"
                    : "bg-red-500 hover:bg-red-600"
                } text-white py-2 px-4 rounded-lg shadow`}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
