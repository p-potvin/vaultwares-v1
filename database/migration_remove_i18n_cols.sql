-- Migration: Remove per-language product columns
-- Run this on databases that have name_fr / description_fr columns (added in a previous migration).
-- After applying this, product localization is handled by server-side locale resource files
-- (locales/products.*.json) based on the Accept-Language header in each API request.

ALTER TABLE products DROP COLUMN IF EXISTS name_fr;
ALTER TABLE products DROP COLUMN IF EXISTS description_fr;
