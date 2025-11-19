/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormInstance, FormRule } from 'antd';
import { t } from 'i18next';
import { z } from 'zod';

export const useValidation = <T>(
  schema: z.ZodEffects<z.ZodObject<any, any, any, T>> | z.ZodObject<any, any, any, T>,
): [FormInstance<T>, FormRule] => {
  const [form] = Form.useForm();
  const rule = {
    async validator({ field }: any) {
      const object = form.getFieldsValue();
      const result = await schema.safeParseAsync(object);
      if (result.success) return;
      const issues = result.error.issues.filter((x) => x.path[0] == field);
      const message = issues[0]?.message;
      if (message) throw new Error(t(message));
    },
  };
  return [form, rule];
};
