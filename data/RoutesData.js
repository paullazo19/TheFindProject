export default [
  {
    uuid: 11111,
    label: {
      building: "testBuilding1",
      floor: 1,
      room: "testRoom1"
    },
    route: [
      //this route should contain 5 steps, right turn, 3 steps, and a right turn
      {
        value: 1,
        heading: 225
      },
      {
        value: 1,
        heading: 225
      },
      {
        value: 1,
        heading: 225
      },
      {
        value: 1,
        heading: 225
      },
      {
        value: 1,
        heading: 285
      },
      {
        value: 1,
        heading: 285
      },
      {
        value: 1,
        heading: 285
      },
      {
        value: 1,
        heading: 15
      }
    ]
  },
  {
    uuid: 11112,
    label: {
      building: "testBuilding2",
      floor: 2,
      room: "testRoom2"
    },
    route: [
      //this route should contain 5 steps, right turn, 3 steps, and a right turn
      {
        value: 1,
        heading: 325
      },
      {
        value: 1,
        heading: 325
      },
      {
        value: 1,
        heading: 325
      },
      {
        value: 1,
        heading: 325
      },
      {
        value: 1,
        heading: 25
      },
      {
        value: 1,
        heading: 25
      },
      {
        value: 1,
        heading: 25
      },
      {
        value: 1,
        heading: 115
      }
    ]
  }
];
