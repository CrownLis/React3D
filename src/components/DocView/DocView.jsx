import React, { useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadLinkSelector } from "../../store/disk/selectors";
import { getDownloadLinkAction } from "../../store/disk/asyncAction";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getFolderInfoSelector } from "../../store/disk/selectors";

const DocView = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const folderInfo = useSelector(getFolderInfoSelector);
    console.log(folderInfo);

    const dispatch = useDispatch()
    const downloadLink = useSelector(getDownloadLinkSelector);
    console.log(`labs/${id}`);

    const docs = [
        {
            uri: downloadLink,
            fileType: "docx",
            fileName: id
        }, // Remote file
    ];

    useEffect(() => {
        dispatch(getDownloadLinkAction(`labs/${id}/${id}`));
        dispatch(getInfoAboutFolderAction(`labs/${id}`));
    }, [id])


    return (
        <div>
           <button style={{ width: '100%' }} onClick={(e) => {
                e.preventDefault()
            }}>
                <Link style={{ color: 'white', display: 'block' }} to={`/modelList`}>К моделям</Link>
            </button>
            <button style={{ margin: 20, color: "white" }} onClick={() => navigate(-1)}>
                Вернуться к списку
            </button>
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{ height: 1000 }} />
        </div>
    )
}

export default DocView;