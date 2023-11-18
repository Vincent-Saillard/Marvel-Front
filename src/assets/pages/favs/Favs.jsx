import "../favs/favs.css";
// import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import oops from "../../pictures/oops.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Favs = ({ token, setRegisterModalState }) => {
  const navigate = useNavigate();

  // state to load page
  const [isLoading, setIsLoading] = useState(true);
  // state for data recieved
  const [data, setData] = useState();
  // state to refresh page
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (token) {
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
    } else {
      setRegisterModalState(true);
      navigate("/");
    }
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

        setRefresh(!refresh);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  // if (token) {
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
          <span>=✪=</span>
          <span>My favourites Comic Books and Characters</span>
          <span>=✪=</span>
        </h1>
        <div className="results">
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
                  <div className="remove" onClick={() => handleRemove(obj._id)}>
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
};

export default Favs;
