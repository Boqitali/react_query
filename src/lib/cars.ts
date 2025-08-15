import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-frontend-hw6n.onrender.com", 
});

export interface Car {
  id?: number;
  name: string;
  price: number;
  brand: string;
  color: string;
  releaseDate: string;
  power: number;
}

export const getCars = async (): Promise<Car[]> => {
  const res = await api.get("/cars");
  return res.data;
};

export const createCar = async (car: Car): Promise<Car> => {
  const res = await api.post("/cars", car);
  return res.data;
};

export const updateCar = async (id: number, car: Car): Promise<Car> => {
  const res = await api.patch(`/cars/${id}`, car);
  return res.data;
};

export const deleteCar = async (id: number): Promise<void> => {
  await api.delete(`/cars/${id}`);
};
