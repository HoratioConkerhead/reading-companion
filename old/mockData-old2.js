// mockData.js - Combined data for the Stitched Up Interactive App

// Import individual data files
import { charactersData as charactersList } from '../src/data/characters';
import { eventsData as eventsList } from '../src/data/events';
import { locationsData as locationsList } from '../src/data/locations';

// Define relationships data
export const relationshipsData = [
  { from: 'bill_laurie', to: 'cynthia_childreth', type: 'handler-asset' },
  { from: 'bill_laurie', to: 'richard_childreth', type: 'handler-asset' },
  { from: 'bill_laurie', to: 'hannah_park', type: 'superior-subordinate' },
  { from: 'bill_laurie', to: 'jane_maclean', type: 'superior-subordinate' },
  { from: 'bill_laurie', to: 'edwin', type: 'superior-subordinate' },
  { from: 'bill_laurie', to: 'george_bennet', type: 'colleague' },
  { from: 'bill_laurie', to: 'louise_harrington', type: 'handler-informant' },
  { from: 'cynthia_childreth', to: 'richard_childreth', type: 'spouse' },
  { from: 'cynthia_childreth', to: 'mary', type: 'employer-confidante' },
  { from: 'cynthia_childreth', to: 'amy_wyndholme', type: 'friend' },
  { from: 'john_davies', to: 'megan_davies', type: 'spouse' },
  { from: 'john_davies', to: 'peter_snowden', type: 'conspirator' },
  { from: 'john_davies', to: 'bob_harrington', type: 'conspirator' },
  { from: 'peter_snowden', to: 'marjorie_snowden', type: 'spouse' },
  { from: 'peter_snowden', to: 'bob_harrington', type: 'conspirator' },
  { from: 'bob_harrington', to: 'louise_harrington', type: 'spouse' },
  { from: 'george_bennet', to: 'jim', type: 'superior-subordinate' },
  { from: 'gerda_stammer', to: 'franz_stammer', type: 'spouse' },
  { from: 'gerda_stammer', to: 'lena_weber', type: 'colleague' },
  { from: 'hannah_park', to: 'jane_maclean', type: 'colleague-partner' },
  { from: 'louise_harrington', to: 'gerda_stammer', type: 'associate' },
  { from: 'richard_childreth', to: 'bill_laurie', type: 'asset-handler' },
  { from: 'megan_davies', to: 'edwards', type: 'assassin-victim' }
];

// Define objects data
export const objectsData = [
  {
    id: 'german_rifle',
    name: 'German FG42 Sniper Rifle',
    type: 'Weapon',
    description: 'German paratrooper weapon adapted as a sniper rifle, used in the assassination attempt on Montgomery.',
    physical_details: 'Modified FG42 with advanced scope, designed for long-range precision shooting.',
    technical_details: [
      'FG42 (Fallschirmjägergewehr 42) - German automatic rifle',
      'Modified with enhanced scope',
      'Uses 7.92mm ammunition',
      'Added bipod for stability'
    ],
    significance: [
      'Primary weapon intended for Montgomery assassination',
      'Evidence linking conspirators to plot',
      'Found cartridge at Churn range provided key clue'
    ],
    history: [
      { event: 'Smuggled into UK', details: 'Brought into UK via multiple agents in parts' },
      { event: 'Testing at Churn Ranges', details: 'Bob Harrington tested the rifle at night' },
      { event: 'Assassination Attempt', details: 'Used in the tower at Cynthia\'s house' }
    ],
    possessors: [
      { characterId: 'edwards', period: 'early', alias: 'German agent' },
      { characterId: 'john_davies', period: 'mid', alias: 'Young' },
      { characterId: 'bob_harrington', period: 'late', alias: 'Assassin' }
    ],
    appearances: [
      'rifle_testing',
      'house_occupation',
      'assassination_attempt'
    ],
    image_description: 'A German FG42 rifle with scope attachment and bipod.'
  },
  {
    id: 'mysterious_suitcase',
    name: 'The Mysterious Suitcase',
    type: 'Container',
    description: 'A suitcase delivered to Cynthia\'s house, initially believed to contain a radio but actually containing women\'s clothes and disguised rifle components.',
    physical_details: 'Medium-sized leather suitcase with brass fittings, appearing unremarkable but constructed with a false bottom.',
    technical_details: [
      'Hidden compartment in base',
      'Reinforced corners',
      'Special lining to defeat casual inspection',
      'Components disguised as everyday items'
    ],
    significance: [
      'Key method of delivering assassination weapon components',
      'Red herring appearing to be radio equipment',
      'Central to the plot\'s misdirection'
    ],
    history: [
      { event: 'Delivered to Cynthia', details: 'Brought by "Young" (John Davies in disguise)' },
      { event: 'Inspection by Intelligence', details: 'Initially believed to contain radio equipment' },
      { event: 'Stored in Tower', details: 'Placed in Cynthia\'s studio tower room' },
      { event: 'Contents Revealed', details: 'Actually contained rifle components and disguise items' }
    ],
    possessors: [
      { characterId: 'john_davies', period: 'early', alias: 'Young' },
      { characterId: 'cynthia_childreth', period: 'mid' },
      { characterId: 'bob_harrington', period: 'late' }
    ],
    appearances: [
      'train_journey',
      'house_occupation'
    ],
    image_description: 'A vintage leather suitcase with brass fittings and leather straps.'
  },
  {
    id: 'cheque_book',
    name: 'Edwards\' Cheque Book',
    type: 'Document',
    description: 'Martins Bank cheque book belonging to T.G. Edwards, later used by the Davies to finance their escape to Ireland.',
    physical_details: 'Standard cheque book from Martins Bank (68 Lombard St.), with printed name "T.G. Edwards".',
    significance: [
      'Used as identification for German agents',
      'Financial paper trail linking conspirators',
      'Used to pay for ferry escape to Ireland',
      'Evidence connecting various events'
    ],
    history: [
      { event: 'Used by Edwards', details: 'Original user paying for accommodation at Scilly Isles' },
      { event: 'Stolen after murder', details: 'Taken by Megan Davies after killing Edwards' },
      { event: 'Used for escape', details: 'Davies used it to pay for Fishguard-Rosslare ferry' }
    ],
    possessors: [
      { characterId: 'edwards', period: 'early' },
      { characterId: 'megan_davies', period: 'mid' },
      { characterId: 'john_davies', period: 'late' }
    ],
    appearances: [
      'edwards_arrival',
      'edwards_murder',
      'davies_ireland_escape'
    ],
    image_description: 'A 1940s cheque book from Martins Bank with handwritten entries.'
  }
];

// Export all data
export const charactersData = charactersList;
export const eventsData = eventsList;
export const locationsData = locationsList;