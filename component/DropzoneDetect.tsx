import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadProps {
    type?: string;
    onChange: (newValue: File[]) => void;
    remove: () => void;
    shouldRemoveFiles: boolean;
}

function DropZoneDetect(props: UploadProps) {
    const { type, onChange, remove, shouldRemoveFiles } = props;
    const [isDragged, setDragged] = useState(false);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const onDrop = useCallback((files: File[]) => {
        setAcceptedFiles(files);
        onChange(files);
        setDragged(false);
    }, [onChange]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDragEnter: () => setDragged(true),
        onDragLeave: () => setDragged(false),
        onDropRejected: (e) => {
            setDragged(false);
            alert(`Error ${e}`);
        },
        maxSize: 5e+6
    });

    useEffect(() => {
        if (shouldRemoveFiles) {
          removeAllFiles();
        }
      }, [shouldRemoveFiles]);
      
      // Add removeAllFiles function
      const removeAllFiles = () => {
        setAcceptedFiles([]);
        remove();
      };

    function round(value: number, decimalPlaces: number): number {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(value * factor) / factor;
    }

    const files: JSX.Element[] = acceptedFiles.map((file: File) => {
        const imageUrl = URL.createObjectURL(file);
        const fileSizeInMB = round(file.size / (1024 * 1024), 2); // Rounding to 2 decimal places
        return (
            <li key={file.name} className='flex gap-2 items-center '>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={file.name} className='h-20 rounded-xl w-20  object-cover' />
                <p className='text-sm text-left pl-4 w-full'>
                    {file.name}<br></br> {fileSizeInMB} MB
                </p>
            </li>
        )
    });

    return (
        <section className="container h-full cursor-pointer p-1 shadow-md rounded-xl w-full border">
        <div {...getRootProps()} className={isDragged ? "dropzone  flex items-center text-center justify-between border border-dashed p-2 rounded-xl transition-all duration-400 h-full w-full border-black" : "dropzone flex items-center text-center justify-between border border-dashed p-2 rounded-xl transition-all duration-400 h-full w-full bg-black "}>
            <input {...getInputProps()} />
            <p className="text-xl list-none w-full font-semibold opacity-80 text-white">{isDragged ? 'Drop here' : (type === 'face' ? (files.length > 0 ? files : 'өөрийн зургаа оруулна уу') : (files.length > 0 ? files : 'эсрэг зургаа оруулна уу'))}</p>
        </div>
     </section>
    );
}

export default DropZoneDetect;
