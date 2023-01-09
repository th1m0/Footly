import React from "react";
import {
  Root as DropdownRoot,
  Portal as DropdownPortal,
  Content as DropdownContent,
  Item as DropdownItem,
  Trigger as DropdownTrigger,
} from "@radix-ui/react-dropdown-menu";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";

type Props = { score: number };

function Header({ score }: Props) {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Footly
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Poules
            </Link>

            <DropdownRoot>
              <DropdownTrigger
                asChild
                onFocus={(e) => e.preventDefault()}
                className="focus:border-none"
              >
                <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Account
                  {/* TODO: DROP DOWN. */}
                </Link>
              </DropdownTrigger>
              <DropdownPortal onFocus={(e) => e.preventDefault()}>
                <DropdownContent>
                  <DropdownItem onTouchMove={(e) => e.preventDefault()}>
                    <p>Score: {score}</p>
                  </DropdownItem>
                  <DropdownItem>
                    <button onClick={() => {}}>Login</button>
                  </DropdownItem>
                </DropdownContent>
              </DropdownPortal>
            </DropdownRoot>
          </nav>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
