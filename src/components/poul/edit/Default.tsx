import Router from "next/router";
import React, { useState } from "react";

type Props = {
  poulName: string;
  changeView: (viewName: string) => void;
  setPoulName: (newPoulName: string) => void;
};

export default function Root({ poulName, changeView, setPoulName }: Props) {
  return (
    <div>
      <h1>Poul</h1>
      <div>
        <input
          type="text"
          onSubmit={(e) => {
            /* TODO */
          }}
          onChange={(e) => setPoulName(e.target.value)}
          value={poulName}
        />
        <button onClick={() => changeView("manageMatches")}>
          Manage Matches
        </button>
        <button onClick={() => changeView("manageUsers")}>Manage Users</button>
        <button>Save</button>
      </div>
    </div>
  );
}
