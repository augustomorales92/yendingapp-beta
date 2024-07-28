import toast from "react-hot-toast";

export async function uploadFile(ev: React.ChangeEvent<HTMLInputElement>, callbackFn: (link: string) => void): Promise<void> {
  const file = ev.target.files?.[0];

  if (file) {
    const uploadPromise = new Promise<string>((resolve, reject) => {
      const data = new FormData();
      data.set('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(response => {
        if (response.ok) {
          response.json().then((link: string) => {
            callbackFn(link);
            resolve(link);
          }).catch(reject);
        } else {
          reject();
        }
      }).catch(reject);
    });

    await toast.promise(uploadPromise, {
      loading: 'Uploading...',
      success: 'Uploaded!',
      error: 'Upload error!',
    });
  }
}

export async function deleteFile(file: string): Promise<void> {
  const deletePromise = new Promise<void>((resolve, reject) => {
    fetch(`/api/upload?fileUrl=${encodeURIComponent(file)}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    }).catch(reject);
  });

  await toast.promise(deletePromise, {
    loading: 'Deleting...',
    success: 'Deleted!',
    error: 'Delete error!',
  });
}




// import toast from "react-hot-toast";

// // creo una upload, genrica para poder usarla con cualquier archivo que suba a la plataforma. 

// export async function upload(ev, callbackFn) {
//   const file = ev.target.files?.[0];

//   if (file) {

//     const uploadPromise = new Promise((resolve, reject) => {
//       // hago fetch al uso de S3 con la ruta de upload, como siempre hice.
//       const data = new FormData;
//       data.set('file', file);
//       fetch('/api/upload', {
//         method: 'POST',
//         body: data,
//       }).then(response => {
//         if (response.ok) {
//           response.json().then(link => {
//             callbackFn(link);
//             resolve(link);
//           });
//         } else {
//           reject();
//         }
//       });
//     });

//     await toast.promise(uploadPromise, {
//       loading: 'Uploading...',
//       success: 'Uploaded!',
//       error: 'Upload error!',
//     });

//   }
// }