import React from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import './AppTour.css'; // Import our custom styles

// What each tab is for, keyed by tab id
const TAB_DESCRIPTIONS = {
  characters: 'Explore detailed profiles of all characters in the novel, including their backgrounds, traits, and relationships.',
  relationships: 'Visualize the complex connections between characters with this interactive network diagram.',
  timeline: 'Follow the chronological events of the story from beginning to end.',
  locations: 'Discover key locations where the story takes place and their significance.',
  map: 'Explore the geographic setting of the novel with this detailed map showing locations, character movements, and event sites.',
  plot: 'Understand the structure of the plot and explore key themes and mystery elements.',
  objects: 'Browse important items and artifacts that play a role in the story.',
  encyclopedia: 'Learn about the techniques and ideas referenced in the novel.'
};

const AppTour = ({ isOpen, onClose, onTabChange, currentTab, bookMetadata, tabs = [] }) => {
  // One step per tab the current book has
  const tabSteps = tabs.map(tab => ({
    element: `.react-tabs__tab[data-tab-id="${tab.id}"]`,
    intro: TAB_DESCRIPTIONS[tab.id] || `Open the ${tab.label} tab.`,
    position: 'bottom',
    tabId: tab.id
  }));

  // Array of steps for the tour
  const steps = [
    {
      element: 'header',
      intro: bookMetadata?.tourWelcome || 'Welcome to the Interactive Reading Companion! This app helps you explore the world of the book.',
      position: 'bottom'
    },
    {
      element: '.react-tabs__tab-list',
      intro: 'These tabs let you navigate through different aspects of the novel.',
      position: 'bottom'
    },
    {
      // Phones show the chapter filter as its own button above the tabs
      element: typeof window !== 'undefined' && window.matchMedia?.('(max-width: 767px)').matches
        ? '.chapter-filter-mobile'
        : '.tablist-right-cta',
      intro: 'Use this Up To control to set the latest chapter you\'ve read. The entire app will limit content to avoid spoilers.',
      position: 'bottom'
    },
    ...tabSteps,
    {
      element: 'footer',
      intro: bookMetadata?.tourConclusion || 'You\'re now ready to explore the world of the book! Click any tab to begin your adventure.',
      position: 'top'
    }
  ];

  // Called before each step change
  const onBeforeChange = (nextStepIndex) => {
    // Switch to the tab a step describes
    const tabId = steps[nextStepIndex]?.tabId;
    if (tabId && currentTab !== tabId) {
      onTabChange(tabId);
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
