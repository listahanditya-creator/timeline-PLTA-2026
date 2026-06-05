export type Category =
  | "subtitle"
  | "kalla-oligarch"
  | "national-politics"
  | "socio-environmental"
  | "community-resistance"
  | "conflict-militarisation"
  | "human-rights"
  | "public-donations"
  | "uncategorised";

export interface TimelineEvent {
  id: string;
  year: string;
  date?: string;
  keyEvent: string;
  description: string;
  category: Category;
  archive?: string;
  source?: string;
}

export const CATEGORY_COLORS: Record<
  Category,
  { bg: string; border: string; dot: string; label: string }
> = {
  subtitle: {
    bg: "#F5F0E8",
    border: "#C9B99A",
    dot: "#C9B99A",
    label: "Era / Regime",
  },
  "kalla-oligarch": {
    bg: "#FFF3E0",
    border: "#FFAD4F",
    dot: "#FFAD4F",
    label: "Kalla Oligarch & Business",
  },
  "national-politics": {
    bg: "#FFFDE7",
    border: "#EFD46B",
    dot: "#EFD46B",
    label: "National Politics of Hydropower",
  },
  "socio-environmental": {
    bg: "#FFF0ED",
    border: "#FDA075",
    dot: "#F0816D",
    label: "Socio-Environmental Violence",
  },
  "community-resistance": {
    bg: "#F0F4E8",
    border: "#B6B644",
    dot: "#B6B644",
    label: "Community Resistance",
  },
  "conflict-militarisation": {
    bg: "#FDECEA",
    border: "#F0816D",
    dot: "#E94B3F",
    label: "Conflict, Militarisation & Securitisation",
  },
  "human-rights": {
    bg: "#E8F4F8",
    border: "#9EC9EF",
    dot: "#9EC9EF",
    label: "Human Rights Interventions",
  },
  "public-donations": {
    bg: "#F3EEF8",
    border: "#E8D9EC",
    dot: "#A98067",
    label: "Public Donations / Church Relations",
  },
  uncategorised: {
    bg: "#F5F5F5",
    border: "#CCCCCC",
    dot: "#AAAAAA",
    label: "Other",
  },
};

export const timelineData: TimelineEvent[] = [
  {
    id: "1",
    year: "1950-1965",
    keyEvent: "Old Order Regime: Foundations of Mega-Dam Nationalism",
    description:
      "During the Old Order Regime, mega-dam projects were seen as a way to distribute 'inter-regional economic equality' across the archipelago. Projects were mainly handled by Nippon Koei (engineering and electric power consulting) with the Japan International Cooperation Agency (JICA) as part of war reparations.\n\nIn this era, socio-environmental violence related to mega-dam development was at its peak, with little to no attention from the government or corporations -- a pattern later replicated in the development of Poso Energy Hydroelectric Power decades later.",
    category: "subtitle",
  },
  {
    id: "2",
    year: "1952",
    keyEvent: "Establishment of the Kalla Oligarch",
    description:
      "Haji Kalla and Hajjah Athirah Kalla (family of Jusuf Kalla) began their enterprise in the textile trade before expanding into transportation through the intercity bus service Cahaya Bone.\n\nIn the same year, Hadji Kalla Trading Company was established.",
    category: "kalla-oligarch",
    archive: "https://kalla.co.id/sejarah",
  },
  {
    id: "3",
    year: "1960",
    keyEvent: "Kalla Family Business Expands into Automotive and Road Construction",
    description:
      "The Kalla company became the main importer of Toyota cars from Japan and the official Toyota dealer in Indonesia. Their business expanded to South, Central, and Southeast Sulawesi, including highway road construction in Sulawesi (Trans-Sulawesi Highway).",
    category: "kalla-oligarch",
  },
  {
    id: "4",
    year: "1965-1998",
    keyEvent: "New Order Regime: Mega-Dams as Instruments of 'Inter-Regional Economic Equality'",
    description:
      "Mega-dam projects were positioned as vehicles for distributing inter-regional economic equality across the archipelago. Projects were mainly handled by Nippon Koei with JICA as part of Japanese war reparations.\n\nSocio-environmental violence related to mega-dam development was at its peak, with little to no attention from the government or corporations -- a pattern later replicated in the development of Poso Energy Hydroelectric Power.",
    category: "subtitle",
  },
  {
    id: "5",
    year: "1967",
    keyEvent: "Nippon Koei Opens Jakarta Representative Office",
    description:
      "Nippon Koei later built mega hydroelectric dam projects, such as the Asahan Hydrodam in North Sumatra (started 1987). The Japanese government decided to fund a comprehensive development plan in 1969.\n\nAccording to sociologist and activist Aditjondro, hydrodam development was realised as 'war reparations,' enabling Japan-Indonesia collaboration via JICA and ODA.",
    category: "national-politics",
    source: "The Asahan Hydroelectric Power Generation Project",
  },
  {
    id: "6",
    year: "1969",
    keyEvent: "Asahan Hydrodam (North Sumatra): First Nippon Koei Project Enacted",
    description:
      "Beginning in 1969, large dam construction entered a period of rapid expansion, much of it financed by Japan as part of war reparations and realised through Nippon Koei.",
    category: "national-politics",
  },
  {
    id: "7",
    year: "1978",
    date: "27 November",
    keyEvent: "Sempor Hydroelectric Dam Disaster",
    description:
      "A flash flood caused the dam's cofferdam to collapse, killing 127 people, destroying 1,100 houses and a mosque in six villages, damaging 800 metres of railway track, and killing thousands of livestock.",
    category: "socio-environmental",
    archive: "https://kalla.co.id/sejarah",
  },
  {
    id: "8",
    year: "1978-1979",
    keyEvent: "Bukaka Teknik Utama is Established",
    description:
      "The Kalla family business began by manufacturing fire trucks and automotive equipment, later expanding rapidly into infrastructure and energy sectors.",
    category: "kalla-oligarch",
  },
  {
    id: "9",
    year: "1979",
    keyEvent: "Mega-Dams as a Path to a 'Modern' Nation",
    description:
      "Sutami, former Minister of Public Works, stated that the development of large and mega-dams was essential for distributing 'inter-regional economic equality' across the Indonesian archipelago (Aditjondro 1998, p. 32).",
    category: "national-politics",
  },
  {
    id: "10",
    year: "1978-1991",
    keyEvent: "Activist Criminalisation at Bakaru Hydropower Plant",
    description:
      "Seven social activists were imprisoned for four years after advocating for land compensation during the construction of the Bakaru Hydropower Reservoir in South Sulawesi (Aditjondro, 1993). The dam was built on the Saddang and Mamasa Rivers by PLN, in cooperation with Nippon Koei, JICA, and OECD.",
    category: "community-resistance",
  },
  {
    id: "11",
    year: "1981",
    date: "January",
    keyEvent: "Gajah Mungkur Hydrodam Flooding Disaster, Central Java",
    description:
      "Construction planning misconduct caused 600 families to suffer due to agricultural flooding across 350 hectares when the watergate spillway was closed in January 1981.",
    category: "socio-environmental",
    source: "Laporan WALHI. Lore Lindu. GJA",
  },
  {
    id: "12",
    year: "1983",
    keyEvent: "Nippon Koei Feasibility Study for Lore Lindu Hydropower, Central Sulawesi",
    description:
      "Nippon Koei conducted surveys on hydropower potential and identified the Lore Lindu area as a national development project, as part of Japan's post-war reparations programme.",
    category: "national-politics",
  },
  {
    id: "13",
    year: "1986",
    date: "2 March",
    keyEvent: "Flash Flood at Mrica Hydroelectric Dam, Central Java",
    description:
      "The temporary cofferdam collapsed, triggering a flash flood along the Serayu River that killed six people, washed away 15 bridges, and submerged around 300 houses downstream (Aditjondro, 1993).",
    category: "socio-environmental",
  },
  {
    id: "14",
    year: "1986",
    keyEvent: "Bukaka Begins High-Voltage Electricity Transmission",
    description:
      "In late 1985 and early 1986, as the government intensified development in mining and infrastructure, Bukaka began designing and manufacturing high-voltage electricity transmission networks. By 1991, Bukaka had undertaken major transmission projects including a 500 kV line from Suralaya to Cilegon (USD 15 million) and a 150 kV line from Gresik to Tandes (USD 13 million).\n\nThis marked the beginning of Bukaka's expansion into hydropower concessions (Aditjondro 2005).",
    category: "kalla-oligarch",
  },
  {
    id: "15",
    year: "1988",
    keyEvent: "Lore Lindu Hydrodam (Planned): EIA Published, To Lindu Resistance Begins",
    description:
      "The Environmental Impact Assessment for the Lore Lindu Hydropower Plant (PLTA Palu) was first published by PT Pratama Widya in July 1993, rejected by the To Lindu Indigenous community who organised themselves in resistance.\n\nThe Indonesian government had planned the construction with Lake Lindu as the primary reservoir. The planned capacity of 76 MW was intended to supply electricity for industrial needs in Central Sulawesi Province in 2000.",
    category: "socio-environmental",
    source: "WALHI. M Natsir Abbas.",
  },
  {
    id: "16",
    year: "1988",
    keyEvent: "To Lindu Indigenous Community Unites and Resists!",
    description:
      "The spatial planning and development of the Lore Lindu hydrodam slowly began to be implemented. Public consultations were held multiple times while the To Lindu Indigenous community's resistance intensified -- ultimately resulting in the halting of the Lore Lindu hydrodam development.\n\nThis struggle coincided with resistance to the Kedungombo hydrodam in Central Java, which inundated 37 villages.",
    category: "community-resistance",
  },
  {
    id: "17",
    year: "1989",
    keyEvent: "Nippon Koei Feasibility Study: Lake Lindu Would Be Inundated",
    description:
      "Lake Lindu, located in Lindu District, Sigi Regency, covers 34.88 hectares with an average depth of 38 metres. Surrounding communities rely on the lake as a primary livelihood source.\n\nThe proposed dam would be 7 metres high and 50 metres wide, raising the lake's water level by approximately 2 metres and inundating around 6.2 kilometres of surrounding land.",
    category: "socio-environmental",
    archive: "https://www.mosintuwu.com/2021/12/12/belajar-dari-orang-lindu-yang-melawan-plta/",
  },
  {
    id: "18",
    year: "1990",
    keyEvent: "Relocation Plan for To Lindu Community Absent from EIA",
    description:
      "The feasibility study and EIA for the Lore Lindu Hydropower Project did not specify the resettlement location for affected residents. Since 1990, communities had already begun to feel uneasy due to rumours of relocation to the Napu Valley and Palolo Valley -- both bordering the Lore Lindu National Park and designated as transmigration sites.",
    category: "community-resistance",
  },
  {
    id: "19",
    year: "1992-1993",
    keyEvent: "To Lindu Indigenous Community Resistance Grows",
    description:
      "Between 1992 and 1993, support from students and civil society groups became increasingly visible through NGO activities focused on community organising. NGOs supported the To Lindu resistance by facilitating intensive information campaigns on the socio-ecological and legal implications of the proposed project.",
    category: "community-resistance",
  },
  {
    id: "20",
    year: "1993",
    date: "13 April",
    keyEvent: "Public Consultation Seminar in Palu, Central Sulawesi",
    description:
      "The Regional Development Planning Agency (Bappeda) of Central Sulawesi Province held a seminar on the spatial planning of the Lake Lindu special area. The To Lindu Indigenous community was invited to attend.",
    category: "socio-environmental",
    source: "Arianto Sangadji, 2000.",
  },
  {
    id: "21",
    year: "1993",
    date: "11 November",
    keyEvent: "To Lindu Community Firmly Opposes the Hydropower Plant",
    description:
      "The To Lindu Indigenous community firmly expressed their opposition when asked about the construction of the Lore Lindu Hydropower Plant (PLTA) and the plan to relocate them.",
    category: "community-resistance",
  },
  {
    id: "22",
    year: "1993",
    keyEvent: "Governor Announces Relocation Site Without Community Consent",
    description:
      "The Governor of Central Sulawesi, H. Abdul Azis Lamadjido, SH, announced that the Lindu people would be relocated to Lalundu -- approximately 200 km from Lindu -- a transmigration settlement area in Donggala Regency. This indicates that the construction plan and community relocation were undertaken without consultation with the To Lindu community.",
    category: "socio-environmental",
    source: "Surya, 6 November 1993; Arianto Sangadji",
  },
  {
    id: "23",
    year: "1994",
    date: "6 January",
    keyEvent: "KSPPL Alliance Forms to Resist Lore Lindu Hydropower",
    description:
      "The Committee for Solidarity Against the Lore Lindu Hydropower Project (KSPPL) was formed -- an alliance of NGOs, students, nature conservation groups, and intellectuals, originating from a 1993 workshop held in Lindu.",
    category: "community-resistance",
  },
  {
    id: "24",
    year: "1997",
    keyEvent: "Bukaka International Expansion",
    description:
      "Bukaka was appointed as a World Bank project contractor to develop infrastructure in Cambodia, Laos, Bangladesh, Pakistan, and several other Asian countries. The company established representative offices in Singapore, Kuala Lumpur, Beijing, and Salt Lake City.",
    category: "kalla-oligarch",
  },
  {
    id: "25",
    year: "1998-2026",
    keyEvent: "Post-Reformation Era: Poso Hydroelectric Dam and the Conflict as Entry Point",
    description:
      "The Poso 'interreligious' conflict of 1998-2007 became an entry point for the lake extraction agenda. The violent conflict created a political-economic blank space for investment under the guise of economic reconstruction -- sustained by military escalation, including the establishment of Battalion 714 Sintuwu Maroso in 2005.\n\nAt the national scale, socio-environmental violence related to mega-dams also escalated, with hydropower and dams positioned as National Strategic Programmes -- especially under the Joko Widodo regime (2014-2024).",
    category: "subtitle",
  },
  {
    id: "26",
    year: "1998",
    date: "24 December",
    keyEvent: "Emergence of Poso Conflict: Phase 1",
    description:
      "On 24 December 1998, a young Protestant in the town of Poso stabbed a Muslim in the arm, unleashing a spiral of communal violence between Christian and Muslim communities concentrated in the urban area of Poso city. The region proved fertile ground for violence: underlying economic, ethnic, and religious tensions were compounded by the actions of political rivals who encouraged and exploited the conflict.",
    category: "conflict-militarisation",
  },
  {
    id: "27",
    year: "2000",
    keyEvent: "Bukaka Expands into Hydropower Plants Across Indonesia",
    description:
      "Through Bukaka Teknik Utama, the Kalla Group began developing hydropower plants in Indonesia, obtaining multiple concessions simultaneously in North Sumatra, South Sulawesi, and Central Sulawesi. Bukaka was also involved in the Asahan III Hydropower Plant (200 MW) engineered by Nippon Koei.",
    category: "kalla-oligarch",
  },
  {
    id: "28",
    year: "2000",
    keyEvent: "Poso Conflict Phase 2 Spreads to the Regency",
    description:
      "The Poso Conflict spread throughout Poso Regency, including Tentena. Encampments were established near the Poso Lake delta. Military and police checkpoints surrounded refugee camps, and the conflict produced widespread harassment -- including documented verbal and sexual harassment against women in the camps.",
    category: "conflict-militarisation",
  },
  {
    id: "29",
    year: "2001",
    keyEvent: "Malino Declaration",
    description:
      "A peace treaty attempt between Christian and Muslim groups in 2001, mediated by Jusuf Kalla -- the oligarch and political figure associated with Poso Energy Company.",
    category: "conflict-militarisation",
    source: "Jusuf Kalla",
  },
  {
    id: "30",
    year: "2003",
    keyEvent: "Groundbreaking of Poso Hydropower Phase 1 -- Before Land Concession",
    description:
      "'2003 itu peletakan batu pertama dan lain sebagainya. Tapi itu sudah dimulai dengan pembangunan, kalau pakai analisisnya George ya, pembangunan markas-markas militer. Itu sudah terbangun markas-markas militer, kemudian juga Morowali sudah pisah dengan Kabupaten Poso.'\n\nSource: Conversation with local community and activist Stevandi/Koko Ephen, February 2026.",
    category: "conflict-militarisation",
  },
  {
    id: "31",
    year: "2005",
    date: "31 May",
    keyEvent: "PT Poso Energy Company Established",
    description:
      "In 2005, PT Poso Energy became the operational company of the Bukaka Group, with Bukaka as its main shareholder.",
    category: "kalla-oligarch",
  },
  {
    id: "32",
    year: "2005",
    keyEvent: "Blueprint for Indonesia's National Energy Management 2005-2025",
    description:
      "The Indonesian government issued its national energy management blueprint, framing hydropower development as a strategic national priority.",
    category: "national-politics",
  },
  {
    id: "33",
    year: "2005",
    keyEvent: "Lake Poso Extraction Without Public Consultation or Complete EIA",
    description:
      "According to JATAM (2011), the AMDAL for PLTA Poso-2 was eventually published -- but Aditjondro's report notes that construction had begun before the study was completed.\n\nThe EIA assessed only the impacts of PLTA Poso-2, while the impacts of PLTA Poso-1 and PLTA Poso-3 (located in Tampemadoro Village) were entirely absent. The EIA document itself is currently missing -- reportedly buried during the 2018 earthquake.",
    category: "socio-environmental",
  },
  {
    id: "34",
    year: "2005",
    date: "April",
    keyEvent: "Heavy Construction Equipment Enters Sulewana Village",
    description:
      "Around April 2005, heavy construction equipment began entering the village, which had a population of approximately 1,750 people across 500 households in four hamlets (Kalla & Bukaka 2005: 37, in Aditjondro 2005).",
    category: "socio-environmental",
  },
  {
    id: "35",
    year: "2005",
    date: "May",
    keyEvent: "PLTA Poso-2 Construction Begins",
    description:
      "PLTA Poso-2 (Hydroelectric Power Plant and Dam, Stage 1) began its construction phase.",
    category: "kalla-oligarch",
  },
  {
    id: "36",
    year: "2005",
    date: "9 August",
    keyEvent: "Local Labour Protest Against Discrimination",
    description:
      "On Tuesday, 9 August 2005, a number of local workers protested against discrimination directed at them at the PLTA Poso construction site.",
    category: "community-resistance",
  },
  {
    id: "37",
    year: "2005",
    date: "18 August",
    keyEvent: "Local Drivers Demand Fair Wages from Achmad Kalla",
    description:
      "The visit of Achmad Kalla, leader of the Bukaka Group and younger brother of the Vice President, to the hydropower project was met with a mass protest by local drivers from surrounding villages.\n\nThey demanded fair wages and required that every vehicle brought into the project area by Bukaka and its subcontractors be operated by a local driver.",
    category: "community-resistance",
  },
  {
    id: "38",
    year: "2005",
    date: "22 August",
    keyEvent: "Villagers Block Bulldozers: Land Cleared Without Crop Compensation",
    description:
      "Eight households courageously stopped heavy equipment -- bulldozers, excavators, steamrollers -- at the project site. They demanded that Bukaka first pay compensation for their plants and crops: cocoa, coconut, candlenut, coffee, cloves, sago palms, durian, vanilla, langsat, mango, rambutan, bamboo, bananas, citrus, pandan, rice, and maize.\n\nResidents noted that while their land had been compensated, their crops and cultivated plants had not.\n\nSource: George Junus Aditjondro's archive (2005).",
    category: "community-resistance",
  },
  {
    id: "39",
    year: "2005",
    date: "24 August",
    keyEvent: "New Military Base (Battalion 714) Established",
    description:
      "Battalion 714 Sintuwu Maroso was established, consisting of five strike companies with an estimated 800-1,000 personnel. Units deployed in the Lake Poso area included Company 1 of Battalion B POR/SAOJO and Rifle Company A of Infantry Battalion 714.",
    category: "conflict-militarisation",
    source: "George Junus Aditjondro: Setelah Gemuruh Wera Sulewana Dibungkam",
  },
  {
    id: "40",
    year: "2005",
    date: "28 August",
    keyEvent: "Access Road to PLTA Poso-1 Nearly Complete; PLTA Poso-3 Survey Begins",
    description:
      "Sunday, 28 August 2005. The construction of the access road to the PLTA Poso-1 project site was nearly complete when the author visited the field. Survey measurements for the PLTA Poso-3 project in Tampemadoro Village had already been underway for two weeks. (Personal archive of George Junus Aditjondro.)",
    category: "socio-environmental",
  },
  {
    id: "41",
    year: "2005",
    keyEvent: "Yayasan Tanah Merdeka & Aditjondro Publish Position Paper on Poso PLTA Impacts",
    description:
      "'Setelah Gemuruh Wera Sulewana Dibungkam: Dampak Pembangunan PLTA Poso & Jaringan Sutet di Sulawesi' (After the Roar of Wera Sulewana Was Silenced: The Impacts of the Poso Hydropower Development and High-Voltage Transmission Networks in Sulawesi.)",
    category: "community-resistance",
    archive: "https://ytm.or.id/setelah-gemuruh-wera-sulewana-dibungkam-dampak-pembangunan-plta-poso-jaringan-sutet-di-sulawesi/",
    source: "YTM; George Junus Aditjondro",
  },
  {
    id: "42",
    year: "2005",
    keyEvent: "Unjust Compensation for Land Grabbing",
    description:
      "Unplanted land was valued at around IDR 1,750 per square metre, referring to a Poso Regency regulation predating the 1998 conflict. After negotiations, Bukaka paid between IDR 1,750 and IDR 3,000 per square metre -- far below the IDR 5,000 demanded by the people of Sulewana.\n\nIn Saojo Village, residents were pressured to accept IDR 1,750 per square metre, while land for an airport was acquired through cooperation between the Customary Council Chair and armed security forces.",
    category: "socio-environmental",
    source: "George Junus Aditjondro: Setelah Gemuruh Wera Sulewana Dibungkam",
  },
  {
    id: "43",
    year: "2006",
    keyEvent: "Bukaka Constructs High-Voltage Transmission Tower (SUTET) in Peura",
    description:
      "According to Aditjondro (2005), the environmental impacts of the SUTET construction were not included in the AMDAL (Environmental Impact Assessment).",
    category: "socio-environmental",
    archive: "https://www.insideindonesia.org/archive/articles/the-power-to-rebuild",
  },
  {
    id: "44",
    year: "2006-2011",
    keyEvent: "Community Resistance in Peura Against High-Voltage Tower Construction",
    description:
      "Community resistance in Peura began when residents were forced to accept the construction of a high-voltage transmission tower in their village without consent.",
    category: "community-resistance",
  },
  {
    id: "45",
    year: "2009",
    keyEvent: "Wera Sulewana Waterfall Fully Dammed and Diverted by PT Poso Energy",
    description:
      "Wera Sulewana, one of the most important environmental and cultural features for local communities, was fully dammed and its flow diverted to the penstock owned by PT Poso Energy. Local communities had long treasured the waterfall as a recreational and spiritual site.",
    category: "socio-environmental",
    source: "Yang Datang Setelah Jawaban (p. 137); Mosintuwu; PT Poso Energy",
  },
  {
    id: "46",
    year: "2010",
    keyEvent: "PLTA Poso-1 (Stage 2) Construction Begins",
    description: "Construction of the PLTA Poso-1 Hydroelectric Power Plant and Dam, Stage 2, commenced.",
    category: "kalla-oligarch",
  },
  {
    id: "47",
    year: "2011",
    date: "2 March",
    keyEvent: "Confrontation: Villagers Block Military and Construction Trucks in Peura",
    description:
      "Villagers were startled by the sudden arrival of dozens of TNI, police, and Satpol PP personnel. Residents -- mostly mothers and women -- formed a human barricade in front of trucks transporting construction materials for the tower. They sang 'songs of surrender', signalling they were prepared to die rather than allow the construction.\n\nThe situation became extremely tense. Jack Karel, 28, was forcibly seized by TNI personnel as he tried to rally his fellow villagers.\n\nArchive from Facebook of Peura Community Resistance.",
    category: "conflict-militarisation",
    archive: "https://www.berdikarionline.com/perjuangan-warga-desa-peura-menolak-pembangunan-tower-sutet/",
  },
  {
    id: "48",
    year: "2011",
    date: "3 March",
    keyEvent: "Criminalisation of Farmers and Villagers by TNI 714",
    description:
      "People built an encampment to prevent the company from continuing works. At 10:40, 10 TNI members arrived. At 11:00, a blue truck brought construction materials. At 15:00, another truck arrived. People blocked the road while military shouted: 'This is too much! You broke the law!' Jack was dragged by a military member, fled, and hid in a villager's house.\n\nArchive from Facebook of Peura Community Resistance.",
    category: "conflict-militarisation",
  },
  {
    id: "49",
    year: "2011",
    date: "5-7 March",
    keyEvent: "Korem 714 and Battalion 714 Deployed; Official Reports Compiled",
    description:
      "Personnel from Korem 714 and Battalion 714 Poso were deployed to conduct an on-site investigation and prepare official reports (BAP). Korem authorities stated that 11 members of the TNI had been examined by Battalion 714 Poso.",
    category: "conflict-militarisation",
  },
  {
    id: "50",
    year: "2011",
    date: "March",
    keyEvent: "Komnas HAM Issues Recommendation to Review Peura Tower Construction",
    description:
      "The National Commission on Human Rights (Komnas HAM) issued a recommendation to review the construction of the transmission tower in Peura.",
    category: "human-rights",
  },
  {
    id: "51",
    year: "2011",
    keyEvent: "Komnas HAM Issues Three Recommendations on Peura Conflict",
    description:
      "1. Temporary suspension of tower construction until a deliberation process (musyawarah) could take place.\n2. Organisation of a dialogue between Peura residents (both supporting and opposing) and PT Poso Energy, with Jusuf Kalla present.\n3. An investigation into acts of violence and alleged human rights violations.",
    category: "human-rights",
    archive: "https://www.berdikarionline.com/perjuangan-warga-desa-peura-menolak-pembangunan-tower-sutet/",
    source: "PT Poso Energy; Komnas HAM",
  },
  {
    id: "52",
    year: "2012",
    keyEvent: "PLTA Poso-2 Begins Operations",
    description:
      "The project cost approximately IDR 4 trillion, financed through a banking syndicate consisting of BNI, BRI, Bukopin, and Bank Panin (Arianto Sangadji, 2019).",
    category: "kalla-oligarch",
    source: "Arianto Sangadji's presentation, 2019",
  },
  {
    id: "53",
    year: "2015",
    keyEvent: "PT Bukaka Teknik Utama Expands into Nickel Smelting",
    description:
      "Bukaka planned to build a nickel smelter in Palopo, South Sulawesi, with an investment of IDR 400 billion. Through PT Bumi Mineral Sulawesi, the Kalla Group established mineral processing plants (smelters) in Palopo and Belopa, South Sulawesi.",
    category: "kalla-oligarch",
  },
  {
    id: "54",
    year: "2015",
    keyEvent: "EIA for PLTA Poso-1 Stage 2 Circulated -- But Original Document Missing",
    description:
      "The Environmental Impact Assessment (AMDAL) for the Poso-1 Hydropower Plant (HEPP), Stage 2, was circulated among the community. While references to the document were found on Facebook, the original AMDAL document itself remains missing.",
    category: "socio-environmental",
  },
  {
    id: "55",
    year: "2017",
    keyEvent: "MoU: PT Poso Energy and Poso Regency Government on River Dredging",
    description:
      "The plan to dredge Lake Poso began to emerge in 2017, when PT Poso Energy (represented by Achmad Kalla) signed an MoU with the Poso Regency Government (represented by Regent Col. (Ret.) Darmin Agustinus Sigilipu).\n\nThe MoU (No. 130/PIP/ENV/2017/IV/2017 -- 180/0760/HKM/2017) framed the Poso River Improvement project as part of 'Lake Poso tourism development.'\n\nSource: Personal archives of Stevandi/Koko Ephen, 2019.",
    category: "national-politics",
  },
  {
    id: "56",
    year: "2018",
    keyEvent: "National Renewable Agenda: Estimated Hydroelectric Expansion in Poso",
    description:
      "According to PT PLN's Electricity Supply Business Plan (RUTL), Central Sulawesi has an estimated hydropower potential of around 3,000 MW. The largest potential lies along the Lariang River (~245 km), stretching from the Lore Highlands in Poso Regency (upstream) to North Mamuju District, West Sulawesi (downstream).",
    category: "national-politics",
    archive: "https://www.beritasatu.com/news/599119/proyek-plta-di-sulteng-abaikan-risiko-bencana",
  },
  {
    id: "57",
    year: "2018",
    keyEvent: "Merger of PT Poso Energy with Hadji Kalla",
    description:
      "PT Poso Energy merged with Hadji Kalla (previously an associated company), consolidating the Kalla Group's control over the Poso hydropower operations.",
    category: "kalla-oligarch",
    source: "JK; PT Hadji Kalla",
  },
  {
    id: "58",
    year: "2019",
    keyEvent: "Poso River Violence Under the 'Poso River Improvement' Programme",
    description:
      "River dredging and displacement of Wayamasapi (traditional fish traps) began under the 'Poso River Improvement' programme, pursuant to the 2017 MoU.",
    category: "socio-environmental",
  },
  {
    id: "59",
    year: "2019",
    date: "November",
    keyEvent: "Cultural Bridge Yondo mPamona Demolished: Community Erupts in Resistance",
    description:
      "The Yondo mPamona cultural bridge was officially demolished, triggering resistance from the To Pamona Indigenous community and a series of demonstrations. The bridge was demolished under the 'Poso River Improvement' programme, which described it merely as 'an old wooden bridge.'",
    category: "community-resistance",
  },
  {
    id: "60",
    year: "2019",
    keyEvent: "Joko Widodo Inaugurates PLTA Poso-1 Amid Ongoing River Dredging",
    description:
      "President Joko Widodo inaugurated PLTA Poso-1 (Stage 2) while the Poso River dredging programme simultaneously commenced.",
    category: "national-politics",
  },
  {
    id: "61",
    year: "2019",
    date: "November",
    keyEvent: "Community Land Grabbed for Company Road Construction",
    description:
      "PT Poso Energy was constructing a company road from Saojo Village to Tampemadoro Village (~20 km, ~14 metres wide). Based on field investigation by Mr Herson, there were allegations of land grabbing involving residents' land along the route.",
    category: "socio-environmental",
  },
  {
    id: "62",
    year: "2020",
    keyEvent: "First Electricity Distribution from PLTA Poso 1 & 2 -- Followed by Major Agricultural Flooding",
    description:
      "First electricity distribution from PLTA Poso Energy 1 & 2, followed immediately by major agricultural flooding caused by watergate operations.\n\nAccording to local testimony, the company initially denied accountability, claiming 'the lake is too far away from the HEPP and there is no chance that the water caused flooding' -- despite technical documents confirming that the lake had been transformed into a natural reservoir for hydrodam operations.",
    category: "socio-environmental",
  },
  {
    id: "63",
    year: "2021",
    date: "21 January",
    keyEvent: "Formal Legal Notice Issued to PT Poso Energy",
    description:
      "A formal legal notice (somasi) was issued to the President Director of PT Poso Energy by the Lake Poso Guardian Alliance (Aliansi Penjaga Danau Poso).",
    category: "community-resistance",
  },
  {
    id: "64",
    year: "2021",
    date: "13 July",
    keyEvent: "Class Action Filed by Lake Poso Guardian Alliance",
    description:
      "A class action lawsuit was filed by residents, supported by the Legal Aid Institute (LBH) together with the Lake Poso Guardian Alliance (Aliansi Penjaga Danau Poso). The case was submitted to the Poso District Court (Class 1B).",
    category: "community-resistance",
  },
  {
    id: "65",
    year: "2021",
    date: "September",
    keyEvent: "10 Farmers Represent Hundreds in Class Action: 3 Villages Sue PT Poso Energy",
    description:
      "Ten farmers, representing hundreds from Meko, Tonusu, and Buyumpondoli Villages, attended the class action lawsuit. After sending three open letters demanding company accountability, they sought IDR 6,000,000,000 in compensation, plus customary fines and cultural advocacy measures. PT Poso Energy did not attend the first court session.",
    category: "community-resistance",
  },
  {
    id: "66",
    year: "2021",
    date: "13 October",
    keyEvent: "APDP Submits Complaint on Watergate Operations Damaging Agricultural Fields",
    description:
      "The Aliansi Penjaga Danau Poso submitted a complaint regarding the trial operation of the water gates at Poso Hydropower Plant 1, which caused damage to agricultural fields and the livelihoods of local smallholders.",
    category: "community-resistance",
  },
  {
    id: "67",
    year: "2021",
    date: "13 November",
    keyEvent: "Komnas HAM Issues Recommendation Letter on Human Rights Violations",
    description:
      "The National Commission on Human Rights (Komnas HAM) issued a recommendation letter stating alleged human rights violations in connection with the Poso hydropower operations and their impact on surrounding communities.",
    category: "human-rights",
  },
  {
    id: "68",
    year: "2022",
    keyEvent: "Compensation with Repression: Rice for Silence",
    description:
      "A total of 460 tonnes of rice was distributed as compensation to 16 villages. However, residents who received compensation were required to sign an integrity pact, which effectively restricted them from filing complaints or expressing grievances.",
    category: "socio-environmental",
  },
  {
    id: "69",
    year: "2022",
    keyEvent: "PT Bukaka Begins Nickel Smelter Construction in Palopo",
    description:
      "PT Bukaka Teknik Utama Tbk. began constructing a nickel smelter in Palopo, South Sulawesi, targeted for completion in 2024.",
    category: "kalla-oligarch",
  },
  {
    id: "70",
    year: "2022",
    date: "22 May",
    keyEvent: "Company Declares Compensation Complete -- Reality Says Otherwise",
    description:
      "PT Poso Energy announced that the compensation process had been completed. In reality, six villages around Lake Poso had not yet received fair compensation:\n\n- Meko Village: 80 households\n- Pendolo Village: 19 households\n- Tonusu Village: 30 households\n- Buyumpondoli Village: 7 households\n- Peura Village: 3 households\n- Toinasa Village: 4 households\n- Tentena: 2 households\n\nAdditionally, 108 fishing households in Saojo Village had not received fair compensation for the destruction of Wayamasapi fishing grounds, karamba (fish cages), and the loss of sand mining areas.",
    category: "kalla-oligarch",
  },
  {
    id: "71",
    year: "2023",
    keyEvent: "Kalla Group Enters Electric Vehicle Business",
    description:
      "Kalla Group became the official dealer of United EV in Indonesia. This marks the entanglement of Kalla extractivism: Poso HEPP electricity -> Kalla nickel smelter -> Kalla EV industry.",
    category: "kalla-oligarch",
  },
  {
    id: "72",
    year: "2024",
    keyEvent: "Kalla Company and GKST Church Connections",
    description:
      "Jusuf Kalla inaugurated the construction of the GKST General Hospital in Poso, managed by the GKST Church of Sinode. This has been interpreted by critics as a way to bring the church institution under the influence of the company.\n\nThe Sinode is a Protestant Christian institution based in Tentena, now considered to have political proximity to PT Poso Energy due to several instances of company support to church institutions.",
    category: "public-donations",
  },
  {
    id: "73",
    year: "2025",
    date: "18 November",
    keyEvent: "ITB Researchers Investigate 25 Fractured Houses in Sulewana",
    description:
      "Geological researchers from Institut Teknologi Bandung surveyed Sulewana Village after 25 houses were reported fractured due to PLTA Poso operations and geological engineering activities.\n\nPT Poso Energy, through their CSR, denied responsibility, claiming: 'The water discharge from the hydropower plant is far below the regulatory threshold, and therefore is considered to have no impact on nearby settlements.'",
    category: "socio-environmental",
    archive:
      "https://radarpalu.jawapos.com/sulteng/2606863324/itb-teliti-penyebab-kerusakan-rumah-di-poso-dugaan-dampak-plta-menguat-perusahaan-sampaikan-bantahan?page=1",
  },
  {
    id: "74",
    year: "2026",
    date: "18 January",
    keyEvent: "Road Closure in Sulewana: Community Prohibited from Accessing PLTA-3 Road",
    description:
      "'Those road access is a part of the strategic national vital object. Therefore, to protect the community safety, we inform that all community is PROHIBITED to pass the road access toward PLTA-3 Poso for 4, 5, and 10 wheeled vehicles.'",
    category: "socio-environmental",
  },
  {
    id: "75",
    year: "2026",
    date: "26 January",
    keyEvent: "PLTA-3 EIA Still Not Circulated to Community Despite Ongoing Operations",
    description:
      "Local collaborator (Mosintuwu), confirmed by Stevandi (local activist, 26 February 2026): the PLTA-3 EIA has not yet been circulated to the community, despite the start of operations. Activists reported the development was halted, but the road closure in January 2026 suggests construction may have continued.",
    category: "socio-environmental",
  },
  {
    id: "76",
    year: "2026",
    keyEvent: "PLTA-4 Environmental Impact Assessment",
    description:
      "Environmental Impact Assessment for PLTA Poso-4 is being processed, despite PLTA-3 not yet having a publicly circulated EIA.",
    category: "socio-environmental",
  },
];
