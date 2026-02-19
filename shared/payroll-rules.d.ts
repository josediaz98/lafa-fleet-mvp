// Type declarations for shared/payroll-rules.js

// --- Constants ---
export const BASE_SALARY: number;
export const GOAL_THRESHOLD: number;
export const SUPPORT_AMOUNT: number;
export const PRODUCTIVITY_UNIT: number;
export const PRODUCTIVITY_BONUS_PER_UNIT: number;
export const OVERTIME_THRESHOLD_HOURS: number;
export const OVERTIME_RATE_PER_HOUR: number;
export const OVERTIME_CAP_HOURS: number;
export const WORKING_DAYS_PER_WEEK: number;

// --- Functions ---
export function formatMXN(amount: number): string;
export function countWeekdays(start: Date, end: Date): number;
export function prorateThresholds(
  driverStartDate: string,
  weekStartDate: Date,
  weekEndDate: Date,
): { hoursThreshold: number; revenueThreshold: number };
export function computeProductivityBonus(
  totalBilled: number,
  revenueThreshold: number,
  goalMet: boolean,
): number;
export function computeOvertimePay(
  hoursWorked: number,
  goalMet: boolean,
  previousWeekHours: number,
): number;
export function isTripInWeek(
  tripDate: string,
  tripStartTime: string,
  weekStart: string,
  weekEnd: string,
): boolean;

export interface ExplanationInput {
  driverName: string;
  hoursWorked: number;
  totalBilled: number;
  hoursThreshold: number;
  revenueThreshold: number;
  goalMet: boolean;
  productivityBonus: number;
  overtimePay: number;
  totalPay: number;
}
export function generateExplanation(record: ExplanationInput): string;
