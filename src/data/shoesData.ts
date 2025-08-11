type shoesDataType = {
  [key: string]: {
    brand: string;
    model: string;
    nameKr: string;
    priceKr: number;
    stat: {
      EDGING: number;
      "TOE-HOOK": number;
      "HEEL-HOOK": number;
      SMEARING: number;
      GRABBING: number;
    };
  };
};

const shoesData = {
  Butora_NewComet: {
    brand: "Butora",
    model: "NewComet",
    nameKr: "부토라 뉴코멧",
    priceKr: 87000,
    stat: {
      EDGING: 3,
      "TOE-HOOK": 3,
      "HEEL-HOOK": 2,
      SMEARING: 3,
      GRABBING: 2,
    },
  },
  Butora_Senegi: {
    brand: "Butora",
    model: "Senegi",
    nameKr: "부토라 새내기",
    priceKr: 79000,
    stat: {
      EDGING: 3,
      "TOE-HOOK": 2,
      "HEEL-HOOK": 1.5,
      SMEARING: 4,
      GRABBING: 2,
    },
  },
  Butora_Spider: {
    brand: "Butora",
    model: "Spider",
    nameKr: "부토라 스파이더",
    priceKr: 180000,
    stat: {
      EDGING: 4.5,
      "TOE-HOOK": 4.5,
      "HEEL-HOOK": 3.5,
      SMEARING: 4,
      GRABBING: 4.5,
    },
  },
  LaSportiva_Skwama: {
    brand: "LaSportiva",
    model: "Skwama",
    nameKr: "라스포르티바 스콰마",
    priceKr: 265000,
    stat: {
      EDGING: 4,
      "TOE-HOOK": 4.5,
      "HEEL-HOOK": 4.5,
      SMEARING: 5,
      GRABBING: 4,
    },
  },
  LaSportiva_SkwamaVegan: {
    brand: "LaSportiva",
    model: "SkwamaVegan",
    nameKr: "라스포르티바 스콰마 비건",
    priceKr: 265000,
    stat: {
      EDGING: 4,
      "TOE-HOOK": 4.5,
      "HEEL-HOOK": 4.5,
      SMEARING: 5,
      GRABBING: 4,
    },
  },
  LaSportiva_SolutionComp: {
    brand: "LaSportiva",
    model: "SolutionComp",
    nameKr: "라스포르티바 솔루션 콤프",
    priceKr: 275000,
    stat: {
      EDGING: 5,
      "TOE-HOOK": 5,
      "HEEL-HOOK": 5,
      SMEARING: 4.5,
      GRABBING: 4.5,
    },
  },
  LaSportiva_Theory: {
    brand: "LaSportiva",
    model: "Theory",
    nameKr: "라스포르티바 띠어리",
    priceKr: 270000,
    stat: {
      EDGING: 4,
      "TOE-HOOK": 5,
      "HEEL-HOOK": 5,
      SMEARING: 5,
      GRABBING: 4,
    },
  },
  MadRock_Drifter: {
    brand: "MadRock",
    model: "Drifter",
    nameKr: "매드락 드리프터",
    priceKr: 119000,
    stat: {
      EDGING: 3,
      "TOE-HOOK": 2,
      "HEEL-HOOK": 2.5,
      SMEARING: 3,
      GRABBING: 2,
    },
  },
  MadRock_DroneComp: {
    brand: "MadRock",
    model: "DroneComp",
    nameKr: "매드락 드론 콤프",
    priceKr: 169000,
    stat: {
      EDGING: 4,
      "TOE-HOOK": 5,
      "HEEL-HOOK": 3.5,
      SMEARING: 4.5,
      GRABBING: 4,
    },
  },
  MadRock_Rover: {
    brand: "MadRock",
    model: "Rover",
    nameKr: "매드락 로버",
    priceKr: 119000,
    stat: {
      EDGING: 4.5,
      "TOE-HOOK": 3.5,
      "HEEL-HOOK": 4,
      SMEARING: 3,
      GRABBING: 4,
    },
  },
  Scarpa_Drago: {
    brand: "Scarpa",
    model: "Drago",
    nameKr: "스카르파 드라고",
    priceKr: 260000,
    stat: {
      EDGING: 4,
      "TOE-HOOK": 5,
      "HEEL-HOOK": 4,
      SMEARING: 5,
      GRABBING: 5,
    },
  },
  Scarpa_DragoLV: {
    brand: "Scarpa",
    model: "DragoLV",
    nameKr: "스카르파 드라고 LV",
    priceKr: 260000,
    stat: {
      EDGING: 4,
      "TOE-HOOK": 5,
      "HEEL-HOOK": 4,
      SMEARING: 5,
      GRABBING: 5,
    },
  },
  Scarpa_Veloce: {
    brand: "Scarpa",
    model: "Veloce",
    nameKr: "스카르파 벨로체",
    priceKr: 210000,
    stat: {
      EDGING: 4,
      "TOE-HOOK": 4,
      "HEEL-HOOK": 3,
      SMEARING: 4,
      GRABBING: 2.5,
    },
  },
  Scarpa_InstinctVSR: {
    brand: "Scarpa",
    model: "InstinctVSR",
    nameKr: "스카르파 인스팅트 VSR",
    priceKr: 265000,
    stat: {
      EDGING: 5,
      "TOE-HOOK": 4.5,
      "HEEL-HOOK": 4.5,
      SMEARING: 4,
      GRABBING: 3.5,
    },
  },
  Tenaya_Indalo: {
    brand: "Tenaya",
    model: "Indalo",
    nameKr: "테나야 인달로",
    priceKr: 250000,
    stat: {
      EDGING: 4,
      "TOE-HOOK": 4.5,
      "HEEL-HOOK": 4,
      SMEARING: 3.5,
      GRABBING: 3.5,
    },
  },
  Tenaya_Oasi: {
    brand: "Tenaya",
    model: "Oasi",
    nameKr: "테나야 오아시",
    priceKr: 220000,
    stat: {
      EDGING: 4.5,
      "TOE-HOOK": 4,
      "HEEL-HOOK": 4,
      SMEARING: 4,
      GRABBING: 3.5,
    },
  },
  Tenaya_OasiLV: {
    brand: "Tenaya",
    model: "OasiLV",
    nameKr: "테나야 오아시 LV",
    priceKr: 220000,
    stat: {
      EDGING: 4.5,
      "TOE-HOOK": 4,
      "HEEL-HOOK": 4,
      SMEARING: 4,
      GRABBING: 3.5,
    },
  },
  Unparallel_Flagship: {
    brand: "Unparallel",
    model: "Flagship",
    nameKr: "언패러렐 플래그십",
    priceKr: 239000,
    stat: {
      EDGING: 4.5,
      "TOE-HOOK": 4.5,
      "HEEL-HOOK": 4.5,
      SMEARING: 4.5,
      GRABBING: 5,
    },
  },
  Unparallel_FlagshipPro: {
    brand: "Unparallel",
    model: "FlagshipPro",
    nameKr: "언패러렐 플래그십 프로",
    priceKr: 249000,
    stat: {
      EDGING: 5,
      "TOE-HOOK": 5,
      "HEEL-HOOK": 4,
      SMEARING: 4.5,
      GRABBING: 5,
    },
  },
  Unparallel_Qubit: {
    brand: "Unparallel",
    model: "Qubit",
    nameKr: "언패러렐 큐빗",
    priceKr: 239000,
    stat: {
      EDGING: 5,
      "TOE-HOOK": 5,
      "HEEL-HOOK": 4,
      SMEARING: 4.5,
      GRABBING: 4,
    },
  },
};

export default shoesData as shoesDataType;
export type { shoesDataType };
export const shoeNames = Object.keys(shoesData);
