import React, { useState } from "react";
import DefaultEditScreen from "../../../components/poul/edit/Default";
import ManageMatchesEditScreen from "../../../components/poul/edit/ManageMatches";
import ManageUsersEditScreen from "../../../components/poul/edit/ManageUsers";
import footballApi from "../../../lib/footballApi/FootballApi";
import { League } from "footballApi";

type Props = {
  competitions: League[];
};

export default function Create({ competitions }: Props) {
  const [poulName, setPoulName] = useState<string>("");
  const [view, setView] = useState<string | null>(null);
  switch (view) {
    case "manageMatches":
      return (
        <ManageMatchesEditScreen
          poulName={poulName}
          setPoulName={setPoulName}
          changeView={(newViewName) => setView(newViewName)}
          competitions={competitions}
        />
      );
    case "manageUsers":
      return (
        <ManageUsersEditScreen
          poulName={poulName}
          setPoulName={setPoulName}
          changeView={(newViewName) => setView(newViewName)}
        />
      );
    default:
      return (
        <DefaultEditScreen
          poulName={poulName}
          setPoulName={setPoulName}
          changeView={(newViewName) => setView(newViewName)}
        />
      );
  }
}

export async function getStaticProps() {
  //Get all competitions from the api
  //query clubs that match the name of what was entered with the competition that was entered
  //only query clubs after the competition has been filled in

  const data = await footballApi.leagueManager.get({});
  if (data != null)
    return {
      props: {
        competitions: data.response.map((res) => res.league),
      },
      revalidate: 24 * 60 * 60, // 1 day
    };
}
