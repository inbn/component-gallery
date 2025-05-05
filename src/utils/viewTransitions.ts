export const transitionDOMUpdate = (callback: ViewTransitionUpdateCallback) => {
  if (!document.startViewTransition) {
    callback();
    return;
  }
  document.startViewTransition(callback);
};
