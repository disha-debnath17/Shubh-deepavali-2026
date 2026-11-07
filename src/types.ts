/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6;

export interface DecorationState {
  fairyLights: boolean;
  marigoldToran: boolean;
  rangoli: boolean;
  diyasCount: number; // 0 to 7
  stairLights?: boolean;
  litDiyaSlots?: string[];
}

export interface FamilyGiftConfig {
  id: string;
  name: string;
  relationship: string;
  giftTitle: string;
  giftImage: string;
  message: string;
}

export interface CustomLetterConfig {
  salutation: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  closing: string;
  signature: string;
}

export interface VisitorProfile {
  name: string;
  state: string; // Indian State or Union Territory
  city?: string; // Optional city (e.g. Kolkata, Bengaluru, Mumbai, Chennai)
  isGuest?: boolean;
  role?: string; // Optional role (e.g. maa, papa, sister, brother, bestie)
}

export type RegionalActivityType =
  | 'choddo-prodip'
  | 'alpona-creator'
  | 'kali-pujo'
  | 'faral-platter'
  | 'diwali-pahat'
  | 'shivaji-fort'
  | 'chopda-pujan'
  | 'gujarati-rangoli'
  | 'saal-mubarak'
  | 'enne-mejjana'
  | 'bali-padyami'
  | 'ganga-snanam'
  | 'ayodhya-deepotsav'
  | 'badabadua-daka'
  | 'bandi-chhor'
  | 'rajasthani-mandana'
  | 'narakasura-dahan'
  | 'universal-tradition';

export interface RegionalActivity {
  id: string;
  regionId: string;
  type: RegionalActivityType;
  title: {
    en: string;
    hi: string;
    bn: string;
  };
  subtitle: {
    en: string;
    hi: string;
    bn: string;
  };
  badge: {
    en: string;
    hi: string;
    bn: string;
  };
  icon: string;
  illustrationType: string;
  significance: {
    en: string;
    hi: string;
    bn: string;
  };
  whyWeCelebrate: {
    what: { en: string; hi: string; bn: string };
    why: { en: string; hi: string; bn: string };
    significance: { en: string; hi: string; bn: string };
    connection: { en: string; hi: string; bn: string };
  };
}
