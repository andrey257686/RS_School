const figures = [
  {
    name: "Camel",
    description: "Верблюд",
    size: "easy",
    up: {
      rows: 1,
      cols: 5,
      nums: [[4, 3, 4, 1, 1]],
    },
    left: {
      rows: 5,
      cols: 2,
      nums: [
        [null, 1],
        [3, 1],
        [null, 4],
        [1, 1],
        [1, 1],
      ],
    },
    table: [
      [0, 1, 0, 0, 0],
      [1, 1, 1, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0],
    ],
  },

  {
    name: "Dino",
    description: "Динозавр",
    size: "easy",
    up: {
      rows: 1,
      cols: 5,
      nums: [[1, 3, 2, 5, 1]],
    },
    left: {
      rows: 5,
      cols: 2,
      nums: [
        [null, 2],
        [null, 1],
        [null, 3],
        [null, 3],
        [2, 1],
      ],
    },
    table: [
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 0],
    ],
  },

  {
    name: "Heart",
    description: "Сердечко",
    size: "easy",
    up: {
      rows: 1,
      cols: 5,
      nums: [[2, 4, 4, 4, 2]],
    },
    left: {
      rows: 5,
      cols: 2,
      nums: [
        [1, 1],
        [null, 5],
        [null, 5],
        [null, 3],
        [null, 1],
      ],
    },
    table: [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
  },

  {
    name: "Cat",
    description: "Кошка",
    size: "easy",
    up: {
      rows: 2,
      cols: 5,
      nums: [
        [null, null, null, null, 3],
        [3, 3, 5, 4, 1],
      ],
    },
    left: {
      rows: 5,
      cols: 2,
      nums: [
        [1, 1],
        [null, 3],
        [null, 5],
        [null, 4],
        [null, 5],
      ],
    },
    table: [
      [0, 0, 1, 0, 1],
      [0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
    ],
  },

  {
    name: "Clock",
    description: "Часы",
    size: "easy",
    up: {
      rows: 3,
      cols: 5,
      nums: [
        [null, null, null, 1, null],
        [null, 1, 3, 1, null],
        [3, 1, 1, 1, 3],
      ],
    },
    left: {
      rows: 5,
      cols: 3,
      nums: [
        [null, null, 3],
        [1, 1, 1],
        [null, 1, 3],
        [null, 1, 1],
        [null, null, 3],
      ],
    },
    table: [
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ],
  },
];

export default figures;
