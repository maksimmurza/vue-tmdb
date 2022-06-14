<template>
  <n-button
    title="Edit list"
    quaternary
    circle
    type="tertiary"
    size="small"
    @click.stop="showModal = true"
    :disabled="!user.userInfo"
    :loading="updateMovieListAction.loading"
    ><template #icon>
      <n-icon>
        <edit />
      </n-icon>
    </template>
  </n-button>

  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="Edit list"
    positive-text="Submit"
    @positive-click="editList"
    @negative-click="cleanFormFields"
    negative-text="Cancel"
  >
    <n-form :model="listFormValue" :rules="listFormRules">
      <n-form-item label="Name" path="name">
        <n-input v-model:value="listFormValue.name" placeholder="Input Name" />
      </n-form-item>
      <n-form-item label="Description">
        <n-input
          v-model:value="listFormValue.description"
          type="textarea"
          placeholder="Input Description"
        />
      </n-form-item>
      <n-form-item label="Access">
        <n-radio-group v-model:value="listFormValue.public">
          <n-space>
            <n-radio value="public">Public</n-radio>
            <n-radio value="private">Private</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Sort order">
        <n-select v-model:value="listFormValue.sort_by" :options="listMoviesSortOptions" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
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
  NSelect,
} from 'naive-ui';
import { useStore } from 'vuex';
import useListActions from '@/composables/useListActions';
import { MovieListDetails } from '@/types/fetching';
import { listMoviesSortOptions } from '../constants';
import { Edit } from '@vicons/fa';

export default defineComponent({
  name: 'EditListButton',
  components: {
    NButton,
    NModal,
    NIcon,
    NForm,
    NFormItem,
    NInput,
    NRadioGroup,
    NRadio,
    NSpace,
    NSelect,
    Edit,
  },
  props: {
    list: {
      type: Object as PropType<MovieListDetails>,
      required: true,
    },
  },
  emits: ['updated'],
  setup(props, { emit }) {
    const store = useStore();
    const user = computed(() => store.state.user);
    const { updateMovieListAction, updateMovieList } = useListActions();

    const showModal = ref(false);
    const listFormValue = ref({
      name: props.list?.name,
      description: props.list?.description,
      public: props.list?.public ? 'public' : 'private',
      sort_by: props.list?.sort_by,
    });
    const listFormRules = { name: { required: true, message: 'Please input your name' } };

    const editList = () => {
      props.list &&
        updateMovieList(user.value.userInfo.access_token, props.list.id, {
          ...listFormValue.value,
          public: listFormValue.value.public === 'public',
        })
          .then(cleanFormFields)
          .then(() => emit('updated'));
    };

    const cleanFormFields = () => {
      listFormValue.value = {
        name: props.list?.name,
        description: props.list?.description,
        public: props.list?.public ? 'public' : 'private',
        sort_by: props.list?.sort_by,
      };
    };

    return {
      user,
      showModal,
      listFormValue,
      listFormRules,
      listMoviesSortOptions,
      updateMovieListAction,
      editList,
      cleanFormFields,
    };
  },
});
</script>

<style lang="scss"></style>
