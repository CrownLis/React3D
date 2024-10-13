import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Typography } from 'antd';

import { formatName } from '../LabList/utils/formatName';
import { useGetResourcesQuery } from '../../store/yandex';

export const ModelList = () => {
  const navigate = useNavigate();

  const {  } = useParams();

  const { currentData: resources = [], isFetching } = useGetResourcesQuery({
    path: 'models',
    refetchOnMountOrArgChange: true,
  });

  return (
    <Flex vertical gap={20}>
      <Typography.Title level={1}>Доступные виды модели</Typography.Title>
      <Button onClick={() => navigate(-1)}>Вернуться к списку</Button>
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
                  navigate(`${formattedName}`);
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
