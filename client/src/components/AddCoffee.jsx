import React, { useState } from "react";
import Swal from 'sweetalert2';

export default function AddCoffee() {

  const [coffeeName, setCoffeeName] = useState("");

  const [coffeeType, setCoffeeType] = useState("");

  const [roastLevel, setRoastLevel] = useState("");

  const [category, setCategory] = useState("");

  const [details, setDetails] = useState("");

  const [best, setBest] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  const [uploading, setUploading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();


    // Upload image if there is one

    setUploading(true);

    await uploadImage();

    setUploading(false);


    console.log("Coffee added:", {

      coffeeName,

      coffeeType,

      roastLevel,

      category,

      imageUrl, // Use the uploaded image URL

      details,

      best,

    });
    const data = {

      coffeeName,

      coffeeType,

      roastLevel,

      category,

      imageUrl, // Use the uploaded image URL

      details,

      best,

    }

fetch('http://localhost:5000/data', {

  method: 'POST',

  headers: {

      'Content-Type': 'application/json',

  },

  body: JSON.stringify(data),



})
.then(res=>res.json())
.then(data =>{
  if(data.insertedId){
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
})


    // Reset form fields

    setCoffeeName("");

    setCoffeeType("");

    setRoastLevel("");

    setCategory("");

    setDetails("");

    setBest(false);

    setImageFile(null);

    setImageUrl("");

  };


  const uploadImage = async () => {

    if (!imageFile) return;


    const reader = new FileReader();

    reader.onloadend = async () => {

      const base64Image = reader.result.split(",")[1]; // Get base64 string

      const apiKey = "5208745dacce2f0b8ea7cce043481d64"; // Replace with your ImgBB API key


      try {

        const response = await fetch(

          `https://api.imgbb.com/1/upload?key=${apiKey}`,

          {

            method: "POST",

            body: new URLSearchParams({

              image: base64Image,

            }),

          }

        );


        const data = await response.json();


        if (data.success) {

          setImageUrl(data.data.url); // Set the image URL

        } else {

          console.error("Upload failed:", data);

        }

      } catch (error) {

        console.error("Error uploading image:", error);

      }

    };


    reader.readAsDataURL(imageFile); // Read the file as a data URL

  };


  const handleFileChange = (e) => {

    setImageFile(e.target.files[0]);

    uploadImage();

  };


  return (

    <div className="max-w-md mx-auto mt-10">

      <h2 className="text-2xl font-bold mb-4">Add a New Coffee</h2>

      <form

        onSubmit={handleSubmit}

        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"

      >

        <div className="mb-4">

          <label

            className="block text-gray-700 text-sm font-bold mb-2"

            htmlFor="coffeeName"

          >

            Coffee Name

          </label>

          <input

            id="coffeeName"

            type="text"

            value={coffeeName}

            onChange={(e) => setCoffeeName(e.target.value)}

            required

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />

        </div>

        <div className="mb-4">

          <label

            className="block text-gray-700 text-sm font-bold mb-2"

            htmlFor="coffeeType"

          >

            Coffee Type

          </label>

          <input

            id="coffeeType"

            type="text"

            value={coffeeType}

            onChange={(e) => setCoffeeType(e.target.value)}

            required

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />

        </div>

        <div className="mb-4">

          <label

            className="block text-gray-700 text-sm font-bold mb-2"

            htmlFor="roastLevel"

          >

            Roast Level

          </label>

          <input

            id="roastLevel"

            type="text"

            value={roastLevel}

            onChange={(e) => setRoastLevel(e.target.value)}

            required

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />

        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Espresso">Espresso</option>
            <option value="Filter">Filter</option>
            <option value="French Press">French Press</option>
            <option value="Cold Brew">Cold Brew</option>
            <option value="Pour Over">Pour Over</option>
            <option value="Nitro">Nitro</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photoUrl"
          >
            Photo URL
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />{" "}
          <button onClick={uploadImage}>Upload Image</button>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="details"
          >
            Details
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            rows="3"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Coffee
          </button>
        </div>
      </form>
    </div>
  );
}
