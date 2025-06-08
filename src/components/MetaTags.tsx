import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function MetaTags({
  title = "AdvancedArmorStands - Make Armor Stands Better",
  description = "Create stunning armor stand animations for Minecraft. Easy-to-use plugin with support for versions 1.8-1.21. Open source and actively maintained.",
  image = "https://advancedarmorstands.ir/icon.png",
  url = "https://advancedarmorstands.ir/",
  type = "website"
}: MetaTagsProps) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="minecraft, armor stands, plugin, spigot, bukkit, animation, minecraft plugin" />
      <meta name="author" content="Parsa3323" />
      
      {/* Open Graph Meta Tags (Primary for Discord) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AdvancedArmorStands" />
      
      {/* Image for Discord embed */}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="AdvancedArmorStands plugin logo - A stylized armor stand icon" />
      <meta property="og:image:type" content="image/png" />
      
      {/* Twitter Card Meta Tags (Fallback) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="AdvancedArmorStands plugin logo" />
      
      {/* Additional Discord-friendly meta tags */}
      <meta property="og:locale" content="en_US" />
      <meta name="theme-color" content="#ff5f15" />
    </Helmet>
  );
}