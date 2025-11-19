/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DataCleanupConfig, FieldConfig } from 'types/utils';

import dayjs from 'dayjs';

function formatDate(date: Date | string, format: string): string {
  return dayjs(date).format(format);
}

function validateEmail(email: string): boolean {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase());
}

function normalizePhone(phone: string): string {
  // Remove non-numeric characters
  return phone.replace(/[^0-9]+/g, '');
}

function escapeSqlString(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\0\n\r\b\t\\'"\x1a]/g, (s) => {
    switch (s) {
      case '\0':
        return '\\0';
      case '\n':
        return '\\n';
      case '\r':
        return '\\r';
      case '\b':
        return '\\b';
      case '\t':
        return '\\t';
      case '\x1a':
        return '\\Z';
      case "'":
        return "\\'";
      case '"':
        return '\\"';
      case '\\':
        return '\\\\';
      default:
        return `\\${s}`;
    }
  });
}

function mergeConfigs(
  defaultConfig: FieldConfig | undefined,
  fieldConfigs: Record<string, FieldConfig> | undefined,
): DataCleanupConfig {
  return {
    defaultConfig: defaultConfig || {},
    fields: fieldConfigs || {},
  };
}

function cleanFormData<T>(data: { [key: string]: any }, config?: DataCleanupConfig): T {
  const combinedConfig = mergeConfigs(config?.defaultConfig, config?.fields);

  const cleanedData = deepCleanData(data, combinedConfig, []);

  if (config && config.formInstance) {
    config.formInstance.setFieldsValue(cleanedData);

    return config.formInstance as T;
  }

  return cleanedData as T;
}

function deepCleanData(data: any, config?: DataCleanupConfig, path: string[] = []): any {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item: any) => deepCleanData(item, config, path));
  }

  const cleanedObject: any = {};

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      // Tạo một mảng đường dẫn mới bằng cách kết hợp đường dẫn hiện tại với tên trường
      const currentPath = [...path, key];
      let value = data[key];

      const fieldConfig = config?.fields && config.fields[key] ? config.fields[key] : config?.defaultConfig;

      if (!fieldConfig) {
        if (typeof value === 'string') {
          value = value.trim();
        }

        if (value === undefined || value === null) {
          continue;
        }
      } else {
        if (fieldConfig.customTransform) {
          value = fieldConfig.customTransform(value);
        }

        if (typeof value === 'string') {
          if (fieldConfig.trimWhitespace) {
            value = value.trim();
          }

          if (fieldConfig.trimStartWhitespace) {
            value = value.trimStart();
          }

          if (fieldConfig.trimEndWhitespace) {
            value = value.trimEnd();
          }

          // Escape các ký tự đặc biệt trong chuỗi để tránh SQL injection nếu được chỉ định trong cấu hình
          if (fieldConfig.escapeStrings) {
            value = escapeSqlString(value);
          }

          // Giới hạn độ dài tối đa cho chuỗi nếu được chỉ định trong cấu hình
          if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
            value = value.substring(0, fieldConfig.maxLength);
          }
        }

        // Xóa bỏ các giá trị undefined hoặc null nếu được chỉ định trong cấu hình
        if (fieldConfig.removeUndefinedNull && (value === undefined || value === null)) {
          continue;
        }

        // Ép kiểu dữ liệu nếu được chỉ định trong cấu hình
        if (fieldConfig.enforceDataType) {
          switch (fieldConfig.enforceDataType) {
            case 'string':
              value = fieldConfig.toLowerCase
                ? String(value).toLowerCase()
                : fieldConfig.toUpperCase
                  ? String(value).toUpperCase()
                  : String(value);
              break;
            case 'number':
              value = Number(value);
              if (Number.isNaN(value)) {
                throw new Error(`Invalid data type for field ${key}, expected number.`);
              }
              break;
            case 'boolean':
              value = Boolean(value);
              break;

            case 'date':
              // eslint-disable-next-line no-case-declarations
              const newDate = new Date(value);
              if (Number.isNaN(newDate.getTime())) {
                throw new Error(`Invalid date format for field ${key}.`);
              }
              value = fieldConfig.dateFormat ? formatDate(newDate, fieldConfig.dateFormat) : newDate.toISOString();
              break;
            case 'email':
              if (!validateEmail(value)) {
                throw new Error(`Invalid email format for field ${key}.`);
              }
              break;
            case 'phone':
              value = normalizePhone(value).trim();
              break;
            default:
              break;
          }
        }
      }

      // Gán giá trị đã làm sạch vào đối tượng kết quả
      cleanedObject[key] = deepCleanData(value, config, currentPath);
    }
  }

  return cleanedObject;
}

export default cleanFormData;
