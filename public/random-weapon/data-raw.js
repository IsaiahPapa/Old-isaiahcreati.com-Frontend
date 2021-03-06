var perks = {
    "perkList": [
        {
            "Name": "Perk 1",
            "list": [
                "Double Time",
                "Overkill",
                "Scavenger",
                "E.O.D.",
                "Cold-Blooded",
                "Quick Fix"
            ]
        },
        {
            "Name": "Perk 2",
            "list": [
                "Restock",
                "Hardline",
                "High Alert",
                "Ghost",
                "Kill Chain",
                "Pointman"
            ]
        },
        {
            "Name": "Perk 3",
            "list": [
                "Tune Up",
                "Amped",
                "Shrapnel",
                "Battle Hardened",
                "Spotter",
                "Tracker"
            ]
        }
  ]
};

var equipment ={
    "equipmentList": [
        {
            "Name": "Lethal",
            "list": [
                "Claymore",
                "Frag Grenade",
                "Molotov Cocktail",
                "C4",
                "Semtex",
                "Throwing Knife",
                "Proximity Mine",
                "Thermite"
            ]
        },
        {
            "Name": "Tactical",
            "list": [
                "Flash Grenade",
                "Stun Grenade",
                "Smoke Grenade",
                "Flash Grenade",
                "Snapshot Grenade",
                "Heartbeat Sensor",
                "Gas Grenade",
                "Stim",
                "Decoy Grenade"
            ]
        }
  ]
};

var secondaryWeapons = {
	"pistolList": [
    {
			"Name": "Renetti",
			"Muzzle": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7"
			],
			"Barrel": [
				"1",
				"2",
				"3"
			],
			"Laser": [
				"1mW Laser",
				"Tac Laser",
				"5mW Laser"
			],
			"Optic": [
				"1",
				"2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
			],
			"Trigger Action": [
				"1",
				"2",
				"3"
			],
			"Ammunition": [
				"21 Rounds Mags",
				"27 Rounds Mags"
			],
			"Rear Grip": [
				"XRK Pro Grip",
				"XRK Speed Grip",
			],
			"Perk": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
        "9",
        "10"
			]
		},
    {
			"Name": "X16",
			"Muzzle": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7"
			],
			"Barrel": [
				"1",
				"2",
				"3"
			],
			"Laser": [
				"1mW Laser",
				"Tac Laser",
				"5mW Laser"
			],
			"Optic": [
				"1",
				"2",
				"3"
			],
			"Trigger Action": [
				"1",
				"2",
				"3"
			],
			"Ammunition": [
				"17 Rounds Mags",
				"26 Rounds Mags"
			],
			"Rear Grip": [
				"Granulated Grip Tape",
				"Stippled Grip Tape",
				"X16 Stock",
				"Ribberized Grip Tape"
			],
			"Perk": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9"
			]
		},
		{
			"Name": "1911",
			"Muzzle": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7"
			],
			"Barrel": [
				"1",
				"2",
				"3"
			],
			"Laser": [
				"1mW Laser",
				"Tac Laser",
				"5mW Laser"
			],
			"Optic": [
				"1",
				"2",
				"3"
			],
			"Trigger Action": [
				"1",
				"2",
				"3"
			],
			"Ammunition": [
				"1",
				"2"
			],
			"Rear Grip": [
				"1",
				"2",
				"3"
			],
			"Perk": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9"
			]
		},
		{
			"Name": ".357",
			"Muzzle": [
				"1",
				"2",
				"3"
			],
			"Barrel": [
				"1",
				"2",
				"3"
			],
			"Laser": [
				"1mW Laser",
				"Tac Laser",
				"5mW Laser"
			],
			"Optic": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"13"
			],
			"Trigger Action": [
				"1",
				"2",
				"3"
			],
			"Ammunition": [
				"Snake Shot"
			],
			"Rear Grip": [
				"1",
				"2",
				"3",
				"4",
				"5"
			],
			"Perk": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9"
			]
		},
		{
			"Name": "M19",
			"Muzzle": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7"
			],
			"Barrel": [
				"1",
				"2",
				"3"
			],
			"Laser": [
				"1mW Laser",
				"Tac Laser",
				"5mW Laser"
			],
			"Optic": [
				"1",
				"2",
				"3"
			],
			"Trigger Action": [
				"1",
				"2",
				"3"
			],
			"Ammunition": [
				"1",
				"2"
			],
			"Rear Grip": [
				"1",
				"2",
				"3"
			],
			"Perk": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9"
			]
		},
		{
			"Name": ".50 GS",
			"Muzzle": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7"
			],
			"Barrel": [
				"1",
				"2"
			],
			"Laser": [
				"1mW Laser",
				"Tac Laser",
				"5mW Laser"
			],
			"Optic": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12"
			],
			"Trigger Action": [
				"1",
				"2",
				"3"
			],
			"Ammunition": [
				"1",
				"2"
			],
			"Rear Grip": [
				"1",
				"2",
				"3"
			],
			"Perk": [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9"
			]
		}
	]
};

var primaryWeapons = {
	"primaryList": [
    {
      "Name": "SKS",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Ammunition": [
        "30 Rounds Mags",
        "10 Round Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
    {
      "Name": "Bruen Mk9",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Ammunition": [
        "200 Rounds Belt",
        "60 Round Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "VLK Rouge",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3"
      ],
      "Ammunition": [
        "12 Rounds Mags",
        "8 Round Mags",
        "4 Rounds Mags",
        "Dragon's Breath"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "Striker 45",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Ammunition": [
        ".45 Hollow Point 12-R Mags",
        "45 Round Mags"
      ],
      "Rear Grip": [
        "1",
        "2",
        "3"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "Ram 7",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ],
      "Ammunition": [
        "50 Rounds Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
    {
      "Name": "Grau 5.56",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ],
      "Ammunition": [
        "50 Rounds Mags",
        "60 Round Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
    {
      "Name": "Kilo 141",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
      ],
      "Ammunition": [
        "50 Rounds Mags",
        "60 Round Mags",
        "100 Round Drums"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
    {
      "Name": "FAL",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "5mW Laser",
        "1mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
      ],
      "Ammunition": [
        "24 Round Mags",
        "30 Round Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
    {
      "Name": "M4A1",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15"
      ],
      "Ammunition": [
        "50 Rounds Mags",
        "60 Round Mags",
        "9mm Para 32-Round Mags",
        ".458 Socom 10-Round Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
    {
      "Name": "FR 556",
      "Muzzle": [
        "Flash Guard",
        "Muzzle Brake",
        "Tactial Supressor",
        "Compensator",
        "Lightweight Supressor",
        "Monolithic Supressor"
      ],
      "Barrel": [
        "FR 15.9'' Commando",
        "FR 24.4'' Sniper",
        "FORGE TAC Ultralight"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "Operator Reflex Sight",
        "Corp Combat Halo Sight",
        "Aim-Op Reflex Sight",
        "Scout Combat Optic",
        "APX5 Holographic Sight",
        "Integral Hybrid",
        "Solozero Optics Mini Reflex",
        "VLK 3.0x Optic",
        "4.0x Flip Hybrid",
        "Viper Reflex Sight",
        "PBX Holo 7 Sight",
        "Solozero NVG Enhanced",
        "Sniper Scope",
        "Cronen LP945 Mini Reflex",
        "Monocle Reflex Sight",
        "Cronen C480 Pro Optic",
        "G.I. Mini Reflex",
        "Variable Zoom Scope",
        "Thermal Hybrid",
        "Merc Thermal Optic",
        "Canted Hybrid"
      ],
      "Stock": [
        "FR UltraLight Hallow",
        "FORGE TAC Ballast Pack",
        "FFS Tac-Wrap"
      ],
      "Underbarrel": [
        "Commando Foregrip",
        "M203 Smokescreen",
        "M203 Incendiary",
        "Merc Foregrip",
        "M203 High-explosive",
        "m203 Concussive",
        "Tactial Foregrip",
        "Bipod",
        "M203 Flash",
        "12 Gauge Deputy",
        "Operator Foregrip",
        "M204 Recon",
        "Ranger Foregrip"
      ],
      "Ammunition": [
        "50 Rounds Mags",
        "60 Round Mags"
      ],
      "Rear Grip": [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "Recon",
        "Heavy Hitter",
        "Frangible Wounding",
        "Fully Loaded",
        "Fast Melee",
        "Mo' Money",
        "FMJ",
        "Slight of Hand",
        "Frangible Disabling",
        "Presence of Mind"
      ]
    },
    {
      "Name": "ODEN",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "5mW Laser",
        "1mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
      ],
      "Ammunition": [
        "25 Rounds Mags",
        "30 Round Mags"
      ],
      "Rear Grip": [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
    {
      "Name": "M13",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "Tac Laser",
        "5mW Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
      ],
      "Ammunition": [
        "50 Rounds Mags",
        ".300 Blackout 30-Round Mags",
        "60 Round Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
    {
      "Name": "FN Scar 17",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ],
      "Ammunition": [
        "25 Rounds Mags",
        "30 Round Mags"
      ],
      "Rear Grip": [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "Ak-47",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
      ],
      "Ammunition": [
        "40 Rounds Mags",
        "5.45x39mm 30-Round Mags",
        "75 Round Drum Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ]
    },
    {
      "Name": "AUG",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Ammunition": [
        "32 Rounds Mags",
        "5.56 NATO 30-Round Mags",
        "5.56 NATO 60-Round Drums"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"

      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ]
    },
    {
      "Name": "P90",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ],
      "Ammunition": [],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "MP5",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Ammunition": [
        "45 Rounds Mags",
        "10mm Auto 30-Round Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
      ]
    },
    {
      "Name": "UZI",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Ammunition": [
        "40 Rounds Mags",
        "50 Round Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "PP19 Bizon",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2"
      ],
      "Laser": [
        "Tac Laser",
        "1mW Laser",
        "5mW Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [],
      "Ammunition": [
        "84 Round Helical Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "MP7",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Ammunition": [
        "50 Rounds Mags",
        "60 Round Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "Model 680",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Ammunition": [
        "Tube Extension",
        "Slug Rounds"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ]
    },
    {
      "Name": "R9-0 Shotgun",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ],
      "Barrel": [
        "1",
        "2"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14"
      ],
      "Stock": [
        "Pump - FFS R9-0 Bulldog",
        "FTAC Ultralight Pump",
        "FTAC Close Quarters Pro"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3"
      ],
      "Ammunition": [
        "Tube Extension",
        "Slug Rounds"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "725",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "Ammunition": [
        "Slug Rounds"
      ],
      "Rear Grip": [
        "Tempus SlimGrip",
        "FORGE TAC Steady Grip",
        "FORGE TAC Commander"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "Origin 12 Shotgun",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2"
      ],
      "Ammunition": [
        "12 Rounds Mags",
        "8 Rounds Slugs Mags",
        "25 Rounds Drum Mags"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Ribberized Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "PKM",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Ammunition": [
        "150 Round Belt",
        "200 Round Belt"
      ],
      "Rear Grip": [
        "Stippled Grip Tape",
        "Ribberized Grip Tape",
        "Granulated Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "SA87",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "5mW Laser",
        "1mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Ammunition": [
        "50 Rounds Mags",
        "60 Rounds Mags"
      ],
      "Rear Grip": [
        "Ribberized Grip Tape",
        "Granulated Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "M91",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "1mW Laser",
        "5mW Laser",
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Ammunition": [
        "120 Round Belt",
        "150 Round Belt"
      ],
      "Rear Grip": [
        "Granulated Grip Tape",
        "Stippled Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
    {
      "Name": "MG34",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "Tac Laser",
        "5mW Laser",
        "1mW Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Ammunition": [
        "75 Round Belt",
        "100 Round Belt"
      ],
      "Rear Grip": [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ]
    },
   {
      "Name": "EBR-14",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Ammunition": [
        "15 Round Mags",
        "20 Round Mags"
      ],
      "Rear Grip": [],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
   {
      "Name": "MK2 Carbine",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "Ammunition": [],
      "Rear Grip": [
        "Ribberized Grip Tape",
        "Stippled Grip Tape",
        "Granulated Grip Tape"

      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
   {
      "Name": "Kar98",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1"
      ],
      "Ammunition": [],
      "Rear Grip": [
        "Stippled Grip Tape",
        "Granulated Grip Tape",
        "Ribberized Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
   {
      "Name": "Dargunov",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2"
      ],
      "Laser": [
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1"
      ],
      "Ammunition": [
        "15 Round Mags",
        "20 Round Mags"
      ],
      "Rear Grip": [],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
   {
      "Name": "HDR",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Stock": [
        "1",
        "2",
        "3",
        "4"
      ],
      "Underbarrel": [
        "1"
      ],
      "Ammunition": [
        "7 Round Mags",
        "9 Round Mags"
      ],
      "Rear Grip": [],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
   {
      "Name": "AX-50",
      "Muzzle": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Barrel": [
        "1",
        "2",
        "3"
      ],
      "Laser": [
        "Tac Laser"
      ],
      "Optic": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7"
      ],
      "Stock": [
        "1",
        "2",
        "3"
      ],
      "Underbarrel": [
        "1"
      ],
      "Ammunition": [
        "7 Round Mags"
      ],
      "Rear Grip": [
        "Ribberized Grip Tape",
        "Granulated Grip Tape",
        "Stippled Grip Tape"
      ],
      "Perk": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11"
      ]
    },
   {
      "Name": "Riot Shield",
      "Muzzle": [],
      "Barrel": [],
      "Laser": [],
      "Optic": [],
      "Stock": [],
      "Underbarrel": [],
      "Ammunition": [],
      "Rear Grip": [],
      "Perk": []
    }
  ]
};