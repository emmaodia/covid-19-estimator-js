import Helpers from './helpers';

const calculateEstimatedInfectionsByDays = (currentInfections, days) => {
  const incrementFactor = Math.floor(days / 3);
  return currentInfections * (2 ** incrementFactor);
};

const formatDataForResponse = (data) => parseInt(data, 10);

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = Helpers.getCurrentEstimatedInfections(
    data.reportedCases
  );
  const currentlyInfectedSevere = Helpers.getCurrentEstimatedInfections(
    data.reportedCases,
    true
  );

  const numberOfDays = Helpers.getTimeElapsedInDays(
    data.timeToElapse,
    data.periodType
  );

  const infectionsByRequestedTime = calculateEstimatedInfectionsByDays(
    currentlyInfected,
    numberOfDays
  );
  const infectionsByRequestedTimeSevere = calculateEstimatedInfectionsByDays(
    currentlyInfectedSevere,
    numberOfDays
  );

  let severeCasesByRequestedTime = Helpers.getSevereCasesByRequestedTime(
    infectionsByRequestedTime
  );
  severeCasesByRequestedTime = Math.floor(severeCasesByRequestedTime);
  let severeCasesByRequestedTimeSevere = Helpers.getSevereCasesByRequestedTime(
    infectionsByRequestedTimeSevere
  );
  severeCasesByRequestedTimeSevere = Math.floor(
    severeCasesByRequestedTimeSevere
  );

  const hospitalBedsByRequestedTime = Helpers.getTotalAvailableBeds(
    data.totalHospitalBeds,
    severeCasesByRequestedTime
  );

  const hospitalBedsByRequestedTimeSevere = Helpers.getTotalAvailableBeds(
    data.totalHospitalBeds,
    severeCasesByRequestedTimeSevere
  );

  const casesForICUByRequestedTime = Helpers.getCasesForICUByRequestedTime(
    infectionsByRequestedTime
  );
  const casesForICUByRequestedTimeSevere = Helpers.getCasesForICUByRequestedTime(
    infectionsByRequestedTimeSevere
  );

  const casesForVentilatorsByRequestedTime = Helpers.getCasesForVentilatorsByRequestedTime(
    infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTimeSevere = Helpers.getCasesForVentilatorsByRequestedTime(
    infectionsByRequestedTimeSevere
  );

  const dollarsInFlight = Helpers.getLossToEconomy(
    infectionsByRequestedTime,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    numberOfDays
  );

  const dollarsInFlightSevere = Helpers.getLossToEconomy(
    infectionsByRequestedTimeSevere,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    numberOfDays
  );

  const response = {
    data,
    impact: {
      currentlyInfected: formatDataForResponse(currentlyInfected),
      infectionsByRequestedTime: formatDataForResponse(infectionsByRequestedTime),
      severeCasesByRequestedTime: formatDataForResponse(severeCasesByRequestedTime),
      hospitalBedsByRequestedTime: parseInt(hospitalBedsByRequestedTime, 10),
      casesForICUByRequestedTime: formatDataForResponse(casesForICUByRequestedTime),
      casesForVentilatorsByRequestedTime: formatDataForResponse(
        casesForVentilatorsByRequestedTime
      ),
      dollarsInFlight: formatDataForResponse(dollarsInFlight)
    },
    severeImpact: {
      currentlyInfected: formatDataForResponse(currentlyInfectedSevere),
      infectionsByRequestedTime: formatDataForResponse(infectionsByRequestedTimeSevere),
      severeCasesByRequestedTime: formatDataForResponse(severeCasesByRequestedTimeSevere),
      hospitalBedsByRequestedTime: parseInt(hospitalBedsByRequestedTimeSevere, 10),
      casesForICUByRequestedTime: formatDataForResponse(casesForICUByRequestedTimeSevere),
      casesForVentilatorsByRequestedTime: formatDataForResponse(
        casesForVentilatorsByRequestedTimeSevere
      ),
      dollarsInFlight: formatDataForResponse(dollarsInFlightSevere)
    }
  };

  return response;
};

export default covid19ImpactEstimator;
