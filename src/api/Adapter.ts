import FileService from "@/services/FileService";

// interface UploadResponse {
//   url: string;
// }



class UploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload(): Promise<{ default: string }> {
    return this.loader.file
      .then((file: File) => new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('upload', file);
        FileService.upload(formData).then((result : any) => {
          console.log(result)
            if (result && result.url) {
              resolve({
                default: result.url
              });
            } else {
              reject(result);
            }
          })
          .catch(reject);
      }));
  }

  abort() {
    // Implement aborting the upload process if needed.
  }
}

export function UploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new UploadAdapter(loader);
  };
}
