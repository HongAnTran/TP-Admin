import FileService from "@/services/FileService";
class UploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload(): Promise<{ default: string }> {
    try {
      const file = await this.loader.file;
      const formData = new FormData();
      formData.append('file', file);

      const result = await FileService.upload(formData);
      this.loader.uploaded = true;
      return {
        default: result.url,
      };

    } catch (error) {
      console.error('Upload failed:', error);
      return Promise.reject(error);
    }
  }
  // async delete() {
  //   if (this.url) {
  //     try {
  //       await FileService.delete(this.url);
  //       this.url = null; // Clear the URL after successful deletion
  //     } catch (error) {
  //       console.error('Deletion failed:', error);
  //     }
  //   }
  // }

  abort() {
    // Implement aborting the upload process if needed.
  }
}

export function UploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new UploadAdapter(loader);
  };
}
