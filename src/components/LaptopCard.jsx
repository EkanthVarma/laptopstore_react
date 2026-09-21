import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  addFavorite
} from "../features/favoriteSlice";

function LaptopCard({ laptop, onDelete }) {

  const dispatch = useDispatch();

  function handleFavorite() {
    dispatch(
      addFavorite(laptop)
    );
  }

  return (
    <div className="card">

      <img
        src={laptop.image}
        alt={laptop.name}
      />

      <h3>{laptop.name}</h3>

      <p>{laptop.brand}</p>

      <p>{laptop.category}</p>

      <p>⭐ {laptop.rating}</p>

      <div className="card-actions">
        <Link
          className="view-btn"
          to={`/laptops/${laptop.id}`}
        >
          View
        </Link>

        <Link
          className="edit-btn"
          to={`/edit-laptop/${laptop.id}`}
        >
          Edit
        </Link>

        <button
          className="delete-btn"
          onClick={() => onDelete(laptop.id)}
        >
          Delete
        </button>

        <button
        className="favorite-btn"
        onClick={handleFavorite}
        >
          ❤ Add To Favorites
        </button>
      </div>

    </div>
  );
}

export default LaptopCard;