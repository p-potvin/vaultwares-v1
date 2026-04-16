-- Migration: Add bilingual product columns
-- Run this on an existing database to add French translation columns

ALTER TABLE products ADD COLUMN IF NOT EXISTS name_fr VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS description_fr TEXT;

-- Update existing rows with French translations
UPDATE products SET
  name_fr = 'Aegis Network Sentry (IDS)',
  description_fr = 'Un système de détection d''intrusion (IDS) passerelle prêt à l''emploi qui analyse les paquets réseau en temps réel. Propulsé par un processeur quad-core haute performance, 8 Go de RAM et un SSD NVMe de 128 Go, il gère les vitesses gigabit (1 Gbps) sans effort. Détecte les modèles malveillants et vous alerte instantanément par e-mail. Parfait pour les petites entreprises et les foyers soucieux de la confidentialité. Zéro télémétrie, absolument aucun suivi. Support à distance sécurisé en option disponible.'
WHERE id = 'p-sentry-ids';

UPDATE products SET
  name_fr = 'Aegis Privacy Hub',
  description_fr = 'Reprenez le contrôle de votre réseau. Cette passerelle prête à l''emploi comprend un bloqueur de publicités AdGuard à l''échelle du réseau, un client VPN WireGuard intégré et un cryptage DNS de niveau militaire. Empêchez votre FAI d''espionner votre trafic et bloquez les traqueurs avant qu''ils n''atteignent vos appareils. Peut être utilisé seul ou intégré de manière transparente avec l''Aegis Network Sentry.'
WHERE id = 'p-privacy-hub';

UPDATE products SET
  name_fr = 'Routeur Mobile Sécurisé Nomad',
  description_fr = 'L''anonymat complet où que vous alliez. Un routeur Wi-Fi portable doté d''un chiffrement de tout le trafic et d''une eSIM préconfigurée, introuvable et non liée à votre identité. Créez une bulle de réseau privée et sécurisée dans n''importe quel hôtel, café ou aéroport.'
WHERE id = 'p-nomad-router';

UPDATE products SET
  name_fr = 'Phantom Pixel 8 (GrapheneOS)',
  description_fr = 'Un Google Pixel 8 reconditionné haut de gamme, flashé professionnellement avec GrapheneOS. Dépouillé de tous les services Google Play et de la télémétrie de suivi. Vivez le summum de la confidentialité mobile sans sacrifier les capacités modernes des smartphones.'
WHERE id = 'p-phantom-pixel';

UPDATE products SET
  name_fr = 'Ordinateur Portable Sécurisé LibreBook (QubesOS)',
  description_fr = 'La sécurité par la compartimentation. Un ordinateur portable entièrement construit à partir de composants matériels open source, fonctionnant avec QubesOS dès la sortie de la boîte. Isolez vos environnements de travail, personnels et sécurisés dans des machines virtuelles imposées par le matériel.'
WHERE id = 'p-libre-book';

UPDATE products SET
  name_fr = 'Liste de Filtres Ultime VaultWares',
  description_fr = 'Une liste de filtres méticuleusement organisée pour uBlock Origin et AdGuard. Fruit d''un an de travail, cette liste offre une sécurité maximale contre les traqueurs et les domaines malveillants, tout en corrigeant manuellement les dysfonctionnements sur les sites populaires pour une utilisabilité maximale. Livrée sous forme de lien d''abonnement sécurisé à mise à jour automatique.'
WHERE id = 'p-filter-list';
