import { Search, MapPin, SlidersHorizontal } from "lucide-react";

function JobSearch({ search, setSearch, location, setLocation }) {
  return (
    <div className="jobs-search-box">

      <div className="jobs-search-field">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search jobs, skills, or companies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="jobs-search-field">
        <MapPin size={20} />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <button className="filter-toggle">
        <SlidersHorizontal size={18} />
        Filters
      </button>

      <button className="jobs-search-button">
        Search
      </button>

    </div>
  );
}

export default JobSearch;