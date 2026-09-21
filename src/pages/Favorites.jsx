import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  removeFavorite
} from "../features/favoriteSlice";

function Favorites() {

  const dispatch = useDispatch();

  const favorites = useSelector(
    state => state.favorites
  );

  return (

    <div className="favorites-container">

      <h1 className="page-title">
        Favorite Laptops
      </h1>

      {
        favorites.length === 0 ? (

          <div className="empty-favorites">

            <h2>
              No Favorite Laptops
            </h2>

            <p>
              Add laptops from the
              Laptops page.
            </p>

          </div>

        ) : (

          <div className="favorites-grid">

            {
              favorites.map(laptop => (

                <div
                  key={laptop.id}
                  className="favorite-card"
                >

                  <img
                    src={laptop.image}
                    alt={laptop.name}
                  />

                  <div className="favorite-content">

                    <h2>
                      {laptop.name}
                    </h2>

                    <p>
                      🏷 {laptop.brand}
                    </p>

                    <p>
                      ⭐ {laptop.rating}
                    </p>

                    <p>
                      💰 ₹{laptop.price}
                    </p>

                    <button
                      onClick={() =>
                        dispatch(
                          removeFavorite(
                            laptop.id
                          )
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  );
}

export default Favorites;