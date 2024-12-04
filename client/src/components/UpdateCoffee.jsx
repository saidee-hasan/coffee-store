import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateCoffee() {
    const coffee = useLoaderData();
    const { _id, coffeeName, coffeeType, roastLevel, imageUrl, details, best } = coffee;

    const [formData, setFormData] = useState({
        coffeeName,
        coffeeType,
        roastLevel,
        imageUrl,
        details,
        best
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/coffee/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Coffee details updated successfully.",
                    icon: "success"
                });
                navigate('/'); // Redirect to coffee list or another page
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update coffee details.",
                    icon: "error"
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "Error!",
                text: "There was a problem updating the coffee.",
                icon: "error"
            });
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Update Coffee</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Coffee Name</label>
                    <input 
                        type="text" 
                        name="coffeeName" 
                        value={formData.coffeeName} 
                        onChange={handleChange} 
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Coffee Type</label>
                    <input 
                        type="text" 
                        name="coffeeType" 
                        value={formData.coffeeType} 
                        onChange={handleChange} 
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Roast Level</label>
                    <input 
                        type="text" 
                        name="roastLevel" 
                        value={formData.roastLevel} 
                        onChange={handleChange} 
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Image URL</label>
                    <input 
                        type="text" 
                        name="imageUrl" 
                        value={formData.imageUrl} 
                        onChange={handleChange} 
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Details</label>
                    <textarea 
                        name="details" 
                        value={formData.details} 
                        onChange={handleChange} 
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Best</label>
                    <input 
                        type="text" 
                        name="best" 
                        value={formData.best} 
                        onChange={handleChange} 
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Update Coffee
                </button>
            </form>
        </div>
    );
}

export default UpdateCoffee;