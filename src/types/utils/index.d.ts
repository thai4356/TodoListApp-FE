/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormInstance } from 'antd';

export type FieldConfig = {
  trimWhitespace?: boolean; // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
  trimStartWhitespace?: boolean; // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
  trimEndWhitespace?: boolean; // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
  removeUndefinedNull?: boolean; // Xóa bỏ các giá trị undefined hoặc null
  escapeStrings?: boolean; // Escape các ký tự đặc biệt trong chuỗi để tránh SQL injection
  enforceDataType?: 'string' | 'number' | 'date' | 'boolean' | 'email' | 'phone'; // Ép kiểu dữ liệu
  maxLength?: number; // Giới hạn độ dài tối đa cho chuỗi
  dateFormat?: string; // Định dạng ngày tháng
  customTransform?: (value: any) => any; // Hàm xử lý dữ liệu tuỳ chỉnh
  toUpperCase?: boolean; // Chuyển đổi chuỗi thành dạng chữ in hoa
  toLowerCase?: boolean; // Chuyển đổi chuỗi thành dạng chữ thường
};

export type DataCleanupConfig = {
  fields?: Record<string, FieldConfig>; // Cấu hình xử lý cho từng trường dữ liệu
  formInstance?: FormInstance<any>;
  defaultConfig?: FieldConfig;
};
