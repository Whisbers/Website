import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useReleases } from "../hooks/useReleases";

export default function Download() {
  const navigate = useNavigate();
  const { releases, loading } = useReleases();

  return (
    <main className="dark min-h-screen bg-[radial-gradient(circle_at_center,#18181b,#030303)] relative overflow-hidden px-4 py-16">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222224_1px,transparent_1px),linear-gradient(to_bottom,#222224_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] z-0" />

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
      
    </main>
  );
}

function MarkdownPreview({ content }: { content: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content
          .replace(/\n/g, "<br/>")
          .replace(/(#+\s)(.*)/g, "<strong>$2</strong>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
      }}
    />
  );
}
