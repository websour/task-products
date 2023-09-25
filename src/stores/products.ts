import { defineStore } from 'pinia';

const BASE_URL = 'https://httpbin.org';

export const useProductsStore = defineStore({
  id: 'products',
  state: () => ({
    selectedFiles: [] as File[],
    selectedFilesCount: 0,
  }),
  actions: {
    selectFile(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = Array.from(target.files || []);
      this.selectedFiles = [...this.selectedFiles, ...files];
      this.selectedFilesCount += files.length;
    },
    async uploadImage() {
      if (this.selectedFiles.length === 0) {
        alert('ファイルを選択してください');
        return;
      }

      const formData = new FormData();
      for (const file of this.selectedFiles) {
        formData.append('image', file);
      }

      try {
        const POST = 'post';
        const response = await fetch(`${BASE_URL}/${POST}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('アップロード成功:', data);
        } else {
          console.error('POSTリクエストが失敗しました。:', response.statusText);
        }
      } catch (error) {
        console.error('POSTリクエストが失敗しました。:', error);
      }
    },
    async deleteImage(productId: number): Promise<void> {
      try {
        const DELETE = 'delete';
        const response = await fetch(`${BASE_URL}/${DELETE}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: productId })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('削除成功:', data);
        } else {
          console.error('DELETEリクエストが失敗しました。');
        }
      } catch (error) {
        console.error('DELETEリクエストが失敗しました。', error);
      }
    },
    async updateOrder(productId: number): Promise<void> {
      try {
        const PUT = 'put';
        const response = await fetch(`${BASE_URL}/${PUT}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: productId })
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('更新成功:', data);
        } else {
          console.error('PUTリクエストが失敗しました。');
        }
      } catch (error) {
        console.error('PUTリクエストが失敗しました。', error);
      }
    },
  },
});