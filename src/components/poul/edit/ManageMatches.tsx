import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
import { LeagueResponse } from "footballApi";

type Props = {
  poulName: string;
  changeView: (viewName: string) => void;
  setPoulName: (newPoulName: string) => void;
};

export default function ManageMatches({
  poulName,
  changeView,
  setPoulName,
}: Props) {
  const [team, setTeam] = useState<string>();
  const [teamLastLetterAdded, setTeamLastLetterAdded] = useState<number>(-1);
  const [competition, setCompetition] = useState<string>("");
  const [competitionLastLetterAdded, setCompetitionLastLetterAdded] =
    useState<number>(-1);
  const [competitionsFound, setCompetitionsFound] = useState<
    { id: number; name: string }[]
  >([]);

  const onCompetitionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompetition(value);
    setCompetitionLastLetterAdded(Date.now());
    console.log("???");
    setTimeout(async () => {
      console.log(
        "this",
        value.length,
        new Date().getTime() - competitionLastLetterAdded
      );
      if (value.length >= 3) {
        if (new Date().getTime() - competitionLastLetterAdded > 3000) {
          //Search for competitions...
          //api call
          console.log("posting...");
          try {
            console.log("POSTING!!!!");
            const { data, status } = await axios.post(
              "/api/search/competition",
              {
                body: {
                  competition,
                },
              }
            );
            if (status != 200) return; //TODO handle error...
            else {
              console.log("resData", data);

              setCompetitionsFound(
                (data.data as LeagueResponse).response.map((res) => {
                  return { id: res.league.id, name: res.league.name };
                })
              );
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    }, 3000);
  };

  return (
    <div>
      {/* Title */}
      <div>
        <h1>Poul - Manage Matches</h1>
      </div>
      {/* Nav Div */}
      <div>
        <input
          type="text"
          onSubmit={(e) => {
            /* TODO */
          }}
          onChange={(e) => setPoulName(e.target.value)}
          value={poulName}
        />
        <button onClick={() => changeView("manageUsers")}>Manage Users</button>
      </div>
      data
      {/* Add a Match div */}
      <div>
        <h3>Add a Match</h3>
        <input
          type="text"
          placeholder={"Team"}
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <input
          id="competition"
          type="text"
          placeholder={"Competition *"}
          required
          value={competition}
          onChange={(e) => onCompetitionChange(e)}
        />

        <datalist id="competition">
          <option key={123456} value="Eredivisie"></option>
          {competitionsFound.map((comp) => {
            return <option key={comp.id} value={comp.name} />;
          })}
        </datalist>

        <button
          onClick={() => {
            //Search for matches to add to the poul
            //Make api call with the following values and get the possible matches in return
          }}
        >
          Search Matches
        </button>
      </div>
      {/* Matches div */}
      <div></div>
    </div>
  );
}
