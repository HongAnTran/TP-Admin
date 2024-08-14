interface UploadResponse {
  url: string;
}

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

        fetch('YOUR_IMAGE_UPLOAD_ENDPOINT', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then((result: UploadResponse) => {
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
