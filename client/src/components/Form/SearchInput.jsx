/*import React from "react";
import { BACKEND_URI } from "../../config/constants";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
       // `http://62.164.216.71/api/v1/product/search/${values.keyword}`
         `${BACKEND_URI}/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
*/
import React  from "react";
import { useSearch } from "../../context/search";


const SearchInput = () => {
  const { setName } = useSearch(); // Accesăm setTest din context


  const handleSubmit = async (e) => {
    e.preventDefault();  // Previne reîncărcarea paginii la submit
    const searchKeyword = e.target.searchInput.value;  // Obținem termenul de căutare din input
    setName(searchKeyword);  // Actualizăm contextul cu noul termen de căutare
    
   
  };

  return (
    <div>
      <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
        <input
          id="searchInput"
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
