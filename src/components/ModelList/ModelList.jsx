import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFolderInfoSelector } from "../../store/disk/selectors";
import { getInfoAboutFolderAction } from "../../store/disk/asyncAction";
import { formatName } from "../List/utils/formatName";

const ModelList = () => {
    const dispatch = useDispatch()
    const folderInfo = useSelector(getFolderInfoSelector);
    const { id } = useParams();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const accessToken = hash.slice(hash.indexOf('=') + 1, hash.indexOf('&token'));
            window.localStorage.setItem('access_token', accessToken);
        }
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getInfoAboutFolderAction(`models/${id}`));
        } else {
        dispatch(getInfoAboutFolderAction(`models`));
        }
    }, [id])

    return (
        <div style={{ display: "flex", alignItems: 'center', flexDirection: 'column', gap: 20, margin: 20 }}>
            <h1>Доступные виды модели</h1>
            <button style={{ margin: 20, color: "white" }} onClick={() => navigate(-1)}>Вернуться к списку</button>
            {folderInfo.map(model => {
                const formattedModelName = formatName(model.name, model.type);
                console.log(formattedModelName);

                return <button key={model} style={{ width: '100%' }} onClick={(e) => {
                    dispatch(getInfoAboutFolderAction(model))
                    e.preventDefault()
                }
                }><Link style={{ color: 'white', display: 'block' }} to={model.type === 'dir' ? `/modelList/${model.name}` : `/model/${model.name}`}>{formattedModelName} </Link> </button>

            })}
        </div>
    )
}

export default ModelList;