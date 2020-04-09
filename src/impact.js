import getProjectedInfections, { resolveToDays } from './helpers';

export default function impactEstimator(inputData) {
  const output = {};

  // Challenge 1 [START]
  output.currentlyInfected = inputData.reportedCases * 10;

  output.infectionsByRequestedTime = getProjectedInfections(
    inputData.timeToElapse,
    inputData.periodType,
    output.currentlyInfected
  );
  // Challenge 1 [END]

  // Challenge 2 [START]
  output.severeCasesByRequestedTime = Math.trunc(
    0.15 * output.infectionsByRequestedTime
  );

  const bedsAvailable = Math.trunc(0.35 * inputData.totalHospitalBeds);

  output.hospitalBedsByRequestedTime = Math.trunc(
    bedsAvailable - output.severeCasesByRequestedTime
  );
  // Challenge 2 [END]

  // Challenge 3 [START]
  output.casesForICUByRequestedTime = Math.trunc(
    0.05 * output.infectionsByRequestedTime
  );

  output.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * output.infectionsByRequestedTime
  );

  output.dollarsInFlight = (
    output.infectionsByRequestedTime *
    inputData.region.avgDailyIncomePopulation *
    inputData.region.avgDailyIncomeInUSD *
    resolveToDays(inputData.periodType, inputData.timeToElapse)
  ).toFixed(2);
  // Challenge 3 [END]

  return output;
}
