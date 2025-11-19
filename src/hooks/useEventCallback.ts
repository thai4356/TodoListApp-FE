import { useCallback, useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useEventCallback = <Args extends unknown[], R>(fn: (...arg: Args) => R) => {
  const ref = useRef<(...arg: Args) => R>();

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback(
    function () {
      // eslint-disable-next-line prefer-spread
      return ref.current?.apply(
        ref,
        Array.from(
          {
            length: arguments.length,
          },
          // eslint-disable-next-line prefer-rest-params
          (_, i) => arguments[i],
        ) as Args,
      );
    },
    [ref],
  );
};

// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var react_1 = require("react");
// var __1 = require("..");
// function useEventCallback(fn) {
//     var ref = (0, react_1.useRef)(function () {
//         throw new Error('Cannot call an event handler while rendering.');
//     });
//     (0, __1.useIsomorphicLayoutEffect)(function () {
//         ref.current = fn;
//     }, [fn]);
//     return (0, react_1.useCallback)(function () {
//         var args = [];
//         for (var _i = 0; _i < arguments.length; _i++) {
//             args[_i] = arguments[_i];
//         }
//         return ref.current.apply(ref, args);
//     }, [ref]);
// }
// exports.default = useEventCallback;
