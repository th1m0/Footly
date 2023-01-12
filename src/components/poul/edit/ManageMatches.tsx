import axios from "axios";
import { Fixture, League, LeagueResponse } from "footballApi";
import { useEffect, useState } from "react";
import footballApi from "../../../lib/footballApi/FootballApi";

type Props = {
  poulName: string;
  changeView: (viewName: string) => void;
  setPoulName: (newPoulName: string) => void;
  competitions: League[];
};

export default function ManageMatches({
  poulName,
  changeView,
  setPoulName,
  competitions,
}: Props) {
  const [team, setTeam] = useState<string | null>(null);
  const [competition, setCompetition] = useState<string>("");
  const [searchedMatches, setSearchedMatches] = useState<Fixture[] | null>(
    null
  );

  return (
    <div>
      <div>
        <h1>Poul - Manage Matches</h1>
      </div>
      <div>
        <input
          type="text"
          onSubmit={(e) => {}}
          onChange={(e) => setPoulName(e.target.value)}
          value={poulName}
        />
        <button onClick={() => changeView("manageUsers")}>Manage Users</button>
      </div>
      <div>
        <h3>Add a Match</h3>
        <input
          type="text"
          placeholder={"Team"}
          value={team ?? undefined}
          onChange={(e) => setTeam(e.target.value)}
        />
        <input
          type="text"
          placeholder={"Competition *"}
          required
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
        />

        <button
          onClick={async () => {
            //TODO: make loading animation when doing requests...
            //Search for matches to add to the poul
            //Make api call with the following values and get the possible matches in return

            console.log(
              `Searching for competition=${competition} and team=${
                team ?? "No Team."
              }`
            );

            let teamId;
            if (team) {
              const teamData = await footballApi.teamsManager.getInformation({
                search: team,
              });
              teamId = teamData?.response?.[0]?.team?.id;
            }

            const leagueId = competitions.find(
              (c) => c.name == competition
            )?.id;
            if (!leagueId) {
              //TODO: handle error message.
              return;
            }

            const data = await footballApi.fixturesManager.get({
              teamId: teamId?.toString(),
              leagueId: leagueId.toString(),
            });

            if (data == null) setSearchedMatches([]);
          }}
        >
          Search Matches
        </button>
      </div>
      {/* Matches div */}
      {/* ... */}
    </div>
  );
}
