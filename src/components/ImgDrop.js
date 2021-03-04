import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosClient from '../config/axios';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 180,
    height: 180,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const imgg = {
    display: 'block',
    width: 'auto',
    height: '70%'
};

const ImgDrop = (props) => {
    //const [inputProps, saveInputProps] = useState({});

    //DropZone
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: async (acceptedFiles) => {
            let imgProp = acceptedFiles[0];
            setFiles(acceptedFiles.map(file => (Object.assign(file, { preview: URL.createObjectURL(file) }))));
            //            console.log(imgProp)
            const data = new FormData();
            data.append('file', imgProp)
            await axiosClient.post('/files/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            props.onChange(imgProp.path)
        }
    });


    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    alt=""
                    src={file.preview}
                    style={imgg}
                />
            </div>
        </div>
    ));
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input
                    {...getInputProps()}
                //onChange={handleChange}
                />
                <p className="btn-transparent">Drag 'n' drop an image here, or click to select image</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>


        </div>

    );
}

export default ImgDrop;