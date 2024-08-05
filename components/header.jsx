import { motion } from "framer-motion";
import { CompassIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <motion.header
      className="flex justify-between items-center px-5 md:px-10 py-5 border-b mb-3 w-full"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <p className="font-bold sm:text-xl text-center lg:text-2xl">
        Movie Tracker
      </p>
      <div className="flex gap-2 sm:gap-10 ">
        <Link
          className="font-bold sm:text-xl hover:underline  flex items-center gap-1"
          href="/"
        >
          <HomeIcon />
          Home
        </Link>
        <Link
          className="font-bold sm:text-xl hover:underline flex items-center gap-1"
          href="/discover"
        >
          <CompassIcon />
          Discover
        </Link>
        <ModeToggle />
      </div>
    </motion.header>
  );
}
export default Header;
