import { z } from 'zod';

/**
 * Environment Variable Schema
 *
 * Why: This ensures the application fails fast during development or deployment
 * if required environment variables are missing or malformed.
 */
const envSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:3000'),
  VITE_APP_MODE: z.enum(['development', 'production', 'test']).default('development'),

  // CORE
  VITE_APP_NAME: z.string().default('Localization App'),

  // FEATURE FLAGS (Example)
  VITE_ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === 'true')
    .default(false),
});

// Validate the environment variables
const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;

/**
 * Type-safety for the global import.meta.env
 * We use interface merging to augment the existing Vite types.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
  interface ImportMetaEnv extends z.infer<typeof envSchema> {}
}
