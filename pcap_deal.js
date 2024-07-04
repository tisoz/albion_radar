globalThis['item_list'] ||= {};
globalThis['monster_list'] ||= {};
globalThis['player_list'] ||= {};
globalThis['white_player_list'] ||= [];
globalThis['dungeon_list'] ||= {};
globalThis['chest_list'] ||= {};
globalThis['temp_list'] ||= {};
globalThis['local_player_position'] ||= {current_postion: [0, 0]}
globalThis['current_map'] ||= {
    '@rareresourcedistribution': "",
    "@type": ""
}
globalThis['white_road'] = []
globalThis['black_road'] = []
globalThis['temp_road'] = []
globalThis['log_info'] = {}
globalThis['web_host'] = "http://game.tisoz.com"
globalThis['local_player_center_postion'] = [0, 0]

monster_list = {
    "174068": {
        "id": 174068,
        "type": 1488,
        "position": [
            -271.96820068359375,
            -88.26066589355469
        ],
        "quality": 0,
        "hp": 492,
        "hp_max": 492,
        "obj": {
            "0": 174068,
            "1": 1488,
            "2": 255,
            "6": "",
            "7": [
                -271.96820068359375,
                -88.26066589355469
            ],
            "8": [
                -271.96820068359375,
                -88.26066589355469
            ],
            "9": 82026392,
            "11": 2.25,
            "13": 492,
            "14": 492,
            "17": 81978542,
            "18": 442,
            "19": 442,
            "21": 13,
            "22": 82026388,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Ghoul",
        "in_container": false
    },
    "175123": {
        "id": "175123",
        "type": 1488,
        "position": [
            -260.3829650878906,
            -135.89964294433594
        ],
        "quality": 0,
        "hp": 492,
        "hp_max": 492,
        "obj": {
            "0": 175123,
            "1": 1488,
            "2": 255,
            "6": "",
            "7": [
                -252.87799072265625,
                -128.10121154785156
            ],
            "8": [
                -252.87799072265625,
                -128.10121154785156
            ],
            "9": 82021753,
            "10": 47.7201042175293,
            "11": 2.25,
            "13": 492,
            "14": 492,
            "17": 81677913,
            "18": 442,
            "19": 442,
            "21": 13,
            "22": 82021720,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Ghoul",
        "in_container": false
    },
    "176083": {
        "id": "176083",
        "type": 1560,
        "position": [
            -255.7606964111328,
            -136.334716796875
        ],
        "quality": 0,
        "hp": 1106,
        "hp_max": 1106,
        "obj": {
            "0": 176083,
            "1": 1560,
            "2": 255,
            "6": "",
            "7": [
                -255.52886962890625,
                -134.26585388183594
            ],
            "8": [
                -257.28009033203125,
                -135.75242614746094
            ],
            "9": 82029582,
            "10": 232.85189819335938,
            "11": 7.5,
            "12": 183847,
            "13": 1106,
            "14": 1106,
            "17": 81666761,
            "18": 490,
            "19": 490,
            "21": 15,
            "22": 82029567,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Frostweaver",
        "in_container": false
    },
    "176929": {
        "id": "176929",
        "type": 391,
        "position": [
            -262.1329040527344,
            -151.64706420898438
        ],
        "quality": 0,
        "hp": 1113,
        "hp_max": 1113,
        "obj": {
            "0": 176929,
            "1": 391,
            "2": 255,
            "6": "",
            "7": [
                -253.54055786132812,
                -151.23670959472656
            ],
            "8": [
                -253.54055786132812,
                -151.23670959472656
            ],
            "9": 82017697,
            "10": 16.728593826293945,
            "11": 3.200000047683716,
            "13": 1113,
            "14": 1113,
            "17": 81978423,
            "18": 367,
            "19": 367,
            "21": 11,
            "22": 82017695,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Hyena",
        "resource": "HIDE",
        "level": "6",
        "res_id": "T6_HIDE.png",
        "res_type": "HIDE"
    },
    "180029": {
        "id": "180029",
        "type": 1560,
        "position": [
            -340.96282958984375,
            -109.83936309814453
        ],
        "quality": 0,
        "hp": 1106,
        "hp_max": 1106,
        "obj": {
            "0": 180029,
            "1": 1560,
            "2": 255,
            "6": "",
            "7": [
                -339.7393798828125,
                -109.42303466796875
            ],
            "8": [
                -339.6144714355469,
                -108.22935485839844
            ],
            "9": 82025080,
            "10": 5.973080158233643,
            "11": 1.5,
            "13": 1106,
            "14": 1106,
            "17": 81751093,
            "18": 490,
            "19": 490,
            "21": 15,
            "22": 82025067,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Frostweaver",
        "in_container": false
    },
    "180317": {
        "id": "180317",
        "type": 391,
        "position": [
            -335.0703430175781,
            -115.78904724121094
        ],
        "quality": 0,
        "hp": 1113,
        "hp_max": 1113,
        "obj": {
            "0": 180317,
            "1": 391,
            "2": 255,
            "6": "",
            "7": [
                -333.35626220703125,
                -115.61808776855469
            ],
            "8": [
                -333.35626220703125,
                -115.61808776855469
            ],
            "9": 82023796,
            "10": 106.12124633789062,
            "11": 3.200000047683716,
            "13": 1113,
            "14": 1113,
            "17": 81778901,
            "18": 367,
            "19": 367,
            "21": 11,
            "22": 82023786,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Hyena",
        "resource": "HIDE",
        "level": "6",
        "res_id": "T6_HIDE.png",
        "res_type": "HIDE"
    },
    "181676": {
        "id": "181676",
        "type": 391,
        "position": [
            -312.12841796875,
            -89.3725357055664
        ],
        "quality": 0,
        "hp": 1113,
        "hp_max": 1113,
        "obj": {
            "0": 181676,
            "1": 391,
            "2": 255,
            "6": "",
            "7": [
                -312.12841796875,
                -89.3725357055664
            ],
            "8": [
                -312.12841796875,
                -89.3725357055664
            ],
            "9": 82026392,
            "10": 210.62376403808594,
            "11": 3.200000047683716,
            "13": 1113,
            "14": 1113,
            "17": 81882554,
            "18": 367,
            "19": 367,
            "21": 11,
            "22": 82026372,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Hyena",
        "resource": "HIDE",
        "level": "6",
        "res_id": "T6_HIDE.png",
        "res_type": "HIDE"
    },
    "182045": {
        "id": "182045",
        "type": 1479,
        "position": [
            -270.31988525390625,
            -129.64060974121094
        ],
        "quality": 0,
        "hp": 615,
        "hp_max": 615,
        "obj": {
            "0": 182045,
            "1": 1479,
            "2": 255,
            "6": "",
            "7": [
                -270.1892395019531,
                -128.11172485351562
            ],
            "8": [
                -270.1892395019531,
                -128.11172485351562
            ],
            "9": 82021753,
            "10": 11.982354164123535,
            "11": 1,
            "13": 615,
            "14": 615,
            "17": 81808394,
            "18": 353,
            "19": 353,
            "21": 11,
            "22": 82021667,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Feeble Frostweaver",
        "in_container": false
    },
    "183759": {
        "id": "183759",
        "type": 1497,
        "position": [
            -268.2034606933594,
            -92.05513763427734
        ],
        "quality": 0,
        "hp": 1414,
        "hp_max": 1414,
        "obj": {
            "0": 183759,
            "1": 1497,
            "2": 255,
            "6": "",
            "7": [
                -267.49993896484375,
                -90.14607238769531
            ],
            "8": [
                -267.49993896484375,
                -90.14607238769531
            ],
            "9": 82026392,
            "10": 38.738121032714844,
            "11": 1.5,
            "13": 1414,
            "14": 1414,
            "17": 81977015,
            "18": 383,
            "19": 383,
            "21": 11,
            "22": 82026379,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Revenant",
        "in_container": false
    },
    "183944": {
        "id": 183944,
        "type": 1569,
        "position": [
            -311.0462341308594,
            -119.05927276611328
        ],
        "quality": 0,
        "hp_max": 2212,
        "obj": {
            "0": 183944,
            "1": 1569,
            "2": 255,
            "6": "",
            "7": [
                -311.0462341308594,
                -119.05927276611328
            ],
            "8": [
                -311.0462341308594,
                -119.05927276611328
            ],
            "9": 82023254,
            "10": 60.3850212097168,
            "11": 7.5,
            "12": 183614,
            "13": 1027,
            "14": 2212,
            "17": 81888736,
            "18": 519,
            "19": 588,
            "21": 18,
            "22": 82023236,
            "30": 0,
            "33": 0,
            "252": 122
        },
        "uni_id": "monster.png",
        "name": "Dominant Frostweaver",
        "in_container": false
    }
}

item_list = {
    "1352": {
        "id": 1352,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -36.5,
            -49.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1353": {
        "id": 1353,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -73.5,
            -170.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1361": {
        "id": 1361,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -178.5,
            -84.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1365": {
        "id": 1365,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -173.5,
            -179.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1375": {
        "id": 1375,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -346.5,
            -106.5
        ],
        "count": 4,
        "uni_id": "T7_FIBER"
    },
    "1378": {
        "id": 1378,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -81.5,
            -176.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1385": {
        "id": 1385,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -165.5,
            -178.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1386": {
        "id": 1386,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -166.5,
            -166.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1387": {
        "id": 1387,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -82.5,
            -162.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1389": {
        "id": 1389,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -175.5,
            -80.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1394": {
        "id": 1394,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -151.5,
            -148.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1399": {
        "id": 1399,
        "type": 12,
        "level": 7,
        "quality": 1,
        "position": [
            161.5,
            13.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER_LEVEL1@1"
    },
    "1400": {
        "id": 1400,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -74.5,
            -91.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1405": {
        "id": 1405,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -150.5,
            -126.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1409": {
        "id": 1409,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -111.5,
            -81.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1417": {
        "id": 1417,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -96.5,
            -79.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1419": {
        "id": 1419,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -48.5,
            -113.5
        ],
        "count": 7,
        "uni_id": "T7_FIBER"
    },
    "1420": {
        "id": 1420,
        "type": 12,
        "level": 7,
        "quality": 0,
        "position": [
            -340.5,
            -103.5
        ],
        "count": 0,
        "uni_id": "T7_FIBER"
    },
    "1422": {
        "id": 1422,
        "type": 12,
        "level": 7,
        "quality": 1,
        "position": [
            -150.5,
            -146.5
        ],
        "count": 4,
        "uni_id": "T7_FIBER_LEVEL1@1"
    },
    "1446": {
        "id": 1446,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -51.5,
            -48.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER"
    },
    "1462": {
        "id": 1462,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -327.5,
            -72.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER"
    },
    "1463": {
        "id": 1463,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -197.5,
            -112.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER"
    },
    "1464": {
        "id": 1464,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -166.5,
            -110.5
        ],
        "count": 2,
        "uni_id": "T6_FIBER"
    },
    "1465": {
        "id": 1465,
        "type": 12,
        "level": 6,
        "quality": 1,
        "position": [
            -138.5,
            -173.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER_LEVEL1@1"
    },
    "1468": {
        "id": 1468,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -318.5,
            -76.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER"
    },
    "1471": {
        "id": 1471,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -73.5,
            -216.5
        ],
        "count": 2,
        "uni_id": "T6_FIBER"
    },
    "1472": {
        "id": 1472,
        "type": 12,
        "level": 6,
        "quality": 2,
        "position": [
            -222.5,
            -137.5
        ],
        "count": 3,
        "uni_id": "T6_FIBER_LEVEL2@2"
    },
    "1476": {
        "id": 1476,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -316.5,
            -210.5
        ],
        "count": 2,
        "uni_id": "T6_FIBER"
    },
    "1483": {
        "id": 1483,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -211.5,
            -98.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER"
    },
    "1487": {
        "id": 1487,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -178.5,
            -159.5
        ],
        "count": 2,
        "uni_id": "T6_FIBER"
    },
    "1488": {
        "id": 1488,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -198.5,
            -165.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER"
    },
    "1491": {
        "id": 1491,
        "type": 12,
        "level": 6,
        "quality": 1,
        "position": [
            -136.5,
            -98.5
        ],
        "count": 3,
        "uni_id": "T6_FIBER_LEVEL1@1"
    },
    "1497": {
        "id": 1497,
        "type": 12,
        "level": 6,
        "quality": 2,
        "position": [
            -129.5,
            -214.5
        ],
        "count": 0,
        "uni_id": "T6_FIBER_LEVEL2@2"
    },
    "1500": {
        "id": 1500,
        "type": 12,
        "level": 6,
        "quality": 1,
        "position": [
            67.5,
            -114.5
        ],
        "count": 2,
        "uni_id": "T6_FIBER_LEVEL1@1"
    },
    "1502": {
        "id": 1502,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            58.5,
            -37.5
        ],
        "count": 0,
        "uni_id": "T6_FIBER"
    },
    "1506": {
        "id": 1506,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -328.5,
            -239.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER"
    },
    "1513": {
        "id": 1513,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -259.5,
            -241.5
        ],
        "count": 2,
        "uni_id": "T6_FIBER"
    },
    "1524": {
        "id": 1524,
        "type": 12,
        "level": 6,
        "quality": 1,
        "position": [
            -126.5,
            -209.5
        ],
        "count": 2,
        "uni_id": "T6_FIBER_LEVEL1@1"
    },
    "1528": {
        "id": 1528,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -103.5,
            -223.5
        ],
        "count": 2,
        "uni_id": "T6_FIBER"
    },
    "1535": {
        "id": 1535,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -254.5,
            -188.5
        ],
        "count": 0,
        "uni_id": "T6_FIBER"
    },
    "1542": {
        "id": 1542,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -196.5,
            -66.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER"
    },
    "1556": {
        "id": 1556,
        "type": 12,
        "level": 6,
        "quality": 0,
        "position": [
            -268.5,
            -182.5
        ],
        "count": 1,
        "uni_id": "T6_FIBER"
    },
    "1893": {
        "id": 1893,
        "type": 23,
        "level": 7,
        "quality": 2,
        "position": [
            -33,
            -106
        ],
        "count": 0,
        "uni_id": "T7_ORE_LEVEL2@2"
    },
    "1896": {
        "id": 1896,
        "type": 23,
        "level": 7,
        "quality": 0,
        "position": [
            -145,
            -88
        ],
        "count": 0,
        "uni_id": "T7_ORE"
    },
    "1906": {
        "id": 1906,
        "type": 23,
        "level": 7,
        "quality": 1,
        "position": [
            -318,
            -131
        ],
        "count": 0,
        "uni_id": "T7_ORE_LEVEL1@1"
    },
    "1909": {
        "id": 1909,
        "type": 23,
        "level": 7,
        "quality": 0,
        "position": [
            129,
            63
        ],
        "count": 4,
        "uni_id": "T7_ORE"
    },
    "1914": {
        "id": 1914,
        "type": 23,
        "level": 7,
        "quality": 0,
        "position": [
            -319,
            -138
        ],
        "count": 0,
        "uni_id": "T7_ORE"
    },
    "1920": {
        "id": 1920,
        "quality": 0,
        "count": 6,
        "uni_id": "UNIQUE_HIDEOUT"
    },
    "1921": {
        "id": 1921,
        "type": 23,
        "level": 7,
        "quality": 0,
        "position": [
            -130,
            -132
        ],
        "count": 0,
        "uni_id": "T7_ORE"
    },
    "1929": {
        "id": 1929,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            -43,
            -108
        ],
        "count": 1,
        "uni_id": "T6_ORE"
    },
    "1932": {
        "id": 1932,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            -103,
            -139
        ],
        "count": 1,
        "uni_id": "T6_ORE"
    },
    "1935": {
        "id": 1935,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            -89,
            -44
        ],
        "count": 5,
        "uni_id": "T6_ORE"
    },
    "1943": {
        "id": 1943,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            -179,
            -129
        ],
        "count": 2,
        "uni_id": "T6_ORE"
    },
    "1944": {
        "id": 1944,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            21,
            -30
        ],
        "count": 0,
        "uni_id": "T6_ORE"
    },
    "1945": {
        "id": 1945,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            -100,
            -193
        ],
        "count": 3,
        "uni_id": "T6_ORE"
    },
    "1956": {
        "id": 1956,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            -260,
            -231
        ],
        "count": 2,
        "uni_id": "T6_ORE"
    },
    "1960": {
        "id": 1960,
        "type": 23,
        "level": 6,
        "quality": 1,
        "position": [
            102,
            61
        ],
        "count": 1,
        "uni_id": "T6_ORE_LEVEL1@1"
    },
    "1967": {
        "id": 1967,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            -131,
            -177
        ],
        "count": 5,
        "uni_id": "T6_ORE"
    },
    "1968": {
        "id": 1968,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            42,
            -50
        ],
        "count": 5,
        "uni_id": "T6_ORE"
    },
    "1969": {
        "id": 1969,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            -249,
            -237
        ],
        "count": 2,
        "uni_id": "T6_ORE"
    },
    "1982": {
        "id": 1982,
        "type": 23,
        "level": 6,
        "quality": 0,
        "position": [
            -160,
            -242
        ],
        "count": 2,
        "uni_id": "T6_ORE"
    },
    "2401": {
        "id": 2401,
        "type": 12,
        "level": 5,
        "quality": 0,
        "position": [
            -223.5,
            -199.5
        ],
        "count": 5,
        "uni_id": "T5_FIBER"
    },
    "2407": {
        "id": 2407,
        "type": 12,
        "level": 5,
        "quality": 0,
        "position": [
            -220.5,
            -158.5
        ],
        "count": 5,
        "uni_id": "T5_FIBER"
    },
    "2409": {
        "id": 2409,
        "type": 12,
        "level": 5,
        "quality": 0,
        "position": [
            -218.5,
            -164.5
        ],
        "count": 5,
        "uni_id": "T5_FIBER"
    },
    "2410": {
        "id": 2410,
        "type": 12,
        "level": 5,
        "quality": 0,
        "position": [
            -319.5,
            -113.5
        ],
        "count": 5,
        "uni_id": "T5_FIBER"
    },
    "2418": {
        "id": 2418,
        "type": 12,
        "level": 5,
        "quality": 0,
        "position": [
            -101.5,
            -248.5
        ],
        "count": 4,
        "uni_id": "T5_FIBER"
    },
    "2420": {
        "id": 2420,
        "type": 12,
        "level": 5,
        "quality": 0,
        "position": [
            -309.5,
            -176.5
        ],
        "count": 5,
        "uni_id": "T5_FIBER"
    },
    "2433": {
        "id": 2433,
        "type": 12,
        "level": 5,
        "quality": 0,
        "position": [
            -235.5,
            -162.5
        ],
        "count": 5,
        "uni_id": "T5_FIBER"
    },
    "2446": {
        "id": 2446,
        "type": 12,
        "level": 5,
        "quality": 0,
        "position": [
            -70.5,
            -69.5
        ],
        "count": 5,
        "uni_id": "T5_FIBER"
    },
    "2451": {
        "id": 2451,
        "type": 12,
        "level": 5,
        "quality": 0,
        "position": [
            -98.5,
            -263.5
        ],
        "count": 4,
        "uni_id": "T5_FIBER"
    },
    "2552": {
        "id": 2552,
        "type": 23,
        "level": 5,
        "quality": 0,
        "position": [
            -210,
            -116
        ],
        "count": 5,
        "uni_id": "T5_ORE"
    },
    "2553": {
        "id": 2553,
        "type": 23,
        "level": 5,
        "quality": 0,
        "position": [
            -291,
            -209
        ],
        "count": 3,
        "uni_id": "T5_ORE"
    },
    "2558": {
        "id": 2558,
        "type": 23,
        "level": 5,
        "quality": 0,
        "position": [
            -280,
            -143
        ],
        "count": 1,
        "uni_id": "T5_ORE"
    },
    "2578": {
        "id": 2578,
        "type": 23,
        "level": 5,
        "quality": 1,
        "position": [
            -149,
            -232
        ],
        "count": 5,
        "uni_id": "T5_ORE_LEVEL1@1",
        "in_container_index": "2578",
        "in_container": true
    },
    "177823": {
        "id": 177823,
        "type": 17,
        "level": 5,
        "quality": 1,
        "position": [
            -56.053260803222656,
            -56.11292266845703
        ],
        "count": 2,
        "uni_id": "T5_HIDE_LEVEL1@1",
        "in_container_index": "177823",
        "in_container": true
    },
    "177914": {
        "id": 177914,
        "type": 17,
        "level": 6,
        "quality": 0,
        "position": [
            88.43192291259766,
            -104.77600860595703
        ],
        "count": 2,
        "uni_id": "T6_HIDE"
    },
    "179046": {
        "id": 179046,
        "type": 17,
        "level": 6,
        "quality": 0,
        "position": [
            -121.162841796875,
            -213.9169158935547
        ],
        "count": 0,
        "uni_id": "T6_HIDE"
    },
    "183379": {
        "id": 183379,
        "type": 17,
        "level": 6,
        "quality": 0,
        "position": [
            -53.5248908996582,
            -43.30531311035156
        ],
        "count": 1,
        "uni_id": "T6_HIDE"
    },
    "184090": {
        "id": 184090,
        "type": 17,
        "level": 5,
        "quality": 2,
        "position": [
            -178.44427490234375,
            -212.14756774902344
        ],
        "count": 0,
        "uni_id": "T5_HIDE_LEVEL2@2"
    },
    "184148": {
        "id": 184148,
        "type": 17,
        "level": 5,
        "quality": 0,
        "position": [
            -226.89111328125,
            -159.8461151123047
        ],
        "count": 5,
        "uni_id": "T5_HIDE"
    },
    "184192": {
        "id": 184192,
        "type": 17,
        "level": 1,
        "quality": 0,
        "position": [
            -319.3671569824219,
            -158.65789794921875
        ],
        "count": 2,
        "uni_id": "T1_HIDE"
    },
    "184206": {
        "id": 184206,
        "type": 17,
        "level": 6,
        "quality": 0,
        "position": [
            -316.6854248046875,
            -161.4865264892578
        ],
        "count": 3,
        "uni_id": "T6_HIDE"
    },
    "184274": {
        "id": 184274,
        "type": 17,
        "level": 1,
        "quality": 0,
        "position": [
            -240.36843872070312,
            -209.3745880126953
        ],
        "count": 2,
        "resource_type": "hide",
        "uni_id": "T1_HIDE"
    },
    "184286": {
        "id": 184286,
        "type": 17,
        "level": 1,
        "quality": 0,
        "position": [
            -207.75778198242188,
            -217.94297790527344
        ],
        "count": 2,
        "uni_id": "T1_HIDE"
    }
}

function findall(regex, text) {
    let arr = [...text.matchAll(regex)]
    arr = Array.from(arr, x => x[arr[0].length - 1])
    return arr;
}

function check_point(point) {
    let result = false;
    for (let i of white_road) {
        if (Math.abs(point[0] - i[0]) > 5) continue
        if (Math.abs(point[1] - i[1]) > 5) continue
        result = true
    }
    for (let i of black_road) {
        if (Math.abs(point[0] - i[0]) > 6) continue
        if (Math.abs(point[1] - i[1]) > 6) continue
        result = true
    }
    // 返回true代表周围存在近距离点位
    return result
}

function del_range_point(point, meter) {
    let temp = []
    for (let index in white_road) {
        let i = white_road[index]
        if (Math.abs(point[0] - i[0]) > meter) continue
        if (Math.abs(point[1] - i[1]) > meter) continue
        temp.push(index);
    }
    temp.reverse()
    for (let index of temp) {
        let item = white_road[index];
        let hashid = item.toString().replaceAll("-", "").replaceAll(",", "").replaceAll(".", "").substring(1, 10);
        // container.removeChild(container.getChildByName(hashid))
        white_road.splice(index, 1)
    }
}

function get_speed(temp) {
    let base = temp[0] || [0, 0];
    let speed = 0;
    for (let i of temp) {
        let dist = Math.sqrt(Math.pow(i[0] - base[0], 2) + Math.pow(i[1] - base[1], 2));
        speed += dist
        base = i;
    }
    return (speed / (temp.length - 1) * 10).toFixed(4)
}

function rotatePoint(x1, y1, angle) {
    const radians = (Math.PI / 180) * angle;
    const cosTheta = Math.cos(radians);
    const sinTheta = Math.sin(radians);

    const x2 = x1 * cosTheta - y1 * sinTheta;
    const y2 = x1 * sinTheta + y1 * cosTheta;

    return [x2, y2];
}

function monster_load(data) {
    if (data['hp'] && data['hp'] >= 11 && data['hp'] <= 100) return
    let mob_left = 14;
    globalThis['monster_list'][data['id']] ||= {};
    data = Object.assign(globalThis['monster_list'][data['id']], data);
    data['uni_id'] = "monster.png";
    data['name'] = mobs_list[data['type'] - mob_left]['@namelocatag'] || `@MOB_${mobs_list[data['type'] - mob_left]['@uniquename']}` || ""; //英文串
    if (data['name'].indexOf("BOSS") + 1) data['quality'] = 1;
    data['name'] = name_tag_list[data['name']]
    switch (data['name']) {
        case lan_data['solo_wisp']:
            data['uni_id'] = "mist_mob.png"
            break
        case lan_data['duo_wisp']:
            data['uni_id'] = "mist_mob.png"
            break
        case lan_data['avalon_robot']:
            data['quality'] = 3;
            break
        case lan_data['roming_chest']:
            data['quality'] = 3;
            break
        case lan_data['anniversary_place']:
            data['quality'] = 3;
            break
        case lan_data['egg']:
            data['uni_id'] = "egg.png";
            data['quality'] = 4;
            break
        case lan_data['might_spider']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['mist_dragon']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['mist_spider']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['mist_griffin']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['soldier_boss']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
        case lan_data['personal_spider']:
            data['uni_id'] = "spider_boss.png";
            data['quality'] = 4;
            break
    }
    if (mobs_list[data['type'] - mob_left]['Loot'] && mobs_list[data['type'] - mob_left]['Loot']['LootListReference']) {
        if (mobs_list[data['type'] - mob_left]['Loot']['LootListReference'] instanceof Array)
            for (let i of mobs_list[data['type'] - mob_left]['Loot']['LootListReference']) {
                if (i['@name'].indexOf("DIRECTLOOTDROP_GATHERER") + 1) {
                    let name = findall(/T(\d)_DIRECTLOOTDROP_GATHERER_(\S+)/g, i['@name'])[0]
                    let level = findall(/T(\d)_DIRECTLOOTDR/g, i['@name'])[0]

                    data['resource'] = name;
                    data['level'] = level;
                    data['res_id'] = `T${data['level']}_${data['resource']}_LEVEL${data['quality']}@${data['quality']}`;
                    data['res_id'] = data['res_id'].replaceAll("_LEVEL0@0", "") + ".png";
                    data['res_type'] = name;
                    data['resource_type'] = name.toLowerCase()
                    switch (name) {
                        case "WOOD":
                            name = lan_data['wood'];
                            break
                        case "ORE":
                            name = lan_data['mineral'];
                            break
                        case "HIDE":
                            name = lan_data['leather'];
                            break
                        case "FIBER":
                            name = lan_data['cotton'];
                            break
                        case "ROCK":
                            name = lan_data['stone'];
                            break
                    }
                    data['resource'] = name;
                }
            }
    }

    globalThis['monster_list'][data['id']] = Object.assign(globalThis['monster_list'][data['id']], data);

}

try {
    ipcRenderer.on("local_player_position", (event, data) => {
        // console.log(data['current_postion'])
        temp_road.push(data['current_postion'])
        // 判断是否发生漏载数据位移
        if (Math.sqrt(Math.pow(local_player_position['current_postion'][0] - data['current_postion'][0], 2) + Math.pow(local_player_position['current_postion'][1] - data['current_postion'][1], 2)) > 20) {
            if (new Date().getTime() - current_map['update_time'] > 10) {
                globalThis['local_player_position'] = {current_postion: [0, 0]}
                globalThis['clear_data'] = true
            }
        }
        data['speed'] = get_speed(temp_road)
        if (temp_road.length > 5) {
            temp_road.shift()
            // if (data['speed'] < 1) {
            //     let point = local_player_position['current_postion']
            //     del_range_point(point, 6);
            //     if (!check_point(data['current_postion'])) {
            //         black_road.push(data['current_postion'])
            //         let temp_text = new PIXI.Text(`*`, {
            //             fontFamily: 'JetBrainsMono-Bold',
            //             fontSize: 14,
            //             fill: "red",
            //         });
            //         temp_text.anchor.set(0.5);
            //         temp_text.scale.x = 1 / 5
            //         temp_text.scale.y = 1 / 5
            //         temp_text.position.set(-data['current_postion'][0], data['current_postion'][1])
            //         temp_text.name = point.toString().replaceAll("-", "").replaceAll(",", "").replaceAll(".", "").substring(1, 10)
            //         // temp_text.x = ;
            //         // container.addChild(temp_text)
            //     }
            // }
        }
        globalThis['local_player_position'] = data;
        globalThis['local_player_center_postion'] = rotatePoint(data['current_postion'][0], -data['current_postion'][1], 135)
        // if (!check_point(data['current_postion'])) {
        //     white_road.push(data['current_postion'])
        //     let temp_text = new PIXI.Text(`*`, {
        //         fontFamily: 'JetBrainsMono-Bold',
        //         fontSize: 14,
        //         fill: "green",
        //     });
        //     temp_text.anchor.set(0.5);
        //     temp_text.scale.x = 1 / 5
        //     temp_text.scale.y = 1 / 5
        //     temp_text.position.set(-data['current_postion'][0], data['current_postion'][1])
        //     temp_text.name = data['current_postion'].toString().replaceAll("-", "").replaceAll(",", "").replaceAll(".", "").substring(1, 10)
        //     // temp_text.x = ;
        //     // container.addChild(temp_text)
        // }
    })
    ipcRenderer.on("monster_load", (event, data) => {
        monster_load(data)
    })
    ipcRenderer.on("other_player_load", (event, data) => {

        // this.id = data[0];        //物资ID
        // this.name = data[1];        //名称
        // this.hp = data[19]
        // this.hp_max = data[20]
        // this.lp = data[23]
        // this.lp_max = data[24]
        // this.position = data[13];  //玩家位置
        // this.backpack = data[34]  //玩家装备
        console.log(data.id, data)
        globalThis.config ||= {}
        globalThis['player_list'][data['id']] ||= {};
        data = Object.assign(globalThis['player_list'][data['id']], data);
        data['uni_id'] = "player_green.png"
        if (!data['name']) return
        switch (data['obj'][46]) {
            case 255:
                data['uni_id'] = "player_red.png"
                break;
            default:
                data['uni_id'] = "player_green.png";
                break;
        }
        if (current_map && current_map['@rareresourcedistribution']) {
            let temp = `${current_map['@rareresourcedistribution']}${current_map['@type']}${current_map['@id']}`
            if (temp.indexOf("RED") + 1
                || temp.indexOf("OUT") + 1
                || temp.indexOf("BLACK") + 1
                || temp.indexOf("RED") + 1) {
                data['uni_id'] = "player_red.png";
            }
        }
        if (data['mounted'] && config['filter_show_player_in_danger_show_green']) {
            data['uni_id'] = "player_green.png";
        }
        if (globalThis['white_player_list'].indexOf(data['name']) + 1) data['uni_id'] = "player_green.png";

        globalThis['player_list'][data['id']] = Object.assign(globalThis['player_list'][data['id']], data);
    })
    ipcRenderer.on("move_event", (event, data) => {
        //怪物数据
        // let buffer = new ArrayBuffer(data['data'][1].length); // 创建一个长度为4个字节的缓冲区
        // let view = new DataView(buffer);
        //
        // for (let i = 0; i < data['data'][1].length; i++) {
        //     view.setUint8(i, data['data'][1][i]);
        // }
        // console.log(data.id, data) //sudu
        if (data.id in monster_list) {
            monster_list[data.id] = Object.assign(monster_list[data.id], data)
        }
        if (data.id in player_list) {
            player_list[data.id] = Object.assign(player_list[data.id], data)
        }
    })
    ipcRenderer.on("leave_event", (event, data) => {
        //怪物数据
        if (data.id in monster_list) {
            if (monster_list[data.id]['in_container']) {
                container.removeChild(container.getChildByName(data.id.toString()))
            }
            delete monster_list[data.id]
        }
        if (data.id in dungeon_list) {
            if (dungeon_list[data.id]['in_container']) {
                container.removeChild(container.getChildByName(data.id.toString()))
            }
            delete dungeon_list[data.id]
        }
        if (data.id in player_list) {
            if (player_list[data.id]['in_container']) {
                container.removeChild(container.getChildByName(data.id.toString()))
                backpack_container.removeChild(backpack_container.getChildByName(data.id.toString()))
            }
            delete player_list[data.id]
        }
        if (data.id in chest_list) {
            if (chest_list[data.id]['in_container']) {
                container.removeChild(container.getChildByName(data.id.toString()))
            }
            delete chest_list[data.id]
        }
        if (data.id in temp_list) {
            if (temp_list[data.id]['in_container']) {
                container.removeChild(container.getChildByName(data.id.toString()))
            }
            delete temp_list[data.id]
        }
    })
    ipcRenderer.on("course_item", (event, data) => {
        globalThis['item_list'][data['id']] ||= {};
        // console.log(data)
        data = Object.assign(globalThis['item_list'][data['id']], data);

        // 加载图片id
        switch (data['type']) {

            case 0:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 1:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 2:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 3:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 4:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 5:
                data['resource_type'] = "wood";
                data['uni_id'] = `T${data['level']}_WOOD_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 6:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 7:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 8:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 9:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 10:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 11:
                data['resource_type'] = "rock";
                data['uni_id'] = `T${data['level']}_ROCK_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 12:
                data['resource_type'] = "fiber";
                data['uni_id'] = `T${data['level']}_FIBER_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 13:
                data['resource_type'] = "fiber";
                data['uni_id'] = `T${data['level']}_FIBER_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 14:
                data['resource_type'] = "fiber";
                data['uni_id'] = `T${data['level']}_FIBER_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 15:
                data['resource_type'] = "fiber";
                data['uni_id'] = `T${data['level']}_FIBER_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 16:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 17:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 18:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 19:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 20:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 21:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 22:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 23:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 24:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 25:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 26:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 27:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 28:
                data['resource_type'] = "ore";
                data['uni_id'] = `T${data['level']}_ORE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            case 43:
                data['resource_type'] = "hide";
                data['uni_id'] = `T${data['level']}_HIDE_LEVEL${data['quality']}@${data['quality']}`;
                break;
            default:
                // console.log("type", data['type'])
                data['uni_id'] = "UNIQUE_HIDEOUT"
                break
        }
        data['uni_id'] = data['uni_id'].replaceAll("_LEVEL0@0", "");
        globalThis['item_list'][data['id']] = Object.assign(globalThis['item_list'][data['id']], data);

    })

    ipcRenderer.on("dungeon_load", (event, data) => {
        console.log(data)
        globalThis['dungeon_list'][data['id']] ||= {};
        data = Object.assign(globalThis['dungeon_list'][data['id']], data);
        if (data['quality'] === true) data['quality'] = 0;
        data['uni_id'] = `dungeon_${data['quality']}.png`
        if (data['obj']['8']) data['name'] = lan_data['corrupted']
        if (data['obj']['9']) data['name'] = lan_data['hellgate2v2']
        if (data['type'] === 2) data['name'] = lan_data['groupdungeon']
        if (data['type'] === 3732) data['name'] = lan_data['downhouse']
        if (data['obj']['17'] === 6) data['name'] = lan_data['downhouse']
        if (data['name'].indexOf("SOLO") + 1 && data['type'] === 1) data['name'] = lan_data['solodungeon'];
        globalThis['dungeon_list'][data['id']] = Object.assign(globalThis['dungeon_list'][data['id']], data);

    })
    ipcRenderer.on("club_load", (event, data) => {
        globalThis.club = data['club']
        globalThis.union = data['union']
        // club = "Sun Never Set"
    })
    ipcRenderer.on("friend_load", (event, data) => {
        for (let name of data['friend_list']) {
            if (white_player_list.indexOf(name) + 1) continue
            white_player_list.push(name)
        }
    })
    ipcRenderer.on("chest_load", (event, data) => {
        // console.log(data)
        globalThis['chest_list'][data['id']] ||= {};
        data = Object.assign(globalThis['chest_list'][data['id']], data);

        if (data['quality'] > 4) data['quality'] = 1;
        if (data['name'].indexOf("STANDARD") + 1) data['quality'] = 1;
        if (data['name'].indexOf("UNCOMMON") + 1) data['quality'] = 2;
        if (data['name'].indexOf("RARE") + 1) data['quality'] = 3;
        if (data['name'].indexOf("LEGENDARY") + 1) data['quality'] = 4;
        data['uni_id'] = `chest_${data['quality']}.png`

        globalThis['chest_list'][data['id']] = Object.assign(globalThis['chest_list'][data['id']], data);

    })

    ipcRenderer.on("cage_load", (event, data) => {
        // console.log(data)
        globalThis['temp_list'][data['id']] ||= {};
        data = Object.assign(globalThis['temp_list'][data['id']], data);

        if (data['name'].indexOf("FILL_CAGE") + 1) {
            data['uni_id'] = `heretic.png`;
            data['name'] = lan_data['mob_cage']
        }

        globalThis['temp_list'][data['id']] = Object.assign(globalThis['temp_list'][data['id']], data);

    })
    ipcRenderer.on("photo", (event, data) => {
        let info = JSON.parse(data)
        log_info[info['252']] ||= []
        if (log_info[info['252']].length === 0) console.log(info['252'], info)
        log_info[info['252']].push(info)
    })
    ipcRenderer.on("map_load", (event, data) => {
        globalThis['local_player_position'] = {current_postion: [0, 0]}

        if (data['id'] === current_map['@id']) return
        global.clear_data = true
        if (typeof data['id'] != "string") return
        if (data['id'].indexOf("MIST") + 1) {
            data['id'] = "MIST_" + data['type']
            current_map['@rareresourcedistribution'] = data['id']
        }
        temp_road = []
        // new Promise(function () {
        //     //     上传节点数据
        //     if (globalThis['current_map']['@id']) {
        //         let road_count = white_road.length
        //         let road_obj = {
        //             white_road: white_road,
        //             black_road: black_road
        //         }
        //         let road_data = JSON.stringify(road_obj);
        //         black_road = []
        //         white_road = []
        //         const formData = new FormData();
        //
        //         // 将数据添加到 FormData 对象中
        //         formData.append('id', globalThis['current_map']['@id']);
        //         formData.append('road_points', road_data);
        //         formData.append('road_count', road_count);
        //         fetch(web_host + '/api/set_road', {
        //             method: 'POST',
        //             body: formData,
        //             headers: {
        //                 "token": localStorage.getItem('token')
        //             }
        //         })
        //     }
        // })
        //
        // new Promise(function (resolve, reject) {
        //     //     获取节点数据
        //     if (data['id']) {
        //         fetch(web_host + '/api/get_road?id=' + encodeURIComponent(data['id']), {
        //             method: 'get',
        //             headers: {
        //                 "token": localStorage.getItem('token')
        //             }
        //
        //         })
        //             .then(response => response.json())
        //             .then(data => {
        //                 if (data == null) {
        //                     white_road = []
        //                     return
        //                 }
        //                 if (data['roadCount'] > 0) {
        //                     road_obj = JSON.parse(data['roadPoints'])
        //                     for (let item of road_obj['white_road']) {
        //                         white_road.push(item)
        //                         // temp_img.zIndex = item['quality']
        //                         // 创建数量文本
        //                         let temp_text = new PIXI.Text(`*`, {
        //                             fontFamily: 'JetBrainsMono-Bold',
        //                             fontSize: 14,
        //                             fill: "green",
        //                         });
        //                         temp_text.anchor.set(0.5);
        //                         temp_text.scale.x = 1 / 5
        //                         temp_text.scale.y = 1 / 5
        //                         temp_text.position.set(-item[0], item[1])
        //                         temp_text.name = item.toString().replaceAll("-", "").replaceAll(",", "").replaceAll(".", "").substring(1, 10)
        //                         // temp_text.x = ;
        //                         // container.addChild(temp_text)
        //                     }
        //                     for (let item of road_obj['black_road']) {
        //                         black_road.push(item)
        //
        //                         // temp_img.zIndex = item['quality']
        //                         // 创建数量文本
        //                         let temp_text = new PIXI.Text(`*`, {
        //                             fontFamily: 'JetBrainsMono-Bold',
        //                             fontSize: 14,
        //                             fill: "red",
        //                         });
        //                         temp_text.anchor.set(0.5);
        //                         temp_text.scale.x = 1 / 5
        //                         temp_text.scale.y = 1 / 5
        //                         temp_text.position.set(-item[0], item[1])
        //                         temp_text.name = item.toString().replaceAll("-", "").replaceAll(",", "").replaceAll(".", "").substring(1, 10)
        //                         // temp_text.x = ;
        //                         // container.addChild(temp_text)
        //                     }
        //                 }
        //             })
        //     }
        // })
        let new_map = world_list[data['id']] || {};
        new_map['@id'] ||= data['id']
        if (!new_map['@rareresourcedistribution']) new_map['@rareresourcedistribution'] = current_map['@rareresourcedistribution']
        if (!new_map['@type']) new_map['@type'] = current_map['@type']
        if (!new_map['@displayname']) new_map['@displayname'] = data['id']
        new_map['update_time'] = new Date().getTime()
        globalThis['current_map'] = new_map;

    })
} catch (e) {
    let formData = new FormData();
    formData.append('type', 3);
    formData.append('text', `pcap error ${e} ${e.stack}`);
    globalThis.update_time = new Date().getTime()
    fetch('http://game.tisoz.com/api/log', {
        method: 'POST',
        body: formData,
        headers: {
            "token": localStorage.getItem('token')
        }
    })
}
