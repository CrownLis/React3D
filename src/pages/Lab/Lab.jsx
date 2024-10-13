import { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Spin } from 'antd';

import { useGetResourceLinkQuery, useGetResourcesQuery } from '../../store/yandex';

export const Lab = () => {
  const { labPath } = useParams();
  const navigate = useNavigate();

  const [currentResource, setCurrentResource] = useState();

  const path = `labs/${labPath}`;
  const modelsPath = `${path}/models`

  console.log('labPath', labPath);

  const {
    currentData: resources,
    isFetching: isResourcesFetching,
    isSuccess: isResourcesSuccess,
  } = useGetResourcesQuery({
    path,
    refetchOnMountOrArgChange: true,
  });

  const {
    currentData: resourceLink,
    isUninitialized: isResourceLinkUninitialized,
    isFetching: isResourceLinkFetching,
  } = useGetResourceLinkQuery(
    {
      path: currentResource?.path.replace('disk:', ''),
    },
    {
      skip: !currentResource,
    },
  );

  const isFetching = isResourcesFetching || isResourceLinkUninitialized || isResourceLinkFetching;

  const docs = resourceLink
    ? [
        {
          uri: resourceLink.href,
        },
      ]
    : [];

  useEffect(() => {
    if (isResourcesSuccess) {
      setCurrentResource(resources[0]);
    }
  }, [isResourcesSuccess]);

  console.log('modelsPath', modelsPath)

  return (
    <Flex vertical gap={20}>
      <Button
        type="primary"
        onClick={() => {
          navigate(modelsPath);
        }}
      >
        Перейти к списку моделей
      </Button>
      <Button
        type="primary"
        onClick={() => {
          navigate(`/labs`);
        }}
      >
        Вернуться к списку
      </Button>
      {isFetching ? (
        <Spin size="large" />
      ) : (
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: {
              disableHeader: true,
            },
          }}
          style={{ height: 1000 }}
        />
      )}
    </Flex>
  );
};
