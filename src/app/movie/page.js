import styles from "@/app/styles/common.module.css";
import React from "react";
import MovieCard from "../components/MovieCard";

const movie = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const url = process.env.RAPID_KEY;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4a84f3e33bmshc5203b49df57479p1699c4jsncd30c0070647",
      "X-RapidAPI-Host": "netflix54.p.rapidapi.com",
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  const main_data = data.titles;
  console.log(data.titles);
  return (
    <>
      <section className={styles.movieSection}>
        <div className={styles.container}>
          <h1>Series & Movies</h1>
          <div className={styles.card_section}>
            {main_data.map((curElm) => {
              return <MovieCard key={curElm.id} {...curElm} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default movie;
