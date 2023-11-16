import "../favs/favs.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Favs = ({ favList, setFavList }) => {
  let copyFavList = [];
  if (Cookies.get("favList")) {
    copyFavList = JSON.parse(Cookies.get("favList"));
    console.log(copyFavList);
  }

  let idList = [];
  let dataList = [];

  if (copyFavList) {
    idList = copyFavList.map((favObj) => favObj.id);
    dataList = copyFavList.map((favObj) => favObj.data);
  }

  return (
    <section className="favs">
      <div className="container">
        {copyFavList ? (
          dataList.map((obj) => {
            return (
              <div className="fav" key={obj._id}>
                <Link
                  to={obj.title ? `/comic/${obj._id}` : `/character/${obj._id}`}
                  state={{ _id: obj._id }}
                >
                  <img
                    src={`${obj.thumbnail.path}/portrait_xlarge.${obj.thumbnail.extension}`}
                    alt={obj.title || obj.name}
                  />

                  <div></div>
                  {obj.title ? (
                    obj.title.indexOf("(") > 0 ? (
                      <div>{obj.title.slice(0, obj.title.indexOf("("))}</div>
                    ) : (
                      <div>{obj.title}</div>
                    )
                  ) : obj.name.indexOf("(") > 0 ? (
                    <div>{obj.name.slice(0, obj.name.indexOf("("))}</div>
                  ) : (
                    <div>{obj.name}</div>
                  )}
                  <div></div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>Your Fav list is empty</p>
        )}
      </div>
    </section>
  );
};

export default Favs;
