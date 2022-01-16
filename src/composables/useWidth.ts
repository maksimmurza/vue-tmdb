import { onMounted, Ref, ref } from 'vue';

const useWidth = (): {
  width: Ref<number>;
  getWidth: () => number;
} => {
  const getWidth = () => {
    return window.innerWidth;
  };

  const width = ref(getWidth());

  onMounted(() => {
    window.onresize = () => {
      width.value = getWidth();
    };
  });

  return {
    width,
    getWidth,
  };
};

export default useWidth;
