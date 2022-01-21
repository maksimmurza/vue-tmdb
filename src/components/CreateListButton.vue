<template>
  <n-button
    :loading="createMovieListAction.loading"
    :disabled="!user.userInfo"
    strong
    secondary
    round
    type="info"
    size="small"
    class="createList"
    @click="showModal = true"
    ><template #icon>
      <n-icon>
        <add />
      </n-icon> </template
    >Create List</n-button
  >
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="Create new list"
    positive-text="Create"
    @positive-click="createNewList"
    @negative-click="cleanFormFields"
    negative-text="Cancel"
  >
    <n-form :model="newListFormValue" :rules="newListFormRules">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="newListFormValue.name" placeholder="Input Name" />
      </n-form-item>
      <n-form-item label="Description">
        <n-input
          v-model:value="newListFormValue.description"
          type="textarea"
          placeholder="Input Description"
        />
      </n-form-item>
      <n-form-item label="Access">
        <n-radio-group v-model:value="newListFormValue.public">
          <n-space>
            <n-radio value="public">Public</n-radio>
            <n-radio value="private">Private</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import {
  NButton,
  NModal,
  NIcon,
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio,
  NSpace,
} from 'naive-ui';
import { useStore } from 'vuex';
import { Add } from '@vicons/ionicons5';
import useListActions from '@/composables/useListActions';

export default defineComponent({
  name: 'CreateListButton',
  components: {
    NButton,
    NModal,
    NIcon,
    Add,
    NForm,
    NFormItem,
    NInput,
    NRadioGroup,
    NRadio,
    NSpace,
  },
  emits: ['created'],
  setup(props, { emit }) {
    const store = useStore();

    const user = computed(() => store.state.user);

    const { createMovieListAction, createMovieList } = reactive(useListActions());

    const showModal = ref(false);
    const newListFormValue = ref({ name: '', description: '', public: '' });
    const newListFormRules = { name: { required: true, message: 'Please input your name' } };

    const createNewList = () => {
      createMovieList(user.value.userInfo.access_token, {
        ...newListFormValue.value,
        public: newListFormValue.value.public === 'public',
        iso_639_1: user.value.userInfo.iso_639_1,
      })
        .then(cleanFormFields)
        .then(() => emit('created'));
    };

    const cleanFormFields = () => {
      newListFormValue.value = { name: '', description: '', public: '' };
    };

    return {
      user,
      showModal,
      newListFormValue,
      newListFormRules,
      createMovieListAction,
      createNewList,
      cleanFormFields,
    };
  },
});
</script>

<style lang="scss"></style>
