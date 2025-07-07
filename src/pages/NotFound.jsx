import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-[60%] mx-auto flex flex-col justify-center items-center">
      <img src="/not found.png" alt="" />
      <Link to={"/"}>
        <Button variant="ghost">
          Go to
          <Home />
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
