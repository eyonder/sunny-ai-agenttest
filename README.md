<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>SunExpress Test - AI Agent</title>
    <style>
        /* Genel Tasarım Ayarları (Görsel Odaklı) */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f5f9;
            /* Arka planın tıklanabilirliğini kapatarak test ekibini bota yönlendiriyoruz */
            user-select: none; 
        }
        
        /* Üst Bilgi Çubuğu */
        .top-bar { background-color: #004b87; color: white; padding: 10px 20px; font-size: 14px; }
        
        /* Ana Navigasyon */
        .nav-bar { background-color: white; padding: 15px 40px; display: flex; justify-content: space-between; border-bottom: 2px solid #e0e0e0; }
        .logo { font-size: 24px; font-weight: bold; color: #004b87; }
        
        /* Uçuş Arama Alanı (Mockup) */
        .hero-section { padding: 40px; text-align: center; }
        .search-box {
            background-color: white;
            border-radius: 12px;
            padding: 20px;
            max-width: 900px;
            margin: 0 auto;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid #ddd;
        }
        .input-mock { padding: 15px; border: 1px solid #ccc; border-radius: 5px; flex-grow: 1; margin: 0 10px; color: #555; background-color: #fafafa;}
        .btn-mock { background-color: #e55a00; color: white; border: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; opacity: 0.8; }
        
        /* Promosyon Alanı */
        .promo-banner {
            background-color: #004b87;
            color: white;
            max-width: 900px;
            margin: 20px auto;
            padding: 30px;
            border-radius: 15px;
            text-align: left;
            position: relative;
            background-image: linear-gradient(to right, #004b87, #0073cc);
        }
        
        /* Sadece uyarı metni */
        .test-warning {
            text-align: center;
            color: #d32f2f;
            font-weight: bold;
            margin-top: 20px;
            padding: 10px;
            background: #ffebee;
            border-radius: 5px;
        }
    </style>
</head>
<body>

    <div class="top-bar">Güncel Seyahat Bilgilendirmesi</div>
    <div class="nav-bar">
        <div class="logo">SunExpress Hava Yolları</div>
        <div style="color: #666;">Seyahat İşlemleri | Keşfedin | Bilgi</div>
    </div>

    <div class="test-warning">
        ⚠️ DİKKAT: Bu bir test ortamıdır. Sayfadaki butonlar devre dışıdır. Lütfen sadece sağ alt köşedeki Yapay Zeka (AI Agent) ile etkileşime geçiniz.
    </div>

    <div class="hero-section">
        <div class="search-box">
            <div class="input-mock"><strong>Nereden:</strong> İstanbul-Sabiha Gökçen SAW</div>
            <div class="input-mock"><strong>Nereye:</strong> Nereye</div>
            <div class="input-mock"><strong>Tarih:</strong> 11.03.2026 - 14.03.2026</div>
            <button class="btn-mock">Uçuş Ara</button>
        </div>
    </div>

    <div class="promo-banner">
        <h2 style="margin:0;">İspanya'yı Keşfedin</h2>
        <p>BAGAJ DAHİL 79,99 €*DAN İTİBAREN</p>
        <button style="background:#e55a00; color:white; border:none; padding:10px 20px; border-radius:20px; font-weight:bold;">Hemen Keşfet</button>
    </div>

    <script type='text/javascript'>
        function initEmbeddedMessaging() {
            try {
                embeddedservice_bootstrap.settings.language = 'en_US'; // Test için tr_TR olarak da değiştirebilirsiniz.

                embeddedservice_bootstrap.init(
                    '00D7Z0000004r8W',
                    'SunExpress_Agentforce_ESD',
                    'https://sunexpress--qa.sandbox.my.site.com/ESWSunExpressAgentforce1772629574566',
                    {
                        scrt2URL: 'https://sunexpress--qa.sandbox.my.salesforce-scrt.com'
                    }
                );
            } catch (err) {
                console.error('Error loading Embedded Messaging: ', err);
            }
        };
    </script>
    <script type='text/javascript' src='https://sunexpress--qa.sandbox.my.site.com/ESWSunExpressAgentforce1772629574566/assets/js/bootstrap.min.js' onload='initEmbeddedMessaging()'></script>
    </body>
</html>