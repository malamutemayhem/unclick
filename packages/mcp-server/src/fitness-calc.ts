export function bmi(weightKg: number, heightM: number): number {
  if (heightM <= 0) return 0;
  return round1(weightKg / (heightM * heightM));
}

export function bmiCategory(bmiValue: number): string {
  if (bmiValue < 18.5) return "underweight";
  if (bmiValue < 25) return "normal";
  if (bmiValue < 30) return "overweight";
  return "obese";
}

export function bmr(weightKg: number, heightCm: number, age: number, sex: "male" | "female"): number {
  if (sex === "male") {
    return round1(88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age);
  }
  return round1(447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age);
}

export function tdee(bmrValue: number, activityLevel: "sedentary" | "light" | "moderate" | "active" | "veryActive"): number {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };
  return round1(bmrValue * multipliers[activityLevel]);
}

export function caloriesForGoal(tdeeValue: number, goal: "lose" | "maintain" | "gain"): number {
  const adjustments = { lose: -500, maintain: 0, gain: 500 };
  return Math.round(tdeeValue + adjustments[goal]);
}

export function macroSplit(
  calories: number,
  proteinPct = 0.30,
  carbPct = 0.40,
  fatPct = 0.30
): { proteinG: number; carbG: number; fatG: number } {
  return {
    proteinG: Math.round(calories * proteinPct / 4),
    carbG: Math.round(calories * carbPct / 4),
    fatG: Math.round(calories * fatPct / 9),
  };
}

export function oneRepMax(weight: number, reps: number): number {
  if (reps <= 0) return 0;
  if (reps === 1) return weight;
  return round1(weight * (1 + reps / 30));
}

export function trainingMax(oneRM: number, percentage = 0.9): number {
  return round1(oneRM * percentage);
}

export function percentOfMax(oneRM: number, percent: number): number {
  return round1(oneRM * percent / 100);
}

export function heartRateZones(maxHR: number): { zone: string; min: number; max: number }[] {
  return [
    { zone: "Recovery", min: Math.round(maxHR * 0.5), max: Math.round(maxHR * 0.6) },
    { zone: "Endurance", min: Math.round(maxHR * 0.6), max: Math.round(maxHR * 0.7) },
    { zone: "Aerobic", min: Math.round(maxHR * 0.7), max: Math.round(maxHR * 0.8) },
    { zone: "Threshold", min: Math.round(maxHR * 0.8), max: Math.round(maxHR * 0.9) },
    { zone: "Maximum", min: Math.round(maxHR * 0.9), max: maxHR },
  ];
}

export function maxHeartRate(age: number): number {
  return 220 - age;
}

export function caloriesBurned(met: number, weightKg: number, durationHours: number): number {
  return Math.round(met * weightKg * durationHours);
}

export function paceToSpeed(minutesPerKm: number): number {
  if (minutesPerKm <= 0) return 0;
  return round1(60 / minutesPerKm);
}

export function speedToPace(kmPerHour: number): number {
  if (kmPerHour <= 0) return 0;
  return round1(60 / kmPerHour);
}

export function bodyFatNavy(
  sex: "male" | "female",
  waistCm: number,
  neckCm: number,
  heightCm: number,
  hipCm = 0
): number {
  if (sex === "male") {
    return round1(
      495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450
    );
  }
  return round1(
    495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450
  );
}

export function idealWeight(heightCm: number, sex: "male" | "female"): { min: number; max: number } {
  const heightM = heightCm / 100;
  return {
    min: round1(18.5 * heightM * heightM),
    max: round1(24.9 * heightM * heightM),
  };
}

export function waterIntake(weightKg: number): number {
  return round1(weightKg * 0.033);
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export const MET_VALUES: Record<string, number> = {
  walking: 3.5,
  jogging: 7.0,
  running: 9.8,
  cycling: 7.5,
  swimming: 8.0,
  weightTraining: 6.0,
  yoga: 2.5,
  hiit: 12.0,
  rowing: 7.0,
  jumpRope: 12.3,
};
