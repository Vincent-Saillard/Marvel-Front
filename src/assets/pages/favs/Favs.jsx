import "../favs/favs.css";
// import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import oops from "../../pictures/oops.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Favs = ({ favList, setFavList, token, setRegisterModalState }) => {
  const navigate = useNavigate();

  // state to load page
  const [isLoading, setIsLoading] = useState(true);
  // state for data recieved
  const [data, setData] = useState();
  // state to refresh page
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-api--kyjktnxc458w.code.run/favs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.allFavs);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [refresh]);

  // function to remove fav
  const handleRemove = (id) => {
    const fetchData = async () => {
      try {
        const response = await axios.delete(
          `https://site--marvel-api--kyjktnxc458w.code.run/favs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.message);
        setRefresh(!refresh);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  // --------------FAVS IN COOKIES-------------
  // let copyFavList = [];
  // if (Cookies.get("favList")) {
  //   copyFavList = JSON.parse(Cookies.get("favList"));
  // }
  // console.log(copyFavList);
  // let idList = [];
  // let dataList = [];

  // if (copyFavList) {
  //   idList = copyFavList.map((favObj) => favObj.id);
  //   dataList = copyFavList.map((favObj) => favObj.data);
  // }
  // // function to remove from fav list on click
  // const handleRemove = (id) => {
  //   const index = idList.indexOf(id);
  //   idList.splice(index, 1);
  //   dataList.splice(index, 1);
  //   Cookies.remove("favList");
  //   const newFavList = [];
  //   for (let i = 0; i < idList.length; i++) {
  //     const fav = { id: idList[i], data: dataList[i] };
  //     newFavList.push(fav);
  //   }
  //   const content = JSON.stringify(newFavList);
  //   Cookies.set("favList", content, { expires: 7 });
  //   setFavList(newFavList);
  // };

  if (token) {
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
      <section className="favs">
        <div className="container">
          <h1>
            =✪= &nbsp;&nbsp;My favourites Comic Books and Characters&nbsp;&nbsp;
            =✪=
          </h1>
          <div className="results">
            {console.log(data)}
            {data.length > 0 ? (
              data.map((obj) => {
                return (
                  <div className="group" key={obj._id}>
                    <div className="fav">
                      <Link
                        to={
                          obj.title
                            ? `/comic/${obj._id}`
                            : `/character/${obj._id}`
                        }
                        state={{ _id: obj.itemId }}
                        className="link"
                      >
                        <img
                          src={`${obj.path}/portrait_uncanny.${obj.extension}`}
                          alt={obj.title || obj.name}
                        />
                        <div className="text">
                          <div className="left"></div>
                          {obj.title ? (
                            obj.title.indexOf("(") > 0 ? (
                              <div className="title">
                                {obj.title.slice(0, obj.title.indexOf("("))}
                              </div>
                            ) : (
                              <div className="title">{obj.title}</div>
                            )
                          ) : obj.name.indexOf("(") > 0 ? (
                            <div className="title">
                              {obj.name.slice(0, obj.name.indexOf("("))}
                            </div>
                          ) : (
                            <div className="title">{obj.name}</div>
                          )}
                          <div className="right"></div>
                        </div>
                      </Link>
                    </div>
                    <div
                      className="remove"
                      onClick={() => handleRemove(obj._id)}
                    >
                      <p>Remove from fav's</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="emptyness">
                <img src={oops} alt="oops sign" className="oops" />
                <p className="empty">Your Fav list is empty</p>
              </div>
            )}

            {/* ------------FAVS IN COOKIES------------- */}
            {/* {copyFavList.length > 0 ? (
              dataList.map((obj) => {
                return (
                  <div className="group" key={obj._id}>
                    <div className="fav">
                      <Link
                        to={
                          obj.title
                            ? `/comic/${obj._id}`
                            : `/character/${obj._id}`
                        }
                        state={{ _id: obj._id }}
                        className="link"
                      >
                        <img
                          src={`${obj.thumbnail.path}/portrait_uncanny.${obj.thumbnail.extension}`}
                          alt={obj.title || obj.name}
                        />
                        <div className="text">
                          <div className="left"></div>
                          {obj.title ? (
                            obj.title.indexOf("(") > 0 ? (
                              <div className="title">
                                {obj.title.slice(0, obj.title.indexOf("("))}
                              </div>
                            ) : (
                              <div className="title">{obj.title}</div>
                            )
                          ) : obj.name.indexOf("(") > 0 ? (
                            <div className="title">
                              {obj.name.slice(0, obj.name.indexOf("("))}
                            </div>
                          ) : (
                            <div className="title">{obj.name}</div>
                          )}
                          <div className="right"></div>
                        </div>
                      </Link>
                    </div>
                    <div
                      className="remove"
                      onClick={() => handleRemove(obj._id)}
                    >
                      <p>Remove from fav's</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="emptyness">
                <img src={oops} alt="oops sign" className="oops" />
                <p className="empty">Your Fav list is empty</p>
              </div>
            )} */}
          </div>
        </div>
      </section>
    );
  } else {
    setTimeout(() => {
      navigate("/");
      setRegisterModalState(true);
    }, 2000);
  }
};

export default Favs;
