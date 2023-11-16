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
    <section className="comicAlone">
      <div className="container">
        <div className="comic">
          <img
            src={`${dataComic.data.thumbnail.path}/portrait_incredible.${dataComic.data.thumbnail.extension}`}
            alt={dataComic.data.title}
          />
          <div></div>
          {dataComic.data.title.indexOf("(") > 0 ? (
            <div>
              {dataComic.data.title.slice(0, dataComic.data.title.indexOf("("))}
            </div>
          ) : (
            <div>{dataComic.data.title}</div>
          )}
          <div></div>
          {idList.includes(dataComic.data._id) ? (
            <div className="toFavs">
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
        </div>
        {dataComic.data.description && (
          <div className="description">{dataComic.data.description}</div>
        )}
      </div>
    </section>
  );
};

export default ComicAlone;
