// Location data for "Stitched Up" book

export const locations = [
    {
      id: 'cynthia_house',
      name: 'Cynthia\'s House',
      area: 'Bucklebury, Berkshire',
      type: 'Country house',
      features: [
        'Large Georgian country estate',
        'Extensive gardens with flower beds and summerhouse',
        'Tower/studio room originally used by Cynthia\'s mother for painting, with 360° views',
        'Multiple entrances including front door, back door, conservatory, and cellar entrance',
        'Cellar with external entrance used for storing wine and plants in winter',
        'Flat roof accessible from tower studio'
      ],
      significance: [
        'Cynthia\'s childhood home and permanent residence',
        'Site of two parties gathering Nazi sympathizers for intelligence collection',
        'Location of attempted assassination of Montgomery',
        'Strategic vantage point with view of Bucklebury Common and American camp'
      ],
      description: 'Isolated country house with tower providing view of Bucklebury Common. Surrounded by trees but with clear sight lines in key directions. Multiple entrances and large grounds make it both useful for intelligence gathering and vulnerable to infiltration.',
      events: [
        { eventId: 'first_party', role: 'setting' },
        { eventId: 'second_party', role: 'setting' },
        { eventId: 'assassination_attempt', role: 'critical_location' }
      ],
      occupants: [
        { characterId: 'cynthia_childreth', relationship: 'owner' },
        { characterId: 'richard_childreth', relationship: 'resident' },
        { characterId: 'mary', relationship: 'secretary_resident' }
      ],
      rooms: [
        { name: 'Studio Tower', significance: 'Vantage point used for assassination attempt, 360° views' },
        { name: 'Library/Office', significance: 'Where Cynthia conducts business and where suitcase was stored' },
        { name: 'Cellar', significance: 'Alternative entrance used during final operation' },
        { name: 'Conservatory', significance: 'Used for entertaining during parties' }
      ]
    },
    {
      id: 'denleigh_manor',
      name: 'Denleigh Manor',
      area: 'Wiltshire',
      type: 'Country house',
      features: [
        'Imposing Georgian architecture',
        'Large dining room with highly polished walnut table',
        'Extensive gardens and grounds',
        'Tennis courts and croquet lawn'
      ],
      significance: [
        'Where Cynthia is recruited for intelligence work',
        'First meeting place of main characters',
        'Gathering point for Nazi sympathizers',
        'Beginning of the operation against fifth columnists'
      ],
      description: 'Elegant country estate owned by Lady Amelia Wyndholme, Cynthia\'s old school friend. Setting for weekend gatherings of the social elite, including those with Nazi sympathies.',
      owner: 'Amy and Horace Wyndholme',
      events: [
        { eventId: 'cynthia_recruitment', role: 'setting' }
      ],
      occupants: [
        { characterId: 'amy_wyndholme', relationship: 'owner' },
        { characterId: 'horace_wyndholme', relationship: 'owner' }
      ]
    },
    {
      id: 'hotel_adlon',
      name: 'Hotel Adlon',
      area: 'Berlin, Germany',
      type: 'Luxury hotel',
      features: [
        'Japanese garden in lobby with bronze water-lily fountain',
        'Bar and restaurant',
        'Marble columns',
        'Multiple lounges and function rooms',
        'Located near Brandenburg Gate'
      ],
      significance: [
        'Where Richard and Cynthia meet German Nazi sympathizers',
        'Where they briefly see Hitler',
        'Base of operations during Berlin mission',
        'Gateway to German high society'
      ],
      description: 'Opulent, historical hotel built in 1907 in the government quarter near Brandenburg Gate. Frequented by diplomats, wealthy travelers, and Nazi officials. Notable for its luxury and prestige in 1930s Berlin.',
      events: [
        { eventId: 'berlin_trip', role: 'setting' },
        { eventId: 'hitler_sighting', role: 'setting' }
      ],
      proximity: [
        { locationId: 'british_embassy', description: 'Next door to hotel' },
        { locationId: 'french_embassy', description: 'Directly opposite on Pariser Platz' },
        { locationId: 'reich_chancellery', description: 'Short distance away' }
      ]
    },
    {
      id: 'churn_ranges',
      name: 'Churn Rifle Ranges',
      area: 'Berkshire Downs',
      type: 'Military facility',
      features: [
        'Outdoor shooting range with target lines',
        'Basic security consisting of chain-link fence and padlock',
        'Limited supervision',
        'Accessible via dirt track off main road'
      ],
      significance: [
        'Where the assassins tested the German sniper rifle',
        'Location where 7.92mm shell casing was found',
        'Evidence connecting conspirators to assassination plot'
      ],
      description: 'Army rifle range with poor security, originally a private facility commandeered by British Army. Used mainly on Wednesdays by cadets from local public schools, otherwise lightly used.',
      events: [
        { eventId: 'rifle_testing', role: 'setting' }
      ],
      accessibility: 'Easily accessible by foot from railway at Churn Halt station.'
    },
    {
      id: 'bucklebury_camp',
      name: 'American Transport Division Camp',
      area: 'Bucklebury Common, Berkshire',
      type: 'Military camp',
      features: [
        'Temporary military installations',
        'Vehicle depot',
        'Concrete loading areas constructed by American troops',
        'Camouflaged from air observation',
        'Multiple access points'
      ],
      significance: [
        'Target location for Montgomery\'s inspection',
        'Planned assassination site',
        'Located near Cynthia\'s house providing vantage point'
      ],
      description: 'American military camp established on Bucklebury Common, visible from Cynthia\'s tower. Despite camouflage from air, activities clearly visible from higher ground nearby.',
      events: [
        { eventId: 'montgomery_visit', role: 'setting' }
      ],
      security: 'Basic checkpoint security with portable barrier across access road, but otherwise open terrain.'
    },
    {
      id: 'scilly_isles',
      name: 'Scilly Isles',
      area: 'Cornwall',
      type: 'Island',
      significance: [
        'Entry point for German agents',
        'Weakly defended coastal area'
      ],
      description: 'Remote island archipelago off the southwest coast of England.'
    },
    {
      id: 'crawford_place',
      name: 'Crawford Place Flat',
      area: 'London',
      type: 'Apartment',
      significance: [
        'Where Edwards was murdered'
      ],
      description: 'Small flat in London where the German agent Edwards was staying.'
    },
    {
      id: 'felicity_cottage',
      name: 'Felicity\'s Cottage',
      area: 'Aldworth, Berkshire',
      type: 'Surveillance post',
      features: [
        'Small cottage with view of village square',
        'Basic amenities (no electricity or gas)',
        'Wood-burning stove',
        'Large bow window for observation'
      ],
      significance: [
        'Surveillance post for watching Harringtons',
        'Cover location for intelligence operations'
      ],
      description: 'Small, basic cottage rented as surveillance post to observe the Harringtons. Positioned with good view of village activities.',
      events: [
        { eventId: 'cottage_surveillance', role: 'setting' }
      ],
      occupants: [
        { characterId: 'felicity', relationship: 'temporary_resident' }
      ]
    },
    {
      id: 'national_gallery',
      name: 'National Gallery',
      area: 'London',
      type: 'Meeting place',
      features: [
        'Public art gallery',
        'Meeting rooms off main areas',
        'Dame Myra Hess concerts during wartime',
        'Multiple entrances and exits'
      ],
      significance: [
        'Secure meeting place for intelligence team',
        'Public venue allowing inconspicuous meetings'
      ],
      description: 'Art gallery used as meeting place for intelligence operations. The lunchtime concerts provided cover for meetings.',
      events: [
        { eventId: 'intelligence_meeting', role: 'setting' }
      ]
    },
    {
      id: 'blenheim_palace',
      name: 'Blenheim Palace',
      area: 'Woodstock, Oxfordshire',
      type: 'Intelligence headquarters',
      features: [
        'Historic palace',
        'MI5 wartime location',
        'Secluded and secure grounds'
      ],
      significance: [
        'Wartime headquarters for MI5 operations',
        'Location of intelligence meeting between George and Bill'
      ],
      description: 'Historic palace serving as MI5 headquarters during part of the war. Location of meeting between George Bennet and Bill Laurie.',
      events: [
        { eventId: 'intelligence_meeting_blenheim', role: 'setting' }
      ]
    },
    {
      id: 'the_ritz',
      name: 'The Ritz Hotel',
      area: 'London',
      type: 'Meeting place',
      features: [
        'Luxury hotel',
        'Palm Court for afternoon tea',
        'Public yet exclusive space'
      ],
      significance: [
        'Location of meeting between Cynthia and Hannah (disguised)'
      ],
      description: 'Prestigious London hotel used for intelligence meeting between Cynthia and disguised Hannah.',
      events: [
        { eventId: 'ritz_meeting', role: 'setting' }
      ]
    },
    {
      id: 'long_boat_inn',
      name: 'Long Boat Inn',
      area: 'Penzance, Cornwall',
      type: 'Accommodation',
      features: [
        'Inn located opposite Penzance station',
        'Frequented by travelers'
      ],
      significance: [
        'Where Edwards stays after arriving from Scilly Isles',
        'Where he pays with the distinctive cheque'
      ],
      description: 'Inn near Penzance station where Edwards stays overnight before taking the train to London.',
      events: [
        { eventId: 'edwards_penzance_stay', role: 'setting' }
      ]
    },
    {
      id: 'queens_head_pub',
      name: 'The Queen\'s Head Pub',
      area: 'Near Bucklebury, Berkshire',
      type: 'Meeting place',
      features: [
        'Country pub',
        'Private meeting space'
      ],
      significance: [
        'Meeting place for final operation planning'
      ],
      description: 'Country pub where Bill, George and team meet to plan final operation.',
      events: [
        { eventId: 'final_planning', role: 'setting' }
      ]
    },
    {
      id: 'reading_hotel',
      name: 'Great Western Hotel',
      area: 'Reading, Berkshire',
      type: 'Accommodation',
      features: [
        'Hotel opposite Reading station',
        'Sandy colored building'
      ],
      significance: [
        'Where Davies/Young stays when visiting the area',
        'Where Alison conducts surveillance'
      ],
      description: 'Hotel in Reading where Davies (as Young) stays overnight and where Alison conducts surveillance.',
      events: [
        { eventId: 'davies_reading_stay', role: 'setting' }
      ]
    },
    {
      id: 'aldworth_village',
      name: 'Aldworth Village',
      area: 'Berkshire',
      type: 'Village',
      features: [
        'Small country village',
        'Bell pub',
        'Village shop/post office',
        'Church'
      ],
      significance: [
        'Home of the Harringtons',
        'Site of surveillance operation',
        'Where Louise dies in gas explosion'
      ],
      description: 'Small Berkshire village where the Harringtons live and where surveillance operations are conducted.',
      events: [
        { eventId: 'cottage_surveillance', role: 'setting' },
        { eventId: 'louise_death', role: 'setting' }
      ]
    },
    {
      id: 'thames_house',
      name: 'Thames House',
      area: 'London, Millbank',
      type: 'Intelligence headquarters',
      features: [
        'Former MI5 headquarters',
        'South Block, top floor'
      ],
      significance: [
        'Meeting location for intelligence team'
      ],
      description: 'Former MI5 headquarters on Millbank, used for meetings between George and Bill.',
      events: [
        { eventId: 'thames_house_meeting', role: 'setting' }
      ]
    },
    {
      id: 'croydon_airport',
      name: 'Croydon Airport',
      area: 'London',
      type: 'Transportation hub',
      features: [
        'First airport with air traffic control',
        'World\'s only airport hotel on-site',
        'Terminal with wooden benches and multi-paned glass doors',
        'Central hexagonal structure with clocks showing times in various countries'
      ],
      significance: [
        'Departure point for Richard and Cynthia\'s Berlin trip',
        'Entry/exit point for international travel',
        'Connection between UK and continental operations'
      ],
      description: 'Modern airport south of London, departure point for flights to Europe including Cynthia and Richard\'s mission to Berlin.',
      events: [
        { eventId: 'berlin_departure', role: 'setting' }
      ]
    },
    {
      id: 'tempelhof_airport',
      name: 'Tempelhof Airport',
      area: 'Berlin, Germany',
      type: 'Transportation hub',
      features: [
        'First airport with underground railway',
        'Imposing architecture',
        'Customs and immigration control'
      ],
      significance: [
        'Arrival point in Berlin for Richard and Cynthia',
        'First exposure to German efficiency and control'
      ],
      description: 'Berlin\'s main airport where Richard and Cynthia first arrive in Germany, met by their driver.',
      events: [
        { eventId: 'berlin_arrival', role: 'setting' }
      ]
    },
    {
      id: 'fishguard_harbor',
      name: 'Fishguard Harbor',
      area: 'Pembrokeshire, Wales',
      type: 'Ferry terminal',
      features: [
        'Harbor facilities',
        'Ferry connections to Ireland',
        'Booking office where Edwards\' cheque was used'
      ],
      significance: [
        'Escape route for Davies and Megan to Ireland',
        'Location where Edwards\' cheque book was used'
      ],
      description: 'Welsh ferry terminal where Davies and Megan escaped to Ireland, paying with Edwards\' cheque.',
      events: [
        { eventId: 'davies_ireland_escape', role: 'setting' }
      ]
    },
    {
      id: 'goring_station',
      name: 'Goring & Streatley Station',
      area: 'Berkshire',
      type: 'Railway station',
      features: [
        'Small country railway station',
        'Platform where Louise alighted from train'
      ],
      significance: [
        'Where Louise (disguised as elderly woman) exited train with switched case',
        'Critical transfer point in assassination weapon smuggling'
      ],
      description: 'Railway station where Louise Harrington (disguised as elderly woman) alighted from the train with the switched suitcase.',
      events: [
        { eventId: 'train_journey', role: 'setting' }
      ]
    },
    {
      id: 'box_tunnel',
      name: 'Box Tunnel',
      area: 'Wiltshire/Somerset',
      type: 'Railway tunnel',
      features: [
        '1.8 mile long railway tunnel',
        'Complete darkness during passage'
      ],
      significance: [
        'Location where suitcase switch occurred during train journey',
        'Critical moment in smuggling operation'
      ],
      description: 'Long railway tunnel where the suitcase switch between Edwards, Davies and Louise took place in darkness.',
      events: [
        { eventId: 'train_journey', role: 'critical_location' }
      ]
    },
    {
      id: 'admiral_duncan',
      name: 'Admiral Duncan Pub',
      area: 'Soho, London',
      type: 'Meeting place',
      features: [
        'Small pub in Soho',
        'Public yet discreet meeting location'
      ],
      significance: [
        'Meeting place for Bill and George',
        'Location for strategy discussions'
      ],
      description: 'Small London pub where Bill and George meet to discuss the investigation.',
      events: [
        { eventId: 'investigation_meeting', role: 'setting' }
      ]
    },
    {
      id: 'martins_bank',
      name: 'Martins Bank',
      area: 'Lombard Street, London',
      type: 'Financial institution',
      features: [
        'Bank at 68 Lombard Street',
        'Location of Edwards account',
        'Grasshopper logo and Liver Bird emblem on cheques'
      ],
      significance: [
        'Source of Edwards\' cheque book',
        'Financial connection between German intelligence and UK operations'
      ],
      description: 'London bank where the T.G. Edwards account was established for German intelligence operations.',
      events: [
        { eventId: 'bank_account_investigation', role: 'setting' }
      ]
    }
];
