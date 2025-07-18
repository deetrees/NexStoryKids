import React from 'react';
import StorybookLayout from './StorybookLayout';

export default function StorybookDemo() {
  // Sample data for demonstration
  const sampleTitle = "Emma's Magical Garden Adventure";
  
  const sampleStory = "Once upon a time, in a small town surrounded by rolling hills, there lived a curious little girl named Emma who loved exploring. One sunny morning, Emma discovered a hidden gate covered in sparkling vines behind her grandmother's house. As she pushed open the creaky gate, she found herself in the most beautiful garden she had ever seen, filled with flowers that glowed like tiny stars and trees that whispered secrets in the wind. Little did Emma know, this was no ordinary garden – it was a magical place where dreams come true and adventures begin!";
  
  const sampleScenes = [
    "Emma discovers the mysterious glowing gate hidden behind her grandmother's house, covered in sparkling magical vines.",
    "Emma steps through the gate and gasps in wonder at the magical garden filled with glowing flowers and whispering trees.",
    "Emma meets Luna, a friendly fairy who becomes her guide through the enchanted garden's many wonders.",
    "Emma and Luna work together to solve the riddle of the Crystal Fountain to help the garden's magic grow stronger.",
    "Emma returns home with a magical seed from the garden, knowing she can visit her new magical world anytime."
  ];
  
  const sampleImages = [
    "/scene1.jpg",
    "/scene2.jpg", 
    "/scene3.jpg",
    "/scene4.jpg",
    "/scene5.jpg"
  ];

  return (
    <StorybookLayout
      title={sampleTitle}
      story={sampleStory}
      scenes={sampleScenes}
      images={sampleImages}
    />
  );
}