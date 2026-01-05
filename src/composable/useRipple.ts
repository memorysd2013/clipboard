import { type Ref } from 'vue';

export interface RippleOptions {
  color?: string;
  duration?: number;
}

export function useRipple(
  elementRef: Ref<HTMLElement | undefined> | HTMLElement,
  options: RippleOptions = {}
) {
  const { color = 'rgba(255, 255, 255, 0.5)', duration = 600 } = options;

  const createRipple = (event: MouseEvent) => {
    const element = elementRef instanceof HTMLElement ? elementRef : elementRef.value;
    if (!element) return;

    // Get element position and dimensions
    const rect = element.getBoundingClientRect();
    
    // Calculate click position relative to element
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate ripple radius (diagonal length of element to ensure full coverage)
    const size = Math.max(rect.width, rect.height);
    const radius = size * 2;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    // Set ripple initial position and size
    const diameter = radius * 2;
    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x - radius}px`;
    ripple.style.top = `${y - radius}px`;
    ripple.style.backgroundColor = color;
    
    // Append to element
    element.appendChild(ripple);
    
    // Trigger animation (use requestAnimationFrame to ensure styles are applied)
    requestAnimationFrame(() => {
      ripple.classList.add('ripple-active');
    });
    
    // Remove element after animation completes
    setTimeout(() => {
      ripple.remove();
    }, duration);
  };

  return {
    createRipple,
  };
}

