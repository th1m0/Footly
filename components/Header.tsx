import React from "react";
import {
  Root as DropdownRoot,
  Portal as DropdownPortal,
  Content as DropdownContent,
  Item as DropdownItem,
  Trigger as DropdownTrigger,
} from "@radix-ui/react-dropdown-menu";

type Props = { score: number };

function Header({ score }: Props) {
  console.log("score ", score);
  return (
    <header className="top-0 flex items-start justify-between max-w-7xl mx-auto z-20 ml-5 xl:items-center">
      {/* Left */}
      <div className="">
        <h1
          className="text-5xl"
          onClick={() => {
            /* go to home screen */
          }}
        >
          Footly
        </h1>
      </div>
      {/* Right */}
      <div className="flex items-center justify-center mt-1">
        <button className="p-2 border-2 border-[#B2B2B2] m-2 w-[150px] text-3xl rounded-lg">
          Poules
        </button>

        <DropdownRoot>
          <DropdownTrigger
            asChild
            onFocus={(e) => e.preventDefault()}
            className="focus:border-none"
          >
            <button className="p-2 w-[150px] border-2 border-[#B2B2B2] m-2 text-3xl rounded-lg">
              Account
            </button>
          </DropdownTrigger>
          <DropdownPortal onFocus={(e) => e.preventDefault()}>
            <DropdownContent className="w-[150px] xl:w-[200px] mt-2 text-center border-2 border-[#B2B2B2] bg-[#EAEAEA] rounded-lg">
              <DropdownItem
                className="hover:border-none"
                onTouchMove={(e) => e.preventDefault()}
              >
                <p className="text-lg">Score: {score}</p>
              </DropdownItem>
              <DropdownItem className="text-lg">
                <button onClick={() => {}}>Login</button>
              </DropdownItem>
            </DropdownContent>
          </DropdownPortal>
        </DropdownRoot>
      </div>
    </header>
  );
}

export default Header;
