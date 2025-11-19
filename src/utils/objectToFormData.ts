/**
 * Chuyển đổi một đối tượng JavaScript thành đối tượng FormData.
 * Điều này hữu ích cho việc gửi dữ liệu đối tượng thông qua HTTP requests, đặc biệt là khi có files.
 *
 * @param {any} obj - Đối tượng cần chuyển đổi.
 * @param {FormData} formData - Đối tượng FormData để thêm dữ liệu vào, mặc định là FormData mới nếu không được cung cấp.
 * @param {string} parentKey - Khóa cha dùng để xây dựng tên khóa cho các trường dữ liệu lồng nhau.
 * @returns {FormData} - Trả về đối tượng FormData đã được điền dữ liệu.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function objectToFormData(obj: any, formData: FormData = new FormData(), parentKey?: string): FormData {
  if (obj === null || obj === undefined) {
    return formData;
  }

  // Duyệt qua mỗi thuộc tính của obj
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      // Xây dựng khóa cho FormData dựa trên khóa cha (nếu có)
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      // Kiểm tra nếu giá trị là đối tượng (không phải Date, Blob, hoặc File)
      if (
        typeof value === 'object' &&
        !(value instanceof Date) &&
        !(value instanceof Blob) &&
        !(value instanceof File)
      ) {
        // Nếu giá trị là một mảng, xử lý từng phần tử
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (
              typeof item === 'object' &&
              !(item instanceof Date) &&
              !(item instanceof Blob) &&
              !(item instanceof File)
            ) {
              // Đệ quy cho đối tượng lồng nhau trong mảng
              objectToFormData(item, formData, `${formKey}[${index}]`);
            } else {
              // Thêm phần tử mảng như một phần của mảng trong FormData
              formData.append(`${formKey}[]`, item);
            }
          });
        } else {
          // Đệ quy cho đối tượng lồng nhau
          objectToFormData(value, formData, formKey);
        }
      } else {
        // Đối với các loại Date, Blob, File, hoặc các kiểu giá trị đơn giản khác
        if (value instanceof Date) {
          // Chuyển đổi Date thành chuỗi ISO và thêm vào FormData
          formData.append(formKey, value.toISOString());
        } else {
          // Thêm giá trị vào FormData
          formData.append(formKey, value);
        }
      }
    }
  }

  return formData;
}

export default objectToFormData;
