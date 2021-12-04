<template lang="">
  <n-form :model="model" ref="formRef" :rules="rules">
    <n-form-item path="username" label="User name">
      <n-input v-model:value="model.username" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="password" label="Password">
      <n-input
        v-model:value="model.password"
        @input="handlePasswordInput"
        type="password"
        @keydown.enter.prevent
      />
    </n-form-item>
  </n-form>
  <n-button @click="login">Sign Up</n-button>
</template>
<script>
import { defineComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { NForm, NFormItem, NInput, NButton } from 'naive-ui';
import { ref } from 'vue';

export default defineComponent({
  name: 'Login',
  setup(props) {
    const store = useStore();
    const model = ref({ username: '', password: '' });

    const login = (username, password) => {
      store.dispatch('login', { username: model.value.username, password: model.value.password });
    };

    return { model, login };
  },
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
  },
});
</script>
<style lang=""></style>
