import "../comicAlone/comicAlone.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import fake from "../../pictures/fake-cover.jpg";

const ComicAlone = ({ token }) => {
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

  useEffect(() => {
    const comicId = location.state._id;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-api--kyjktnxc458w.code.run/comic/${comicId}`
        );
        setDataComic(response.data);

        // if user is connected get all favs if not favs are empty
        if (token) {
          const responseFavs = await axios.get(
            "https://site--marvel-api--kyjktnxc458w.code.run/favs",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setDataFavs(responseFavs.data.allFavs);
        }

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
    // if user not connected alert
    if (token) {
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

          setRefresh(!refresh);
          setIsInList(true);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    } else {
      alert(
        "Only connected users can add items to favorites, please Register or Connect to your account on Homepage."
      );
    }
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
          <span>=✪=</span>
          <span>
            {dataComic.data.title.indexOf("(") > 0
              ? dataComic.data.title.slice(0, dataComic.data.title.indexOf("("))
              : dataComic.data.title}
          </span>
          <span>=✪=</span>
        </h1>
        <div className="content">
          <div className="comicSelected">
            {dataComic.data.thumbnail.path.includes("image_not_available") ? (
              <img src={fake} alt="fake cover of comic" />
            ) : (
              <img
                src={`${dataComic.data.thumbnail.path}/portrait_incredible.${dataComic.data.thumbnail.extension}`}
                alt={dataComic.data.title}
              />
            )}

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
