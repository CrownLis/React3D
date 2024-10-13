import { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Spin } from 'antd';

import { useGetResourceLinkQuery, useGetResourcesQuery } from '../../store/yandex';

export const Lab = () => {
  const { labPath } = useParams();
  const navigate = useNavigate();

  const [currentResource, setCurrentResource] = useState();

  const path = `/labs/${labPath}`;
  const modelsPath = `${path}/models`

  const {
    currentData: resources,
    isFetching: isResourcesFetching,
    isSuccess: isResourcesSuccess,
  } = useGetResourcesQuery({
    path,
    refetchOnMountOrArgChange: true,
  });

  console.log(currentResource?.path.replace('disk:', ''));

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

  console.log(resourceLink);

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
      const doc = resources.find(resource => resource.type === 'file');
      setCurrentResource(doc);
    }
  }, [isResourcesSuccess]);

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
