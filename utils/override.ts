/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import type { ComputedGetter, DebuggerOptions } from 'vue'

function isComputedRef<T>(obj: any): obj is ComputedRef<T> {
  return obj && isRef(obj) && isReadonly(obj)
}

function createFunctionProxy<T extends Function>(base: T): T {
  const override: { value?: T } = {}
  return new Proxy(base, {
    get(target, prop, receiver) {
      if (prop === '__override') return override.value
      if (prop === '__base') return target
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      if (prop === '__override') {
        override.value = value
        return true
      }
      return Reflect.set(target, prop, value, receiver)
    },
    apply(target, thisArg, args) {
      return Reflect.apply(override.value || target, thisArg, args)
    },
  })
}

function createComputedProxy<T>(base: ComputedRef<T>): ComputedRef<T> {
  const override: { value?: ComputedRef<T> } = {}
  return new Proxy(base, {
    get(target, prop, receiver) {
      if (prop === 'value') return (override.value || target).value
      if (prop === '__override') return override.value
      if (prop === '__base') return target
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      if (prop === '__override') {
        override.value = value
        return true
      }
      return Reflect.set(target, prop, value, receiver)
    },
  })
}

export function overridable<T extends Function>(func: T): T
export function overridable<T>(computedRef: ComputedRef<T>): ComputedRef<T>
export function overridable<T>(base: T): unknown {
  if (typeof base === 'function') return createFunctionProxy(base)
  if (isComputedRef(base)) return createComputedProxy(base)
  throw new Error('Unsupported type for overridable')
}

export function ofunc<T extends Function>(func: T): T {
  return overridable(func)
}

export function ocomputed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T> {
  return overridable(computed(getter, debugOptions))
}

export function override<T>(base: T, override: T): void {
  (base as any).__override = override
}

/*
  oextends
*/
type ExtensionContext<R> = {
  target: R
  base: R
}

export function oextends<C extends (...args: any[]) => any, E>(
  baseComposable: C,
  extend: (ctx: ExtensionContext<ReturnType<C>>, ...args: Parameters<C>) => E,
): (...args: Parameters<C>) => ReturnType<C> & E {
  return (...args: Parameters<C>): ReturnType<C> & E => {
    const target = baseComposable(...args)

    const base = Object.fromEntries(
      Object.entries(target).map(([key, val]) => [
        key,
        (val as any)?.['__base'] ?? val,
      ]),
    ) as ReturnType<C>

    return Object.assign(
      target,
      extend({ target, base }, ...args),
    )
  }
}
