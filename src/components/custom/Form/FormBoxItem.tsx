/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from 'antd';
import { Rule } from 'antd/es/form';
import { Gutter } from 'antd/lib/grid/row';
import { ReactNode } from 'react';
import { IFormBoxItem } from 'types/components';

const FormBoxItem = ({
  listItems,
  titleBox,
  defaultSpan = 12, // total 24 column, default 2 column
  classNameFormBox = '',
  columnGap = 16,
  rule,
}: {
  listItems: IFormBoxItem<any>[];
  titleBox?: string;
  defaultSpan?: number;
  classNameFormBox?: string;
  columnGap?: Gutter | [Gutter, Gutter];
  rule?: Rule;
}) => {
  return (
    <div className={`${classNameFormBox}`}>
      {titleBox && <div className="text-center text-xl font-semibold">{titleBox}</div>}
      <Row gutter={columnGap} className={titleBox ? 'px-3' : ''}>
        {listItems.map((item, index) => {
          if (item.hidden) return;
          return (
            <Col span={item.span ?? defaultSpan} key={index}>
              {item.isFormItem === false ? (
                <>{item.children as ReactNode}</>
              ) : (
                <Form.Item
                  rules={item.rules ?? (rule ? [rule] : undefined)}
                  className={'mb-1 ' + item.className}
                  {...item}
                />
              )}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default FormBoxItem;
