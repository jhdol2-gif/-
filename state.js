const state = {
  gold: 50,

  seeds: {
    상추: { price: 5, grow: 2000 },
    부추: { price: 10, grow: 2500 },
    얼갈이: { price: 15, grow: 3000 },
    열무: { price: 20, grow: 3500 },
    쑥갓: { price: 25, grow: 4000 }
  },

  farm: Array(9).fill(null),

  storage: {
    상추: 0,
    부추: 0,
    얼갈이: 0,
    열무: 0,
    쑥갓: 0
  }
};
