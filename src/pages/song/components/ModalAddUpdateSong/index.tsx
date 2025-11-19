import { Form, Input, Skeleton } from 'antd';
import { useGetSongDetail } from 'api/company/useSong';
import { useUpdateSong } from 'api/company/useSong';
import { useCreateSong } from 'api/company/useSong';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useValidation } from 'hooks';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { FormAddUpdateSongSchema, validationAddUpdateSongForm } from './validationAddUpdateSongForm';
import { useTranslation } from 'react-i18next';

export const ModalAddUpdateSong = ({ songId, screen }: { songId: number; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddUpdateSongForm(t));
  const { mutate: createSong } = useCreateSong();
  const { mutate: updateSong } = useUpdateSong();
  const { data: getSongDetail, isFetching } = useGetSongDetail({ songId: songId }, { enabled: !!songId });

  const formItems: IFormBoxItem<FormAddUpdateSongSchema>[] = [
    {
      name: 'name',
      label: t('song_name'),
      required: true,
      children: <Input placeholder={t('song_name')} />,
    },
    {
      name: 'singer',
      label: t('singer'),
      required: true,
      children: <Input placeholder={t('singer')} />,
    },
    {
      name: 'author',
      label: t('author'),
      required: true,
      children: <Input placeholder={t('author')} />,
    },
  ];

  const handleCreateSongSubmit = (value: FormAddUpdateSongSchema) => {
    if (songId) {
      updateSong(
        {
          ...value,
          songId: songId,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    } else {
      createSong(
        {
          ...value,
          providerContentId: 1,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
    }
  };

  return isFetching ? (
    <Skeleton active />
  ) : (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...getSongDetail?.data,
      }}
      onFinish={handleCreateSongSubmit}
      autoComplete="off"
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!songId} htmlType="submit" screen={screen} />
    </Form>
  );
};
