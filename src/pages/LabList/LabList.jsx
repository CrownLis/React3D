import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Spin, Typography } from 'antd';

import { formatName } from './utils/formatName';
import { useGetResourcesQuery } from '../../store/yandex';

export const LabList = () => {
  const navigate = useNavigate();

  const { currentData: resources, isFetching } = useGetResourcesQuery({
    path: 'labs',
    refetchOnMountOrArgChange: true,
  });

  return (
    <Flex vertical gap={20}>
      <Typography.Title level={1}>Название предмета "Источники питания"</Typography.Title>
      {isFetching ? (
        <Spin size="large" />
      ) : (
        <Flex vertical gap={20}>
          {resources.map(resource => {
            const formattedName = formatName(resource.name, resource.type);

            return (
              <Button
                key={resource.resource_id}
                type="primary"
                onClick={() => {
                  navigate(`/labs/${formattedName}`);
                }}
              >
                {formattedName}
              </Button>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};
