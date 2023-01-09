import React, { useState } from "react";

type Props = { poulName: string };

export default function Root({ poulName: _poulName }: Props) {
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
        <a href="./manageMatches">Manage Matches</a>
        <a href="./manageUsers">Manage Users</a>
        <button>Save</button>
      </div>
    </div>
  );
}
