import "../comicAlone/comicAlone.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import Cookies from "js-cookie";

const ComicAlone = ({ favList, setFavList, token }) => {
  // state to load page
  const [isLoading, setIsLoading] = useState(true);
  // state for data recieved concerning comic alone
  const [dataComic, setDataComic] = useState();
  // state for fav data
  const [dataFavs, setDataFavs] = useState();

  const location = useLocation();

  const [refresh, setRefresh] = useState(false);

  const [isInList, setIsInList] = useState(false);

  const [counter, setCounter] = useState(0);

  // determine if character is already in fav or not
  // const copyFavList = [...favList];
  // const idList = copyFavList.map((favObject) => favObject.id);

  useEffect(() => {
    const comicId = location.state._id;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-api--kyjktnxc458w.code.run/comic/${comicId}`
        );
        setDataComic(response.data);
        console.log(dataComic);

        const responseFavs = await axios.get(
          "https://site--marvel-api--kyjktnxc458w.code.run/favs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDataFavs(responseFavs.data.allFavs);

        // determine if character is already in fav or not

        if (dataFavs) {
          const idList = dataFavs.map((fav) => fav.itemId);

          if (idList.includes(dataComic.data._id) === true) {
            setIsInList(true);
          }
        }

        setIsLoading(false);
        if (counter === 0) {
          setCounter(counter + 1);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [refresh, counter, isLoading]);

  const handleClickAdd = (id) => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://site--marvel-api--kyjktnxc458w.code.run/favs",
          {
            itemId: dataComic.data._id,
            title: dataComic.data.title,
            path: dataComic.data.thumbnail.path,
            extension: dataComic.data.thumbnail.extension,
            name: "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setRefresh(!refresh);
        setIsInList(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  return isLoading ? (
    <section className="comicAlone">
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
    <section className="comicAlone">
      <div className="container">
        <h1>
          =✪= &nbsp;&nbsp;
          {dataComic.data.title.indexOf("(") > 0
            ? dataComic.data.title.slice(0, dataComic.data.title.indexOf("("))
            : dataComic.data.title}
          &nbsp;&nbsp; =✪=
        </h1>
        <div className="content">
          <div className="comicSelected">
            <img
              src={`${dataComic.data.thumbnail.path}/portrait_incredible.${dataComic.data.thumbnail.extension}`}
              alt={dataComic.data.title}
            />
            <div className="text">
              <div className="left"></div>
              {dataComic.data.title.indexOf("(") > 0 ? (
                <div className="title">
                  {dataComic.data.title.slice(
                    0,
                    dataComic.data.title.indexOf("(")
                  )}
                </div>
              ) : (
                <div className="title">{dataComic.data.title}</div>
              )}
              <div className="right"></div>
            </div>
          </div>
          <div className="aside">
            {isInList ? (
              <div className="alreadyToFavs">
                <p>
                  <span>★</span>Already in your Fav's
                </p>
              </div>
            ) : (
              <div
                className="toFavs"
                onClick={() => handleClickAdd(dataComic.data._id)}
              >
                <p>
                  <span>★</span>Add to fav's
                </p>
              </div>
            )}
            {dataComic.data.description && (
              <div className="description">{dataComic.data.description}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComicAlone;
