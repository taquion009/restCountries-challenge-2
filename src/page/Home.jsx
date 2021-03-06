import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "./Home.css";
import Loader from "../components/Loader";

const url = "https://restcountries.com/v3.1/";

const Home = () => {
  const [select, setSelect] = useState(null);
  const [db, setDb] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!select) return;
    setLoading(true);
    fetch(`${url}region/${select}`)
      .then((res) => res.json())
      .then((res) => {
        const countries = res.map((el) => ({
          name: el.name.official,
          img: el.flags.svg,
          population: el.population,
          region: el.region,
          capital: el.capital,
        }));
        setDb(countries);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [select]);

  useEffect(() => {
    setLoading(true);
    if (search.trim().length > 1) {
      fetch(`${url}name/${search.trim()}`)
        .then((res) => res.json())
        .then((res) => {
          const countries = res.map((el) =>
            el !== null
              ? {
                  name: el.name.official,
                  img: el.flags.svg,
                  population: el.population,
                  region: el.region,
                  capital: el.capital,
                }
              : null
          );
          setDb(countries);
          setLoading(false);
        })
        .catch((err) => {
          setDb([]);
          setLoading(false);
        });
    } else {
      fetch(`${url}all`)
        .then((res) => res.json())
        .then((res) => {
          const countries = res.map((el) => ({
            name: el.name.official,
            img: el.flags.svg,
            population: el.population,
            region: el.region,
            capital: el.capital,
          }));
          setDb(countries);
          setLoading(false);
        });
    }
  }, [search]);

  const handleSelect = (e) => {
    setSelect(e.target.dataset.country);
    document.querySelector(".list-option").classList.add("oculto");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <main>
      {loading && <Loader />}
      <div className="col-2">
        <form>
          <label>
            <SearchIcon />
          </label>
          <input
            type="text"
            placeholder="Search for a country..."
            name="search"
            onChange={handleSearch}
            value={search}
          />
        </form>
        <nav className="container-select">
          <div
            className="select"
            onClick={() =>
              document.querySelector(".list-option").classList.toggle("oculto")
            }
          >
            <span>{select ? select : "filter Countries"}</span>
            <ArrowIcon />
          </div>
          <ul className="list-option oculto">
            <li className="option" onClick={handleSelect} data-country="africa">
              Africa
            </li>
            <li
              className="option"
              onClick={handleSelect}
              data-country="americas"
            >
              America
            </li>
            <li className="option" onClick={handleSelect} data-country="asia">
              Asia
            </li>
            <li className="option" onClick={handleSelect} data-country="europe">
              Europa
            </li>
            <li
              className="option"
              onClick={handleSelect}
              data-country="oceania"
            >
              Oceania
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-card">
        {db && db.map((el) => (el ? <Card key={el.name} {...el} /> : ""))}
      </div>
    </main>
  );
};

export default Home;
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
  >
    <title>Search</title>
    <path d="M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
  </svg>
);
