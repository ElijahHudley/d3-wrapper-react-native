import moment from 'moment';

const donutData = {
  savingsScore: [
    { name: 'savingsScore', value: (Math.random() * (100 - 20) + 20) },
    { name: 'savingsScore', value: (Math.random() * (100 - 20) + 20) },
  ],
  flexibleScore: [
    { name: 'flexibleScore', value: (Math.random() * (100 - 20) + 20) },
    { name: 'flexibleScore', value: (Math.random() * (100 - 20) + 20) },
  ],
  fixedScore: [
    { name: 'fixedScore', value: (Math.random() * (100 - 20) + 20) },
    { name: 'fixedScore', value: (Math.random() * (100 - 20) + 20) },
  ],
};

const data = {
  actual: [{
    x: '2018-07-01',
    y: 0,
    data: {
      date: '2018-07-01',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-02',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-02',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-03',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-03',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-04',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-04',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-05',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-05',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-06',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-06',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-07',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-07',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-08',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-08',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-09',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-09',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-10',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-10',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-11',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-11',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-12',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-12',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-13',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-13',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-14',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-14',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-15',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-15',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-16',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-16',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-17',
    y: Math.random() * (2500 - 2000) + 2000,
    data: {
      date: '2018-07-17',
      amount: 0,
      cumulativeTotal: 0,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-18',
    y: 1200,
    data: {
      date: '2018-07-18',
      amount: 5.24,
      cumulativeTotal: 5.24,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-19',
    y: 1460.27,
    data: {
      date: '2018-07-19',
      amount: 1455.03,
      cumulativeTotal: 1460.27,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-20',
    y: 2063.87,
    data: {
      date: '2018-07-20',
      amount: 603.6,
      cumulativeTotal: 2063.87,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-21',
    y: 2332.03,
    data: {
      date: '2018-07-21',
      amount: 268.16,
      cumulativeTotal: 2332.03,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-22',
    y: 2512.27,
    data: {
      date: '2018-07-22',
      amount: 180.24,
      cumulativeTotal: 2512.27,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-23',
    y: 2512.27,
    data: {
      date: '2018-07-23',
      amount: 0,
      cumulativeTotal: 2512.27,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-24',
    y: 2512.27,
    data: {
      date: '2018-07-24',
      amount: 0,
      cumulativeTotal: 2512.27,
      type: 'ACTUAL',
    },
  },
  {
    x: '2018-07-25',
    y: 2512.27,
    data: {
      date: '2018-07-25',
      amount: 0,
      cumulativeTotal: 2512.27,
      type: 'ACTUAL',
    },
  }],
  projected: [{
    x: '2018-07-26',
    y: 2512.27,
    data: {
      date: '2018-07-26',
      amount: 77,
      cumulativeTotal: 2512.27,
      type: 'PROJECTED',
    },
  },
  {
    x: '2018-07-27',
    y: 2586.27,
    data: {
      date: '2018-07-27',
      amount: 74,
      cumulativeTotal: 2586.27,
      type: 'PROJECTED',
    },
  },
  {
    x: '2018-07-28',
    y: 2657.27,
    data: {
      date: '2018-07-28',
      amount: 71,
      cumulativeTotal: 2657.27,
      type: 'PROJECTED',
    },
  },
  {
    x: '2018-07-29',
    y: 2726.27,
    data: {
      date: '2018-07-29',
      amount: 69,
      cumulativeTotal: 2726.27,
      type: 'PROJECTED',
    },
  },
  {
    x: '2018-07-30',
    y: 2792.27,
    data: {
      date: '2018-07-30',
      amount: 66,
      cumulativeTotal: 2792.27,
      type: 'PROJECTED',
    },
  },
  {
    x: '2018-07-31',
    y: 2856.27,
    data: {
      date: '2018-07-31',
      amount: 64,
      cumulativeTotal: 2856.27,
      type: 'PROJECTED',
    },
  },
  {
    x: '2018-08-01',
    y: 3056.27,
    data: {
      date: '2018-07-31',
      amount: 64,
      cumulativeTotal: 2856.27,
      type: 'PROJECTED',
    },
  },
  {
    x: '2018-08-02',
    y: 3156.27,
    data: {
      date: '2018-07-31',
      amount: 64,
      cumulativeTotal: 2856.27,
      type: 'PROJECTED',
    },
  },
  {
    x: '2018-08-03',
    y: 3456.27,
    data: {
      date: '2018-07-31',
      amount: 64,
      cumulativeTotal: 2856.27,
      type: 'PROJECTED',
    },
  },
  {
    x: '2018-08-04',
    y: 3606.27,
    data: {
      date: '2018-07-31',
      amount: 64,
      cumulativeTotal: 2856.27,
      type: 'PROJECTED',
    },
  }],
};


export default {
  actual: data.actual.map((item, index) => ({
    x: moment(item.x).toDate(),
    y: item.y,
    data: item.data,
  })),
  projected: data.projected.map((item, index) => ({
    x: moment(item.x).toDate(),
    y: item.y,
    data: item.data,
  })),
  donutData,
};

