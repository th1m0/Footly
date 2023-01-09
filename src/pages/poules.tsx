import React, { useState } from "react";
import Router from "next/router";

type Props = {};

export default function Poules({}: Props) {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div>
      <h1>Poules</h1>

      <div>
        <button onClick={() => Router.push("/poule/create")}>
          Create a Poul
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search for a poul"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </div>
      <div>
        <h3>Name</h3>
        <h3>Score</h3>
        <h3>Played</h3>
        <h3>Matches</h3>
      </div>

      <div>{/* Matches. */}</div>
    </div>
  );
}
