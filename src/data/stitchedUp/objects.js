// Objects data for "Stitched Up" book

export const objects = [
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
    },
    {
      id: 'secure_phone_line',
      name: 'Secure Telephone Line',
      type: 'Communication device',
      description: 'Special dedicated telephone line installed at Cynthia\'s house for secure communications with intelligence headquarters.',
      physical_details: 'Standard-looking telephone with direct secure line separate from normal house phone system.',
      technical_details: [
        'Dedicated wire directly to intelligence headquarters',
        'Not connected to main telephone exchange',
        'Required special installation by disguised engineers',
        'Located in master bedroom away from normal phone'
      ],
      significance: [
        'Secure communication method for sensitive information',
        'Protected from fifth columnist wire-tapping',
        'Critical lifeline during the final operation',
        'Demonstrated intelligence service foresight'
      ],
      history: [
        { event: 'Installation', details: 'Installed by intelligence service engineers disguised as telephone workers' },
        { event: 'Regular Use', details: 'Used by Cynthia for reporting to Bill' },
        { event: 'Line Cut', details: 'Cut by conspirators during house occupation' }
      ],
      possessors: [
        { characterId: 'cynthia_childreth', period: 'entire story' }
      ],
      appearances: [
        'secure_line_installation',
        'cynthia_diversion_call'
      ],
      image_description: 'A 1940s-style black bakelite telephone with rotary dial.'
    },
    {
      id: 'shell_casing',
      name: '7.92mm Shell Casing',
      type: 'Evidence',
      description: 'Spent cartridge from German FG42 rifle found at Churn range, providing critical evidence linking conspirators to assassination plot.',
      physical_details: 'Brass casing from 7.92mm round, non-standard caliber for British weapons.',
      technical_details: [
        'German manufacture',
        'Specifically designed for FG42 rifle',
        'Distinctive markings different from British ammunition',
        'Missed during conspirators\' clean-up'
      ],
      significance: [
        'Physical evidence linking conspirators to German weapon',
        'Confirmation of assassination preparations',
        'Key investigative breakthrough'
      ],
      history: [
        { event: 'Fired at Churn', details: 'Discharged during rifle testing by Harringtons' },
        { event: 'Discovery', details: 'Found by Keith and Mike during range investigation' },
        { event: 'Analysis', details: 'Identified as from German FG42 rifle by armorer Jacobs' }
      ],
      appearances: [
        'rifle_testing'
      ],
      image_description: 'A tarnished brass shell casing with German manufacturer markings.'
    },
    {
      id: 'berts_painting',
      name: 'Bert\'s Surveillance Painting',
      type: 'Cover prop',
      description: 'Watercolor painting created by Bert while conducting surveillance in Ashampstead.',
      physical_details: 'Watercolor landscape painting of cottages in Ashampstead, including Snowdens\' residence.',
      significance: [
        'Cover for surveillance operation',
        'Eventually purchased by Marjorie Snowden, ironically funding intelligence operation',
        'Demonstration of creative surveillance techniques'
      ],
      history: [
        { event: 'Creation', details: 'Painted by Bert during surveillance of Snowdens' },
        { event: 'Interaction', details: 'Marjorie Snowden discusses the painting with Bert' },
        { event: 'Sale', details: 'Purchased by Marjorie Snowden, unaware of Bert\'s true purpose' }
      ],
      possessors: [
        { characterId: 'bert', period: 'creation' },
        { characterId: 'marjorie_snowden', period: 'end' }
      ],
      appearances: [
        'surveillance_operation'
      ],
      image_description: 'A watercolor painting of a row of country cottages.'
    },
    {
      id: 'montys_beret',
      name: 'Montgomery\'s Distinctive Beret',
      type: 'Identification item',
      description: 'General Montgomery\'s trademark black beret with two cap badges that made him instantly recognizable.',
      physical_details: 'Black beret with Royal Tank Regiment badge and British General Officer\'s badge side by side.',
      significance: [
        'Montgomery\'s recognizable trademark',
        'Symbol of his leadership style',
        'Critical identification element for assassination targeting',
        'Replicated for decoy operation'
      ],
      history: [
        { event: 'Montgomery\'s Visits', details: 'Worn during troop inspections and public appearances' },
        { event: 'Decoy Operation', details: 'Replicated for Montgomery lookalikes in decoy jeeps' }
      ],
      possessors: [
        { characterId: 'montgomery', period: 'throughout' }
      ],
      appearances: [
        'three_montgomerys_arrangement',
        'assassination_attempt'
      ],
      image_description: 'Black military beret with two distinct cap badges side by side.'
    },
    {
      id: 'blockade_car',
      name: 'Blockade Car',
      type: 'Vehicle',
      description: 'Car parked across Cynthia\'s drive to prevent access or escape during occupation.',
      physical_details: 'Car positioned tightly against gate to block entrance/exit.',
      significance: [
        'Physical mechanism for isolating Cynthia\'s house',
        'Part of conspirators\' control tactics',
        'Symbol of captivity'
      ],
      history: [
        { event: 'House Occupation', details: 'Positioned by Louise across drive entrance' }
      ],
      possessors: [
        { characterId: 'john_davies', period: 'during occupation' }
      ],
      appearances: [
        'house_occupation'
      ],
      image_description: 'Car positioned sideways across driveway entrance, blocking access.'
    },
    {
      id: 'auburn_wig',
      name: 'Bob\'s Auburn Wig',
      type: 'Disguise',
      description: 'Auburn wig intended for Bob Harrington\'s female disguise during escape after assassination.',
      physical_details: 'Auburn-colored woman\'s wig, part of disguise from suitcase.',
      significance: [
        'Key element of escape plan',
        'Evidence of meticulous planning',
        'Symbol of deception',
        'Ultimately unused when plot foiled'
      ],
      history: [
        { event: 'Suitcase Delivery', details: 'Brought in suitcase delivered by Davies/Young' },
        { event: 'Assassination Attempt', details: 'Prepared for use but never employed due to Louise\'s intervention' }
      ],
      possessors: [
        { characterId: 'john_davies', period: 'delivery', alias: 'Young' },
        { characterId: 'bob_harrington', period: 'attempt' }
      ],
      appearances: [
        'house_occupation',
        'assassination_attempt'
      ],
      image_description: 'Auburn-colored woman\'s wig with shoulder-length styled hair.'
    },
    {
      id: 'secure_briefcase',
      name: 'Bill\'s Secure Briefcase',
      type: 'Equipment',
      description: 'Specially designed briefcase used by Bill for transporting sensitive documents and planning materials.',
      physical_details: 'Standard-looking leather briefcase with hidden compartments and security features.',
      technical_details: [
        'Hidden compartments for sensitive documents',
        'Special lock mechanisms',
        'Potentially booby-trapped if forced open',
        'Unmarked exterior to avoid attention'
      ],
      significance: [
        'Secure transport for operation plans',
        'Symbol of official intelligence work',
        'Contains maps and operational details'
      ],
      possessors: [
        { characterId: 'bill_laurie', period: 'throughout' }
      ],
      appearances: [
        'intelligence_meeting',
        'final_planning'
      ],
      image_description: 'Ordinary-looking brown leather briefcase with brass fittings.'
    }
];
