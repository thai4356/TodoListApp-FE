const groupBy = (collection: { [key: string]: unknown }[], property: string) => {
  const values: string[] = [];
  const result: { [key: string]: unknown }[][] = [];

  for (let i = 0; i < collection.length; i++) {
    const val = collection[i][property] as string;
    const index = values.indexOf(val);

    if (values.indexOf(val) > -1) {
      result[index].push(collection[i]);
    } else {
      values.push(val);
      result.push([collection[i]]);
    }
  }

  return result;
};

export default groupBy;
