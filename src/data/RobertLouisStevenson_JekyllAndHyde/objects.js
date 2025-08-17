export const objects = [
  {
    id: 'jekyll_will',
    name: 'Dr. Jekyll’s Will',
    type: 'Document',
    description: 'A will leaving all of Jekyll’s possessions to Edward Hyde in case of death or disappearance.',
    physical_details: 'Legal document drafted by Utterson',
    introducedInChapter: 'chapter_02',
    technical_details: [],
    significance: [
      'Establishes Hyde as beneficiary and raises Utterson’s suspicions'
    ],
    history: [
      { event: 'search_for_mr_hyde', details: 'Utterson reviews the will and is alarmed' }
    ],
    possessors: [
      { characterId: 'gabriel_utterson', period: 'early', alias: '' },
      { characterId: 'henry_jekyll', period: 'early', alias: '' }
    ],
    appearances: ['search_for_mr_hyde']
  },
  {
    id: 'coutts_cheque',
    name: 'Coutts Cheque',
    type: 'Cheque',
    description: 'Cheque used to settle the hush money after Hyde trampled the child; signed with a reputable name connected to Jekyll.',
    physical_details: 'Bank cheque on Coutts’s, payable to bearer',
    introducedInChapter: 'chapter_01',
    technical_details: [],
    significance: [
      'Links Hyde to Jekyll’s respectability and the door'
    ],
    history: [
      { event: 'child_trampling', details: 'Produced to compensate the child’s family' }
    ],
    possessors: [
      { characterId: 'edward_hyde', period: 'early', alias: '' }
    ],
    appearances: ['child_trampling']
  },
  {
    id: 'broken_cane',
    name: 'Broken Cane',
    type: 'Weapon',
    description: 'A cane used by Hyde to murder Sir Danvers Carew, later found broken at the scene and in Hyde’s rooms.',
    physical_details: 'Heavy cane, recognizable as once given to Jekyll',
    introducedInChapter: 'chapter_04',
    technical_details: [],
    significance: [
      'Links Hyde to Jekyll through the gift of the cane'
    ],
    history: [
      { event: 'carew_murder', details: 'Cane broken during the murder; fragments recovered' }
    ],
    possessors: [
      { characterId: 'edward_hyde', period: 'mid', alias: '' }
    ],
    appearances: ['carew_murder']
  },
  {
    id: 'transformative_potion',
    name: 'Transformative Potion',
    type: 'Chemical',
    description: 'The concoction Jekyll uses to transform into Hyde and back.',
    physical_details: 'Powders and a tincture mixed to produce the potion',
    introducedInChapter: 'chapter_09',
    technical_details: ['Impure salt later prevents reversal'],
    significance: [
      'Embodies the scientific attempt to separate good and evil nature'
    ],
    history: [
      { event: 'dr_lanyon_narrative', details: 'Hyde drinks the mixture and transforms into Jekyll before Lanyon' },
      { event: 'jekyll_full_statement', details: 'Jekyll explains the potion and the impurity problem' }
    ],
    possessors: [
      { characterId: 'henry_jekyll', period: 'early', alias: '' },
      { characterId: 'edward_hyde', period: 'late', alias: '' }
    ],
    appearances: ['dr_lanyon_narrative', 'jekyll_full_statement']
  },
  {
    id: 'sealed_packet',
    name: 'Lanyon’s Sealed Packet',
    type: 'Document',
    description: 'A sealed letter and narrative entrusted to Utterson, to be opened under specific conditions.',
    physical_details: 'Sealed envelope addressed to Mr. Utterson',
    introducedInChapter: 'chapter_06',
    technical_details: [],
    significance: [
      'Contains Lanyon’s account revealing the Hyde/Jekyll truth'
    ],
    history: [
      { event: 'remarkable_incident_of_dr_lanyon', details: 'Lanyon hands Utterson a sealed packet' },
      { event: 'dr_lanyon_narrative', details: 'Packet is opened per instructions' }
    ],
    possessors: [
      { characterId: 'hastie_lanyon', period: 'mid', alias: '' },
      { characterId: 'gabriel_utterson', period: 'late', alias: '' }
    ],
    appearances: ['remarkable_incident_of_dr_lanyon', 'dr_lanyon_narrative']
  },
  {
    id: 'handwriting_letter',
    name: 'Purported Hyde Letter',
    type: 'Letter',
    description: 'A letter presented by Jekyll as if from Hyde, later suspected to be forged.',
    physical_details: 'Short handwritten note',
    introducedInChapter: 'chapter_05',
    technical_details: ['Handwriting matches Jekyll’s with slant differences'],
    significance: [
      'Key clue in Utterson and Guest’s investigation'
    ],
    history: [
      { event: 'incident_of_the_letter', details: 'Analyzed by Mr. Guest' },
      { event: 'jekyll_full_statement', details: 'Confirmed to have been written by Jekyll' }
    ],
    possessors: [
      { characterId: 'henry_jekyll', period: 'mid', alias: '' },
      { characterId: 'gabriel_utterson', period: 'mid', alias: '' }
    ],
    appearances: ['incident_of_the_letter']
  }
];


