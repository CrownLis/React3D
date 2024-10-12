import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getModelsListSelector } from "../../store/disk/selectors";
import { getInfoAboutFolderAction } from "../../store/disk/asyncAction";
import { formatName } from "./utils/formatName";

const List = () => {

    const dispatch = useDispatch()
    const modelsList = useSelector(getModelsListSelector);
    console.log(modelsList);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const accessToken = hash.slice(hash.indexOf('=') + 1, hash.indexOf('&token'));
            window.localStorage.setItem('access_token', accessToken);
        }
    }, []);

    useEffect(() => {
        dispatch(getInfoAboutFolderAction('models'));
    }, [])

    return (
        <div style={{ display: "flex", alignItems: 'center', flexDirection: 'column', gap: 20, margin: 20 }}>
            <h1>Список доступных моделей</h1>
            {modelsList.map(model => {
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

export default List;