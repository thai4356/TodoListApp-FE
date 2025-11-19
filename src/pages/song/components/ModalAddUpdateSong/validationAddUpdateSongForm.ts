import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationAddUpdateSongForm = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('error_message.please_enter_field', { field: t('song_name') })),
    singer: z.string().min(1, t('error_message.please_enter_field', { field: t('singer') })),
    author: z.string().min(1, t('error_message.please_enter_field', { field: t('author') })),
  });
export type FormAddUpdateSongSchema = z.infer<ReturnType<typeof validationAddUpdateSongForm>>;
