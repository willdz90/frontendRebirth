import React from "react";
import Container from "react-bootstrap/Container";
import Cards from "../Components/Card/Card";
import Paginations from "../Components/Pagination/Pagination";
import Navbar from "../Components/Navbar/Navbar";
import FiltersBar from "../Components/FilterBar/FilterBar";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Testimonials from "../Components/Testimonials/Testimonials.jsx";
import "../index.css";

import {
  filterByLocation,
  filterBySex,
  filterBySize,
  fullFilterAge,
  fullFilterLocation,
  fullFilterSex,
  fullFilterSize,
  getPetFilters,
  getPetNames,
  orderByAge,
} from "../Redux/Actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const petType = useLocation().search?.replace("?type=", "");

  const dispatch = useDispatch();
  const pets = useSelector((store) => store.filteredPets);
  // const loading = useSelector(store => store.loading)

  //Paginado//
  const [refresh] = useState(1);
  // const [page, setPage] = useState(1);
  // const [cantPets] = useState(6);
  // const lastPet = page * cantPets;
  // const firstPet = lastPet - cantPets;
  // const petsPage = pets?.slice(firstPet, lastPet);
  // // const cantPages = Math.ceil(pets.length / cantPets);

  // const paginado = (pageNum) => {
  //   setPage(pageNum);
  // };

  // logica de la paginacion, filtro por pagina y loading
  const [currentPage, setCurrentPage] = useState(1); //lo seteo en 1 porque siempre arranco por la primer pagina
  const petsPerPage = 6; //cantidad de pets que debe haber por pagina
  const indexOfLastPet = currentPage * petsPerPage; // 1 * 6 = 6
  const indexOfFirstPet = indexOfLastPet - petsPerPage; // 6 - 6 = 0
  const currentPet = pets.slice(indexOfFirstPet, indexOfLastPet); //para dividir la cantidad de pets por pagina
  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getPetFilters(petType));
  }, [dispatch, petType]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  function handleFilterBySex(e) {
    dispatch(filterBySex(e));
    dispatch(fullFilterSex(e));
    setCurrentPage(1);
  }
  function handleFilterBySize(e) {
    dispatch(filterBySize(e));
    dispatch(fullFilterSize(e));
    setCurrentPage(1);
  }
  function handleFilterByLocation(e) {
    dispatch(filterByLocation(e));
    dispatch(fullFilterLocation(e));
    setCurrentPage(1);
  }
  function handleOrderByAge(e) {
    dispatch(orderByAge(e));
    dispatch(fullFilterAge(e));
    setCurrentPage(1);
  }
  function handleSearchName(search) {
    dispatch(getPetNames(petType, search));
    setCurrentPage(1);
    
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Header type={petType} />
        <FiltersBar
          handleFilterBySex={handleFilterBySex}
          handleFilterBySize={handleFilterBySize}
          handleFilterByLocation={handleFilterByLocation}
          handleOrderByAge={handleOrderByAge}
          handleSearchName={handleSearchName}
        />
        <div className="boxWrap">
          {refresh &&
            currentPet.map((p, i) => {
              return (
                <Cards
                  key={Math.random()}
                  image={p.image}
                  name={p.name}
                  breed={p.race}
                  age={p.age}
                  gender={p.gender}
                  size={p.size}
                  description={p.description}
                  id={p.id}
                  location={p.location}
                />
              );
            })}
        </div>
      </Container>
      <Paginations
        currentPage={currentPage}
        petsPerPage={petsPerPage}
        pets={pets.length}
        pagination={pagination}
      />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Home;
