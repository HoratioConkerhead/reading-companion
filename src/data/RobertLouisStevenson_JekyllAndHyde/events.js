export const events = [
  {
    id: 'story_of_the_door',
    title: 'Story of the Door',
    date: 'N/A',
    description: 'Enfield tells Utterson of a terrifying incident at a shabby door involving a man who trampled a child and paid hush money.',
    location: 'street_door',
    characters: [
      { characterId: 'gabriel_utterson', role: 'listener' },
      { characterId: 'mr_enfield', role: 'narrator' },
      { characterId: 'edward_hyde', role: 'perpetrator' },
      { characterId: 'child_victim', role: 'victim' },
      { characterId: 'apothecary_doctor', role: 'doctor' }
    ],
    significance: 'Introduces Hyde and the mysterious door connected to Jekyll’s property.',
    introducedInChapter: 'chapter_01',
    keyActions: ['Enfield recounts story', 'Hyde pays with a cheque signed by Jekyll']
  },
  {
    id: 'child_trampling',
    title: 'The Child Trampling Incident',
    date: 'N/A',
    description: 'Hyde tramples a young girl in the small hours; Enfield detains him and forces compensation via a cheque tied to the mysterious door.',
    location: 'street_door',
    characters: [
      { characterId: 'edward_hyde', role: 'perpetrator' },
      { characterId: 'child_victim', role: 'victim' },
      { characterId: 'mr_enfield', role: 'detains' },
      { characterId: 'apothecary_doctor', role: 'doctor' }
    ],
    significance: 'Establishes Hyde’s brutality and links him to Jekyll through the cheque and key.',
    introducedInChapter: 'chapter_01',
    keyActions: ['Hyde tramples child', 'Cheque produced from the door', 'Group detains Hyde']
  },
  {
    id: 'search_for_mr_hyde',
    title: 'Search for Mr. Hyde',
    date: 'N/A',
    description: 'Utterson reviews Jekyll’s will naming Hyde as beneficiary and stakes out the door, confronting Hyde.',
    location: 'street_door',
    characters: [
      { characterId: 'gabriel_utterson', role: 'investigator' },
      { characterId: 'edward_hyde', role: 'confronted' }
    ],
    significance: 'Confirms Hyde’s connection to Jekyll; deepens Utterson’s concern.',
    introducedInChapter: 'chapter_02',
    keyActions: ['Utterson confronts Hyde', 'Hyde shows a key to the door']
  },
  {
    id: 'jekyll_dinner',
    title: 'Dr. Jekyll Was Quite at Ease',
    date: 'N/A',
    description: 'At a dinner, Jekyll dismisses Utterson’s concerns about Hyde and asks him to respect his wishes.',
    location: 'jekyll_house',
    characters: [
      { characterId: 'gabriel_utterson', role: 'guest' },
      { characterId: 'henry_jekyll', role: 'host' }
    ],
    significance: 'Shows Jekyll’s apparent control and secrecy.',
    introducedInChapter: 'chapter_03',
    keyActions: ['Jekyll requests Utterson to bear with him']
  },
  {
    id: 'carew_murder',
    title: 'The Carew Murder Case',
    date: 'N/A',
    description: 'Hyde murders Sir Danvers Carew with a cane; a maid witnesses the attack.',
    location: 'carew_murder_site',
    characters: [
      { characterId: 'edward_hyde', role: 'murderer' },
      { characterId: 'sir_danvers_carew', role: 'victim' },
      { characterId: 'maid_witness', role: 'witness' },
      { characterId: 'gabriel_utterson', role: 'investigator' },
      { characterId: 'inspector_newcomen', role: 'investigator' },
      { characterId: 'guest_housekeeper', role: 'admits_search' }
    ],
    significance: 'Public crime escalates the investigation and exposes Hyde.',
    introducedInChapter: 'chapter_04',
    keyActions: ['Murder with cane', 'Police search Hyde’s Soho rooms']
  },
  {
    id: 'soho_search',
    title: 'Search of Hyde’s Soho Rooms',
    date: 'N/A',
    description: 'Utterson and Inspector Newcomen search Hyde’s lodgings, discovering the broken cane fragment and evidence of haste.',
    location: 'hyde_soho_house',
    characters: [
      { characterId: 'gabriel_utterson', role: 'investigator' },
      { characterId: 'inspector_newcomen', role: 'investigator' },
      { characterId: 'guest_housekeeper', role: 'admits_search' }
    ],
    significance: 'Connects the murder weapon to Hyde and Jekyll.',
    introducedInChapter: 'chapter_04',
    keyActions: ['Housekeeper cooperates', 'Cane fragment discovered']
  },
  {
    id: 'incident_of_the_letter',
    title: 'Incident of the Letter',
    date: 'N/A',
    description: 'Utterson receives a letter (apparently from Hyde) via Jekyll; Mr. Guest notes handwriting matches Jekyll’s.',
    location: 'utterson_chambers',
    characters: [
      { characterId: 'gabriel_utterson', role: 'examines_letter' },
      { characterId: 'henry_jekyll', role: 'source' },
      { characterId: 'mr_guest', role: 'handwriting_expert' }
    ],
    significance: 'Hints that Jekyll forged Hyde’s letter.',
    introducedInChapter: 'chapter_05',
    keyActions: ['Guest compares handwriting', 'Utterson decides to keep the finding quiet']
  },
  {
    id: 'remarkable_incident_of_dr_lanyon',
    title: 'Remarkable Incident of Dr. Lanyon',
    date: 'N/A',
    description: 'Jekyll withdraws from society; Lanyon grows deathly ill after a mysterious shock and entrusts Utterson with a sealed letter.',
    location: 'lanyon_house',
    characters: [
      { characterId: 'hastie_lanyon', role: 'falls_ill' },
      { characterId: 'gabriel_utterson', role: 'recipient_of_packet' },
      { characterId: 'henry_jekyll', role: 'withdrawn' }
    ],
    significance: 'Sets up Lanyon’s narrative and the final revelations.',
    introducedInChapter: 'chapter_06',
    keyActions: ['Lanyon gives sealed letter to Utterson']
  },
  {
    id: 'incident_at_the_window',
    title: 'Incident at the Window',
    date: 'N/A',
    description: 'Utterson and Enfield see Jekyll at a window; a horror overtakes him and the window is slammed shut.',
    location: 'jekyll_courtyard',
    characters: [
      { characterId: 'gabriel_utterson', role: 'witness' },
      { characterId: 'mr_enfield', role: 'witness' },
      { characterId: 'henry_jekyll', role: 'seen_at_window' }
    ],
    significance: 'Suggests Jekyll’s loss of control.',
    introducedInChapter: 'chapter_07',
    keyActions: ['Window abruptly shuts']
  },
  {
    id: 'the_last_night',
    title: 'The Last Night',
    date: 'N/A',
    description: 'Poole brings Utterson to Jekyll’s house; they break into the lab and find Hyde dead from poison, Jekyll nowhere to be seen.',
    location: 'jekyll_laboratory',
    characters: [
      { characterId: 'poole', role: 'summons_utterson' },
      { characterId: 'gabriel_utterson', role: 'breaker_in' },
      { characterId: 'bradshaw', role: 'assists' },
      { characterId: 'edward_hyde', role: 'found_dead' }
    ],
    significance: 'Climactic discovery leading to the confessional documents.',
    introducedInChapter: 'chapter_08',
    keyActions: ['Door forced', 'Papers discovered']
  },
  {
    id: 'dr_lanyon_narrative',
    title: 'Dr. Lanyon’s Narrative',
    date: 'N/A',
    description: 'Lanyon recounts how a visitor took powders and transformed from Hyde into Jekyll before his eyes.',
    location: 'lanyon_house',
    characters: [
      { characterId: 'hastie_lanyon', role: 'narrator' },
      { characterId: 'edward_hyde', role: 'transforms' },
      { characterId: 'henry_jekyll', role: 'revealed' }
    ],
    significance: 'Explicitly reveals the connection between Hyde and Jekyll.',
    introducedInChapter: 'chapter_09',
    keyActions: ['Transformation witnessed']
  },
  {
    id: 'jekyll_full_statement',
    title: 'Henry Jekyll’s Full Statement',
    date: 'N/A',
    description: 'Jekyll explains his experiments, his motives, and his ultimate loss of control over Hyde.',
    location: 'jekyll_laboratory',
    characters: [
      { characterId: 'henry_jekyll', role: 'confessor' },
      { characterId: 'edward_hyde', role: 'alter_ego' }
    ],
    significance: 'Concludes the mystery and provides moral framing.',
    introducedInChapter: 'chapter_10',
    keyActions: ['Full confession']
  }
];


