(
    function() {
    var _conversationId = null;
    var _chatReady = false;
    window.addEventListener('onEmbeddedMessagingButtonCreated', function() {
        if (window.embeddedservice_bootstrap && embeddedservice_bootstrap.utilAPI) {
            embeddedservice_bootstrap.utilAPI.hideChatButton();
        }
    });

    function getLanguageFromPath() {
        var path = window.location.pathname.toLowerCase();
        if (path.indexOf('/tr-tr') > -1) return 'tr';
        if (path.indexOf('/de-de') > -1) return 'de';
        return 'en_US';
    }

    let botInactivityTimer;
    const TIMEOUT_SECONDS = 60 * 5;
    let expireTime = 0;
    let isChatEndedByTimer = false;
    let isTimerActive = false;

    function checkExistingSession() {
        if (sessionStorage.getItem('isChatActive') === 'true') {
            isChatEndedByTimer = false;
            isTimerActive = true;
            updateExpireTime();
            startMainTimer();
        }
    }

    function updateExpireTime() {
        if (isChatEndedByTimer || !isTimerActive) return;
        expireTime = Date.now() + (TIMEOUT_SECONDS * 1000);
    }

    function startMainTimer() {
        if (botInactivityTimer) return;

        botInactivityTimer = setInterval(() => {
            if (!isTimerActive || isChatEndedByTimer) return;

            const now = Date.now();
            const timeLeft = Math.ceil((expireTime - now) / 1000);

            if (timeLeft <= 0) {
                stopTimerAndExecute();
            } 
        }, 1000);
    }

    function stopTimerAndExecute() {
        clearInterval(botInactivityTimer);
        botInactivityTimer = null;
        isChatEndedByTimer = true;
        isTimerActive = false;

        sessionStorage.setItem('isChatActive', 'false');

        console.log('Süre doldu!');
        const messagePayload = { type: 'AGENTFORCE_TIMEOUT_TRIGGERED' };
        window.postMessage(messagePayload, '*');
        
        document.querySelectorAll('iframe').forEach(iframe => {
            try { iframe.contentWindow.postMessage(messagePayload, '*'); } catch(e) {}
        });
    }

    window.addEventListener('mousemove', updateExpireTime);
    window.addEventListener('keydown', updateExpireTime);
    window.addEventListener('click', updateExpireTime);
    window.addEventListener('touchstart', updateExpireTime);
    window.addEventListener('touchmove', updateExpireTime);
    window.addEventListener('input', updateExpireTime);

    window.addEventListener('message', (event) => {
        if (event?.data?.type === 'CONVERSATION_STARTED') {
            isChatEndedByTimer = false; 
            isTimerActive = true;
            
            sessionStorage.setItem('isChatActive', 'true'); 
            
            updateExpireTime();
            startMainTimer();
        }
        if (event?.data?.type === 'USER_ACTIVE_IN_CHAT') {
            updateExpireTime();
        }
    });

    checkExistingSession();

    window.addEventListener('message', function(event) {






        if (event.data && event.data.type === 'START_CHAT_WITH_PRECHAT') {

        const prechatData = event.data.prechatData;

        console.log('Prechat data geldi:', prechatData);

        try {

            // Hidden prechat field set et
            if (
                window.embeddedservice_bootstrap &&
                window.embeddedservice_bootstrap.prechatAPI
            ) {

                window.embeddedservice_bootstrap
                    .prechatAPI
                    .setHiddenPrechatFields(prechatData);

                console.log('Prechat fieldlar set edildi');
            }

            // Chat başlat
            if (
                window.embeddedservice_bootstrap &&
                window.embeddedservice_bootstrap.utilAPI
            ) {

                console.log('launchChat çağrılıyor');

                window.embeddedservice_bootstrap
                    .utilAPI
                    .launchChat();
            }

        } catch (e) {

            console.error('Prechat launch hatası:', e);
        }
    }














        
        var currentLang = getLanguageFromPath();
        if (currentLang === 'en_US') currentLang = 'en';
        if (event.data === 'GET_LANGUAGE') {
            event.source.postMessage({ type: 'LANGUAGE_RESPONSE', lang: currentLang }, event.origin);
        }
        
        if (event.data === 'GET_CHAT_DATA') {
            event.source.postMessage({
                type: 'CHAT_DATA_RESPONSE',
                lang: currentLang,
                conversationId: _conversationId
            }, event.origin);
        }
        if (event.data && event.data.type === 'CLEAR_EMBEDDED_SESSION') {
            if (window.embeddedservice_bootstrap.userVerificationAPI) {
                window.embeddedservice_bootstrap.userVerificationAPI.clearSession();
            }
        }
        if (event.data.type === 'FORCE_HIDE_WIDGET') {
            var container = document.querySelector('.embeddedServiceSidebarMinimizedDefaultUI') ||
                            document.querySelector('embeddedservice-chat-container') ||
                            document.querySelector('.embeddedMessagingFrame');
            if (container) {
                container.style.display = 'none';
            }
            if (window.embeddedservice_bootstrap && embeddedservice_bootstrap.utilAPI) {
                embeddedservice_bootstrap.utilAPI.hideChatButton();
            }
        }
        if (event.data.type === 'HIDE_CHAT_BUTTON') {
            setTimeout(function() {
                try {
                    if (window.embeddedservice_bootstrap && embeddedservice_bootstrap.utilAPI) {
                        embeddedservice_bootstrap.utilAPI.hideChatButton();
                        
                    }
                } catch(e) {
                    console.error('Buton gizlenemedi:', e);
                }
            }, 100);
        }
        if (event.data && event.data.type === 'FORCE_HIDE_CHAT') {
            if (window.embeddedservice_bootstrap && embeddedservice_bootstrap.utilAPI) {
                embeddedservice_bootstrap.utilAPI.hideChatButton();
            }
        }
    });

    window.handleOpenChat = function() {
        if (typeof window.openSalesforceChat === "function") {
            window.openSalesforceChat();
        } else {
            console.warn("Salesforce openSalesforceChat fonksiyonu bulunamadı.");
        }
    };

    window.changeUrlPath= function(langFolder) {
        window.location.href = '/sunny-ai-agenttest/' + langFolder;
    }

    var _isProcessing = false; 
    window.openSalesforceChat = function() {
        var container = document.querySelector('embeddedservice-chat-container') || 
                        document.querySelector('.embeddedMessagingFrame');
        if (container && container.style.display === 'none') {
            container.style.display = 'block';
            
            if (window.embeddedservice_bootstrap && embeddedservice_bootstrap.utilAPI) {
                    embeddedservice_bootstrap.utilAPI.launchChat(); 
            }
        } 
        else {
            if (window.embeddedservice_bootstrap && embeddedservice_bootstrap.utilAPI) {
                embeddedservice_bootstrap.utilAPI.launchChat();
            }
        }
    };

    window.triggerChatDoubleCall = function() {
        if (_isProcessing) return; 

        _isProcessing = true;

        window.openSalesforceChat();
        setTimeout(function() {
            
            window.openSalesforceChat();
            
            _isProcessing = false; 
        }, 30); 
    };

    window.addEventListener('onEmbeddedMessagingWindowMinimized', function() {
        setTimeout(function() {
            try {
                if (window.embeddedservice_bootstrap && embeddedservice_bootstrap.utilAPI) {
                    embeddedservice_bootstrap.utilAPI.hideChatButton();
                }
            } catch(e) {
                console.error('Buton gizlenemedi:', e);
            }
        }, 300);
    });

    window.addEventListener('onEmbeddedMessagingReady', function() {
        _chatReady = true;
        window.addEventListener('onEmbeddedMessagingConversationStarted', function(event) {
            _conversationId = event.detail.conversationId;
            var iframes = document.querySelectorAll('iframe');
            for (var i = 0; i < iframes.length; i++) {
                var iframe = iframes[i];
                if (iframe.contentWindow) {
                    iframe.contentWindow.postMessage({
                        type: 'CONVERSATION_ID_UPDATE',
                        conversationId: _conversationId
                    }, '*');
                }
            }
        });
    });

    window.initEmbeddedMessaging = function() {
        try {
            var currentLang = getLanguageFromPath();
            embeddedservice_bootstrap.settings.language = currentLang;
            embeddedservice_bootstrap.settings.hideChatButtonOnLoad = true;
            embeddedservice_bootstrap.settings.enableUserInputForConversationWithBot = false;  
        
            var style = document.createElement('style');
            style.innerHTML = '#embedded-messaging { z-index: 999999 !important; } .embeddedMessagingFrame { z-index: 999999 !important; } .embeddedMessagingConversationButtonWrapper { z-index: 999999 !important; }';

            document.head.appendChild(style);
        
            embeddedservice_bootstrap.init(
                '00D7Z0000004r8W',
                'Sunexpress_Web_Channel_V2D',
                'https://sunexpress--qa.sandbox.my.site.com/ESWSunexpressWebChannel1773001853439',
                { scrt2URL: 'https://sunexpress--qa.sandbox.my.salesforce-scrt.com' }
            );
        } catch (err) {
            console.error('Error loading Embedded Messaging: ', err);
        }
    };
})();
