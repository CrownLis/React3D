import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getModelsListSelector } from "../../store/disk/selectors";
import { getModelsListAction } from "../../store/disk/asyncAction";

const List = () => {
    
    const dispatch = useDispatch()
    const modelsList = useSelector(getModelsListSelector);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const accessToken = hash.slice(hash.indexOf('=') + 1, hash.indexOf('&token'));
            window.localStorage.setItem('access_token', accessToken);
        }
    }, []);

    useEffect(() => {
        dispatch(getModelsListAction());
    },[])

    return (
        <div style={{display: "flex", alignItems: 'center', flexDirection: 'column', gap: 20, margin: 20}}>
        <h1>Список доступных моделей</h1>
                {modelsList.map(model => {
                    const formattedModelName = model.slice(0, -4);

                    return <button style={{width: '100%'}} onClick={(e) => e.preventDefault()}><Link style={{color: 'white', display: 'block'}} to={`/model/${model}`}>{formattedModelName} </Link> </button>
                    
                    })}
        </div>
    )
}

export default List;