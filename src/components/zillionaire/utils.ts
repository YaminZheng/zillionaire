import { ref, Ref } from "vue";

export const loadImage = async (src: string) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.onload = resolve;
  });
};

export const useThrottle = <Args extends any[], R extends any>(fn: (...args: Args) => Promise<R>, interval = 1000) => {
  return (...args: Args) => {
    return new Promise<R>(async (resolve) => {
      const callTime = Date.now();
      let result = await fn(...args);
      setTimeout(() => {
        resolve(result);
      }, interval + callTime - Date.now());
    });
  };
};

export const waitAnimationEnd = (el: HTMLElement) => {
  return new Promise<void>((resove) => {
    const transitionend = () => {
      resove();
      el.removeEventListener("transitionend", transitionend);
      el.removeEventListener("transitionstart", transitionstart);
    };
    const transitioncancel = () => {
      resove();
      el.removeEventListener("transitioncancel", transitioncancel);
      el.removeEventListener("transitionstart", transitionstart);
    };
    const transitionstart = () => {
      el.addEventListener("transitionend", transitionend);
      el.addEventListener("transitioncancel", transitioncancel);
    };

    el.addEventListener("transitionstart", transitionstart);
  });
};

export const useLoadingEvent = <Args extends any[], R>(
  fn: (...args: Args) => Promise<R>
): [(...args: Args) => Promise<R | undefined>, Ref<boolean>] => {
  const loading = ref(false);
  const _fn = async (...args: Args) => {
    if (loading.value) return;
    try {
      loading.value = true;
      return await fn(...args);
    } finally {
      loading.value = false;
    }
  };
  return [_fn, loading];
};
