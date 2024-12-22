import { memo, useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Flex, Spin } from 'antd';

import { useGetResourceLinkQuery, useGetResourcesQuery } from '../../store/yandex';

export const Lab = memo((path) => {

  const [currentResource, setCurrentResource] = useState();

  const {
    currentData: resources,
    isFetching: isResourcesFetching,
    isSuccess: isResourcesSuccess,
  } = useGetResourcesQuery({
    path: path.path,
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
      const doc = resources.find(resource => resource.type === 'file');
      setCurrentResource(doc);
    }
  }, [isResourcesSuccess]);

  return (
    <Flex vertical gap={20} style={{height: '100%'}}>
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
            pdfZoom: {
              defaultZoom: 30
            }
          }}
          style={{ height: '100%' }}
        />
      )}
    </Flex>
  );
});
