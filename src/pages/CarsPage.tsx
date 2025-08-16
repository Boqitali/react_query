import CarList from "../components/CarList";

export default function CarsPage() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cars CRUD</h1>
      <CarList />
    </div>
  );
}
