import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        store: '[ STORE ]',
        intel: '[ INTEL ]',
        login: '[ LOGIN ]',
        account: '[ ACCOUNT ]',
        logout: '[ LOGOUT ]',
      },
      home: {
        hero_tag: 'RECLAIM YOUR DIGITAL AUTONOMY',
        hero_title_1: 'Uncompromising',
        hero_title_2: 'Privacy & Security',
        hero_desc: 'VaultWares provides enterprise-grade Intrusion Detection Systems, GrapheneOS devices, QubesOS laptops, and telemetry-free network sentries to protect you from corporate surveillance and malicious actors.',
        btn_catalog: 'BROWSE CATALOG',
        btn_intel: 'READ OUR INTEL',
        feat_1_title: 'Zero Telemetry',
        feat_1_desc: 'Our hardware and software are stripped of all tracking. No analytics, no data collection, no compromises. Your data stays on your device.',
        feat_2_title: 'Open Source Hardware',
        feat_2_desc: 'Trust through transparency. Our laptops and routers are built on auditable open-source hardware and firmware, ensuring no hidden backdoors.',
        feat_3_title: 'Network Sovereignty',
        feat_3_desc: 'Take back control of your network with our Intrusion Detection Systems and Privacy Hubs. Block ISP snooping and malicious traffic at the gateway.',
        featured_hw: 'FEATURED HARDWARE',
        featured_hw_desc: 'Top-tier security appliances for uncompromising protection.',
        view_all: 'VIEW ALL [→]',
      },
      footer: {
        desc: 'Securing your digital life with enterprise-grade hardware and software solutions.',
        products: 'PRODUCTS',
        prod_hw: 'Hardware Security',
        prod_sw: 'Privacy Software',
        prod_all: 'All Products',
        support: 'SUPPORT',
        sup_docs: 'Documentation',
        sup_contact: 'Contact Us',
        sup_return: 'Return Policy',
        security: 'SECURITY',
        sec_e2e: 'End-to-End Encryption',
        sec_logs: 'Zero Logs Policy',
        sec_oss: 'Open Source Firmware',
        rights: 'VaultWares Inc. All rights reserved.',
      },
      store: {
        title: 'SECURE HARDWARE & SOFTWARE',
        desc: 'Enterprise-grade privacy tools for the uncompromising individual.',
        search_placeholder: 'Search products...',
        filter_all: 'All',
        filter_hw: 'Hardware',
        filter_sw: 'Software',
        no_results: 'NO RESULTS FOUND',
        no_results_desc: 'Try adjusting your search or filters.',
      },
      product: {
        add_to_cart: 'ADD TO CART',
        out_of_stock: 'OUT OF STOCK',
        in_stock: 'In Stock',
        sku: 'SKU',
        not_found: 'PRODUCT NOT FOUND',
        not_found_desc: 'The product you are looking for does not exist or has been removed.',
        back_to_store: 'BACK TO STORE',
      },
      cart: {
        title: 'SECURE CART',
        empty: 'YOUR CART IS EMPTY',
        empty_desc: 'Browse our catalog to find privacy-respecting hardware and software.',
        browse: 'BROWSE CATALOG',
        summary: 'ORDER SUMMARY',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        shipping_calc: 'Calculated at checkout',
        total: 'Total',
        checkout: 'PROCEED TO CHECKOUT',
        secure_payment: 'Encrypted 256-bit secure payment',
        taxes: 'Taxes',
      },
      checkout: {
        success: 'PAYMENT SUCCESSFUL',
        success_desc: 'Your order has been securely processed. A confirmation email has been sent via encrypted channel.',
        order_processed: 'Order',
        receipt_options: 'RECEIPT OPTIONS',
        save_pdf: 'SAVE AS PDF / PRINT',
        email_receipt: 'EMAIL RECEIPT TO:',
        receipt_sent: 'Receipt sent successfully.',
        back_to_store: 'BACK TO STORE',
        order_id: 'Order ID',
        return_home: 'RETURN TO HOME',
        title: 'SECURE CHECKOUT',
        secure_connection: 'AES 256-bit Encrypted Connection',
        contact_info: 'CONTACT INFORMATION',
        email: 'EMAIL ADDRESS',
        first_name: 'FIRST NAME',
        last_name: 'LAST NAME',
        shipping_address: 'SHIPPING ADDRESS',
        name: 'FULL NAME',
        address: 'STREET ADDRESS',
        city: 'CITY',
        country: 'COUNTRY',
        zip: 'POSTAL CODE',
        postal: 'POSTAL CODE',
        payment_details: 'PAYMENT DETAILS',
        payment: 'PAYMENT DETAILS',
        card_number: 'CARD NUMBER',
        card: 'CARD NUMBER',
        expiry: 'EXPIRATION DATE',
        exp: 'EXPIRATION DATE',
        cvc: 'CVC',
        pay_now: 'PAY NOW',
        pay_securely: 'PAY ${{total}} SECURELY',
        processing: 'PROCESSING ENCRYPTED TRANSACTION...',
        summary: 'ORDER SUMMARY',
        total: 'Total',
        free: 'Free',
      },
      blog: {
        title: 'THREAT INTEL & GUIDES',
        desc: 'Insights, guides, and philosophy on digital privacy, cybersecurity, and reclaiming your autonomy in the digital age.',
        read_more: 'READ MORE [→]',
        not_found: 'POST NOT FOUND',
        not_found_desc: 'The intel you are looking for does not exist or has been redacted.',
        back_to_intel: 'BACK TO INTEL',
        back_to_blog: 'BACK TO INTEL',
      },
      common: {
        add: 'ADD',
      },
      auth: {
        login_title: 'SECURE LOGIN',
        register_title: 'CREATE ACCOUNT',
        email: 'EMAIL ADDRESS',
        password: 'PASSWORD',
        first_name: 'FIRST NAME',
        last_name: 'LAST NAME',
        login_btn: 'LOGIN',
        register_btn: 'CREATE ACCOUNT',
        already_have_account: 'Already have an account?',
        no_account: "Don't have an account?",
        switch_login: 'Sign in',
        switch_register: 'Create one',
        login_error: 'Invalid email or password.',
        register_error: 'Registration failed. Email may already be in use.',
        login_to_checkout: 'You must be logged in to complete your purchase.',
        login_now: 'LOGIN TO CONTINUE',
        welcome: 'Welcome',
        orders_title: 'MY ORDERS',
        no_orders: 'No orders yet.',
        order_id: 'Order',
        order_date: 'Date',
        order_status: 'Status',
        order_total: 'Total',
        logout_confirm: 'You have been logged out.',
      },
      products: {
        'p-sentry-ids': {
          name: 'Aegis Network Sentry (IDS)',
          desc: 'A plug-and-play gateway Intrusion Detection System (IDS) that analyzes network packets in real-time. Powered by a high-performance quad-core CPU, 8GB RAM, and a 128GB NVMe SSD, it handles gigabit speeds (1 Gbps) effortlessly. Detects malicious patterns and alerts you instantly via email. Perfect for small businesses and privacy-conscious homes. Zero telemetry, absolutely no tracking. Optional secure remote support available.'
        },
        'p-privacy-hub': {
          name: 'Aegis Privacy Hub',
          desc: 'Take back control of your network. This plug-and-play gateway features a network-wide AdGuard adblocker, a built-in WireGuard VPN client, and military-grade DNS encryption. Stop your ISP from snooping on your traffic and block trackers before they reach your devices. Can be used standalone or integrated seamlessly with the Aegis Network Sentry.'
        },
        'p-nomad-router': {
          name: 'Nomad Secure Mobile Router',
          desc: 'Complete anonymity wherever you go. A portable Wi-Fi router featuring full-traffic encryption and a pre-configured, untraceable eSIM not tied to your identity. Create a private, secure network bubble in any hotel, cafe, or airport.'
        },
        'p-phantom-pixel': {
          name: 'Phantom Pixel 8 (GrapheneOS)',
          desc: 'A premium refurbished Google Pixel 8, professionally flashed with GrapheneOS. Stripped of all Google Play Services and tracking telemetry. Experience the pinnacle of mobile privacy without sacrificing modern smartphone capabilities.'
        },
        'p-libre-book': {
          name: 'LibreBook Secure Laptop (QubesOS)',
          desc: 'Security by compartmentalization. A laptop built entirely from open-source hardware components, running QubesOS out of the box. Isolate your work, personal, and secure environments in hardware-enforced virtual machines.'
        },
        'p-filter-list': {
          name: 'VaultWares Ultimate Filter List',
          desc: 'A meticulously curated filter list for uBlock Origin and AdGuard. Over a year in the making, this list provides maximum security against trackers and malicious domains while manually patching breakages on popular websites for maximum usability. Delivered as a secure, auto-updating subscription link.'
        }
      },
      posts: {
        'cybersecurity-basics': {
          title: 'Cybersecurity 101: The Basics of Digital Self-Defense',
          excerpt: 'Understanding the fundamental principles of cybersecurity is no longer optional. It is a baseline requirement for navigating the modern world.',
          content: `
# Cybersecurity 101: The Basics of Digital Self-Defense

In an era where our lives are inextricably linked to the digital realm, understanding the basics of cybersecurity is no longer a niche skill for IT professionals—it's a fundamental requirement for everyone. Think of it as digital self-defense.

At its core, cybersecurity is about protecting your devices, networks, and data from unauthorized access or criminal use. The foundation begins with **strong authentication**. Passwords like "Password123" are the digital equivalent of leaving your front door wide open. Using a password manager to generate and store unique, complex passwords for every single account is the critical first step.

Coupled with **Multi-Factor Authentication (MFA)**—preferably using an authenticator app or a hardware security key (like a YubiKey)—you create a robust barrier against the vast majority of automated attacks.

Furthermore, keeping your software updated is crucial. Those annoying update prompts are rarely just feature additions; they are often critical patches for newly discovered vulnerabilities. Ignoring them leaves known holes open for attackers to exploit. Cybersecurity isn't about achieving perfect invulnerability; it's about making yourself a difficult target. By implementing these baseline practices, you drastically reduce your risk profile.
          `,
          date: '2026-03-01',
          author: 'VaultWares Threat Intel',
          category: 'Guides'
        },
        'portable-routers': {
          title: 'The Unsung Hero of Travel: Why You Need a Portable Router',
          excerpt: 'Public Wi-Fi is a minefield. A portable router acts as your personal, encrypted gateway to the internet, no matter where you are.',
          content: `
# The Unsung Hero of Travel: Why You Need a Portable Router

Whether you're a digital nomad working from a cafe in Bali or a corporate traveler in a business hotel, public Wi-Fi is a persistent threat. These networks are inherently insecure, often lacking encryption and leaving your traffic vulnerable to interception by anyone else on the same network.

Enter the **portable travel router**. This compact device acts as a secure middleman between your devices and the public network. Instead of connecting your laptop, phone, and tablet directly to the hotel Wi-Fi, you connect the travel router to the hotel network, and then connect all your devices to your router's private, encrypted Wi-Fi network.

The real power of a portable router lies in its advanced features. Most modern travel routers allow you to configure a **VPN client directly on the device**. This means the moment your router connects to the internet, all traffic from all your connected devices is automatically routed through your VPN tunnel. You don't need to install VPN software on every individual device (which is often impossible for devices like smart TVs or gaming consoles).

Additionally, they provide a hardware firewall, isolating your devices from other users on the public network. For anyone who travels, a portable router isn't a luxury; it's a critical piece of security infrastructure.
          `,
          date: '2026-02-25',
          author: 'Network Security Team',
          category: 'Hardware'
        },
        'wireguard-revolution': {
          title: 'WireGuard: The Protocol Revolutionizing VPNs',
          excerpt: 'Faster, leaner, and more secure. Why WireGuard has rapidly become the gold standard for Virtual Private Networks.',
          content: `
# WireGuard: The Protocol Revolutionizing VPNs

For over a decade, OpenVPN and IPsec were the undisputed kings of the Virtual Private Network (VPN) landscape. They were robust and secure, but they were also incredibly complex, bloated with legacy code, and often sluggish—especially on mobile devices.

Then came **WireGuard**.

WireGuard represents a paradigm shift in VPN architecture. While OpenVPN consists of hundreds of thousands of lines of code, WireGuard is incredibly lean, clocking in at around 4,000 lines. This massive reduction in complexity has profound implications.

First, it makes the code vastly easier to audit for security vulnerabilities. A smaller attack surface inherently means fewer places for bugs to hide. Second, it is blisteringly fast. WireGuard utilizes state-of-the-art cryptography (like the Noise protocol framework, Curve25519, ChaCha20, and Poly1305) and lives inside the Linux kernel, resulting in connection speeds and throughput that leave legacy protocols in the dust.

Perhaps most importantly for modern users, WireGuard handles network transitions seamlessly. If you switch from Wi-Fi to cellular data on your phone, an OpenVPN connection will often drop and take several seconds to renegotiate. WireGuard handles this transition instantly, maintaining the secure tunnel without interruption. It is the modern standard for a reason.
          `,
          date: '2026-02-20',
          author: 'VaultWares Engineering',
          category: 'Software'
        },
        'openwrt-freedom': {
          title: 'Liberating Your Hardware: The Case for OpenWrt',
          excerpt: 'Consumer routers are often plagued by abandoned firmware and hidden backdoors. OpenWrt gives you back control of your network.',
          content: `
# Liberating Your Hardware: The Case for OpenWrt

When you buy a consumer router off the shelf, you are buying a black box. You are entirely dependent on the manufacturer to provide security updates, patch vulnerabilities, and respect your privacy. Historically, manufacturers have a terrible track record in this regard. Devices are often abandoned shortly after release, leaving them vulnerable to newly discovered exploits.

**OpenWrt** is a highly extensible, Linux-based, open-source operating system designed specifically for embedded devices like routers. By flashing your router with OpenWrt, you replace the manufacturer's proprietary, often-neglected firmware with a robust, community-maintained system.

The benefits are transformative. OpenWrt gives you granular control over your network traffic. You can install packages for network-wide ad blocking, deep packet inspection, advanced Quality of Service (QoS) rules, and secure VPN clients (like WireGuard).

More importantly, because it is open-source, the code is constantly scrutinized by a global community of security researchers. Vulnerabilities are patched quickly, long after the original manufacturer has stopped supporting the hardware. OpenWrt turns a disposable consumer electronic into a powerful, secure, and long-lasting network appliance.
          `,
          date: '2026-02-15',
          author: 'Network Security Team',
          category: 'Hardware'
        },
        'js-fingerprinting': {
          title: 'The Invisible Tracker: Browser Fingerprinting in JavaScript',
          excerpt: 'Clearing your cookies is no longer enough. How websites use JavaScript to uniquely identify you based on your hardware and software configuration.',
          content: `
# The Invisible Tracker: Browser Fingerprinting in JavaScript

For years, the standard privacy advice was simple: "Clear your cookies." While managing cookies is still important, the tracking industry has evolved far beyond simple text files stored on your hard drive. Today, the most insidious form of tracking is **browser fingerprinting**.

When you visit a website, your browser executes JavaScript. This script can query your browser for a vast array of seemingly innocuous details about your system: your screen resolution, your operating system, your time zone, the specific fonts installed on your machine, your battery level, and even the exact way your graphics card renders a hidden 3D object (Canvas fingerprinting).

Individually, none of these data points are unique. But when combined, they create a highly specific "fingerprint." Studies have shown that for the vast majority of users, this combination of attributes is entirely unique to them.

This means that even if you use a VPN to hide your IP address, use incognito mode, and block all cookies, a website can still identify you with a high degree of accuracy the moment you load their page. Combating fingerprinting requires specialized browsers (like Tor or hardened Firefox) that intentionally spoof or normalize these metrics to make you blend in with the crowd.
          `,
          date: '2026-02-10',
          author: 'Privacy Research Group',
          category: 'Privacy'
        },
        'scale-of-data-collection': {
          title: 'The Industrial Scale of Personal Data Collection',
          excerpt: 'We generate data with every click, every step, and every heartbeat. Understanding the sheer volume of harvested information is the first step to reclaiming it.',
          content: `
# The Industrial Scale of Personal Data Collection

It is difficult for the human mind to comprehend the sheer scale at which our personal data is currently being harvested. We have moved far beyond targeted ads based on our search history. We are now in the era of surveillance capitalism, where human experience itself is the raw material.

Consider a typical day. Your smartphone tracks your physical location down to the meter, 24/7. Your smartwatch monitors your heart rate, sleep patterns, and stress levels. Your smart speaker listens for wake words, occasionally recording ambient audio. Your vehicle transmits telemetry data, including your speed, braking habits, and frequent destinations.

This data is not kept in silos. It is aggregated, analyzed, and sold by data brokers—companies you have never heard of, with whom you have no relationship. They build comprehensive psychological profiles, predicting not just what you might buy, but your political leanings, your emotional vulnerabilities, and your future behavior.

This is not a conspiracy theory; it is the publicly stated business model of the modern internet. The infrastructure of the digital economy relies on the extraction of behavioral surplus. Recognizing the industrial scale of this operation is essential. Only by understanding the magnitude of the collection can we begin to take meaningful steps to limit our exposure.
          `,
          date: '2026-02-05',
          author: 'VaultWares Threat Intel',
          category: 'Privacy'
        },
        'corporate-control': {
          title: 'The Illusion of Choice: Corporate Control over Digital Life',
          excerpt: 'A handful of conglomerates control the infrastructure of the internet. How centralization threatens digital autonomy and what we can do about it.',
          content: `
# The Illusion of Choice: Corporate Control over Digital Life

When we browse the internet, it feels vast and infinite. Yet, the underlying infrastructure—the servers, the operating systems, the app stores, and the search algorithms—is controlled by a shockingly small number of massive conglomerates.

This centralization creates a profound power imbalance. When a single company controls the operating system on your phone, the browser you use to access the web, and the search engine you use to find information, they possess an unprecedented ability to shape your digital reality. They determine what apps you are allowed to install, what news you see, and what privacy settings are the "default."

This isn't about shadowy cabals; it's about the natural economic outcome of network effects and unregulated consolidation. However, the result is a digital environment where users have very little true autonomy. If a conglomerate decides to change its terms of service to allow more invasive tracking, the average user has no realistic choice but to accept it.

Reclaiming our digital autonomy requires a conscious effort to decentralize our digital lives. It means seeking out independent services, utilizing open protocols, and supporting platforms that prioritize user sovereignty over shareholder value. It requires effort, but the alternative is a digital landscape where we are tenants, not owners.
          `,
          date: '2026-01-30',
          author: 'Privacy Research Group',
          category: 'Opinion'
        },
        'importance-of-foss': {
          title: 'Code as Infrastructure: The Importance of Free and Open Source Software',
          excerpt: 'Why the future of human freedom in the digital age depends on software that anyone can inspect, modify, and share.',
          content: `
# Code as Infrastructure: The Importance of Free and Open Source Software

Software is no longer just a tool; it is the infrastructure of modern society. It controls our communications, our financial systems, our transportation, and our healthcare. When this infrastructure is proprietary—meaning it is closed-source and controlled by a single entity—we are forced to place blind trust in that entity.

**Free and Open Source Software (FOSS)** represents a fundamentally different approach. FOSS is software where the source code is made publicly available. Anyone can inspect it, modify it, and distribute it.

The importance of FOSS extends far beyond cost. It is about transparency and security. When code is open, independent security researchers can audit it for vulnerabilities and backdoors. It is about longevity; if a company abandons a proprietary product, it dies. If a company abandons an open-source project, the community can fork it and keep it alive.

Most importantly, FOSS is about human freedom. In a world increasingly mediated by algorithms, the ability to understand and control those algorithms is a prerequisite for autonomy. Supporting FOSS—whether by using it, contributing to it, or funding it—is not just a technical choice; it is a commitment to a transparent and equitable digital future.
          `,
          date: '2026-01-25',
          author: 'VaultWares Engineering',
          category: 'Philosophy'
        },
        'never-too-late': {
          title: 'The Best Time to Plant a Tree: It\'s Never Too Late for Privacy',
          excerpt: 'Feeling overwhelmed by your digital footprint? Don\'t succumb to privacy nihilism. Every step you take today matters.',
          content: `
# The Best Time to Plant a Tree: It's Never Too Late for Privacy

A common sentiment among people waking up to the realities of digital surveillance is "privacy nihilism." They look at the decades of data they have already generated—the old social media posts, the location history, the leaked passwords—and conclude that the battle is already lost. "They already know everything about me," the thinking goes, "so why bother?"

This is a dangerous fallacy. Privacy is not a binary state of being completely anonymous or completely exposed. It is a spectrum.

Think of your digital footprint like financial debt. Yes, you may have accumulated a lot of it in the past. But that doesn't mean you should continue maxing out your credit cards today. Every tracker you block, every service you replace with a privacy-respecting alternative, and every piece of data you refuse to hand over is a step toward reducing your exposure.

Data also has a half-life. The information brokers hold about your habits from five years ago is significantly less valuable than the real-time data you are generating right now. By changing your habits today, you begin to starve the algorithms of the fresh data they need to maintain accurate profiles. It is never too late to start taking your privacy seriously.
          `,
          date: '2026-01-20',
          author: 'VaultWares Threat Intel',
          category: 'Guides'
        },
        'childrens-privacy': {
          title: 'Born into the Panopticon: Protecting Children in the Digital Age',
          excerpt: 'Today\'s children are the first generation to have their entire lives quantified and tracked from birth. We have a moral obligation to protect their digital future.',
          content: `
# Born into the Panopticon: Protecting Children in the Digital Age

Previous generations had the luxury of making mistakes in relative obscurity. Today's children are born into a digital panopticon. From the moment their parents post their first ultrasound picture on social media, their digital footprint begins to grow.

By the time a child is old enough to understand the concept of privacy, a vast dossier on their life—their location history, their educational progress, their behavioral patterns, and their social interactions—has already been compiled by educational software, social media platforms, and connected toys.

We have a profound moral obligation to act as stewards of our children's privacy until they are old enough to manage it themselves. This means resisting the urge to overshare every moment of their lives online ("sharenting"). It means carefully scrutinizing the privacy policies of the apps and devices we bring into our homes. It means having age-appropriate conversations about digital hygiene, teaching them that their data is valuable and should be protected.

We must equip the next generation with the tools and the mindset to navigate a world that constantly seeks to extract their data. Their future autonomy depends on the boundaries we help them establish today.
          `,
          date: '2026-01-15',
          author: 'Privacy Research Group',
          category: 'Opinion'
        }
      }
    }
  },
  fr: {
    translation: {
      nav: {
        store: '[ BOUTIQUE ]',
        intel: '[ INFOS ]',
        login: '[ CONNEXION ]',
        account: '[ MON COMPTE ]',
        logout: '[ DÉCONNEXION ]',
      },
      home: {
        hero_tag: 'REPRENEZ VOTRE AUTONOMIE NUMÉRIQUE',
        hero_title_1: 'Sans compromis',
        hero_title_2: 'Confidentialité & Sécurité',
        hero_desc: 'VaultWares fournit des Systèmes de Détection d\'Intrusion de niveau entreprise, des appareils GrapheneOS, des ordinateurs portables QubesOS et des sentinelles réseau sans télémétrie pour vous protéger de la surveillance corporative et des acteurs malveillants.',
        btn_catalog: 'PARCOURIR LE CATALOGUE',
        btn_intel: 'LIRE NOS INFOS',
        feat_1_title: 'Zéro Télémétrie',
        feat_1_desc: 'Notre matériel et nos logiciels sont dépourvus de tout traçage. Pas d\'analyse, pas de collecte de données, pas de compromis. Vos données restent sur votre appareil.',
        feat_2_title: 'Matériel Open Source',
        feat_2_desc: 'La confiance par la transparence. Nos ordinateurs portables et routeurs sont construits sur du matériel et des firmwares open source vérifiables, garantissant l\'absence de portes dérobées cachées.',
        feat_3_title: 'Souveraineté Réseau',
        feat_3_desc: 'Reprenez le contrôle de votre réseau avec nos Systèmes de Détection d\'Intrusion et nos Hubs de Confidentialité. Bloquez l\'espionnage des FAI et le trafic malveillant à la passerelle.',
        featured_hw: 'MATÉRIEL PHARE',
        featured_hw_desc: 'Appareils de sécurité haut de gamme pour une protection sans compromis.',
        view_all: 'TOUT VOIR [→]',
      },
      footer: {
        desc: 'Sécuriser votre vie numérique avec des solutions matérielles et logicielles de niveau entreprise.',
        products: 'PRODUITS',
        prod_hw: 'Sécurité Matérielle',
        prod_sw: 'Logiciels de Confidentialité',
        prod_all: 'Tous les Produits',
        support: 'SUPPORT',
        sup_docs: 'Documentation',
        sup_contact: 'Nous Contacter',
        sup_return: 'Politique de Retour',
        security: 'SÉCURITÉ',
        sec_e2e: 'Chiffrement de Bout en Bout',
        sec_logs: 'Politique Zéro Log',
        sec_oss: 'Firmware Open Source',
        rights: 'VaultWares Inc. Tous droits réservés.',
      },
      store: {
        title: 'MATÉRIEL & LOGICIEL SÉCURISÉS',
        desc: 'Outils de confidentialité de niveau entreprise pour l\'individu intransigeant.',
        search_placeholder: 'Rechercher des produits...',
        filter_all: 'Tous',
        filter_hw: 'Matériel',
        filter_sw: 'Logiciel',
        no_results: 'AUCUN RÉSULTAT TROUVÉ',
        no_results_desc: 'Essayez d\'ajuster votre recherche ou vos filtres.',
      },
      product: {
        add_to_cart: 'AJOUTER AU PANIER',
        out_of_stock: 'ÉPUISÉ',
        in_stock: 'En Stock',
        sku: 'SKU',
        not_found: 'PRODUIT INTROUVABLE',
        not_found_desc: 'Le produit que vous recherchez n\'existe pas ou a été supprimé.',
        back_to_store: 'RETOUR À LA BOUTIQUE',
      },
      cart: {
        title: 'PANIER SÉCURISÉ',
        empty: 'VOTRE PANIER EST VIDE',
        empty_desc: 'Parcourez notre catalogue pour trouver du matériel et des logiciels respectueux de la vie privée.',
        browse: 'PARCOURIR LE CATALOGUE',
        summary: 'RÉSUMÉ DE LA COMMANDE',
        subtotal: 'Sous-total',
        shipping: 'Expédition',
        shipping_calc: 'Calculé à la caisse',
        total: 'Total',
        checkout: 'PROCÉDER AU PAIEMENT',
        secure_payment: 'Paiement sécurisé chiffré en 256 bits',
        taxes: 'Taxes',
      },
      checkout: {
        success: 'PAIEMENT RÉUSSI',
        success_desc: 'Votre commande a été traitée en toute sécurité. Un e-mail de confirmation a été envoyé via un canal crypté.',
        order_processed: 'La commande',
        receipt_options: 'OPTIONS DE REÇU',
        save_pdf: 'ENREGISTRER EN PDF / IMPRIMER',
        email_receipt: 'ENVOYER LE REÇU PAR EMAIL À :',
        receipt_sent: 'Reçu envoyé avec succès.',
        back_to_store: 'RETOUR À LA BOUTIQUE',
        order_id: 'ID de Commande',
        return_home: 'RETOUR À L\'ACCUEIL',
        title: 'PAIEMENT SÉCURISÉ',
        secure_connection: 'Connexion Chiffrée AES 256 bits',
        contact_info: 'COORDONNÉES',
        email: 'ADRESSE EMAIL',
        first_name: 'PRÉNOM',
        last_name: 'NOM DE FAMILLE',
        shipping_address: 'ADRESSE DE LIVRAISON',
        name: 'NOM COMPLET',
        address: 'ADRESSE POSTALE',
        city: 'VILLE',
        country: 'PAYS',
        zip: 'CODE POSTAL',
        postal: 'CODE POSTAL',
        payment_details: 'DÉTAILS DU PAIEMENT',
        payment: 'DÉTAILS DE PAIEMENT',
        card_number: 'NUMÉRO DE CARTE',
        card: 'NUMÉRO DE CARTE',
        expiry: 'DATE D\'EXPIRATION',
        exp: 'DATE D\'EXPIRATION',
        cvc: 'CVC',
        pay_now: 'PAYER MAINTENANT',
        pay_securely: 'PAYER ${{total}} EN TOUTE SÉCURITÉ',
        processing: 'TRAITEMENT DE LA TRANSACTION CHIFFRÉE...',
        summary: 'RÉSUMÉ DE LA COMMANDE',
        total: 'Total',
        free: 'Gratuit',
      },
      blog: {
        title: 'SÉCURITÉ INFOS',
        desc: 'Aperçus, guides et philosophie sur la confidentialité numérique, la cybersécurité et la reconquête de votre autonomie à l\'ère numérique.',
        read_more: 'LIRE LA SUITE [→]',
        not_found: 'ARTICLE INTROUVABLE',
        not_found_desc: 'Les informations que vous recherchez n\'existent pas ou ont été expurgées.',
        back_to_intel: 'RETOUR AUX INFOS',
        back_to_blog: 'RETOUR AUX INFOS',
      },
      common: {
        add: 'AJOUTER',
      },
      auth: {
        login_title: 'CONNEXION SÉCURISÉE',
        register_title: 'CRÉER UN COMPTE',
        email: 'ADRESSE EMAIL',
        password: 'MOT DE PASSE',
        first_name: 'PRÉNOM',
        last_name: 'NOM DE FAMILLE',
        login_btn: 'SE CONNECTER',
        register_btn: 'CRÉER UN COMPTE',
        already_have_account: 'Vous avez déjà un compte ?',
        no_account: "Vous n'avez pas de compte ?",
        switch_login: 'Se connecter',
        switch_register: 'En créer un',
        login_error: 'Email ou mot de passe invalide.',
        register_error: "L'inscription a échoué. L'email est peut-être déjà utilisé.",
        login_to_checkout: 'Vous devez être connecté pour finaliser votre achat.',
        login_now: 'SE CONNECTER POUR CONTINUER',
        welcome: 'Bienvenue',
        orders_title: 'MES COMMANDES',
        no_orders: 'Aucune commande pour le moment.',
        order_id: 'Commande',
        order_date: 'Date',
        order_status: 'Statut',
        order_total: 'Total',
        logout_confirm: 'Vous avez été déconnecté.',
      },
      products: {
        'p-sentry-ids': {
          name: 'Aegis Network Sentry (IDS)',
          desc: 'Un système de détection d\'intrusion (IDS) passerelle prêt à l\'emploi qui analyse les paquets réseau en temps réel. Propulsé par un processeur quad-core haute performance, 8 Go de RAM et un SSD NVMe de 128 Go, il gère les vitesses gigabit (1 Gbps) sans effort. Détecte les modèles malveillants et vous alerte instantanément par e-mail. Parfait pour les petites entreprises et les foyers soucieux de la confidentialité. Zéro télémétrie, absolument aucun suivi. Support à distance sécurisé en option disponible.'
        },
        'p-privacy-hub': {
          name: 'Aegis Privacy Hub',
          desc: 'Reprenez le contrôle de votre réseau. Cette passerelle prête à l\'emploi comprend un bloqueur de publicités AdGuard à l\'échelle du réseau, un client VPN WireGuard intégré et un cryptage DNS de niveau militaire. Empêchez votre FAI d\'espionner votre trafic et bloquez les traqueurs avant qu\'ils n\'atteignent vos appareils. Peut être utilisé seul ou intégré de manière transparente avec l\'Aegis Network Sentry.'
        },
        'p-nomad-router': {
          name: 'Routeur Mobile Sécurisé Nomad',
          desc: 'Anonymat complet où que vous alliez. Un routeur Wi-Fi portable doté d\'un cryptage de trafic complet et d\'une eSIM préconfigurée et intraçable, non liée à votre identité. Créez une bulle réseau privée et sécurisée dans n\'importe quel hôtel, café ou aéroport.'
        },
        'p-phantom-pixel': {
          name: 'Phantom Pixel 8 (GrapheneOS)',
          desc: 'Un Google Pixel 8 reconditionné haut de gamme, flashé par des professionnels avec GrapheneOS. Dépouillé de tous les services Google Play et de la télémétrie de suivi. Découvrez le summum de la confidentialité mobile sans sacrifier les capacités des smartphones modernes.'
        },
        'p-libre-book': {
          name: 'Ordinateur Portable Sécurisé LibreBook (QubesOS)',
          desc: 'La sécurité par le cloisonnement. Un ordinateur portable entièrement construit à partir de composants matériels open source, fonctionnant sous QubesOS dès la sortie de la boîte. Isolez vos environnements de travail, personnels et sécurisés dans des machines virtuelles appliquées par le matériel.'
        },
        'p-filter-list': {
          name: 'Liste de Filtres Ultime VaultWares',
          desc: 'Une liste de filtres méticuleusement organisée pour uBlock Origin et AdGuard. Plus d\'un an de préparation, cette liste offre une sécurité maximale contre les traqueurs et les domaines malveillants tout en corrigeant manuellement les pannes sur les sites Web populaires pour une utilisation maximale. Livré sous forme de lien d\'abonnement sécurisé à mise à jour automatique.'
        }
      },
      posts: {
        'cybersecurity-basics': {
          title: 'Cybersécurité 101 : Les bases de l\'autodéfense numérique',
          excerpt: 'Comprendre les principes fondamentaux de la cybersécurité n\'est plus facultatif. C\'est une exigence fondamentale pour naviguer dans le monde moderne.',
          content: `
# Cybersécurité 101 : Les bases de l'autodéfense numérique

À une époque où nos vies sont inextricablement liées au domaine numérique, comprendre les bases de la cybersécurité n'est plus une compétence de niche pour les professionnels de l'informatique : c'est une exigence fondamentale pour tous. Considérez cela comme de l'autodéfense numérique.

À la base, la cybersécurité consiste à protéger vos appareils, réseaux et données contre tout accès non autorisé ou utilisation criminelle. La base commence par une **authentification forte**. Des mots de passe comme "Motdepasse123" sont l'équivalent numérique de laisser votre porte d'entrée grande ouverte. L'utilisation d'un gestionnaire de mots de passe pour générer et stocker des mots de passe uniques et complexes pour chaque compte est la première étape critique.

Couplé à l'**authentification multifacteur (MFA)**, de préférence à l'aide d'une application d'authentification ou d'une clé de sécurité matérielle (comme une YubiKey), vous créez une barrière robuste contre la grande majorité des attaques automatisées.

De plus, il est crucial de maintenir vos logiciels à jour. Ces invites de mise à jour ennuyeuses sont rarement de simples ajouts de fonctionnalités ; ce sont souvent des correctifs critiques pour des vulnérabilités nouvellement découvertes. En les ignorant, vous laissez des failles connues ouvertes pour que les attaquants puissent les exploiter. La cybersécurité ne consiste pas à atteindre une invulnérabilité parfaite ; il s'agit de vous rendre une cible difficile. En mettant en œuvre ces pratiques de base, vous réduisez considérablement votre profil de risque.
          `,
          date: '2026-03-01',
          author: 'VaultWares Threat Intel',
          category: 'Guides'
        },
        'portable-routers': {
          title: 'Le héros méconnu du voyage : pourquoi vous avez besoin d\'un routeur portable',
          excerpt: 'Le Wi-Fi public est un champ de mines. Un routeur portable agit comme votre passerelle personnelle et cryptée vers Internet, où que vous soyez.',
          content: `
# Le héros méconnu du voyage : pourquoi vous avez besoin d'un routeur portable

Que vous soyez un nomade numérique travaillant depuis un café à Bali ou un voyageur d'affaires dans un hôtel d'entreprise, le Wi-Fi public est une menace persistante. Ces réseaux sont intrinsèquement peu sûrs, manquant souvent de cryptage et laissant votre trafic vulnérable à l'interception par quiconque sur le même réseau.

Entrez dans le **routeur de voyage portable**. Cet appareil compact agit comme un intermédiaire sécurisé entre vos appareils et le réseau public. Au lieu de connecter votre ordinateur portable, votre téléphone et votre tablette directement au Wi-Fi de l'hôtel, vous connectez le routeur de voyage au réseau de l'hôtel, puis vous connectez tous vos appareils au réseau Wi-Fi privé et crypté de votre routeur.

La véritable puissance d'un routeur portable réside dans ses fonctionnalités avancées. La plupart des routeurs de voyage modernes vous permettent de configurer un **client VPN directement sur l'appareil**. Cela signifie qu'au moment où votre routeur se connecte à Internet, tout le trafic de tous vos appareils connectés est automatiquement acheminé via votre tunnel VPN. Vous n'avez pas besoin d'installer de logiciel VPN sur chaque appareil individuel (ce qui est souvent impossible pour des appareils comme les téléviseurs intelligents ou les consoles de jeu).

De plus, ils fournissent un pare-feu matériel, isolant vos appareils des autres utilisateurs sur le réseau public. Pour quiconque voyage, un routeur portable n'est pas un luxe ; c'est un élément critique de l'infrastructure de sécurité.
          `,
          date: '2026-02-25',
          author: 'Network Security Team',
          category: 'Matériel'
        },
        'wireguard-revolution': {
          title: 'WireGuard : Le protocole qui révolutionne les VPN',
          excerpt: 'Plus rapide, plus léger et plus sécurisé. Pourquoi WireGuard est rapidement devenu la référence en matière de réseaux privés virtuels.',
          content: `
# WireGuard : Le protocole qui révolutionne les VPN

Pendant plus d'une décennie, OpenVPN et IPsec ont été les rois incontestés du paysage des réseaux privés virtuels (VPN). Ils étaient robustes et sécurisés, mais ils étaient aussi incroyablement complexes, gonflés de code hérité et souvent lents, en particulier sur les appareils mobiles.

Puis vint **WireGuard**.

WireGuard représente un changement de paradigme dans l'architecture VPN. Alors qu'OpenVPN se compose de centaines de milliers de lignes de code, WireGuard est incroyablement léger, avec environ 4 000 lignes. Cette réduction massive de la complexité a de profondes implications.

Premièrement, cela rend le code beaucoup plus facile à auditer pour les vulnérabilités de sécurité. Une surface d'attaque plus petite signifie intrinsèquement moins d'endroits où les bogues peuvent se cacher. Deuxièmement, il est incroyablement rapide. WireGuard utilise une cryptographie de pointe (comme le framework de protocole Noise, Curve25519, ChaCha20 et Poly1305) et vit à l'intérieur du noyau Linux, ce qui entraîne des vitesses de connexion et un débit qui laissent les protocoles hérités dans la poussière.

Peut-être plus important encore pour les utilisateurs modernes, WireGuard gère les transitions de réseau de manière transparente. Si vous passez du Wi-Fi aux données cellulaires sur votre téléphone, une connexion OpenVPN s'interrompra souvent et mettra plusieurs secondes à se renégocier. WireGuard gère cette transition instantanément, en maintenant le tunnel sécurisé sans interruption. C'est la norme moderne pour une raison.
          `,
          date: '2026-02-20',
          author: 'VaultWares Engineering',
          category: 'Logiciel'
        },
        'openwrt-freedom': {
          title: 'Libérer votre matériel : le cas d\'OpenWrt',
          excerpt: 'Les routeurs grand public sont souvent en proie à des micrologiciels abandonnés et à des portes dérobées cachées. OpenWrt vous redonne le contrôle de votre réseau.',
          content: `
# Libérer votre matériel : le cas d'OpenWrt

Lorsque vous achetez un routeur grand public dans le commerce, vous achetez une boîte noire. Vous dépendez entièrement du fabricant pour fournir des mises à jour de sécurité, corriger les vulnérabilités et respecter votre vie privée. Historiquement, les fabricants ont de très mauvais antécédents à cet égard. Les appareils sont souvent abandonnés peu de temps après leur sortie, les laissant vulnérables aux exploits nouvellement découverts.

**OpenWrt** est un système d'exploitation open source basé sur Linux, hautement extensible, conçu spécifiquement pour les appareils embarqués comme les routeurs. En flashant votre routeur avec OpenWrt, vous remplacez le micrologiciel propriétaire et souvent négligé du fabricant par un système robuste et maintenu par la communauté.

Les avantages sont transformateurs. OpenWrt vous donne un contrôle granulaire sur votre trafic réseau. Vous pouvez installer des packages pour le blocage des publicités à l'échelle du réseau, l'inspection approfondie des paquets, les règles avancées de qualité de service (QoS) et les clients VPN sécurisés (comme WireGuard).

Plus important encore, parce qu'il est open source, le code est constamment scruté par une communauté mondiale de chercheurs en sécurité. Les vulnérabilités sont corrigées rapidement, longtemps après que le fabricant d'origine a cessé de prendre en charge le matériel. OpenWrt transforme un appareil électronique grand public jetable en un appareil réseau puissant, sécurisé et durable.
          `,
          date: '2026-02-15',
          author: 'Network Security Team',
          category: 'Matériel'
        },
        'js-fingerprinting': {
          title: 'Le traqueur invisible : l\'empreinte digitale du navigateur en JavaScript',
          excerpt: 'Effacer vos cookies ne suffit plus. Comment les sites Web utilisent JavaScript pour vous identifier de manière unique en fonction de votre configuration matérielle et logicielle.',
          content: `
# Le traqueur invisible : l'empreinte digitale du navigateur en JavaScript

Pendant des années, le conseil en matière de confidentialité était simple : "Effacez vos cookies". Bien que la gestion des cookies soit toujours importante, l'industrie du suivi a évolué bien au-delà des simples fichiers texte stockés sur votre disque dur. Aujourd'hui, la forme de suivi la plus insidieuse est l'**empreinte digitale du navigateur**.

Lorsque vous visitez un site Web, votre navigateur exécute du JavaScript. Ce script peut interroger votre navigateur pour obtenir un vaste éventail de détails apparemment inoffensifs sur votre système : la résolution de votre écran, votre système d'exploitation, votre fuseau horaire, les polices spécifiques installées sur votre machine, le niveau de votre batterie et même la manière exacte dont votre carte graphique rend un objet 3D caché (empreinte Canvas).

Individuellement, aucun de ces points de données n'est unique. Mais lorsqu'ils sont combinés, ils créent une "empreinte digitale" très spécifique. Des études ont montré que pour la grande majorité des utilisateurs, cette combinaison d'attributs est tout à fait unique.

Cela signifie que même si vous utilisez un VPN pour masquer votre adresse IP, utilisez le mode de navigation privée et bloquez tous les cookies, un site Web peut toujours vous identifier avec un degré élevé de précision au moment où vous chargez sa page. La lutte contre la prise d'empreintes digitales nécessite des navigateurs spécialisés (comme Tor ou Firefox renforcé) qui usurpent ou normalisent intentionnellement ces mesures pour vous faire fondre dans la masse.
          `,
          date: '2026-02-10',
          author: 'Privacy Research Group',
          category: 'Confidentialité'
        },
        'scale-of-data-collection': {
          title: 'L\'échelle industrielle de la collecte de données personnelles',
          excerpt: 'Nous générons des données à chaque clic, chaque pas et chaque battement de cœur. Comprendre le volume même des informations récoltées est la première étape pour les récupérer.',
          content: `
# L'échelle industrielle de la collecte de données personnelles

Il est difficile pour l'esprit humain de comprendre l'ampleur même à laquelle nos données personnelles sont actuellement récoltées. Nous sommes allés bien au-delà des publicités ciblées basées sur notre historique de recherche. Nous sommes maintenant à l'ère du capitalisme de surveillance, où l'expérience humaine elle-même est la matière première.

Considérez une journée typique. Votre smartphone suit votre emplacement physique au mètre près, 24h/24 et 7j/7. Votre montre intelligente surveille votre fréquence cardiaque, vos habitudes de sommeil et votre niveau de stress. Votre haut-parleur intelligent écoute les mots de réveil, enregistrant occasionnellement le son ambiant. Votre véhicule transmet des données de télémétrie, y compris votre vitesse, vos habitudes de freinage et vos destinations fréquentes.

Ces données ne sont pas conservées en silos. Elles sont agrégées, analysées et vendues par des courtiers en données, des entreprises dont vous n'avez jamais entendu parler, avec lesquelles vous n'avez aucune relation. Ils construisent des profils psychologiques complets, prédisant non seulement ce que vous pourriez acheter, mais aussi vos penchants politiques, vos vulnérabilités émotionnelles et votre comportement futur.

Ce n'est pas une théorie du complot ; c'est le modèle commercial publiquement déclaré de l'Internet moderne. L'infrastructure de l'économie numérique repose sur l'extraction du surplus comportemental. Reconnaître l'échelle industrielle de cette opération est essentiel. Ce n'est qu'en comprenant l'ampleur de la collecte que nous pouvons commencer à prendre des mesures significatives pour limiter notre exposition.
          `,
          date: '2026-02-05',
          author: 'VaultWares Threat Intel',
          category: 'Confidentialité'
        },
        'corporate-control': {
          title: 'L\'illusion du choix : le contrôle des entreprises sur la vie numérique',
          excerpt: 'Une poignée de conglomérats contrôlent l\'infrastructure d\'Internet. Comment la centralisation menace l\'autonomie numérique et ce que nous pouvons faire à ce sujet.',
          content: `
# L'illusion du choix : le contrôle des entreprises sur la vie numérique

Lorsque nous naviguons sur Internet, il semble vaste et infini. Pourtant, l'infrastructure sous-jacente, les serveurs, les systèmes d'exploitation, les magasins d'applications et les algorithmes de recherche, est contrôlée par un nombre étonnamment restreint de conglomérats massifs.

Cette centralisation crée un profond déséquilibre de pouvoir. Lorsqu'une seule entreprise contrôle le système d'exploitation de votre téléphone, le navigateur que vous utilisez pour accéder au Web et le moteur de recherche que vous utilisez pour trouver des informations, elle possède une capacité sans précédent à façonner votre réalité numérique. Ils déterminent quelles applications vous êtes autorisé à installer, quelles actualités vous voyez et quels paramètres de confidentialité sont définis par "défaut".

Il ne s'agit pas de cabales obscures ; il s'agit du résultat économique naturel des effets de réseau et d'une consolidation non réglementée. Cependant, le résultat est un environnement numérique où les utilisateurs ont très peu de véritable autonomie. Si un conglomérat décide de modifier ses conditions de service pour permettre un suivi plus invasif, l'utilisateur moyen n'a d'autre choix réaliste que de l'accepter.

Récupérer notre autonomie numérique nécessite un effort conscient pour décentraliser nos vies numériques. Cela signifie rechercher des services indépendants, utiliser des protocoles ouverts et soutenir des plateformes qui donnent la priorité à la souveraineté des utilisateurs par rapport à la valeur actionnariale. Cela demande des efforts, mais l'alternative est un paysage numérique où nous sommes des locataires, et non des propriétaires.
          `,
          date: '2026-01-30',
          author: 'Privacy Research Group',
          category: 'Opinion'
        },
        'importance-of-foss': {
          title: 'Le code comme infrastructure : l\'importance des logiciels libres et open source',
          excerpt: 'Pourquoi l\'avenir de la liberté humaine à l\'ère numérique dépend de logiciels que tout le monde peut inspecter, modifier et partager.',
          content: `
# Le code comme infrastructure : l'importance des logiciels libres et open source

Le logiciel n'est plus seulement un outil ; c'est l'infrastructure de la société moderne. Il contrôle nos communications, nos systèmes financiers, nos transports et nos soins de santé. Lorsque cette infrastructure est propriétaire, c'est-à-dire fermée et contrôlée par une seule entité, nous sommes obligés de placer une confiance aveugle en cette entité.

**Les logiciels libres et open source (FOSS)** représentent une approche fondamentalement différente. Les FOSS sont des logiciels dont le code source est rendu public. N'importe qui peut l'inspecter, le modifier et le distribuer.

L'importance des FOSS va bien au-delà du coût. Il s'agit de transparence et de sécurité. Lorsque le code est ouvert, des chercheurs en sécurité indépendants peuvent l'auditer à la recherche de vulnérabilités et de portes dérobées. Il s'agit de longévité ; si une entreprise abandonne un produit propriétaire, il meurt. Si une entreprise abandonne un projet open source, la communauté peut le forker et le maintenir en vie.

Plus important encore, les FOSS concernent la liberté humaine. Dans un monde de plus en plus médiatisé par des algorithmes, la capacité de comprendre et de contrôler ces algorithmes est une condition préalable à l'autonomie. Soutenir les FOSS, que ce soit en les utilisant, en y contribuant ou en les finançant, n'est pas seulement un choix technique ; c'est un engagement envers un avenir numérique transparent et équitable.
          `,
          date: '2026-01-25',
          author: 'VaultWares Engineering',
          category: 'Philosophie'
        },
        'never-too-late': {
          title: 'Le meilleur moment pour planter un arbre : il n\'est jamais trop tard pour la confidentialité',
          excerpt: 'Vous vous sentez dépassé par votre empreinte numérique ? Ne succombez pas au nihilisme de la vie privée. Chaque mesure que vous prenez aujourd\'hui compte.',
          content: `
# Le meilleur moment pour planter un arbre : il n'est jamais trop tard pour la confidentialité

Un sentiment courant parmi les personnes qui s'éveillent aux réalités de la surveillance numérique est le "nihilisme de la vie privée". Ils regardent les décennies de données qu'ils ont déjà générées, les anciens messages sur les réseaux sociaux, l'historique de localisation, les mots de passe divulgués, et concluent que la bataille est déjà perdue. "Ils savent déjà tout sur moi", pensent-ils, "alors pourquoi s'embêter ?"

C'est une erreur dangereuse. La confidentialité n'est pas un état binaire consistant à être complètement anonyme ou complètement exposé. C'est un spectre.

Considérez votre empreinte numérique comme une dette financière. Oui, vous en avez peut-être accumulé beaucoup par le passé. Mais cela ne signifie pas que vous devez continuer à maximiser vos cartes de crédit aujourd'hui. Chaque traqueur que vous bloquez, chaque service que vous remplacez par une alternative respectueuse de la vie privée et chaque donnée que vous refusez de transmettre est une étape vers la réduction de votre exposition.

Les données ont également une demi-vie. Les informations que les courtiers détiennent sur vos habitudes d'il y a cinq ans ont beaucoup moins de valeur que les données en temps réel que vous générez actuellement. En changeant vos habitudes aujourd'hui, vous commencez à priver les algorithmes des données fraîches dont ils ont besoin pour maintenir des profils précis. Il n'est jamais trop tard pour commencer à prendre votre vie privée au sérieux.
          `,
          date: '2026-01-20',
          author: 'VaultWares Threat Intel',
          category: 'Guides'
        },
        'childrens-privacy': {
          title: 'Nés dans le Panoptique : Protéger les enfants à l\'ère numérique',
          excerpt: 'Les enfants d\'aujourd\'hui sont la première génération à voir leur vie entière quantifiée et suivie dès la naissance. Nous avons l\'obligation morale de protéger leur avenir numérique.',
          content: `
# Nés dans le Panoptique : Protéger les enfants à l'ère numérique

Les générations précédentes ont eu le luxe de faire des erreurs dans une relative obscurité. Les enfants d'aujourd'hui naissent dans un panoptique numérique. Dès l'instant où leurs parents publient leur première photo d'échographie sur les réseaux sociaux, leur empreinte numérique commence à croître.

Au moment où un enfant est en âge de comprendre le concept de vie privée, un vaste dossier sur sa vie, son historique de localisation, ses progrès éducatifs, ses modèles de comportement et ses interactions sociales, a déjà été compilé par des logiciels éducatifs, des plateformes de médias sociaux et des jouets connectés.

Nous avons une profonde obligation morale d'agir en tant que gardiens de la vie privée de nos enfants jusqu'à ce qu'ils soient assez grands pour la gérer eux-mêmes. Cela signifie résister à l'envie de partager chaque instant de leur vie en ligne ("sharenting"). Cela signifie examiner attentivement les politiques de confidentialité des applications et des appareils que nous introduisons dans nos foyers. Cela signifie avoir des conversations adaptées à leur âge sur l'hygiène numérique, en leur apprenant que leurs données ont de la valeur et doivent être protégées.

Nous devons équiper la prochaine génération des outils et de l'état d'esprit nécessaires pour naviguer dans un monde qui cherche constamment à extraire leurs données. Leur autonomie future dépend des limites que nous les aidons à établir aujourd'hui.
          `,
          date: '2026-01-15',
          author: 'Privacy Research Group',
          category: 'Opinion'
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'vw_lang',
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
