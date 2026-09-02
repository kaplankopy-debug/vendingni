import fs from "node:fs";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node internal/perry/metrics.mjs <economics-input.json>");
  process.exit(1);
}

const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const optionalNumber = (field) => {
  const value = input[field];
  if (value === null || value === undefined) return null;
  if (!Number.isFinite(value) || value < 0) throw new Error(`${field} must be null or a non-negative number`);
  return value;
};

const visitors = optionalNumber("visitors");
const enquiries = optionalNumber("enquiries");
const wonPlacements = optionalNumber("wonPlacements");
const realisedCommission = optionalNumber("realisedCommission");
const annualisedCommissionRunRate = optionalNumber("annualisedCommissionRunRate");
const grossMarginRate = optionalNumber("grossMarginRate");
const targetAcquisitionShare = optionalNumber("targetAcquisitionShare");
for (const [field, value] of [["grossMarginRate", grossMarginRate], ["targetAcquisitionShare", targetAcquisitionShare]]) {
  if (value !== null && value > 1) throw new Error(`${field} must be between 0 and 1`);
}

const divide = (numerator, denominator) => numerator === null || denominator === null || denominator === 0 ? null : numerator / denominator;
const realisedValuePerVisitor = divide(realisedCommission, visitors);
const realisedValuePerEnquiry = divide(realisedCommission, enquiries);
const annualisedValuePerWonPlacement = divide(annualisedCommissionRunRate, wonPlacements);

let allowableAcquisitionCostPerVisitor = null;
if (annualisedCommissionRunRate !== null && grossMarginRate !== null && targetAcquisitionShare !== null) {
  allowableAcquisitionCostPerVisitor = divide(
    annualisedCommissionRunRate * grossMarginRate * targetAcquisitionShare,
    visitors
  );
}

console.log(JSON.stringify({
  period: input.period ?? null,
  currency: input.currency ?? "GBP",
  enquiryConversionRate: divide(enquiries, visitors),
  placementConversionRate: divide(wonPlacements, enquiries),
  realisedValuePerVisitor,
  realisedValuePerEnquiry,
  annualisedValuePerWonPlacement,
  allowableAcquisitionCostPerVisitor,
  notes: allowableAcquisitionCostPerVisitor === null
    ? "Allowable acquisition cost remains null until annualised commission, gross margin rate and an approved acquisition share are supplied."
    : "A planning ceiling, not a bid recommendation. Reconfirm with sufficient realised data before paid acquisition."
}, null, 2));
