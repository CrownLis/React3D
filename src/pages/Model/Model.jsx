import React, { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Spin } from 'antd';

import { useGetResourceLinkQuery } from '../../store/yandex';

export const Model = () => {
  const { modelPath, labPath, mPath } = useParams();
  const [currentResource, setCurrentResource] = useState();
  const navigate = useNavigate();
  
  const path = mPath ?  `/labs/${labPath}/models/${modelPath}/${mPath}.obj` : `/labs/${labPath}/models/${modelPath}.obj`

  const {
    currentData: resourceLink,
    isUninitialized: isResourceLinkUninitialized,
    isFetching: isResourceLinkFetching,
    isSuccess: isResourceLinkSuccess,
  } = useGetResourceLinkQuery(
    {
      path,
    },
  );

  const isFetching = isResourceLinkUninitialized || isResourceLinkFetching;

  useEffect(() => {
    if (isResourceLinkSuccess) {
      setCurrentResource(resourceLink.href);
    }
  }, [isResourceLinkSuccess]);

  const obj = useLoader(OBJLoader, currentResource);

  return (
    <Flex vertical gap={20} style={{height: '100%'}}>
      <Button onClick={() => navigate(-1)}>
        Вернуться к списку
      </Button>
      {isFetching ? <Spin size='large'/> : 
      <Canvas
        camera={{
          fov: 90,
          position: [0, 0, 200],
        }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[-2, 1, 4]} intensity={0.8} />
        <OrbitControls />
        <primitive object={obj} />
      </Canvas>
      }
    </Flex>
  );
};

export default Model;
