// src/lib/spin-viewer/SpinViewer.js
/**
 * src/lib/spin-viewer/SpinViewer.js
 *
 * Minimal, efficient 360° spin viewer component.
 * - No external dependencies
 * - Props: quantity, imagePath, fileName, startIndex, autoplay, fps, preload
 * - Imperative API via ref: play(), pause(), next(), prev(), goTo(index), getIndex()
 *
 * Design notes:
 * - Uses an <img> element and updates src to change frames (keeps DOM minimal).
 * - Uses imageCache.preload with concurrent requests to manage network load.
 * - Drag/swipe implemented with Pointer events for unified behavior.
 * - Autoplay uses requestAnimationFrame for smooth timing.
 */

import React, {
    useRef,
    useEffect,
    useCallback,
    useImperativeHandle,
    forwardRef,
    useState
  } from "react";
  import { preload, isLoaded } from "../../utils/imageCache";
  import "./SpinViewer.css";
  
  function clampIndex(i, quantity) {
    // keep 1..quantity inclusive with wrap-around
    const q = Math.max(1, quantity || 1);
    let idx = ((i - 1) % q) + 1;
    if (idx <= 0) idx += q;
    return idx;
  }
  
  const DEFAULTS = {
    startIndex: 1,
    fileName: "output_{index}.jpeg",
    autoplay: false,
    fps: 24,
    preload: 3,
    sensitivity: 1.0,
    reverse: false,
    width: 600
  };
  
  function formatFileName(pattern, index) {
    return pattern.replace("{index}", String(index));
  }
  
  function joinPath(base, file) {
    if (!base) return file;
    if (base.endsWith("/")) return base + file.replace(/^\//, "");
    return base + "/" + file.replace(/^\//, "");
  }
  
  const SpinViewer = forwardRef(function SpinViewer(props, ref) {
    const {
      quantity,
      imagePath,
      fileName = DEFAULTS.fileName,
      startIndex = DEFAULTS.startIndex,
      autoplay = DEFAULTS.autoplay,
      fps = DEFAULTS.fps,
      preload: preloadCount = DEFAULTS.preload,
      sensitivity = DEFAULTS.sensitivity,
      reverse = DEFAULTS.reverse,
      width = DEFAULTS.width,
      loop = true,
      style = {},
      alt = "360 view"
    } = props;
  
    if (!quantity || quantity <= 0) {
      throw new Error("SpinViewer requires a positive `quantity` prop");
    }
  
    const containerRef = useRef(null);
    const imgRef = useRef(null);
  
    // we keep index in state so parent/demo can show current frame if desired.
    const [index, setIndex] = useState(clampIndex(startIndex, quantity));
    const indexRef = useRef(index);
    indexRef.current = index;
  
    // autoplay internals
    const playingRef = useRef(Boolean(autoplay));
    const rafRef = useRef(null);
    const lastTimeRef = useRef(null);
    const fpsInterval = 1000 / Math.max(1, fps);
  
    // pointer drag internals
    const pointerDataRef = useRef({
      dragging: false,
      startX: 0,
      startIndex: indexRef.current,
      containerWidth: width
    });
  
    // generate src for a given index
    const srcForIndex = useCallback(
      (i) => {
        const file = formatFileName(fileName, i);
        return joinPath(imagePath || process.env.PUBLIC_URL + "/images", file);
      },
      [imagePath, fileName]
    );
  
    // change shown frame (updates both DOM and state)
    const showIndex = useCallback(
      (i) => {
        const idx = clampIndex(i, quantity);
        const src = srcForIndex(idx);
        const el = imgRef.current;
        if (el) {
          // If already loaded in cache, src change is fast
          el.src = src;
        }
        // update state (so consumers can read)
        setIndex(idx);
      },
      [quantity, srcForIndex]
    );
  
    // Preload strategy: ensure current + neighbors are queued.
    const doPreloadAround = useCallback(
      (center) => {
        const q = Math.max(1, quantity);
        const toPreload = [];
        // preload center and N ahead and behind
        for (let offset = 0; offset <= preloadCount; offset++) {
          const ahead = clampIndex(center + offset, q);
          const behind = clampIndex(center - offset, q);
          if (!toPreload.includes(ahead)) toPreload.push(ahead);
          if (!toPreload.includes(behind)) toPreload.push(behind);
        }
        toPreload.forEach((i) => {
          const s = srcForIndex(i);
          if (!isLoaded(s)) {
            preload(s).catch(() => {
              // ignore single-image errors; we keep trying on demand
            });
          }
        });
      },
      [preloadCount, quantity, srcForIndex]
    );
  
    // imperative API for parent components
    useImperativeHandle(
      ref,
      () => ({
        play: () => {
          if (!playingRef.current) {
            playingRef.current = true;
            lastTimeRef.current = null;
            startLoop();
          }
        },
        pause: () => {
          playingRef.current = false;
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        },
        next: () => {
          const delta = reverse ? 1 : -1;
          showIndex(indexRef.current + delta);
          doPreloadAround(indexRef.current + delta);
        },
        prev: () => {
          const delta = reverse ? -1 : 1;
          showIndex(indexRef.current + delta);
          doPreloadAround(indexRef.current + delta);
        },
        goTo: (i) => {
          showIndex(i);
          doPreloadAround(i);
        },
        getIndex: () => indexRef.current
      }),
      [doPreloadAround, reverse, showIndex]
    );
  
    // autoplay RAF loop
    const startLoop = useCallback(() => {
      function tick(ts) {
        if (!lastTimeRef.current) lastTimeRef.current = ts;
        const deltaTime = ts - lastTimeRef.current;
        if (playingRef.current && deltaTime >= fpsInterval) {
          lastTimeRef.current = ts;
          const delta = reverse ? -1 : 1;
          let nextIndex = indexRef.current + delta;
          if (!loop) {
            // stop at ends
            if (nextIndex > quantity) {
              playingRef.current = false;
              return;
            } else if (nextIndex < 1) {
              playingRef.current = false;
              return;
            }
          }
          showIndex(nextIndex);
          doPreloadAround(nextIndex);
        }
        if (playingRef.current) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    }, [doPreloadAround, fpsInterval, loop, quantity, reverse, showIndex]);
  
    // start/stop autoplay based on prop changes
    useEffect(() => {
      playingRef.current = Boolean(autoplay);
      if (playingRef.current) {
        lastTimeRef.current = null;
        startLoop();
      } else if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoplay, startLoop]);
  
    // initial load
    useEffect(() => {
      // show startIndex and preload neighbors
      showIndex(startIndex);
      doPreloadAround(startIndex);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once on mount
  
    // Pointer (drag) handlers
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
  
      function onPointerDown(e) {
        // only left button or touch
        if (e.pointerType === "mouse" && e.button !== 0) return;
        el.setPointerCapture && el.setPointerCapture(e.pointerId);
        pointerDataRef.current.dragging = true;
        pointerDataRef.current.startX = e.clientX;
        pointerDataRef.current.startIndex = indexRef.current;
        pointerDataRef.current.containerWidth = el.clientWidth || width;
      }
      function onPointerMove(e) {
        if (!pointerDataRef.current.dragging) return;
        const dx = e.clientX - pointerDataRef.current.startX;
        const contW = pointerDataRef.current.containerWidth || width;
        // frames change proportional to drag distance:
        // pixels -> frames mapping: (quantity / contW) * sensitivity
        const framesPerPixel = (quantity / Math.max(1, contW)) * sensitivity;
        let deltaFrames = Math.round(dx * framesPerPixel);
        if (reverse) deltaFrames = -deltaFrames;
        const target = pointerDataRef.current.startIndex + deltaFrames;
        showIndex(target);
        // preload around target for smoothness
        doPreloadAround(target);
      }
      function onPointerUp(e) {
        pointerDataRef.current.dragging = false;
        try {
          el.releasePointerCapture && el.releasePointerCapture(e.pointerId);
        } catch (err) {
          // ignore
        }
      }
  
      // wheel to spin
      function onWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 1 : -1;
        const step = reverse ? -delta : delta;
        showIndex(indexRef.current + step);
        doPreloadAround(indexRef.current + step);
      }
  
      // keyboard arrows
      function onKey(e) {
        if (document.activeElement !== document.body && document.activeElement !== el) {
          // don't hijack input interaction
          return;
        }
        if (e.key === "ArrowRight") {
          const step = reverse ? 1 : -1;
          showIndex(indexRef.current + step);
          doPreloadAround(indexRef.current + step);
        } else if (e.key === "ArrowLeft") {
          const step = reverse ? -1 : 1;
          showIndex(indexRef.current + step);
          doPreloadAround(indexRef.current + step);
        } else if (e.key === " ") {
          // space toggles play/pause
          e.preventDefault();
          if (playingRef.current) {
            playingRef.current = false;
          } else {
            playingRef.current = true;
            lastTimeRef.current = null;
            startLoop();
          }
        }
      }
  
      el.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      el.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("keydown", onKey);
  
      return () => {
        el.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        el.removeEventListener("wheel", onWheel);
        window.removeEventListener("keydown", onKey);
      };
    }, [doPreloadAround, quantity, reverse, sensitivity, showIndex, width]);
  
    // ensure current index shows after index state change (keeps img in sync)
    useEffect(() => {
      const src = srcForIndex(index);
      const el = imgRef.current;
      if (el && el.src !== src) {
        el.src = src;
      }
      // preload neighbors whenever index changes
      doPreloadAround(index);
    }, [index, doPreloadAround, srcForIndex]);
  
    // return
    const wrapperStyle = {
      width: typeof width === "number" ? `${width}px` : width,
      ...style
    };
  
    return (
      <div
        ref={containerRef}
        className="spinviewer"
        style={wrapperStyle}
        role="region"
        aria-label="360 degree viewer"
        tabIndex={0}
      >
        <img
          ref={imgRef}
          alt={alt}
          src={srcForIndex(index)}
          draggable={false}
          loading="eager"
        />
        <div className="controls" aria-hidden>
          {/* Minimal controls — could be expanded */}
          {/* <button
            onClick={() => {
              if (playingRef.current) {
                playingRef.current = false;
              } else {
                playingRef.current = true;
                lastTimeRef.current = null;
                startLoop();
              }
            }}
            title="Toggle play/pause"
          >
            {playingRef.current ? "Pause" : "Play"}
          </button> */}
          {/* <button
            onClick={() => {
              const step = reverse ? -1 : 1;
              showIndex(indexRef.current + step);
              doPreloadAround(indexRef.current + step);
            }}
            title="Next frame"
          >
            ▶
          </button> */}
        </div>
        <div className="sr-only" aria-live="polite">
          Frame {index} of {quantity}
        </div>
      </div>
    );
  });
  
  export default SpinViewer;
  