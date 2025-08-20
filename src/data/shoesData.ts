type shoesDataType = {
  [key: string]: {
    brand: string;
    brandKr: string;
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
    brandKr: "부토라",
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
    brandKr: "부토라",
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
    brandKr: "부토라",
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
    brandKr: "라스포르티바",
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
    brandKr: "라스포르티바",
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
    brandKr: "라스포르티바",
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
    brandKr: "라스포르티바",
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
    brandKr: "매드락",
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
    brandKr: "매드락",
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
    brandKr: "매드락",
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
    brandKr: "스카르파",
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
    brandKr: "스카르파",
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
    brandKr: "스카르파",
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
    brandKr: "스카르파",
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
    brandKr: "테나야",
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
    brandKr: "테나야",
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
    brandKr: "테나야",
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
    brandKr: "언패러렐",
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
    brandKr: "언패러렐",
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
    brandKr: "언패러렐",
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
export const brandList = Array.from(
  new Map(
    Object.values(shoesData).map((shoe) => [
      shoe.brand,
      { brand: shoe.brand, brandKr: shoe.brandKr },
    ]),
  ).values(),
);
