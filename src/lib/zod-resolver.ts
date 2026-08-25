import type { FieldValues, Resolver } from 'react-hook-form'
import type { ZodType } from 'zod'

/**
 * Minimal zod resolver for react-hook-form.
 *
 * This replaces @hookform/resolvers, which was removed deliberately.
 *
 * That package exists to bridge a dozen validation libraries (yup, joi, ajv,
 * superstruct, vest and others) and declares peer dependencies for all of
 * them, including `ajv ^8.12.0`. We use exactly one of those bridges. The ajv
 * peer resolved inconsistently between npm versions and broke `npm ci` on the
 * deploy runner while passing locally, which is a poor trade for code we can
 * write in twenty lines and fully understand.
 *
 * Behaviour matches what the form needs: on success return the parsed values,
 * on failure return the first issue per field path in react-hook-form's shape.
 */
export function zodResolver<T extends FieldValues>(schema: ZodType<T>): Resolver<T> {
  return async (values) => {
    const parsed = schema.safeParse(values)

    if (parsed.success) {
      return { values: parsed.data, errors: {} }
    }

    const errors: Record<string, { type: string; message: string }> = {}
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.')
      // First issue per field wins, which is what the UI shows.
      if (path && !errors[path]) {
        errors[path] = { type: issue.code ?? 'validation', message: issue.message }
      }
    }

    return { values: {}, errors } as ReturnType<Resolver<T>>
  }
}
