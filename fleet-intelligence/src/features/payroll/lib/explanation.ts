// Re-export generateExplanation from shared payroll rules (single source of truth).
// Frontend modules import from here; the shared module owns the implementation.
export { generateExplanation } from '@shared/payroll-rules';
