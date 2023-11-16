import "../favs/favs.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Favs = ({ favList, setFavList }) => {
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
                <div className="remove" onClick={() => handleRemove(obj._id)}>
                  <div className="minus">-</div>
                  <p>Remove from my fav's</p>
                </div>
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
