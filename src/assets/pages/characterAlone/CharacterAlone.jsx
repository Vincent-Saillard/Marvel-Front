import { useEffect, useState } from "react";
import "../characterAlone/characterAlone.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const CharacterAlone = ({ favList, setFavList }) => {
  // state to load page
  const [isLoading, setIsLoading] = useState(true);
  // state for data recieved concerning character alone
  const [dataCharacter, setDataCharacter] = useState();
  // state for data recieved concerning list of comics where character appears
  const [dataComics, setDataComics] = useState();

  const location = useLocation();

  // determine if character is already in fav or not
  const copyFavList = [...favList];
  const idList = copyFavList.map((favObject) => favObject.id);

  useEffect(() => {
    const characterId = location.state._id;

    const fetchData = async () => {
      try {
        //sending two requests, for character's info and list of comics he appears in
        const responseInfos = await axios.get(
          `https://site--marvel-api--kyjktnxc458w.code.run/character/${characterId}`
        );
        setDataCharacter(responseInfos.data);
        console.log(dataCharacter);

        const responseComics = await axios.get(
          `https://site--marvel-api--kyjktnxc458w.code.run/comics/${characterId}`
        );
        setDataComics(responseComics.data);
        console.log(dataComics);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [isLoading]);

  return isLoading ? (
    <section className="characterAlone">
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
    <section className="characterAlone">
      <div className="container">
        <h1>
          =✪= &nbsp;&nbsp;
          {dataCharacter.data.name.indexOf("(") > 0
            ? dataCharacter.data.name.slice(
                0,
                dataCharacter.data.name.indexOf("(")
              )
            : dataCharacter.data.name}
          &nbsp;&nbsp; =✪=
        </h1>
        <div className="heroeSelected">
          <img
            src={`${dataCharacter.data.thumbnail.path}/portrait_incredible.${dataCharacter.data.thumbnail.extension}`}
            alt={dataCharacter.data.name}
          />
          <div className="text">
            <div className="left"></div>
            {dataCharacter.data.name.indexOf("(") > 0 ? (
              <div className="heroeName">
                {dataCharacter.data.name.slice(
                  0,
                  dataCharacter.data.name.indexOf("(")
                )}
              </div>
            ) : (
              <div className="heroeName">{dataCharacter.data.name}</div>
            )}
            <div className="right"></div>
          </div>
        </div>
        {idList.includes(dataCharacter.data._id) ? (
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
                id: dataCharacter.data._id,
                data: dataCharacter.data,
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
        {dataCharacter.data.description && (
          <div className="description">{dataCharacter.data.description}</div>
        )}
        <p className="subtitle">
          This character can be found in the following comics
        </p>
        <div className="carousel">
          <div className="carouselLeft"></div>
          <div className="comiclist">
            {dataComics.data.comics.map((comic) => {
              return (
                <div className="comicOn" key={comic._id}>
                  <img
                    src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <div className="text">
                    <div className="left"></div>
                    <div className="comictitle">{comic.title}</div>
                    <div className="right"></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="carouselRight"></div>
        </div>
      </div>
    </section>
  );
};

export default CharacterAlone;
