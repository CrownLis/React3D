import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Typography, Spin } from 'antd';

import { formatName } from '../LabList/utils/formatName';
import { useGetResourcesQuery } from '../../store/yandex';

export const ModelList = () => {
  const navigate = useNavigate();
  const { labPath } = useParams();

  const path = `labs/${labPath}/models`;

  const [lastPath, setLastPath] = useState(path);

  console.log(lastPath);

  const { currentData: resources = [], isFetching } = useGetResourcesQuery({
    path: lastPath,
    refetchOnMountOrArgChange: true,
  });

  return (
    <Flex vertical gap={20}>
      <Typography.Title style={{ textAlign: 'center' }} level={1}>Оборудование для изучения</Typography.Title>
      <Button onClick={() => navigate(-1)}>Вернуться назад</Button>
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
                  resource.type === 'dir' ? 
                  setLastPath(`${path}/${formattedName}`) :
                  navigate(`/${lastPath}/${formattedName}`);
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
