import { useLoaderData } from 'react-router-dom';
import CoffeeCard from './components/CoffeeCard';

function App() {
  const loaderData = useLoaderData();
  console.log(loaderData);

  return (
    <div className="grid grid-cols-1 container mx-auto  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
      {loaderData.map((coffee, idx) => (
        <CoffeeCard coffee={coffee} key={idx} />
      ))}
    </div>
  );
}

export default App;