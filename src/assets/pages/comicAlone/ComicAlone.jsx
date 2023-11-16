import "../comicAlone/comicAlone.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ComicAlone = ({ favList, setFavList }) => {
  // state to load page
  const [isLoading, setIsLoading] = useState(true);
  // state for data recieved concerning comic alone
  const [dataComic, setDataComic] = useState();

  const location = useLocation();

  // determine if character is already in fav or not
  const copyFavList = [...favList];
  const idList = copyFavList.map((favObject) => favObject.id);

  useEffect(() => {
    const comicId = location.state._id;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-api--kyjktnxc458w.code.run/comic/${comicId}`
        );
        setDataComic(response.data);
        console.log(dataComic);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [isLoading]);

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
            {idList.includes(dataComic.data._id) ? (
              <div className="alreadyToFavs">
                <p>
                  <span>★</span>Already in your Fav's
                </p>
              </div>
            ) : (
              <div
                className="toFavs"
                onClick={() => {
                  const newFavList = [...favList];
                  newFavList.push({
                    id: dataComic.data._id,
                    data: dataComic.data,
                  });
                  setFavList(newFavList);
                  const content = JSON.stringify(newFavList);
                  Cookies.remove("favList");
                  Cookies.set("favList", content, { expires: 7 });
                }}
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
