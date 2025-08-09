declare module 'aos' {
  type AnchorPlacement =
    | 'top-bottom'
    | 'top-center'
    | 'top-top'
    | 'center-bottom'
    | 'center-center'
    | 'center-top'
    | 'bottom-bottom'
    | 'bottom-center'
    | 'bottom-top';

  type DisableOption = boolean | 'phone' | 'tablet' | 'mobile' | ((width?: number) => boolean);

  interface AOSOptions {
    // Base timing
    duration?: number; // default 400
    easing?: string; // any valid CSS timing function
    delay?: number; // default 0

    // Trigger behavior
    offset?: number; // offset (in px) from the original trigger point
    anchorPlacement?: AnchorPlacement; // which position of the element triggers the animation
    once?: boolean; // whether animation should happen only once
    mirror?: boolean; // whether elements should animate out while scrolling past them
    startEvent?: string; // name of the event dispatched on the document, that AOS should initialize on
    disable?: DisableOption; // disable condition

    // Performance
    throttleDelay?: number; // delay on throttle (resize, scroll)
    debounceDelay?: number; // delay on debounce used while resizing window
  }

  const AOS: {
    init: (options?: AOSOptions) => void;
    refresh: () => void;
    refreshHard?: () => void;
  };
  export default AOS;
}


