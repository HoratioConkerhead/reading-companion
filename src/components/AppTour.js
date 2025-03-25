import React, { useCallback } from 'react';
import Tour from 'reactour';

const AppTour = ({ isOpen, onClose, onTabChange, currentTab }) => {
  // Define tour steps with content and selectors for elements to highlight
  const steps = [
    {
      selector: '.app-container',
      content: 'Welcome to the "Stitched Up" Interactive Companion! This app helps you explore the world of Matt Parry\'s novel. Let\'s take a quick tour to discover its features.',
      position: 'center',
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(1)',
      content: 'Explore detailed profiles of all characters in the novel, including their backgrounds, traits, and relationships.'
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(2)',
      content: 'Visualize the complex connections between characters with this interactive network diagram.'
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(3)',
      content: 'Follow the chronological events of the story from beginning to end.'
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(4)',
      content: 'Discover key locations where the story takes place and their significance.'
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(5)',
      content: 'Explore the geographic setting of the novel with this detailed map showing locations, character movements, and event sites.'
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(6)',
      content: 'Understand the structure of the plot and explore key themes and mystery elements.'
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(7)',
      content: 'Browse important items and artifacts that play a role in the story.'
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(8)',
      content: 'Learn about spy techniques and tradecraft mentioned in the novel.'
    },
    {
      selector: '.current-selections',
      content: 'This panel shows your currently selected items for quick cross-reference. Click any item to jump to its detailed view.'
    },
    {
      selector: 'header .container',
      content: 'You\'re now ready to explore the world of "Stitched Up"! Click any tab to begin your adventure or take the tour again anytime from the button in the header.'
    },
  ];

  // Custom styles for the tour
  const tourStyles = {
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    padding: '1.5rem',
    maxWidth: '450px',
  };

  const maskStyles = {
    color: '#000',
    opacity: 0.7
  };

  // Function to handle step changes - switch tabs based on the current step
  const handleStepChange = useCallback((step) => {
    // Switch tabs based on the current step
    if (step >= 1 && step <= 8) {
      // Steps 1-8 correspond to tabs 0-7
      const tabIndex = step - 1;
      if (currentTab !== tabIndex) {
        onTabChange(tabIndex);
      }
    }
  }, [currentTab, onTabChange]);

  return (
    <Tour
      steps={steps}
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterOpen={() => {}}
      onBeforeClose={() => {}}
      startAt={0}
      showNavigation={true}
      showButtons={true}
      showNumber={true}
      disableDotsNavigation={false}
      disableInteraction={false}
      update={currentTab.toString()}
      updateDelay={200}
      rounded={8}
      accentColor="#3B82F6" // Tailwind blue-500
      onAfterStepChange={handleStepChange}
      maskClassName="mask"
      className="helper"
      styles={{
        helper: tourStyles,
        mask: maskStyles,
        buttons: {
          primary: {
            backgroundColor: '#3B82F6',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
          }
        }
      }}
    />
  );
};

export default AppTour;
