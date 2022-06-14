import { onMounted, onUnmounted, Ref, ref } from 'vue';

const useWidth = (): {
  width: Ref<number>;
  getWidth: () => number;
} => {
  const getWidth = () => {
    return window.innerWidth;
  };

  const width = ref(getWidth());

  const getNewWidth = () => {
    width.value = getWidth();
  };

  onMounted(() => {
    window.addEventListener('resize', getNewWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', getNewWidth);
  });

  return {
    width,
    getWidth,
  };
};

export default useWidth;
