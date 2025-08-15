export const relationships = [
  // Protagonist Relationships
  {
    from: 'cynthia_childreth',
    to: 'richard_childreth',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'richard_childreth',
    to: 'cynthia_childreth',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'cynthia_childreth',
    to: 'amy_wyndholme',
    type: 'friend',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'amy_wyndholme',
    to: 'cynthia_childreth',
    type: 'friend',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'cynthia_childreth',
    to: 'bill_lawrie',
    type: 'handler-asset',
    introducedInChapter: 'chapter_03'
  },
  {
    from: 'bill_lawrie',
    to: 'cynthia_childreth',
    type: 'handler-asset',
    introducedInChapter: 'chapter_03'
  },
  {
    from: 'cynthia_childreth',
    to: 'hannah_park',
    type: 'recruiter-asset',
    introducedInChapter: 'chapter_03'
  },
  {
    from: 'hannah_park',
    to: 'cynthia_childreth',
    type: 'recruiter-asset',
    introducedInChapter: 'chapter_03'
  },
  {
    from: 'richard_childreth',
    to: 'bill_lawrie',
    type: 'colleague',
    introducedInChapter: 'chapter_03'
  },
  {
    from: 'bill_lawrie',
    to: 'richard_childreth',
    type: 'colleague',
    introducedInChapter: 'chapter_03'
  },

  // Intelligence Team Relationships
  {
    from: 'bill_lawrie',
    to: 'hannah_park',
    type: 'colleague',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'hannah_park',
    to: 'bill_lawrie',
    type: 'colleague',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'bill_lawrie',
    to: 'jane_maclean',
    type: 'colleague',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'jane_maclean',
    to: 'bill_lawrie',
    type: 'colleague',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'hannah_park',
    to: 'jane_maclean',
    type: 'colleague',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'jane_maclean',
    to: 'hannah_park',
    type: 'colleague',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'bill_lawrie',
    to: 'george_bennet',
    type: 'colleague',
    introducedInChapter: 'chapter_14'
  },
  {
    from: 'george_bennet',
    to: 'bill_lawrie',
    type: 'colleague',
    introducedInChapter: 'chapter_14'
  },
  {
    from: 'bill_lawrie',
    to: 'alison',
    type: 'colleague',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'alison',
    to: 'bill_lawrie',
    type: 'colleague',
    introducedInChapter: 'chapter_01'
  },

  // Special Branch Team Relationships
  {
    from: 'george_bennet',
    to: 'jim',
    type: 'colleague',
    introducedInChapter: 'chapter_14'
  },
  {
    from: 'jim',
    to: 'george_bennet',
    type: 'colleague',
    introducedInChapter: 'chapter_14'
  },
  {
    from: 'george_bennet',
    to: 'bert',
    type: 'colleague',
    introducedInChapter: 'chapter_14'
  },
  {
    from: 'bert',
    to: 'george_bennet',
    type: 'colleague',
    introducedInChapter: 'chapter_14'
  },

  // Nazi Sympathizer Network Relationships
  {
    from: 'peter_snowden',
    to: 'marjorie_snowden',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'marjorie_snowden',
    to: 'peter_snowden',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'bob_harrington',
    to: 'louise_harrington',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'louise_harrington',
    to: 'bob_harrington',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'sir_john_davies',
    to: 'lady_megan_davies',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'lady_megan_davies',
    to: 'sir_john_davies',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'peter_snowden',
    to: 'bob_harrington',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },
  {
    from: 'bob_harrington',
    to: 'peter_snowden',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },
  {
    from: 'peter_snowden',
    to: 'louise_harrington',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },
  {
    from: 'louise_harrington',
    to: 'peter_snowden',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },
  {
    from: 'peter_snowden',
    to: 'sir_john_davies',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },
  {
    from: 'sir_john_davies',
    to: 'peter_snowden',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },
  {
    from: 'bob_harrington',
    to: 'sir_john_davies',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },
  {
    from: 'sir_john_davies',
    to: 'bob_harrington',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },
  {
    from: 'bob_harrington',
    to: 'louise_harrington',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },
  {
    from: 'louise_harrington',
    to: 'bob_harrington',
    type: 'colleague',
    introducedInChapter: 'chapter_02'
  },

  // German Connection Relationships
  {
    from: 'gerda_stammer',
    to: 'franz_stammer',
    type: 'spouse',
    introducedInChapter: 'chapter_04'
  },
  {
    from: 'franz_stammer',
    to: 'gerda_stammer',
    type: 'spouse',
    introducedInChapter: 'chapter_04'
  },
  {
    from: 'gerda_stammer',
    to: 'cynthia_childreth',
    type: 'contact',
    introducedInChapter: 'chapter_04'
  },
  {
    from: 'cynthia_childreth',
    to: 'gerda_stammer',
    type: 'contact',
    introducedInChapter: 'chapter_04'
  },
  {
    from: 'franz_stammer',
    to: 'cynthia_childreth',
    type: 'contact',
    introducedInChapter: 'chapter_04'
  },
  {
    from: 'cynthia_childreth',
    to: 'franz_stammer',
    type: 'contact',
    introducedInChapter: 'chapter_04'
  },
  {
    from: 'lena_weber',
    to: 'cynthia_childreth',
    type: 'contact',
    introducedInChapter: 'chapter_05'
  },
  {
    from: 'cynthia_childreth',
    to: 'lena_weber',
    type: 'contact',
    introducedInChapter: 'chapter_05'
  },

  // Supporting Character Relationships
  {
    from: 'amy_wyndholme',
    to: 'horace_wyndholme',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'horace_wyndholme',
    to: 'amy_wyndholme',
    type: 'spouse',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'cynthia_childreth',
    to: 'mary',
    type: 'employer',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'mary',
    to: 'cynthia_childreth',
    type: 'employer',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'bill_lawrie',
    to: 'edwin',
    type: 'protector',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'edwin',
    to: 'bill_lawrie',
    type: 'protector',
    introducedInChapter: 'chapter_01'
  },

  // Double Agent Relationships
  {
    from: 'louise_harrington',
    to: 'bill_lawrie',
    type: 'handler-asset',
    introducedInChapter: 'chapter_16'
  },
  {
    from: 'bill_lawrie',
    to: 'louise_harrington',
    type: 'handler-asset',
    introducedInChapter: 'chapter_16'
  },

  // Historical Figure Relationships
  {
    from: 'oswald_mosley',
    to: 'cynthia_childreth',
    type: 'contact',
    introducedInChapter: 'chapter_06'
  },
  {
    from: 'cynthia_childreth',
    to: 'oswald_mosley',
    type: 'contact',
    introducedInChapter: 'chapter_06'
  },
  {
    from: 'marjorie_snowden',
    to: 'cynthia_mosley',
    type: 'friend',
    introducedInChapter: 'chapter_01'
  },

  // Staff Relationships
  {
    from: 'amy_wyndholme',
    to: 'sheila',
    type: 'employer',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'sheila',
    to: 'amy_wyndholme',
    type: 'employer',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'amy_wyndholme',
    to: 'patrick',
    type: 'employer',
    introducedInChapter: 'chapter_01'
  },
  {
    from: 'patrick',
    to: 'amy_wyndholme',
    type: 'employer',
    introducedInChapter: 'chapter_01'
  },

  // Surveillance Team Relationships
  {
    from: 'keith',
    to: 'george_bennet',
    type: 'colleague',
    introducedInChapter: 'chapter_31'
  },
  {
    from: 'george_bennet',
    to: 'keith',
    type: 'colleague',
    introducedInChapter: 'chapter_31'
  },
  {
    from: 'mike',
    to: 'george_bennet',
    type: 'colleague',
    introducedInChapter: 'chapter_31'
  },
  {
    from: 'george_bennet',
    to: 'mike',
    type: 'colleague',
    introducedInChapter: 'chapter_31'
  }
];
