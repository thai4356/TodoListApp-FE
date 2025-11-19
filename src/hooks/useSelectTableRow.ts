import { Key, useState } from 'react';

export const useSelectTableRow = <T extends { id?: number }>() => {
  const [selectedKey, setSelectedKey] = useState<Key[]>([]);
  const [records, setRecords] = useState<T[]>([]);

  const handleSelectRow = (a: Key[], records?: T[]) => {
    setSelectedKey(a);

    if (records) {
      setRecords(records);
    }
  };

  const pushSelectRow = (newKey: Key, _records: T) => {
    if (selectedKey.includes(newKey)) {
      const newSelectedKeys = selectedKey.filter((item) => item !== newKey);
      const newRecords = records.filter((item) => item.id !== newKey);
      setSelectedKey(newSelectedKeys);
      setRecords(newRecords);
      return;
    }
    setSelectedKey([...selectedKey, newKey]);
    setRecords([...records, _records]);
  };

  return { selectedKey, records, setSelectedKey, handleSelectRow, pushSelectRow };
};
