import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number with optional suffix and decimal places
 */
export function formatNumber(
  value: number | null | undefined,
  options?: {
    suffix?: string
    decimals?: number
    thousands?: boolean
  }
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '—'
  }

  const { suffix = '', decimals = 2, thousands = true } = options || {}

  let formatted = thousands
    ? value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : value.toFixed(decimals)

  return `${formatted}${suffix}`
}

/**
 * Format a number as currency
 */
export function formatCurrency(
  value: number | null | undefined,
  currencyCode = 'USD'
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '—'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(
  value: number | null | undefined,
  decimals = 2
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '—'
  }

  const formatted = value.toFixed(decimals)
  // Show + sign for positive values
  const prefix = value > 0 ? '+' : ''
  return `${prefix}${formatted}%`
}

/**
 * Format a value with optional prefix, suffix, and K/M abbreviation for large numbers
 * Used in dashboard tables for values like volume, price change, etc.
 */
export function formatValue(
  value: number | null | undefined,
  options?: {
    prefix?: string
    suffix?: string
    abbrThreshold?: number
    abbrDecimals?: number
  }
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '—'
  }

  const {
    prefix = '',
    suffix = '',
    abbrThreshold = 1000,
    abbrDecimals = 1,
  } = options || {}

  const absValue = Math.abs(value)
  let formatted: string

  if (absValue >= abbrThreshold * 1000) {
    // Millions
    formatted = (value / 1_000_000).toFixed(abbrDecimals) + 'M'
  } else if (absValue >= abbrThreshold) {
    // Thousands
    formatted = (value / 1_000).toFixed(abbrDecimals) + 'K'
  } else {
    formatted = value.toFixed(2)
  }

  return `${prefix}${formatted}${suffix}`
}
