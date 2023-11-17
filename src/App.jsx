import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
// Pages
import Home from "./assets/pages/home/Home";
import Characters from "./assets/pages/characters/Characters";
import CharacterAlone from "./assets/pages/characterAlone/CharacterAlone";
import Comics from "./assets/pages/comics/Comics";
import ComicAlone from "./assets/pages/comicAlone/ComicAlone";
import Favs from "./assets/pages/favs/Favs";
// Components
import Header from "./assets/components/header/Header";
import Footer from "./assets/components/footer/Footer";

import "./App.css";
import { useState } from "react";

const App = () => {
  // state for name/title typed in searchbar
  const [searchName, setSearchName] = useState();
  // state to update fav list
  const [favList, setFavList] = useState([]);
  // state for user token after login or register
  const [token, setToken] = useState();
  // state for modal opening/closing Register
  const [registerModalState, setRegisterModalState] = useState(false);
  // state for modal opening/closing login
  const [loginModalState, setLoginModalState] = useState(false);

  return (
    <>
      <Router>
        <Header
          setSearchName={setSearchName}
          token={token}
          setRegisterModalState={setRegisterModalState}
        ></Header>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                token={token}
                setToken={setToken}
                registerModalState={registerModalState}
                setRegisterModalState={setRegisterModalState}
                loginModalState={loginModalState}
                setLoginModalState={setLoginModalState}
              />
            }
          />
          <Route
            path="/characters"
            element={<Characters searchName={searchName} />}
          />
          <Route
            path="/character/:characterId"
            element={
              <CharacterAlone favList={favList} setFavList={setFavList} />
            }
          />
          <Route path="/comics" element={<Comics searchName={searchName} />} />
          <Route
            path="/comic/:comicId"
            element={<ComicAlone favList={favList} setFavList={setFavList} />}
          />
          <Route
            path="/favs"
            element={
              <Favs
                favList={favList}
                setFavList={setFavList}
                token={token}
                setRegisterModalState={setRegisterModalState}
              />
            }
          />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
};

export default App;
