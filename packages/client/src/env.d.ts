/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: import("@wolf-project/db").User | null;
    t: import("@wolf-project/i18n").I18nLocale;
  }
}
