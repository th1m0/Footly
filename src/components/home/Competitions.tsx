import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface Props {
  competitions: Array<any>;
  selectedCompetition: number | null;
  handleChange: (event: any) => void;
  className?: string;
}

export const Competition: React.FC<Props> = ({
  competitions,
  selectedCompetition,
  handleChange,
  className,
}) => {
  return (
    <List className={`${className} overflow-scroll`}>
      {/* @ts-ignore */}
      <ListItem button onClick={handleChange} selected={!selectedCompetition}>
        <ListItemText primary="All" />
      </ListItem>
      {competitions.map((competition) => (
        <ListItem
          // @ts-ignore
          button
          key={competition.league.id}
          value={competition.league.id}
          onClick={handleChange}
          selected={competition.league.id === selectedCompetition}
        >
          <ListItemText primary={competition.league.name} />
        </ListItem>
      ))}
    </List>
  );
};
