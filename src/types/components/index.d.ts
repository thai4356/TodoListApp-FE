import { FormItemProps } from 'antd/lib';
import type { ReactNode } from 'react';

export type AuthenticationProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export type SwitchCustomProps = {
  id: number;
  isChecked: boolean;
  onChange: (checked: boolean, id: number) => void;
};

export interface IFormBoxItem<T extends object> extends FormItemProps {
  span?: number;
  isFormItem?: boolean;
  name?: keyof T | undefined; // pass undefined when isFormItem = true
}
