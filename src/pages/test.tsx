import React from "react";

type Props = {};

// export default function test({}: Props) {
//   return (
//     <div className="h-screen grid grid-cols-3 items-center justify-center">
//       {/* BOX */}
//       <div className="w-full h-full flex items-center justify-center bg-black">
//         <div className="bg-red-500 flex w-5 h-5"></div>
//       </div>
//       <div className="bg-blue-500 w-5 h-5"></div>
//       <div className="bg-green-500 w-5 h-5"></div>
//       <div className="bg-purple-500 w-5 h-5"></div>

//       {/* <h1 className="text-center">test</h1> */}
//     </div>
//   );
// }

const Section = ({ borderColor }: { borderColor: string }) => (
  <div
    className={`bg-white h-screen border-${borderColor}-500 border-solid border-2 w-11`}
  >
    {/* Content goes here */}
  </div>
);

const Test = () => (
  <div className="flex h-screen">
    <Section borderColor="red" />
    <Section borderColor="green" />
    <Section borderColor="blue" />
  </div>
);

export default Test;
