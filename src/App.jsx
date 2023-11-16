import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
  //state for name/title typed in searchbar
  const [searchName, setSearchName] = useState();
  //state to update fav list
  const [favList, setFavList] = useState([]);

  return (
    <>
      <Router>
        <Header setSearchName={setSearchName}></Header>
        <Routes>
          <Route path="/" element={<Home />} />
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
            element={<Favs favList={favList} setFavList={setFavList} />}
          />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
};

export default App;
