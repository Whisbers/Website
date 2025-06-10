import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="dark min-h-screen bg-[radial-gradient(circle_at_center,#18181b,#030303)] relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222224_1px,transparent_1px),linear-gradient(to_bottom,#222224_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="relative z-10 text-center max-w-md">
        <h1 className="text-9xl font-extrabold bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent mb-6">
          404
        </h1>
        <p className="text-xl mb-10 text-default-400">
          The page you are looking for could not be found.
        </p>
        <Button
          size="lg"
          variant="shadow"
          color="primary"
          as={Link}
          to="/"
          startContent={<Icon icon="mdi:home" />}
        >
          Go Home
        </Button>
      </div>
    </main>
  );
}
