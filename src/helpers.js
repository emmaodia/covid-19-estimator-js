const CURRENTLY_INFECTED_FACTOR = 10;
const CURRENTLY_INFECTED_SEVERE_FACTOR = 50;

const getTimeElapsedInDays = (duration, quantity) => {
  switch (quantity) {
    case 'weeks':
    case 'week':
      return duration * 7;

    case 'months':
    case 'month':
      return duration * 30;

    case 'days':
    case 'day':
    default:
      return duration;
  }
};

const getCurrentEstimatedInfections = (cases, severe) => {
  const factor = severe ? CURRENTLY_INFECTED_SEVERE_FACTOR : CURRENTLY_INFECTED_FACTOR;

  return cases * factor;
};

const getSevereCasesByRequestedTime = (infections) => infections * 0.15;

const getTotalAvailableBeds = (totalBeds, cases) => (totalBeds * 0.35) - cases;

const getCasesForICUByRequestedTime = (infections) => (infections * 0.05);

const getCasesForVentilatorsByRequestedTime = (infections) => (infections * 0.02);

const getLossToEconomy = (infections, population, income, days) => {
  const amount = (infections * population * income) / days;
  return amount;
};

export default {
  getCurrentEstimatedInfections,
  getTimeElapsedInDays,
  getSevereCasesByRequestedTime,
  getTotalAvailableBeds,
  getCasesForICUByRequestedTime,
  getCasesForVentilatorsByRequestedTime,
  getLossToEconomy
};
