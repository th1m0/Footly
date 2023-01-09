import React, { useState } from "react";
import Router from "next/router";

type Props = {
  poulName: string;
};

export default function Create({ poulName: _poulName }: Props) {
  const [poulName, setPoulName] = useState<string>(_poulName ?? "");

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
        <button onClick={() => Router.push(Router.route + "/manageMatches")}>
          Manage Matches
        </button>
        <button onClick={() => Router.push(Router.route + "/manageUsers")}>
          Manage Users
        </button>
        <button>Save</button>
      </div>
    </div>
  );
}
