import React, { useState } from "react";
import DefaultEditScreen from "../../../components/poul/edit/Default";
import ManageMatchesEditScreen from "../../../components/poul/edit/ManageMatches";
import ManageUsersEditScreen from "../../../components/poul/edit/ManageUsers";

type Props = {
  poulName: string;
};

export default function Create({ poulName: _poulName }: Props) {
  const [poulName, setPoulName] = useState<string>(_poulName ?? "");
  const [view, setView] = useState<string | null>(null);

  console.log("loading this...", view);

  switch (view) {
    case "manageMatches":
      return (
        <ManageMatchesEditScreen
          poulName={poulName}
          setPoulName={setPoulName}
          changeView={(newViewName) => setView(newViewName)}
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

// export async function getStaticProps() {
//   return {
//     props: {
//       ,
//     },
//     revalidate: 10,
//   };
// }
