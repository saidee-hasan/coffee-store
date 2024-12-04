import { useLoaderData } from 'react-router-dom';
import CoffeeCard from './components/CoffeeCard';
import { useState, useEffect } from 'react';

function App() {
  const loaderData = useLoaderData();
  console.log(loaderData);

  const [coffees, setCoffees] = useState([]);

  // Update state when loaderData changes
  useEffect(() => {
    if (loaderData) {
      setCoffees(loaderData);
    }
  }, [loaderData]);

  return (
    <div className="grid grid-cols-1 container mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
      {coffees.length > 0 ? (
        coffees.map((coffee) => (
          <CoffeeCard coffee={coffee} coffees={coffees} setCoffees={setCoffees} key={coffee._id} />
        ))
      ) : (
        <p>No coffees available.</p>
      )}
    </div>
  );
}

export default App;