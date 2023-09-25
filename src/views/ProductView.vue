<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue'
import { useProductsStore } from '@/stores/products';


// 商品のデータ
const products = ref([
  {
    id: 1,
    name: 'sweater-v',
    category: 'sweater',
    order: 1,
  },
  {
    id: 2,
    name: 'sweater-u',
    category: 'sweater',
    order: 2,
  },
  {
    id: 3,
    name: 'sweater-turtle',
    category: 'sweater',
    order: 3,
  },
  {
    id: 4,
    name: 'tshirt-white',
    category: 'other',
    order: 4,
  },
  {
    id: 5,
    name: 'shiborizome',
    category: 'other',
    order: 5,
  },
  {
    id: 6,
    name: 'flight-jacket',
    category: 'other',
    order: 6,
  },
]);


// 選択された商品のIDを保持するリファレンス
const selectedProductId = ref<number | null>(null);

// ポップアップを表示する
const showPopup = (productId: number | null) => {
  selectedProductId.value = productId;
};

// ポップアップを非表示にする
const hidePopup = () => {
  selectedProductId.value = null;
};

// 新しい注文の値を保持するリファレンス
const newOrderValues = ref([]);

// products が更新されたときに newOrderValues を更新
const updateNewOrderValues = () => {
  newOrderValues.value = products.value.map((product) => ({ ...product }));
};
updateNewOrderValues();

// order 値を変更
const moveProduct = (product: { id: number; }, direction: number) => {
  const currentIndex = newOrderValues.value.findIndex((item) => item.id === product.id);
  const newIndex = currentIndex + direction;

  if (newIndex >= 0 && newIndex < newOrderValues.value.length) {
    // 順序を変更
    [newOrderValues.value[currentIndex], newOrderValues.value[newIndex]] = [newOrderValues.value[newIndex], newOrderValues.value[currentIndex]];

    // products 配列から、現在の商品と入れ替える商品を取得する
    const currentProduct = products.value.find((item) => item.id === product.id);
    const swapProduct = products.value.find((item) => item.order === newOrderValues.value[currentIndex].order);

    // 現在の商品と入れ替える商品の order 値を交換する
    currentProduct.order = newOrderValues.value[currentIndex].order;
    swapProduct.order = newOrderValues.value[newIndex].order;
  }
};

const productsStore = useProductsStore();
// 現在のインスタンスを取得する
const instance = getCurrentInstance();
// ファイルを選択する
const selectFile = (event: Event) => {
  if ((event.target as HTMLInputElement).files) {
    const productButtonUpload = instance.refs.productButtonUpload as HTMLButtonElement;
    productButtonUpload.classList.add('is-active');
    productsStore.selectFile(event)
  }
};


// 画像をアップロードする
const uploadImage = async () => {
  if (productsStore.selectedFiles && productsStore.selectedFiles.length > 0) {
    await productsStore.uploadImage();
  }
};

// 画像を削除する
const deleteProduct = async (productId: number) => {
  if (confirm('削除しますか？')) {
    await productsStore.deleteProduct(productId)
  }
};

// 並び替えを保存する
const saveOrders = async () => {
  for (let i = 0; i < newOrderValues.value.length; i++) {
    const image = newOrderValues.value[i];
    const currentImage = products.value.find((item) => item.id === image.id);
    if (currentImage.order !== image.order) {
      await productsStore.updateOrder({ id: image.id, order: image.order });
    }
  }
};

// 並び替えの変更があったときに保存ボタンをアクティブにする
watch(newOrderValues, (_newVal, _oldVal) => {
  const productButtonSave = instance.refs.productButtonSave as HTMLButtonElement;
  productButtonSave.classList.add('is-active');
}, { deep: true })

</script>
<template>
  <main>
    <h2>商品一覧</h2>
    <div class="productFormsSave">
      <button @click="saveOrders" ref="productButtonSave" class="productButton productButton-save">保存</button>
    </div>
    <ul class="productList">
      <li v-for="product in newOrderValues" :key="product.id" class="productList_item">
        <div class="product">
          <img :src="`/uploads/images/${product.category}/${product.name}.png`" alt="セーター" width="200" height="" class="product_img"/>
          <button @click="showPopup(product.id)" class="productButton productButton-settings">設定</button>
          <div v-if="selectedProductId == product.id" class="productPopup">
            <ul>
              <li>
                <button @click="moveProduct(product, -1)" class="productPopupButton">
                  <font-awesome-icon :icon="['fas', 'arrow-left']" />
                  <span>左へ移動</span>
                </button>
              </li>
              <li>
                <button @click="moveProduct(product, 1)" class="productPopupButton">
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                  <span>右へ移動</span>
                </button>
              </li>
              <li>
                <button @click="deleteProduct(product.id)" class="productPopupButton">
                  <font-awesome-icon :icon="['fas', 'trash-can']" />
                  <span>画像を削除</span>
                </button>
              </li>
              <li>
                <button @click="hidePopup()" class="productPopupButton">
                  <span>閉じる</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="productForms">
      <div class="productFormsUpload">
        <input type="file" ref="fileInput" @change="selectFile" />
        <button @click="uploadImage" ref="productButtonUpload" class="productButton productButton-upload">アップロード</button>
      </div>
    </div>
</main>
</template>
<style lang="scss" scope>


h2 {
  font-size: 24px;
  margin-top: 16px;
}
.main {
  margin-top: 20px;
}
@mixin resetButton {
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
.productList {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin-top: 0;
  margin-left: -16px;
  &_item {
    margin-left: 16px;
    margin-top: 16px;
  }
}
.product {
  position: relative;
  border: solid 1px #ccc;
  border-radius: 4px;
  width: 228px;
  height: 228px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.productButton {
  @include resetButton;
  border: solid 1px #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 12px;
  background-color: rgba(204, 204, 204, 0.7411764706);
  &-settings {
    position: absolute;
    top: 8px;
    right: 8px;
    border: solid 1px #ccc;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    background-color: #ccccccbd;
  }
  &-save,&-upload {
    text-align: right;
    font-weight: bold;
    cursor: auto;
    pointer-events: none;
    &.is-active {
      background-color: hsla(160, 100%, 37%, 1);
      color: #fff;
      cursor: pointer;
      pointer-events: auto;
    }
  }
}
.productPopup {
  border: solid 1px #ccc;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 50%;
  border-radius: 4px;
  background-color: #ffffffce;
  ul {
    list-style: none;
    padding: 4px 8px;
    li {
      border-top: solid 1px #ccc;
      padding-top: 4px;
      padding-bottom: 4px;
      &:first-child {
        border-top: none;
      }
    }
  }
}
.productPopupButton {
  @include resetButton;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 4px;
  }
}
.productForms {
  margin-top: 40px;
  text-align: right;
  &Upload {
    padding-top: 20px;
    border-top: solid 1px #ccc;
  }
  &Save {
    text-align: right;
    padding-top: 20px;
    margin-top: 40px;
    border-top: solid 1px #ccc;
  }
}
</style>
