export interface StudentUser {
  email: string;
  fullName: string;
  /** Demo only — not secure; replace with real auth in production */
  password: string;
}
