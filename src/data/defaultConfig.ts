/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FamilyGiftConfig, CustomLetterConfig, VisitorProfile } from '../types';

export const DEFAULT_FAMILY_GIFTS: FamilyGiftConfig[] = [
  {
    id: 'maa',
    name: 'Maa',
    relationship: 'Mother',
    giftTitle: 'Saree',
    giftImage: '/gifts/saree.webp',
    message: 'For the person who makes every festival feel like home. Happy Diwali, Maa!',
  },
  {
    id: 'papa',
    name: 'Papa',
    relationship: 'Father',
    giftTitle: 'Watch and Kurta',
    giftImage: '/gifts/watch.webp',
    message: 'Thank you for always being our strength. Wishing you a wonderful Diwali, Papa!',
  },
  {
    id: 'brother',
    name: 'Brother',
    relationship: 'Brother',
    giftTitle: 'PS5',
    giftImage: '/gifts/ps5.webp',
    message: 'Another Diwali, another year of tolerating you. Game on, bhai! Happy Diwali!',
  },
  {
    id: 'sister',
    name: 'Sister',
    relationship: 'Sister',
    giftTitle: 'Camera and kit',
    giftImage: '/gifts/polaroid.webp',
    message: 'For all the memories we have made and the ones still to come. Happy Diwali, Didi!',
  },
  {
    id: 'grandparents',
    name: 'Dadu and Dadi',
    relationship: 'Grandparents',
    giftTitle: 'Hamper',
    giftImage: '/gifts/family.webp',
    message: 'Wishing you boundless health, peace, smiles, and warmth. Happy Diwali, Dadu and Dadi!',
  },
  {
    id: 'someoneSpecial',
    name: 'Someone Special ❤️',
    relationship: 'Special Bond',
    giftTitle: 'Hamper',
    giftImage: '/gifts/family.webp',
    message: 'To the one who illuminates my world with boundless happiness and love. Happy Diwali, with all my love ❤️',
  },
  {
    id: 'default',
    name: 'Family',
    relationship: 'Family',
    giftTitle: 'Hamper',
    giftImage: '/gifts/family.webp',
    message: 'May this festival of lights fill your life with warmth, success, joyous laughs, and endless blessings!',
  },
];

export const DEFAULT_LETTER: CustomLetterConfig = {
  salutation: 'Dear',
  p1: 'Another Diwali is here, bringing with it lights, laughter, sweets and beautiful memories.',
  p2: 'I hope this festival fills your life with happiness, brings peace to your heart and makes your home brighter than ever.',
  p3: 'No matter how busy life gets, family will always be one of the most beautiful gifts we have.',
  p4: 'Thank you for being a part of my world.',
  p5: 'Wishing you endless happiness, good health, prosperity and countless reasons to smile.',
  closing: 'With lots of love,',
  signature: 'Happy Diwali! 🪔❤️',
};

const GIFTS_STORAGE_KEY = 'shubh_diwali_gifts_v1';
const LETTER_STORAGE_KEY = 'shubh_diwali_letter_v1';

export function getStoredFamilyGifts(): FamilyGiftConfig[] {
  try {
    const raw = localStorage.getItem(GIFTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item: FamilyGiftConfig) => {
          let img = item.giftImage || '/images/family.webp';
          img = img
            .replace('/src/assets/images/', '/images/')
            .replace(/\.jpg$/, '.webp')
            .replace(/\/images\/gift_royal_saree.*\.webp/, '/images/saree.webp')
            .replace(/\/images\/gift_family_hamper.*\.webp/, '/images/family.webp')
            .replace(/\/gifts\/([a-zA-Z0-9_-]+)\.jpg$/, '/gifts/$1.webp');
          return {
            ...item,
            giftImage: img,
          };
        });
      }
    }
  } catch (e) {
    console.warn('Failed to load gifts from storage:', e);
  }
  return DEFAULT_FAMILY_GIFTS;
}

export function saveStoredFamilyGifts(gifts: FamilyGiftConfig[]): void {
  try {
    localStorage.setItem(GIFTS_STORAGE_KEY, JSON.stringify(gifts));
  } catch (e) {
    console.warn('Failed to save gifts to storage:', e);
  }
}

export function getStoredLetter(): CustomLetterConfig {
  try {
    const raw = localStorage.getItem(LETTER_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load letter from storage:', e);
  }
  return DEFAULT_LETTER;
}

export function saveStoredLetter(letter: CustomLetterConfig): void {
  try {
    localStorage.setItem(LETTER_STORAGE_KEY, JSON.stringify(letter));
  } catch (e) {
    console.warn('Failed to save letter to storage:', e);
  }
}

const USER_PROFILE_STORAGE_KEY = 'shubh_diwali_user_profile_v1';

export function getStoredUserProfile(): VisitorProfile | null {
  try {
    const raw = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.name === 'string') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load user profile from storage:', e);
  }
  return null;
}

export function saveStoredUserProfile(profile: VisitorProfile): void {
  try {
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Failed to save user profile to storage:', e);
  }
}

