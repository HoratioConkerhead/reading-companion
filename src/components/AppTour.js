import React, { useEffect } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import './AppTour.css'; // Import our custom styles

const AppTour = ({ isOpen, onClose, onTabChange, currentTab }) => {
  // Track when tab changes are needed based on steps
  useEffect(() => {
    // If the tour is open and we're on steps that need specific tabs
    if (isOpen) {
      // Match step index to tab index for steps 1-8
      // We'll do this in the onBeforeChange handler
    }
  }, [isOpen, currentTab, onTabChange]);

  // Array of steps for the tour
  const steps = [
    {
      element: 'header',
      intro: 'Welcome to the "Stitched Up" Interactive Companion! This app helps you explore the world of Matt Parry\'s novel.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab-list',
      intro: 'These tabs let you navigate through different aspects of the novel.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab:nth-child(1)',
      intro: 'Explore detailed profiles of all characters in the novel, including their backgrounds, traits, and relationships.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab:nth-child(2)',
      intro: 'Visualize the complex connections between characters with this interactive network diagram.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab:nth-child(3)',
      intro: 'Follow the chronological events of the story from beginning to end.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab:nth-child(4)',
      intro: 'Discover key locations where the story takes place and their significance.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab:nth-child(5)',
      intro: 'Explore the geographic setting of the novel with this detailed map showing locations, character movements, and event sites.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab:nth-child(6)',
      intro: 'Understand the structure of the plot and explore key themes and mystery elements.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab:nth-child(7)',
      intro: 'Browse important items and artifacts that play a role in the story.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab:nth-child(8)',
      intro: 'Learn about spy techniques and tradecraft mentioned in the novel.',
      position: 'bottom'
    },
    {
      element: '.current-selections',
      intro: 'This panel shows your currently selected items for quick cross-reference. Click any item to jump to its detailed view.',
      position: 'top'
    },
    {
      element: 'footer',
      intro: 'You\'re now ready to explore the world of "Stitched Up"! Click any tab to begin your adventure.',
      position: 'top'
    }
  ];

  // Called before each step change
  const onBeforeChange = (nextStepIndex) => {
    // Change tabs appropriately based on the next step
    if (nextStepIndex >= 2 && nextStepIndex <= 9) {
      // Steps 2-9 correspond to tabs 0-7
      const tabIndex = nextStepIndex - 2;
      if (currentTab !== tabIndex) {
        onTabChange(tabIndex);
      }
    }
  };

  return (
    <Steps
      enabled={isOpen}
      steps={steps}
      initialStep={0}
      onExit={onClose}
      onBeforeChange={onBeforeChange}
      options={{
        doneLabel: 'Finish',
        showStepNumbers: true,
        showBullets: true,
        showProgress: true,
        scrollToElement: true,
        highlightClass: 'intro-highlight',
        tooltipClass: 'customTooltip',
        disableInteraction: false,
        overlayOpacity: 0.3  // Set a low opacity for better visibility
      }}
    />
  );
};

export default AppTour;
