import React, { useState } from "react";

type Props = { poulName: string };

export default function ManageMatches({ poulName: _poulName }: Props) {
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
        <button onClick={() => {}}>Manage Matches</button>
        <button onClick={() => {}}>Manage Users</button>
      </div>
    </div>
  );
}
