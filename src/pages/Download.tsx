import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useReleases } from "../hooks/useReleases";
import { MarkdownPreview } from "../components/MarkdownPreview";
import MetaTags from "../components/MetaTags";

export default function Download() {
  const navigate = useNavigate();
  const { releases, loading } = useReleases();

  return (
    <main className="dark min-h-screen bg-[radial-gradient(circle_at_center,#18181b,#030303)] relative overflow-hidden px-4 py-16">
      <MetaTags 
        title="Download - AdvancedArmorStands"
        description="Download the latest version of AdvancedArmorStands plugin for Minecraft. Get changelogs and previous releases."
        url="https://advancedarmorstands.ir/#/download"
      />
      
      {/* Grid background with fixed center light */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#222224_1px,transparent_1px),linear-gradient(to_bottom,#222224_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] z-0" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent">
              Download AdvancedArmorStands
            </span>
          </h1>
          <p className="text-default-400">Get the latest builds and changelogs below.</p>
        </div>

        {loading ? (
          <p className="text-default-400 text-center">Loading releases...</p>
        ) : (
          releases.map((release) => (
            <div
              key={release.tag_name}
              className="rounded-2xl border-2 border-[#222224] bg-gradient-to-b from-[#16161a] to-[#131316] p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {release.name} — <span className="text-default-400">{new Date(release.published_at).toDateString()}</span>
                </h2>
                <Button
                  as="a"
                  href={release.assets[0]?.browser_download_url}
                  target="_blank"
                  color="primary"
                  size="sm"
                  startContent={<Icon icon="mdi:download" />}
                >
                  Download .jar
                </Button>
              </div>

              <div className="prose max-w-none prose-invert text-default-400">
                <MarkdownPreview content={release.body} />
              </div>
            </div>
          ))
        )}

        <div className="text-center">
          <Button
            variant="bordered"
            className="border-2"
            onClick={() => navigate("/")}
            startContent={<Icon icon="mdi:arrow-left" />}
          >
            Back to Home
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16 pt-16">
        <div className="max-w-7xl mx-auto rounded-2xl border-2 border-[#222224] bg-gradient-to-b from-[#16161a] to-[#131316] p-6 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent">
              Thanks for Visiting!
            </span>
          </h2>
          <p className="text-default-400">
            Open-source. Actively supported. Built for creators like you.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="flat"
              size="sm"
              as="a"
              href="https://github.com/Parsa3323"
              target="_blank"
              startContent={<Icon icon="mdi:github" />}
            >
              GitHub
            </Button>
            <Button
              variant="flat"
              size="sm"
              as="a"
              href="https://docs.advancedarmorstands.ir"
              target="_blank"
              startContent={<Icon icon="mdi:book" />}
            >
              Wiki
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}