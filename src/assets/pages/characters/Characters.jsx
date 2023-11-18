import "../characters/characters.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import silhouette from "../../pictures/silhouette.jpg";

// import before from "../../pictures/before.png";
// import after from "../../pictures/after.png";

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
          // console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        try {
          const response = await axios.get(
            `https://site--marvel-api--kyjktnxc458w.code.run/characters?limit=${limitValue}&skip=${skipValue}`
          );
          // console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, [searchName, limitValue, skipValue]);

  // handle function to change page number on click
  // const handleClick = (value) => {
  //   if (value === "minus") {
  //     if (skipValue > 0) {
  //       setSkipValue(skipValue - 1);
  //     }
  //   } else if (value === "plus") {
  //     let max = 0;
  //     data.data.count % limitValue === 0
  //       ? (max = data.data.count / limitValue)
  //       : (max = Math.ceil(data.data.count / limitValue));
  //     if (skipValue < max - 1) {
  //       setSkipValue(skipValue + 1);
  //     }
  //   }
  // };

  return isLoading ? (
    <section className="characters">
      <div className="container">
        <div className="loading">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>Your content is loading, please wait...</p>
        </div>
      </div>
    </section>
  ) : (
    <section className="characters">
      <div className="container">
        <h1>=✪= &nbsp;&nbsp;Marvel Characters&nbsp;&nbsp; =✪=</h1>
        {/* data results */}
        <div className="results">
          {data.data.results.map((heroe) => {
            return (
              <div className="hero" key={heroe._id}>
                <Link
                  to={`/character/${heroe._id}`}
                  state={{ _id: heroe._id }}
                  className="link"
                >
                  {heroe.thumbnail.path.includes("image_not_available") ? (
                    <img src={silhouette} alt="silhouette of unknown hero" />
                  ) : (
                    <img
                      src={`${heroe.thumbnail.path}/portrait_uncanny.${heroe.thumbnail.extension}`}
                      alt={heroe.name}
                    />
                  )}

                  <div className="text">
                    <div className="left"></div>
                    {heroe.name.indexOf("(") > 0 ? (
                      <div className="heroeName">
                        {heroe.name.slice(0, heroe.name.indexOf("("))}
                      </div>
                    ) : (
                      <div className="heroeName">{heroe.name}</div>
                    )}
                    <div className="right"></div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* options to define page number and max results by page */}
        <div className="pageOptions">
          <div className="limit">
            <label htmlFor="results">Number of results by page</label>
            <input
              type="number"
              id="results"
              min={10}
              max={100}
              step={10}
              placeholder={limitValue}
              onChange={(event) => {
                const value = event.target.value;
                setLimitValue(value);
              }}
            />
          </div>
          <div className="pages">
            {/* <img
                src={before}
                alt="before sign"
                onClick={handleClick("minus")}
              /> */}

            <label htmlFor="pagenum">Page </label>
            <input
              type="number"
              id="pagenum"
              placeholder={skipValue + 1}
              min={1}
              max={
                data.data.count % limitValue === 0
                  ? data.data.count / limitValue
                  : Math.ceil(data.data.count / limitValue)
              }
              step={1}
              onChange={(event) => {
                const value = event.target.value;
                setSkipValue((value - 1) * limitValue);
              }}
            />
            <p>{` on ${
              data.data.count % limitValue === 0
                ? data.data.count / limitValue
                : Math.ceil(data.data.count / limitValue)
            }`}</p>
            {/* <img
                src={after}
                alt="after sign"
                onClick={handleClick("plus")}
              /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Characters;
