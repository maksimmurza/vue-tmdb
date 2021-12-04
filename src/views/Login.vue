<template lang="">
<n-spin :show="store.state.user.loading">
  <n-form :model="model" ref="formRef" :rules="rules" class="login-form" @keyup.enter="login">
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
  <n-button type="primary" @click="login" :disabled="model.username === '' || model.password ===''">Sign In</n-button>
  </n-form>
</n-spin>
</template>
<script>
import { defineComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { NForm, NFormItem, NInput, NButton, NSpin } from 'naive-ui';
import { ref } from 'vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore();
    const model = ref({ username: '', password: '' });

    const login = () => {
      store.dispatch('login', { username: model.value.username, password: model.value.password });
    };

    return { model, login, store };
  },
  components: {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NSpin
  },
});
</script>

<style lang="scss">
  .login-form {
    padding: 0 10vw;
    margin-top: 2rem;
  }
</style>
