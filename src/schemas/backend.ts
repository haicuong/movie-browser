import { z } from "zod";
import type { MovieListItem } from "@/types/movie";

export const authEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Please enter a valid email address"));

export const loginCredentialsSchema = z.object({
  email: authEmailSchema,
  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password must be at most 128 characters"),
});

export const registerCredentialsSchema = z.object({
  email: authEmailSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});

export const authUserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string(),
  createdAt: z.string(),
});

export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthCredentials = z.infer<typeof loginCredentialsSchema>;

export const backendFavoriteMovieSchema = z
  .object({
    tmdbId: z.number().int().positive(),
    title: z.string(),
    overview: z.string(),
    posterPath: z.string().nullable(),
  })
  .transform(
    (item): MovieListItem => ({
      id: item.tmdbId,
      title: item.title,
      overview: item.overview,
      poster_path: item.posterPath,
    }),
  );

export const backendFavoritesListSchema = z.array(backendFavoriteMovieSchema);

export const backendErrorEnvelopeSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});
