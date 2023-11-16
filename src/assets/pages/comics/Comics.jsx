import "../comics/comics.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = ({ searchName }) => {
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
      // Send query with title (if searchName exists), limit value and skip value
      if (searchName) {
        try {
          const response = await axios.get(
            `https://site--marvel-api--kyjktnxc458w.code.run/comics?limit=${limitValue}&skip=${skipValue}&title=${searchName}`
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
            `https://site--marvel-api--kyjktnxc458w.code.run/comics?limit=${limitValue}&skip=${skipValue}`
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
    <section className="comics">
      <div className="container">
        {/* data results */}
        <div className="results">
          {data.data.results.map((comic) => {
            return (
              <div className="comic" key={comic._id}>
                <Link to={`/comic/${comic._id}`} state={{ _id: comic._id }}>
                  <img
                    src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <div></div>
                  {comic.title.indexOf("(") > 0 ? (
                    <div>{comic.title.slice(0, comic.title.indexOf("("))}</div>
                  ) : (
                    <div>{comic.title}</div>
                  )}
                  <div></div>
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

export default Comics;
