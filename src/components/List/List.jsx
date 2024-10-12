import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFolderInfoSelector } from "../../store/disk/selectors";
import { getInfoAboutFolderAction } from "../../store/disk/asyncAction";
import { formatName } from "./utils/formatName";

const List = () => {

    const dispatch = useDispatch()
    const folderInfo = useSelector(getFolderInfoSelector);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const accessToken = hash.slice(hash.indexOf('=') + 1, hash.indexOf('&token'));
            window.localStorage.setItem('access_token', accessToken);
        }
    }, []);

    useEffect(() => {
        dispatch(getInfoAboutFolderAction('labs'));
    }, [])

    return (
        <div style={{ display: "flex", alignItems: 'center', flexDirection: 'column', gap: 20, margin: 20 }}>
            <h1>Название предмета "Источники питания"</h1>
            {folderInfo.map(lr => {
                const formattedName = formatName(lr.name, lr.type);
                return <button style={{ width: '100%' }} onClick={(e) => {
                    e.preventDefault()
                }
                }><Link style={{ color: 'white', display: 'block' }} to={`labs/${formattedName}`}>{formattedName}</Link></button>

            })}
        </div>
    )
}

export default List;