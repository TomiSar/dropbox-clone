'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import DropzoneComponent from 'react-dropzone';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';

function Dropzone() {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('File reading aborted');
      reader.onerror = () => console.log('File reading failed');
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectFile: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);
    const toastId = toast.loading('Uploading file');

    // addDoc -> users/user1231/files
    const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
      userId: user.id,
      filename: selectFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectFile.type,
      size: selectFile.size,
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    await uploadBytes(imageRef, selectFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
        downloadURL: downloadURL,
      });
    });

    toast.success('File Uploaded successfully', {
      id: toastId,
      position: 'bottom-center',
    });
    setLoading(false);
  };

  // Max file size
  const maxSize = 20971520;

  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className='m-4'>
            <div
              className={cn(
                'w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center cursor-pointer',
                isDragActive
                  ? 'bg-[#035FFE] text-white animate-pulse'
                  : 'bg-slate-100/50 dark:bg-slate-800/80 text-slate-400'
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop a file to upload!'}
              {isDragActive && !isDragReject && 'Drop to upload this file!'}
              {isDragReject && 'File type not accepted, sorry!'}
              {isFileTooLarge && (
                <div className='text-danger mt-2'>File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
