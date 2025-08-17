export const characters = [
  {
    id: 'gabriel_utterson',
    name: 'Mr. Gabriel John Utterson',
    group: 'Protagonists',
    role: 'Lawyer and primary investigator',
    background: 'A reputable London lawyer, reserved and rational, who gradually uncovers the connection between Dr. Jekyll and Mr. Hyde.',
    personality: 'Reserved, loyal, methodical, moral',
    traits: ['Rational', 'Loyal friend', 'Perseverant'],
    relations: [
      { characterId: 'mr_enfield', type: 'cousin_friend', description: 'Sunday walking companion', introducedInChapter: 'chapter_01' },
      { characterId: 'henry_jekyll', type: 'friend', description: 'Old friend and client', introducedInChapter: 'chapter_03' },
      { characterId: 'edward_hyde', type: 'investigator_of', description: 'Investigates Hyde’s connection to Jekyll', introducedInChapter: 'chapter_02' },
      { characterId: 'hastie_lanyon', type: 'colleague_friend', description: 'Respected colleague and mutual friend of Jekyll', introducedInChapter: 'chapter_03' },
      { characterId: 'poole', type: 'ally', description: 'Jekyll’s butler seeks Utterson’s help', introducedInChapter: 'chapter_08' },
      { characterId: 'mr_guest', type: 'colleague', description: 'Handwriting expert who assists Utterson', introducedInChapter: 'chapter_05' },
      { characterId: 'inspector_newcomen', type: 'colleague', description: 'Works with Utterson on the Carew case', introducedInChapter: 'chapter_04' },
      { characterId: 'guest_housekeeper', type: 'admitted_by', description: 'Admitted to Hyde’s Soho rooms during investigation', introducedInChapter: 'chapter_04' }
      ,{ characterId: 'sir_danvers_carew', type: 'solicitor_of', description: 'Carew is Utterson’s client', introducedInChapter: 'chapter_04' }
    ],
    development: [
      { phase: 'Beginning', description: 'Hears Enfield’s story about Hyde' },
      { phase: 'Middle', description: 'Investigates Hyde’s connection to Jekyll' },
      { phase: 'End', description: 'Breaks into Jekyll’s lab with Poole and discovers the truth' }
    ],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'henry_jekyll',
    name: 'Dr. Henry Jekyll',
    group: 'Protagonists',
    role: 'Respected doctor with a hidden experiment',
    background: 'A well-known physician who explores separating the good and evil sides of human nature, resulting in Hyde.',
    personality: 'Genial, charitable, conflicted',
    traits: ['Respected', 'Wealthy', 'Scientific curiosity'],
    relations: [
      { characterId: 'gabriel_utterson', type: 'friend', description: 'Long-standing friendship and legal counsel', introducedInChapter: 'chapter_03' },
      { characterId: 'hastie_lanyon', type: 'estranged_friend', description: 'Former close friend; fell out over unorthodox science', introducedInChapter: 'chapter_03' },
      { characterId: 'edward_hyde', type: 'alter_ego', description: 'His transformed self created by experiment', introducedInChapter: 'chapter_10' },
      { characterId: 'poole', type: 'master', description: 'Employer and master of the household', introducedInChapter: 'chapter_05' }
    ],
    development: [
      { phase: 'Beginning', description: 'At ease; downplays concerns about Hyde' },
      { phase: 'Middle', description: 'Withdrawn, erratic; disappears from society' },
      { phase: 'End', description: 'Confession reveals full truth of the experiment' }
    ],
    introducedInChapter: 'chapter_03'
  },
  {
    id: 'edward_hyde',
    name: 'Mr. Edward Hyde',
    group: 'Antagonists',
    role: 'Violent figure tied to Jekyll',
    background: 'A smaller, deformed-seeming man representing the unrestrained evil side of Jekyll’s nature.',
    personality: 'Cruel, remorseless, secretive',
    traits: ['Violent', 'Secretive', 'Repugnant aura'],
    relations: [
      { characterId: 'henry_jekyll', type: 'beneficiary', description: 'Named beneficiary in Jekyll’s will', introducedInChapter: 'chapter_02' },
      { characterId: 'gabriel_utterson', type: 'avoids', description: 'Avoids Utterson; subject of investigation', introducedInChapter: 'chapter_02' },
      { characterId: 'sir_danvers_carew', type: 'murderer', description: 'Beats Carew to death with a cane', introducedInChapter: 'chapter_04' },
      { characterId: 'mr_enfield', type: 'detained_by', description: 'Detained after the trampling incident', introducedInChapter: 'chapter_01' },
      { characterId: 'maid_witness', type: 'witnessed_by', description: 'Witnessed committing the Carew murder', introducedInChapter: 'chapter_04' },
      { characterId: 'child_victim', type: 'assailant_of', description: 'Trampled the child in the by-street', introducedInChapter: 'chapter_01' },
      { characterId: 'apothecary_doctor', type: 'repulses', description: 'Elicits the doctor’s visible loathing', introducedInChapter: 'chapter_01' },
      { characterId: 'hastie_lanyon', type: 'transforms_before', description: 'Reveals transformation before Lanyon', introducedInChapter: 'chapter_09' },
      { characterId: 'guest_housekeeper', type: 'lodger_of', description: 'Lodger whose rooms she keeps in Soho', introducedInChapter: 'chapter_04' }
    ],
    introducedInChapter: 'chapter_02'
  },
  {
    id: 'hastie_lanyon',
    name: 'Dr. Hastie Lanyon',
    group: 'Protagonists',
    role: 'Physician; former friend of Jekyll',
    background: 'A reputable doctor who rejects Jekyll’s unorthodox science; later witnesses Hyde’s transformation and falls gravely ill.',
    personality: 'Stout, conventional, principled',
    traits: ['Conventional', 'Scientific integrity'],
    relations: [
      { characterId: 'henry_jekyll', type: 'estranged_friend', description: 'Scientific quarrel caused a rift', introducedInChapter: 'chapter_03' },
      { characterId: 'gabriel_utterson', type: 'colleague_friend', description: 'Friend of Utterson and Jekyll', introducedInChapter: 'chapter_03' },
      { characterId: 'edward_hyde', type: 'witnesses_transformation_of', description: 'Witnessed Hyde transform into Jekyll', introducedInChapter: 'chapter_09' }
    ],
    introducedInChapter: 'chapter_02'
  },
  {
    id: 'mr_enfield',
    name: 'Mr. Enfield',
    group: 'Protagonists',
    role: 'Utterson’s cousin and walking companion',
    background: 'A respectable gentleman whose story of the “door” and Hyde sparks Utterson’s investigation.',
    personality: 'Sociable, discreet',
    traits: ['Observant', 'Discreet'],
    relations: [
      { characterId: 'gabriel_utterson', type: 'cousin_friend', description: 'Sunday walking companion', introducedInChapter: 'chapter_01' },
      { characterId: 'edward_hyde', type: 'detains', description: 'Detains Hyde after the trampling incident', introducedInChapter: 'chapter_01' },
      { characterId: 'child_victim', type: 'assists', description: 'Helps after the trampling incident', introducedInChapter: 'chapter_01' }
    ],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'poole',
    name: 'Poole',
    group: 'Supporting Characters',
    role: 'Jekyll’s butler',
    background: 'Long-time butler in Dr. Jekyll’s household who becomes alarmed at his master’s condition.',
    personality: 'Loyal, practical',
    traits: ['Loyal', 'Courageous'],
    relations: [
      { characterId: 'henry_jekyll', type: 'servant', description: 'Faithful servant', introducedInChapter: 'chapter_05' },
      { characterId: 'gabriel_utterson', type: 'ally', description: 'Seeks help from Utterson during the last night', introducedInChapter: 'chapter_08' }
    ],
    introducedInChapter: 'chapter_05'
  },
  {
    id: 'sir_danvers_carew',
    name: 'Sir Danvers Carew',
    group: 'Victims',
    role: 'Member of Parliament; murder victim',
    background: 'A distinguished elderly statesman murdered by Hyde in a senseless attack.',
    personality: 'Courteous, dignified',
    traits: ['Respected', 'Elderly statesman'],
    introducedInChapter: 'chapter_04',
    relations: [
      { characterId: 'edward_hyde', type: 'murdered_by', description: 'Killed by Hyde with a cane', introducedInChapter: 'chapter_04' },
      { characterId: 'maid_witness', type: 'witnessed_by', description: 'Murder witnessed by the maid', introducedInChapter: 'chapter_04' },
      { characterId: 'gabriel_utterson', type: 'solicitor', description: 'Utterson is his lawyer', introducedInChapter: 'chapter_04' }
    ]
  },
  {
    id: 'child_victim',
    name: 'Child Victim',
    group: 'Victims',
    role: 'Girl trampled by Hyde',
    background: 'A young girl knocked down and trampled by Hyde in the by-street incident Enfield recounts.',
    personality: 'Innocent',
    traits: ['Child'],
    introducedInChapter: 'chapter_01',
    relations: [
      { characterId: 'edward_hyde', type: 'victim_of', description: 'Trampled by Hyde', introducedInChapter: 'chapter_01' },
      { characterId: 'mr_enfield', type: 'assisted_by', description: 'Helped after the incident', introducedInChapter: 'chapter_01' },
      { characterId: 'apothecary_doctor', type: 'treated_by', description: 'Examined by the apothecary doctor', introducedInChapter: 'chapter_01' }
    ]
  },
  {
    id: 'apothecary_doctor',
    name: 'Apothecary Doctor',
    group: 'Supporting Characters',
    role: 'Doctor called to examine the child',
    background: 'A “cut and dry” apothecary with an Edinburgh accent who reacts with visible loathing toward Hyde.',
    personality: 'Professional, restrained',
    traits: ['Apothecary', 'Physician'],
    introducedInChapter: 'chapter_01',
    relations: [
      { characterId: 'child_victim', type: 'treats', description: 'Examines the child after the trampling', introducedInChapter: 'chapter_01' },
      { characterId: 'edward_hyde', type: 'abhors', description: 'Feels a strong desire to harm Hyde upon seeing him', introducedInChapter: 'chapter_01' }
    ]
  },
  {
    id: 'inspector_newcomen',
    name: 'Inspector Newcomen',
    group: 'Supporting Characters',
    role: 'Detective investigating the Carew murder',
    background: 'A practical police inspector who works with Utterson on the case.',
    personality: 'Practical, thorough',
    traits: ['Methodical'],
    relations: [
      { characterId: 'gabriel_utterson', type: 'colleague', description: 'Works jointly on the Carew case', introducedInChapter: 'chapter_04' },
      { characterId: 'guest_housekeeper', type: 'admitted_by', description: 'Admitted to search Hyde’s rooms', introducedInChapter: 'chapter_04' }
    ],
    introducedInChapter: 'chapter_04'
  },
  {
    id: 'mr_guest',
    name: 'Mr. Guest',
    group: 'Supporting Characters',
    role: 'Utterson’s clerk and handwriting expert',
    background: 'Assists Utterson by comparing handwriting samples.',
    personality: 'Observant, skilled',
    traits: ['Handwriting expert'],
    relations: [
      { characterId: 'gabriel_utterson', type: 'colleague', description: 'Clerk who helps Utterson analyze the letter', introducedInChapter: 'chapter_05' },
      { characterId: 'henry_jekyll', type: 'compares_handwriting_with', description: 'Compares Jekyll’s hand to Hyde’s letter', introducedInChapter: 'chapter_05' }
    ],
    introducedInChapter: 'chapter_05'
  },
  {
    id: 'maid_witness',
    name: 'Maid Witness',
    group: 'Supporting Characters',
    role: 'Witness to the Carew murder',
    background: 'A housemaid who sees Hyde attack Sir Danvers Carew from a window.',
    personality: 'Frightened, honest',
    traits: ['Witness'],
    relations: [
      { characterId: 'sir_danvers_carew', type: 'witness', description: 'Witnessed the murder', introducedInChapter: 'chapter_04' },
      { characterId: 'edward_hyde', type: 'witness_of', description: 'Saw Hyde commit the murder', introducedInChapter: 'chapter_04' }
    ],
    introducedInChapter: 'chapter_04'
  },
  {
    id: 'guest_housekeeper',
    name: 'Hyde’s Housekeeper',
    group: 'Supporting Characters',
    role: 'Caretaker of Hyde’s Soho lodgings',
    background: 'A woman who admits Utterson and the inspector to Hyde’s rooms; she is eager to assist the authorities.',
    personality: 'Obliging, self-interested',
    traits: ['Housekeeper'],
    introducedInChapter: 'chapter_04',
    relations: [
      { characterId: 'gabriel_utterson', type: 'admits', description: 'Admits Utterson to Hyde’s rooms', introducedInChapter: 'chapter_04' },
      { characterId: 'inspector_newcomen', type: 'admits', description: 'Admits Inspector Newcomen to Hyde’s rooms', introducedInChapter: 'chapter_04' },
      { characterId: 'edward_hyde', type: 'housekeeper_for', description: 'Housekeeper for Hyde at his Soho lodgings', introducedInChapter: 'chapter_04' }
    ]
  },
  {
    id: 'bradshaw',
    name: 'Bradshaw',
    group: 'Supporting Characters',
    role: 'Servant assisting during the last night',
    background: 'A footman or servant who helps Poole and Utterson during the break-in.',
    personality: 'Loyal, steady',
    traits: ['Dependable'],
    relations: [
      { characterId: 'poole', type: 'colleague', description: 'Assists Poole in the house', introducedInChapter: 'chapter_08' },
      { characterId: 'gabriel_utterson', type: 'ally', description: 'Aids Utterson during the last night', introducedInChapter: 'chapter_08' }
    ],
    introducedInChapter: 'chapter_08'
  }
];


