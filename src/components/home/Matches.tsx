import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

interface Props {
  matches: Array<any>;
  selectedCompetition: number | null;
  className?: string;
}

export const Matches: React.FC<Props> = ({
  matches,
  selectedCompetition,
  className,
}) => {
  return (
    <Grid
      container
      spacing={3}
      className={`${className} h-64 overflow-y-scroll`}
    >
      {matches.map((match) => {
        if (!selectedCompetition || match.league.id === selectedCompetition) {
          return (
            <Grid item xs={6} key={match.fixture.id}>
              <Paper>
                <div className="match">
                  <div className="home-team">{match.teams.home.name}</div>
                  <div className="away-team">{match.teams.away.name}</div>
                  <div className="match-date">{match.fixture.date}</div>
                </div>
              </Paper>
            </Grid>
          );
        }
        return null;
      })}
    </Grid>
  );
};
