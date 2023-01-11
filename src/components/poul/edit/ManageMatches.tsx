import axios from "axios";
import { LeagueResponse } from "footballApi";
import { useEffect, useState } from "react";

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
  const [competition, setCompetition] = useState<string>("");
  const [competitionsFound, setCompetitionsFound] = useState<
    { id: number; name: string }[]
  >([]);
  const [lastCompetitionSearch, setLastCompetitionSearch] =
    useState<number>(-1);

  useEffect(() => {
    const searchCompetitions = async () => {
      setLastCompetitionSearch(Date.now());
      console.log("requesting...");
      try {
        const { data, status } = await axios.post("/api/search/competition", {
          body: { competition },
        });
        if (status !== 200) {
          return; //TODO handle error
        }
        console.log("data", data);
        setCompetitionsFound(
          data.data.response.map((res: any) => {
            return { id: res.league.id, name: res.league.name };
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    const debouncedSearch = debounce(searchCompetitions, 3000);
    if (competition.length >= 3) {
      debouncedSearch();
    }
  }, [competition]);

  function debounce(func: any, delay: number) {
    let inDebounce: NodeJS.Timeout;
    return function () {
      // @ts-ignore
      console.log(this);
      // @ts-ignore
      const context = this;
      const args: IArguments = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  }

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
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <input
          id="competition"
          type="text"
          placeholder={"Competition *"}
          required
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
        />
        <datalist id="competition">
          <option key={123} value="Eredivisie"></option>
          {competitionsFound.map((comp: any) => {
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
      {/* ... */}
    </div>
  );
}
