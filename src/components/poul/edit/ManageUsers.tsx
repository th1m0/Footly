import React from "react";

type Props = {
  poulName: string;
  changeView: (viewName: string) => void;
  setPoulName: (newPoulName: string) => void;
};

export default function ManageUsers({
  poulName,
  changeView,
  setPoulName,
}: Props) {
  return (
    <div>
      <h1>Poul - Manage Users</h1>

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
      </div>
    </div>
  );
}
