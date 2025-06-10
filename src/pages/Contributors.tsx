import React, { useEffect, useState } from "react";
// These are the official, built-in components from the @heroui/react library
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@heroui/react";
import MetaTags from "../components/MetaTags";

// Interface for a contributor
interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

// Interface for the props of the FeatureCard component
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onOpen: () => void; // A function to call when the card is clicked
}

// Reusable FeatureCard component
function FeatureCard({ icon, title, description, onOpen }: FeatureCardProps) {
  // The onClick event is placed directly on the Hero UI Button.
  // This ensures that clicking the card triggers the onOpen function.
  return (
    <Button
      onClick={onOpen}
      className="w-full h-full p-6 border-2 border-[#222224] hover:border-white bg-gradient-to-b from-[#16161a] to-[#131316] transition-colors duration-300"
      variant="flat"
      color="default"
    >
      <div className="flex flex-col items-start w-full text-left">
        <img src={icon} alt={title} className="w-8 h-8 rounded-full mb-4" />
        <h3 className="text-xl font-semibold mb-2 w-full text-left">
          <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h3>
        <p className="text-default-400 w-full text-left">{description}</p>
      </div>
    </Button>
  );
}

// Main page component to display contributors
export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [error, setError] = useState(false);
  // State to control if the popup is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/Parsa3323/AdvancedArmorStands/contributors")
      .then((res) => (res.ok ? res.json() : Promise.reject("API error")))
      .then((data) => (Array.isArray(data) ? setContributors(data) : Promise.reject("Format error")))
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  // This function runs when a card is clicked
  const handleOpenModal = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    setIsModalOpen(true); // This opens the popup
  };

  // This function runs when the popup is closed (by clicking cancel or the backdrop)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContributor(null);
  };

  // This function runs when the user clicks "Confirm" in the popup
  const handleConfirm = () => {
    if (selectedContributor) {
      window.open(selectedContributor.html_url, "_blank", "noopener,noreferrer");
      handleCloseModal(); // Close the popup after confirming
    }
  };

  return (
    <main className="dark min-h-screen bg-[radial-gradient(circle_at_center,#18181b,#030303)] relative overflow-hidden">
      <MetaTags />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222224_1px,transparent_1px),linear-gradient(to_bottom,#222224_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <h1 className="text-center text-4xl font-bold mb-12">
          <span className="bg-gradient-to-br from-orange-500 via-primary-500 to-red-500 bg-clip-text text-transparent">
            Contributors
          </span>
        </h1>

        {error && <p className="text-red-500 text-center">Failed to load contributors.</p>}
        {!contributors && !error && <p className="text-default-400 text-center">Loading...</p>}

        {contributors && (
          <div className="grid md:grid-cols-2 gap-8">
            {contributors.map((c) => (
              <FeatureCard
                key={c.login}
                icon={c.avatar_url}
                title={c.login}
                description="Contributor to AdvancedArmorStands"
                // Pass the function to open the modal for this specific contributor
                onOpen={() => handleOpenModal(c)}
              />
            ))}
          </div>
        )}
      </div>

      {/* This is the built-in Hero UI Modal.
        It only appears when `isModalOpen` is true and a contributor has been selected.
      */}
      {selectedContributor && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalContent>
            <ModalHeader>Confirm Action</ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to open {selectedContributor.login}'s account on GitHub?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleCloseModal} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary">
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </main>
  );
}