import React, { useState } from "react";
import Router from "next/router";

type Props = { poulName: string; changeView: (viewName: string) => void };

export default function ManageMatches({
  poulName: _poulName,
  changeView,
}: Props) {
  const [poulName, setPoulName] = useState<string>(_poulName ?? "");

  return (
    <div>
      <h1>Poul - Manage Matches</h1>

      <div>
        <input
          type="text"
          onSubmit={(e) => {
            /* TODO */
          }}
          onChange={(e) => setPoulName(e.target.value)}
          value={poulName}
        />
        <button
          onClick={() => {
            changeView("manageUsers");
          }}
        >
          Manage Users
        </button>
      </div>
    </div>
  );
}
