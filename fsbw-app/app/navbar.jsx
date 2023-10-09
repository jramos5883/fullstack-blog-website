import Link from "next/link";
import { Button } from "@mui/material";
import { GiFlamingTrident } from "react-icons/gi";
import { Typography } from "@mui/material/";
import Avatar from "@mui/material/Avatar";

export default function Navbar() {
  "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";
  return (
    <nav className="flex flex-row items-center justify-between h-20 bg-sky-800">
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center pl-4">
          <Link className="" href="/">
            <span className="text-5xl text-cyan-400">
              <GiFlamingTrident />
            </span>
          </Link>
          <Link className="no-underline" href="/">
            <Typography className="text-2xl text-bold pl-4 text-cyan-400">
              Blog Website
            </Typography>
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center pr-4">
        <Button href="/signIn" className="mr-4" variant="contained">
          SIGN IN
        </Button>
        <Avatar alt="J User Avatar" src="" />
      </div>
    </nav>
  );
}
