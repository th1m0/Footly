import Grid from "@mui/material/Grid";
import footballApi from "../lib/footballApi/FootballApi";
import { useState } from "react";
import { Competition } from "../components/home/Competitions";
import { Matches } from "../components/home/Matches";

type Props = {
  matches: any[];
  competitions: any[];
};

const Home = ({ matches, competitions }: Props) => {
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(
    null
  );
  const handleChange = (event: any) => {
    console.log("The selected competition is now", event.currentTarget.value);
    setSelectedCompetition(event.currentTarget.value);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-hidden">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Competition
            competitions={competitions}
            selectedCompetition={selectedCompetition}
            handleChange={handleChange}
            className="h-64"
          />
        </Grid>
        <Grid item xs={6}>
          <Matches
            matches={matches}
            selectedCompetition={selectedCompetition}
            className="h-64 overflow-y-scroll"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export async function getStaticProps() {
  const matchesData = await footballApi.fixturesManager.get({
    date: new Date(),
  });
  const leaguesData = await footballApi.leagueManager.get({});

  return {
    props: {
      matches: matchesData?.response,
      competitions: leaguesData?.response,
    },
    revalidate: 600,
  };
}

export default Home;
