type Props = {};

export default function Home({}: Props) {
  return (
    <div className="">
      {/* Title */}
      <h1>Matches</h1>

      {/* Leagues */}
      <div>
        <h2>Leagues</h2>
      </div>
      {/* Matches */}
      <div>{/* Current matches. */}</div>
    </div>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
//       test: "tesaaaat",
//     },
//     revalidate: 10,
//   };
// }
