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
    <section className="characterAlone">
      <div className="container">
        <div className="heroe">
          <img
            src={`${dataCharacter.data.thumbnail.path}/portrait_incredible.${dataCharacter.data.thumbnail.extension}`}
            alt={dataCharacter.data.name}
          />
          <div></div>
          {dataCharacter.data.name.indexOf("(") > 0 ? (
            <div>
              {dataCharacter.data.name.slice(
                0,
                dataCharacter.data.name.indexOf("(")
              )}
            </div>
          ) : (
            <div>{dataCharacter.data.name}</div>
          )}
          <div></div>
          {idList.includes(dataCharacter.data._id) ? (
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
        </div>
        <div className="comics">
          {dataComics.data.comics.map((comic) => {
            return (
              <div className="comic" key={comic._id}>
                <img
                  src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <div>{comic.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CharacterAlone;
