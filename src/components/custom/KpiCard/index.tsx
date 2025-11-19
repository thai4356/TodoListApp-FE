import { Card, Col, Row } from 'antd';
import { ReactNode } from 'react';

export const KpiCard = ({
  icon,
  value,
  description,
  className,
}: {
  icon?: ReactNode;
  value?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <Card className={`${className} rounded-sm`}>
      <Row align="middle" gutter={24}>
        <Col span={6} className="flex h-full w-full items-center justify-center">
          {icon}
        </Col>
        <Col span={18} className="flex flex-col gap-2">
          <div className="text-lg font-bold">{value}</div>
          <div className="font-semibold">{description}</div>
        </Col>
      </Row>
    </Card>
  );
};
