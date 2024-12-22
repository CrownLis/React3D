import React, { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spin, Typography } from 'antd';
import * as THREE from 'three'; // Для работы с материалами
import { useGetResourceLinkQuery } from '../../store/yandex';

const { Title } = Typography;

export const Model = (path, currentModel) => {
  const [currentResource, setCurrentResource] = useState();
  const [currentTexture, setCurrentTexture] = useState();
  const [object, setObject] = useState(null); // Хранение загруженного объекта
  const [isLoading, setIsLoading] = useState();

  console.log(path.path);

  const objPath = `${path.path}.obj`;

  const texturePath = `${path.path}.mtl`;

  const {
    currentData: resourceLink,
    isFetching: isResourceLinkFetching,
    isSuccess: isResourceLinkSuccess,
  } = useGetResourceLinkQuery({ path: objPath });

  console.log(resourceLink, currentResource);

  const {
    currentData: resourceLink2,
    isFetching: isResourceLinkFetching2,
    isSuccess: isResourceLinkSuccess2,
  } = useGetResourceLinkQuery({ path: texturePath });

  const isFetching = isResourceLinkFetching || isResourceLinkFetching2 || isLoading;

  useEffect(() => {
    if (isResourceLinkSuccess) {
      setCurrentResource(resourceLink?.href);
    }
    if (isResourceLinkSuccess2) {
      setCurrentTexture(resourceLink2?.href);
    }
  }, [isResourceLinkSuccess, isResourceLinkSuccess2, resourceLink, resourceLink2]);

  const fetchAndModifyMTL = async (url, textureBaseUrl) => {
    try {
      const response = await fetch(url);
      let mtlContent = await response.text();

      // Заменяем относительные пути текстур на абсолютные
      mtlContent = mtlContent.replace(/map_Kd\s+(\S+)/g, (match, texture) => {
        return `map_Kd ${textureBaseUrl}${texture}`;
      });

      return mtlContent;
    } catch (error) {
      console.error('Ошибка загрузки или модификации MTL:', error);
      return null;
    }
  };

  const loadMTLAndOBJ = async (objUrl, mtlUrl) => {
    try {
      setIsLoading(true);
      // Модифицируем MTL
      const modifiedMTL = await fetchAndModifyMTL(mtlUrl, '/labs/textures/'); // Укажите базовый URL для текстур
      if (!modifiedMTL) throw new Error('Не удалось модифицировать MTL-файл.');

      // Создаем материалы из модифицированного MTL
      const mtlLoader = new MTLLoader();
      const materials = mtlLoader.parse(modifiedMTL);
      materials.preload();

      // Загружаем OBJ с применением материалов
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);

      const object = await new Promise((resolve, reject) => {
        objLoader.load(
          objUrl,
          (loadedObject) => resolve(loadedObject),
          undefined,
          (error) => reject(error)
        );
      });
      setIsLoading(false);
      return object;
    } catch (error) {
      console.error('Ошибка загрузки OBJ или MTL:', error);
      return null;
    }
  };

  useEffect(() => {
    if (currentResource && currentTexture) {
      loadMTLAndOBJ(currentResource, currentTexture).then((loadedObject) => {
        if (loadedObject) {
          setObject(loadedObject); // Устанавливаем загруженный объект в состояние
        }
      });
    }
  }, [currentResource, currentTexture]);

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {isFetching || !object ? (
        <Spin size="large" />
      ) : (
        <Canvas
          style={{backgroundColor: 'white', marginTop: 40}}
          camera={{
            fov: 90,
            far: 10000,
            position: [3, 2, 3],
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <OrbitControls />
          <primitive object={object} dispose={null} />
        </Canvas>
      )}
    </div>
  );
};

export default Model;