import "../favs/favs.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import oops from "../../pictures/oops.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Favs = ({ favList, setFavList, token, setRegisterModalState }) => {
  const navigate = useNavigate();

  let copyFavList = [];
  if (Cookies.get("favList")) {
    copyFavList = JSON.parse(Cookies.get("favList"));
  }
  console.log(copyFavList);
  let idList = [];
  let dataList = [];

  if (copyFavList) {
    idList = copyFavList.map((favObj) => favObj.id);
    dataList = copyFavList.map((favObj) => favObj.data);
  }
  // function to remove from fav list on click
  const handleRemove = (id) => {
    const index = idList.indexOf(id);
    idList.splice(index, 1);
    dataList.splice(index, 1);
    Cookies.remove("favList");
    const newFavList = [];
    for (let i = 0; i < idList.length; i++) {
      const fav = { id: idList[i], data: dataList[i] };
      newFavList.push(fav);
    }
    const content = JSON.stringify(newFavList);
    Cookies.set("favList", content, { expires: 7 });
    setFavList(newFavList);
  };

  if (token) {
    return (
      <section className="favs">
        <div className="container">
          <h1>
            =✪= &nbsp;&nbsp;My favourites Comic Books and Characters&nbsp;&nbsp;
            =✪=
          </h1>
          <div className="results">
            {copyFavList.length > 0 ? (
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
            )}
          </div>
        </div>
      </section>
    );
  } else {
    setRegisterModalState(true);
    setTimeout(navigate("/"), 2000);
  }
};

export default Favs;
