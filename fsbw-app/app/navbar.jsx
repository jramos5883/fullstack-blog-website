"use client";

import { useContext } from "react";
import { UserContext } from "./contexts/user.context";
import { signOutAuthUser } from "./utils/firebase/firebase.utils";

import Link from "next/link";
import { Button } from "@mui/material";
import { GiFlamingTrident } from "react-icons/gi";
import { Typography } from "@mui/material/";
import Avatar from "@mui/material/Avatar";

export default function Navbar() {
  // rerenders navbar when currentUser changes in UserContext
  const { currentUser } = useContext(UserContext);

  // console.log(currentUser);

  ("https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg");
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
        {currentUser ? (
          // need to figure out how to display email/password created users
          <>
            <Typography className="mr-4 text-white">
              Welcome {currentUser.displayName}!
            </Typography>
            <Button
              href="/createTechBlogPost"
              className="mr-4"
              variant="contained"
            >
              Create Blog Post
            </Button>
            <Button
              onClick={signOutAuthUser}
              className="mr-4"
              variant="contained"
            >
              SIGN OUT
            </Button>
            <Avatar alt="" src={currentUser.photoURL} />
          </>
        ) : (
          <>
            <Button href="/authentication" className="mr-4" variant="contained">
              SIGN IN
            </Button>
            <Avatar alt="" src="" />
          </>
        )}
      </div>
    </nav>
  );
}
