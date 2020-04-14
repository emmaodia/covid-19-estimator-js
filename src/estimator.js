import impactCalculator from './calculator/impact';
import severeImpactCalculator from './calculator/severe-impact';

const covid19ImpactEstimator = (data) => {
  const impact = impactCalculator(data); // best-case estimation
  const severeImpact = severeImpactCalculator(data);// severe-case estimation

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
