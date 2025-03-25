import React from 'react';
import Tour from 'reactour';

const AppTour = ({ isOpen, onClose, onTabChange, currentTab }) => {
  // Define tour steps with content and selectors for elements to highlight
  const steps = [
    {
      selector: '.app-container',
      content: 'Welcome to the "Stitched Up" Interactive Companion! This app helps you explore the world of Matt Parry\'s novel. Let\'s take a quick tour to discover its features.',
      position: 'center',
      action: () => {}
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(1)',
      content: 'Explore detailed profiles of all characters in the novel, including their backgrounds, traits, and relationships.',
      action: () => currentTab !== 0 && onTabChange(0)
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(2)',
      content: 'Visualize the complex connections between characters with this interactive network diagram.',
      action: () => currentTab !== 1 && onTabChange(1)
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(3)',
      content: 'Follow the chronological events of the story from beginning to end.',
      action: () => currentTab !== 2 && onTabChange(2)
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(4)',
      content: 'Discover key locations where the story takes place and their significance.',
      action: () => currentTab !== 3 && onTabChange(3)
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(5)',
      content: 'Explore the geographic setting of the novel with this detailed map showing locations, character movements, and event sites.',
      action: () => currentTab !== 4 && onTabChange(4)
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(6)',
      content: 'Understand the structure of the plot and explore key themes and mystery elements.',
      action: () => currentTab !== 5 && onTabChange(5)
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(7)',
      content: 'Browse important items and artifacts that play a role in the story.',
      action: () => currentTab !== 6 && onTabChange(6)
    },
    {
      selector: 'ul.react-tabs__tab-list > li:nth-child(8)',
      content: 'Learn about spy techniques and tradecraft mentioned in the novel.',
      action: () => currentTab !== 7 && onTabChange(7)
    },
    {
      selector: '.current-selections',
      content: 'This panel shows your currently selected items for quick cross-reference. Click any item to jump to its detailed view.',
      action: () => {}
    },
    {
      selector: 'header .container',
      content: 'You\'re now ready to explore the world of "Stitched Up"! Click any tab to begin your adventure or take the tour again anytime from the button in the header.',
      action: () => {}
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

  // Function to handle step changes - execute step's action
  const handleStepChange = (step) => {
    const currentStep = steps[step];
    if (currentStep && currentStep.action) {
      currentStep.action();
    }
  };

  return (
    <Tour
      steps={steps}
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterOpen={() => {}}
      onBeforeClose={() => {}}
      startAt={0}
      getCurrentStep={(curr) => handleStepChange(curr)}
      closeWithMask={false}
      maskClassName="mask"
      className="helper"
      rounded={8}
      accentColor="#3B82F6" // Tailwind blue-500
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
