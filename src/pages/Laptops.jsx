import { useEffect, useState } from "react";
import api from "../services/api";
import LaptopCard from "../components/LaptopCard";
import { Link } from "react-router-dom";

function Laptops() {
  const [laptops, setLaptops] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Category filter
  const [category, setCategory] = useState("All");

  // Budget filter
  const [budget, setBudget] = useState("All");

  // Sort by rating
  const [sort, setSort] = useState("");

  useEffect(() => {
    getLaptops();
  }, []);

  async function getLaptops() {
    try {
      const response = await api.get("/laptops");
      setLaptops(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteLaptop(id) {
    try {
      await api.delete(`/laptops/${id}`);

      setLaptops(
        laptops.filter(
          (laptop) => laptop.id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Search + Category + Budget
  const filteredLaptops = laptops.filter(
    (laptop) => {
      const searchMatch =
        laptop.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" ||
        laptop.category === category;

      const budgetMatch =
        budget === "All" ||
        laptop.budget === budget;

      return (
        searchMatch &&
        categoryMatch &&
        budgetMatch
      );
    }
  );

  // Copy array before sorting
  let finalLaptops = [...filteredLaptops];

  // Sort by rating
  if (sort === "high") {
    finalLaptops.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "low") {
    finalLaptops.sort(
      (a, b) => a.rating - b.rating
    );
  }

  return (
    <>
      <Link
        className="add-btn"
        to="/add-laptop"
      >
        Add Laptop
      </Link>

      <h1>Available Laptops</h1>

      {/* Filters */}
      <div className="filters">

        {/* Search */}
        <input
          type="text"
          placeholder="Search Laptop"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Gaming">Gaming</option>
          <option value="Ultrabook">
            Ultrabook
          </option>
          <option value="Everyday">
            Everyday
          </option>
          <option value="2-in-1">
            2-in-1
          </option>
        </select>

        {/* Budget */}
        <select
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">
            Medium
          </option>
          <option value="High">High</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort Rating
          </option>

          <option value="high">
            High To Low
          </option>

          <option value="low">
            Low To High
          </option>
        </select>

      </div>

      {/* Laptop Cards */}
      <div className="laptops">
        {finalLaptops.map((laptop) => (
          <LaptopCard
            key={laptop.id}
            laptop={laptop}
            onDelete={deleteLaptop}
          />
        ))}
      </div>
    </>
  );
}

export default Laptops;