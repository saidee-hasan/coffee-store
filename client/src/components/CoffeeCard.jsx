import React, { useState } from 'react';
import Swal from 'sweetalert2';

function CoffeeCard({ coffee}) {
    const { coffeeName, coffeeType, roastLevel, imageUrl, details, best } = coffee;


    const onDelete =(id)=>{

      
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/${id}`,{
                    method:"DELETE"
                })
                .then(res =>res.json())
                .then(data=>{
                   
                    if(data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
            
            }
           


          });
    }
    return (
        <div className="flex p-4 border rounded shadow-md m-2">
            <img 
                src={imageUrl} 
                alt={coffeeName} 
                className="w-32 h-32 object-cover rounded" 
            />
            <div className="ml-4 flex-1">
                <h2 className="text-xl font-bold">{coffeeName}</h2>
                <p className="text-gray-600">Type: {coffeeType}</p>
                <p className="text-gray-600">Roast Level: {roastLevel}</p>
                <p className="text-gray-600">Details: {details}</p>
                {best && <span className="text-green-500 font-semibold">Best Choice!</span>}
                
                <div className="mt-4">
                    <button 
                        onClick={() => onView(coffee)} 
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                        View
                    </button>
                    <button 
                        onClick={() => onUpdate(coffee)} 
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                    >
                        Update
                    </button>
                    <button 
                        onClick={() => onDelete(coffee._id)} // Assuming coffee has an 'id' property
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CoffeeCard;