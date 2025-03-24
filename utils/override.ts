/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import type { ComputedGetter, DebuggerOptions } from 'vue'

interface Overridable<T> {
  __base: T
  __override?: T
}

declare function isComputedRef<T>(obj: ComputedRef<T> | unknown): obj is ComputedRef<T>

function createFunctionProxy<T extends Function>(base: T): T & Overridable<T> {
  let override: T
  return new Proxy(base, {
    get(target, prop, receiver) {
      if (prop === '__override') return override
      if (prop === '__base') return target
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      if (prop === '__override') {
        override = value
        return true
      }
      return Reflect.set(target, prop, value, receiver)
    },
    apply(target, thisArg, args) {
      return Reflect.apply(override || target, thisArg, args)
    },
  }) as T & Overridable<T>
}

function createComputedProxy<T>(base: ComputedRef<T>): ComputedRef<T> & Overridable<ComputedRef<T>> {
  let override: ComputedRef<T>
  return new Proxy(base, {
    get(target, prop, receiver) {
      if (prop === 'value') return override.value || target.value
      if (prop === '__override') return override
      if (prop === '__base') return target
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      if (prop === '__override') {
        override = value
        return true
      }
      return Reflect.set(target, prop, value, receiver)
    },
  }) as ComputedRef<T> & Overridable<ComputedRef<T>>
}

export function overridable<T extends Function>(func: T): T & Overridable<T>
export function overridable<T>(computedRef: ComputedRef<T>): ComputedRef<T> & Overridable<ComputedRef<T>>
export function overridable<T>(base: T): unknown {
  if (typeof base === 'function') return createFunctionProxy(base)
  if (isComputedRef(base)) return createComputedProxy(base)
  throw new Error('Unsupported type for overridable')
}

export function ofunc<T extends Function>(func: T): T & Overridable<T> {
  return overridable(func)
}

export function ocomputed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T> & Overridable<ComputedRef<T>> {
  return overridable(computed(getter, debugOptions))
}

export function override<T>(base: Overridable<T>, override: T): void {
  base.__override = override
}

/*
  oextends
*/

type ComposableFunction<T extends object> = (...args: any[]) => T

type ExtensionContext<T extends object> = {
  target: T
  base: { [K in keyof T]: T[K] }
}

export function oextends<
  T extends object,
  F extends ComposableFunction<T>,
  E extends object,
>(
  baseComposable: F,
  extend: (ctx: ExtensionContext<T>, ...args: Parameters<F>) => E,
): (...args: Parameters<F>) => T & E {
  return (...args: Parameters<F>): T & E => {
    const target = baseComposable(...args)

    const base = Object.fromEntries(
      Object.entries(target).map(([key, val]) => [
        key,
        (val as any)?.['__base'] ?? val,
      ]),
    ) as { [K in keyof T]: T[K] }

    return Object.assign(
      target as T,
      extend({ target, base }, ...args),
    ) as T & E
  }
}
