/**
 * Reusable form validation utilities
 */

// ─────────────────────────────────────────────────────────────
// Basic validators
// ─────────────────────────────────────────────────────────────

export function isRequired(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && value.trim().length > 0;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isMinLength(value: string, min: number): boolean {
  return value.length >= min;
}

// ─────────────────────────────────────────────────────────────
// Vehicle form validation
// ─────────────────────────────────────────────────────────────

export interface VehicleFormData {
  plate: string;
  model: string;
  oem: string;
  centerId: string;
}

export function validateVehicleForm(
  form: VehicleFormData,
  existingPlates: string[],
  currentPlate?: string
): string | null {
  if (!isRequired(form.plate) || !isRequired(form.model) || !isRequired(form.oem) || !isRequired(form.centerId)) {
    return 'Todos los campos son obligatorios.';
  }

  const normalizedPlate = form.plate.trim().toLowerCase();
  const isDuplicate = existingPlates.some(p => {
    const existing = p.toLowerCase();
    return existing === normalizedPlate && existing !== currentPlate?.toLowerCase();
  });

  if (isDuplicate) {
    return 'Ya existe un vehículo con esa placa.';
  }

  return null;
}

// ─────────────────────────────────────────────────────────────
// Domain validators
// ─────────────────────────────────────────────────────────────

export function isLafaEmail(email: string): boolean {
  return email.trim().toLowerCase().endsWith('@lafa-mx.com');
}

// ─────────────────────────────────────────────────────────────
// User form validation
// ─────────────────────────────────────────────────────────────

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  centerId: string;
}

export interface UserRecord {
  id: string;
  email: string;
  role: string;
  status: string;
  centerId: string | null;
}

export function validateUserCreate(
  form: UserFormData,
  users: UserRecord[],
): string | null {
  if (!isRequired(form.name) || !isRequired(form.email)) {
    return 'Nombre y email son obligatorios.';
  }
  if (!isValidEmail(form.email)) {
    return 'Formato de email inválido.';
  }
  // TODO: re-enable for production
  // if (!isLafaEmail(form.email)) {
  //   return 'Solo correos @lafa-mx.com permitidos.';
  // }

  const emailExists = users.some(u => u.email.toLowerCase() === form.email.trim().toLowerCase());
  if (emailExists) {
    return 'Ya existe un usuario con ese email.';
  }

  if (form.role === 'supervisor') {
    const supervisorExists = users.some(
      u => u.role === 'supervisor' && u.status === 'activo' && u.centerId === form.centerId
    );
    if (supervisorExists) {
      return 'Ya existe un supervisor activo en ese centro.';
    }
  }

  return null;
}

export function validateUserEdit(
  form: UserFormData,
  users: UserRecord[],
  currentUserId: string
): string | null {
  if (!isRequired(form.name) || !isRequired(form.email)) {
    return 'Nombre y email son obligatorios.';
  }

  if (!isValidEmail(form.email)) {
    return 'Formato de email inválido.';
  }

  const emailExists = users.some(
    u => u.email.toLowerCase() === form.email.trim().toLowerCase() && u.id !== currentUserId
  );
  if (emailExists) {
    return 'Ya existe otro usuario con ese email.';
  }

  if (form.role === 'supervisor') {
    const supervisorExists = users.some(
      u => u.id !== currentUserId && u.role === 'supervisor' && u.status === 'activo' && u.centerId === form.centerId
    );
    if (supervisorExists) {
      return 'Ya existe un supervisor activo en ese centro.';
    }
  }

  return null;
}

// ─────────────────────────────────────────────────────────────
// Driver form validation
// ─────────────────────────────────────────────────────────────

export interface DriverFormData {
  fullName: string;
  didiDriverId: string;
  centerId: string;
  defaultShift?: string;
  startDate?: string;
}

export function validateDriverCreate(
  form: DriverFormData,
  existingDidiIds: number[]
): string | null {
  if (!isRequired(form.fullName) || !isRequired(form.didiDriverId) || !isRequired(form.centerId)) {
    return 'Todos los campos son obligatorios.';
  }

  const didiId = parseInt(form.didiDriverId, 10);
  if (isNaN(didiId)) {
    return 'DiDi ID debe ser un número válido.';
  }

  if (existingDidiIds.includes(didiId)) {
    return 'Ya existe un conductor con ese DiDi ID.';
  }

  return null;
}

export function validateDriverEdit(form: DriverFormData): string | null {
  if (!isRequired(form.fullName)) {
    return 'Nombre es obligatorio.';
  }

  return null;
}
