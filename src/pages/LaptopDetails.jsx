import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function LaptopDetails() {
  const { id } = useParams();

  const [laptop, setLaptop] =
    useState(null);

  useEffect(() => {
    getLaptop();
  }, []);

  async function getLaptop() {
    try {
      const response = await api.get(
        `/laptops/${id}`
      );

      setLaptop(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!laptop) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <img
        src={laptop.image}
        alt={laptop.name}
      />

      <h1>{laptop.name}</h1>

      <p>{laptop.description}</p>

      <h3>Brand</h3>
      <p>{laptop.brand}</p>

      <h3>Category</h3>
      <p>{laptop.category}</p>

      <h3>Release Year</h3>
      <p>{laptop.releaseYear}</p>

      <h3>Warranty</h3>
      <p>{laptop.warranty}</p>

      <h3>Display</h3>
      <p>{laptop.displaySize}</p>

      <h3>Processor</h3>
      <p>{laptop.processor}</p>

      <h3>Currency</h3>
      <p>{laptop.currency}</p>

      <h3>Price</h3>
      <p>₹ {laptop.price}</p>

      <h3>Rating</h3>
      <p>{laptop.rating}</p>

      <h3>Best For</h3>
      <p>{laptop.bestFor}</p>

      <h3>Key Features</h3>

      <ul>
        {laptop.keyFeatures.map(
          (feature, index) => (
            <li key={index}>{feature}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default LaptopDetails;
