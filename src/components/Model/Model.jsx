import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadLinkSelector, getLoadingSelector } from "../../store/disk/selectors";
import { getDownloadLinkAction } from "../../store/disk/asyncAction";


const Model = () => {

  const { id } = useParams();
    const navigate = useNavigate();
    
  const dispatch = useDispatch()
  const downloadLink = useSelector(getDownloadLinkSelector);
  const loading = useSelector(getLoadingSelector);

  useEffect(() => {
    dispatch(getDownloadLinkAction(id));
  }, [id])

  const obj = useLoader(OBJLoader, downloadLink);

  if (loading) {
    return <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <span class="loader"></span>
    </div>
  }

    return (
        <div>
        <button style={{margin: 20, color: "white"}} onClick={() => navigate(-1)}>Вернуться к списку</button>
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
      </div>
    )
}

export default Model