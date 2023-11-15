import "../characters/characters.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Characters = ({ searchName }) => {
  // state for limit value of results to display in one page (100 by default)
  const [limitValue, setLimitValue] = useState(100);
  // state for skip value, (page number to display)
  const [skipValue, setSkipValue] = useState(0);
  // state to load page
  const [isLoading, setIsLoading] = useState(true);
  // state for data recieved
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // Send query with name (if searchName exists), limit value and skip value
      if (searchName) {
        try {
          const response = await axios.get(
            `https://site--marvel-api--kyjktnxc458w.code.run/characters?limit=${limitValue}&skip=${skipValue}&name=${searchName}`
          );
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const response = await axios.get(
            "https://site--marvel-api--kyjktnxc458w.code.run/characters?skip=0&limit=100"
            // `https://site--marvel-api--kyjktnxc458w.code.run/characters?limit=${limitValue}&skip=${skipValue}`
          );
          console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, [searchName, limitValue, skipValue]);

  return isLoading ? (
    <div className="loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Your content is loading, please wait...</p>
    </div>
  ) : (
    <>
      <section className="characters">
        <div className="container">
          <p>Characters page</p>
        </div>
      </section>
    </>
  );
};

export default Characters;
