let selectedDepartment = '';
        let messageCounter = 0;
        let typewriterPaused = false;
        let currentTypewriterTimeout = null;
        let currentTypewriterElement = null;
        let currentTypewriterText = '';
        let currentTypewriterIndex = 0;
        
        // Your n8n webhook URL - update this to match your setup
        const WEBHOOK_URL = 'http://localhost:5678/webhook-test/chatbot';
        
        // Debug function to help troubleshoot
        function debugConnection() {
            console.log('🔍 Debug Info:');
            console.log('Webhook URL:', WEBHOOK_URL);
            console.log('Selected Department:', selectedDepartment);
            console.log('Current time:', new Date().toISOString());
        }

        function selectDepartment(dept) {
            selectedDepartment = dept;
            
            const deptNames = {
                'CSE': 'Computer Science Engineering',
                'ECE': 'Electronics & Communication Engineering', 
                'ME': 'Mechanical Engineering',
                'CE': 'Civil Engineering'
            };
            
            document.getElementById('chatTitle').textContent = deptNames[dept] + ' Chatbot';
            
            // Add fade out effect to department screen
            const deptScreen = document.getElementById('departmentScreen');
            const chatScreen = document.getElementById('chatScreen');
            
            deptScreen.style.opacity = '0';
            deptScreen.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                // Hide department screen and show chat
                deptScreen.classList.add('hidden');
                chatScreen.classList.remove('hidden');
                
                // Add fade in effect to chat screen
                chatScreen.style.opacity = '0';
                chatScreen.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    chatScreen.style.opacity = '1';
                    chatScreen.style.transform = 'translateY(0)';
                    chatScreen.style.transition = 'all 0.5s ease-out';
                    
                    // Add welcome message with delay
                    setTimeout(() => {
                        addMessage('bot', `Welcome to the ${deptNames[dept]} chatbot! I'm here to help you with questions related to ${dept}. What would you like to know?`);
                    }, 300);
                    
                    // Focus on input
                    setTimeout(() => {
                        document.getElementById('messageInput').focus();
                    }, 800);
                }, 50);
            }, 300);
        }

        function goBack() {
            const deptScreen = document.getElementById('departmentScreen');
            const chatScreen = document.getElementById('chatScreen');
            
            // Add fade out effect to chat screen
            chatScreen.style.opacity = '0';
            chatScreen.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                chatScreen.classList.add('hidden');
                deptScreen.classList.remove('hidden');
                
                // Reset department screen styles and add fade in
                deptScreen.style.opacity = '0';
                deptScreen.style.transform = 'scale(1.05)';
                deptScreen.style.transition = 'all 0.5s ease-out';
                
                setTimeout(() => {
                    deptScreen.style.opacity = '1';
                    deptScreen.style.transform = 'scale(1)';
                }, 50);
                
                // Clear chat messages
                document.getElementById('chatMessages').innerHTML = '';
                document.getElementById('messageInput').value = '';
                selectedDepartment = '';
                
                // Reset connection status
                updateConnectionStatus(null, 'Ready');
            }, 300);
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSendButtonClick();
            }
            // ESC key to pause typewriter
            if (event.key === 'Escape') {
                event.preventDefault();
                pauseTypewriter();
            }
        }
        
        function handleSendButtonClick() {
            const sendIcon = document.getElementById('sendIcon');
            const pauseIcon = document.getElementById('pauseIcon');
            
            // If currently showing pause icon, pause the typewriter
            if (!pauseIcon.classList.contains('hidden')) {
                pauseTypewriter();
                return;
            }
            
            // Otherwise, send message
            sendMessage();
        }

        async function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Add user message to chat
            addMessage('user', message);
            input.value = '';
            
            // Always use form method
            sendViaForm(message);
        }



        function sendViaForm(message) {
            // Show typing indicator
            showTypingIndicator();
            
            // Create a unique callback name for this request
            const callbackName = 'form_callback_' + (++messageCounter);
            let requestHandled = false; // Flag to prevent duplicate handling
            
            // Set up the callback function
            window[callbackName] = function(data) {
                if (requestHandled) return;
                requestHandled = true;
                
                hideTypingIndicator();
                
                if (data && typeof data === 'object') {
                    const botResponse = data.response || data.answer || data.message || JSON.stringify(data);
                    addMessage('bot', botResponse);
                    updateConnectionStatus(true, 'Connected');
                } else if (data) {
                    addMessage('bot', data.toString());
                    updateConnectionStatus(true, 'Connected');
                } else {
                    addMessage('bot', 'Received empty response from server.');
                }
                
                // Clean up
                delete window[callbackName];
            };
            
            // Create form data
            const formData = new FormData();
            formData.append('department', selectedDepartment);
            formData.append('question', message);
            formData.append('callback', callbackName);
            formData.append('format', 'jsonp');
            
            // Use XMLHttpRequest with form data (bypasses some CORS restrictions)
            const xhr = new XMLHttpRequest();
            xhr.open('POST', WEBHOOK_URL, true);
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && !requestHandled) {
                    requestHandled = true;
                    hideTypingIndicator();
                    
                    console.log('📡 Response received:', {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        responseText: xhr.responseText.substring(0, 200) + '...'
                    });
                    
                    if (xhr.status === 200) {
                        try {
                            // Try to parse as JSON
                            const response = JSON.parse(xhr.responseText);
                            const botResponse = response.response || response.answer || response.message || response.output || xhr.responseText;
                            addMessage('bot', botResponse);
                            updateConnectionStatus(true, 'Connected');
                        } catch (e) {
                            // If not JSON, check if it's JSONP
                            const responseText = xhr.responseText;
                            if (responseText.includes(callbackName)) {
                                // Execute the JSONP response
                                try {
                                    eval(responseText);
                                } catch (evalError) {
                                    addMessage('bot', responseText);
                                }
                            } else {
                                // Plain text response
                                addMessage('bot', responseText || 'Received response successfully!');
                            }
                            updateConnectionStatus(true, 'Connected');
                        }
                    } else if (xhr.status === 0) {
                        console.log('🚫 CORS error detected, trying fallback method...');
                        // CORS error - try alternative method
                        sendViaFormFallback(message);
                    } else {
                        console.log('❌ Server error:', xhr.status, xhr.statusText);
                        addMessage('bot', `Server error (${xhr.status}). Please verify your n8n workflow is active and the webhook URL is correct.`);
                        updateConnectionStatus(false, 'Server Error');
                    }
                }
            };
            
            xhr.onerror = function() {
                if (requestHandled) return;
                requestHandled = true;
                hideTypingIndicator();
                // Try fallback method
                sendViaFormFallback(message);
            };
            
            try {
                console.log('🚀 Sending request to:', WEBHOOK_URL);
                console.log('📝 Form data:', {
                    department: selectedDepartment,
                    question: message,
                    callback: callbackName
                });
                xhr.send(formData);
            } catch (error) {
                console.log('❌ Send error:', error);
                if (!requestHandled) {
                    requestHandled = true;
                    hideTypingIndicator();
                    sendViaFormFallback(message);
                }
            }
            
            // Set timeout to prevent hanging requests
            setTimeout(() => {
                if (!requestHandled) {
                    requestHandled = true;
                    hideTypingIndicator();
                    addMessage('bot', 'Request taking longer than expected. Please check your n8n workflow URL and ensure it\'s running on the correct port.');
                    updateConnectionStatus(false, 'Timeout');
                    // Clean up callback
                    if (window[callbackName]) {
                        delete window[callbackName];
                    }
                }
            }, 15000);
        }
        
        function sendViaFormFallback(message) {
            // Fallback: Use dynamic script injection (similar to JSONP but with POST simulation)
            const script = document.createElement('script');
            const callbackName = 'fallback_callback_' + (++messageCounter);
            
            window[callbackName] = function(data) {
                const botResponse = data.response || data.answer || data.message || 'Form submitted successfully!';
                addMessage('bot', botResponse);
                updateConnectionStatus(true, 'Connected');
                // Safe cleanup
                if (script && script.parentNode) {
                    document.head.removeChild(script);
                }
                delete window[callbackName];
            };
            
            // Create URL with parameters
            const params = new URLSearchParams({
                department: selectedDepartment,
                question: message,
                callback: callbackName,
                method: 'form'
            });
            
            script.type = 'text/javascript';
            script.src = `${WEBHOOK_URL}?${params.toString()}`;
            script.onerror = function() {
                addMessage('bot', 'Unable to connect to server. Please check if your server is running.');
                updateConnectionStatus(false, 'Connection Failed');
                // Safe cleanup
                if (script && script.parentNode) {
                    document.head.removeChild(script);
                }
                delete window[callbackName];
            };
            
            document.head.appendChild(script);
            
            // Timeout after 10 seconds
            setTimeout(() => {
                if (window[callbackName]) {
                    addMessage('bot', 'Connection timed out. Please try again.');
                    updateConnectionStatus(false, 'Timeout');
                    if (script && script.parentNode) {
                        document.head.removeChild(script);
                    }
                    delete window[callbackName];
                }
            }, 10000);
        }

        function addMessage(sender, text) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            const animationClass = sender === 'user' ? 'user-message-appear' : 'message-appear';
            messageDiv.className = `chat-bubble flex ${sender === 'user' ? 'justify-end' : 'justify-start'} ${animationClass}`;
            
            const bubbleClass = sender === 'user' 
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border border-blue-500/30 shadow-lg' 
                : 'bg-gradient-to-br from-slate-700 via-gray-700 to-slate-600 text-gray-100 border border-slate-500/30 shadow-lg backdrop-blur-sm';
            
            const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const messageId = 'message-text-' + Date.now() + Math.random();
            
            messageDiv.innerHTML = `
                <div class="max-w-2xl lg:max-w-4xl px-4 py-3 rounded-lg ${bubbleClass} shadow-sm smooth-transition">
                    <div id="${messageId}" class="text-sm whitespace-pre-wrap"></div>
                    <p class="text-xs opacity-70 mt-2">${timestamp}</p>
                </div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            
            // Add typewriter effect for bot messages
            if (sender === 'bot') {
                typeWriterEffect(messageId, text);
            } else {
                document.getElementById(messageId).textContent = text;
            }
            
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        function typeWriterEffect(elementId, text) {
            const element = document.getElementById(elementId);
            if (!element) return;
            
            // Store current typewriter state
            currentTypewriterElement = element;
            currentTypewriterText = text;
            currentTypewriterIndex = 0;
            typewriterPaused = false;
            
            // Switch to pause icon
            switchToPauseIcon();
            
            let i = 0;
            const speed = 8; // Typing speed in milliseconds - much faster now
            
            function typeWriter() {
                if (typewriterPaused) {
                    // If paused, complete the text immediately
                    element.textContent = text;
                    switchToSendIcon();
                    currentTypewriterElement = null;
                    return;
                }
                
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    currentTypewriterIndex = i;
                    
                    // Auto-scroll as text appears
                    const messagesContainer = document.getElementById('chatMessages');
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    
                    currentTypewriterTimeout = setTimeout(typeWriter, speed);
                } else {
                    // Typing complete, switch back to send icon
                    switchToSendIcon();
                    currentTypewriterElement = null;
                }
            }
            
            typeWriter();
        }
        
        function switchToPauseIcon() {
            const sendIcon = document.getElementById('sendIcon');
            const pauseIcon = document.getElementById('pauseIcon');
            
            sendIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }
        
        function switchToSendIcon() {
            const sendIcon = document.getElementById('sendIcon');
            const pauseIcon = document.getElementById('pauseIcon');
            
            pauseIcon.classList.add('hidden');
            sendIcon.classList.remove('hidden');
        }
        
        function pauseTypewriter() {
            if (currentTypewriterElement && !typewriterPaused) {
                typewriterPaused = true;
                
                // Clear any pending timeout
                if (currentTypewriterTimeout) {
                    clearTimeout(currentTypewriterTimeout);
                }
                
                // DON'T complete the text - leave it exactly where it was paused
                // The text will remain at whatever was already typed (currentTypewriterIndex characters)
                
                // Switch back to send icon
                switchToSendIcon();
                
                // Reset state
                currentTypewriterElement = null;
                currentTypewriterText = '';
                currentTypewriterIndex = 0;
                
                // Auto-scroll to bottom
                const messagesContainer = document.getElementById('chatMessages');
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
                // Focus back on input for immediate new question
                document.getElementById('messageInput').focus();
            }
        }

        function showTypingIndicator() {
            document.getElementById('typingIndicator').classList.remove('hidden');
            const messagesContainer = document.getElementById('chatMessages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function hideTypingIndicator() {
            document.getElementById('typingIndicator').classList.add('hidden');
        }

        function updateConnectionStatus(connected, message) {
            const statusDiv = document.getElementById('connectionStatus');
            const dot = statusDiv.querySelector('div');
            const text = statusDiv.querySelector('span');
            
            if (connected) {
                dot.className = 'w-3 h-3 bg-green-500 rounded-full pulse-green';
                text.textContent = message || 'Connected';
                text.className = 'text-sm text-green-600 smooth-transition';
            } else if (connected === false) {
                dot.className = 'w-3 h-3 bg-red-500 rounded-full';
                text.textContent = message || 'Error';
                text.className = 'text-sm text-red-600 smooth-transition';
            } else {
                dot.className = 'w-3 h-3 bg-gray-400 rounded-full';
                text.textContent = message || 'Ready';
                text.className = 'text-sm text-gray-600 smooth-transition';
            }
        }

        // Test connection on page load
        window.addEventListener('load', () => {
            console.log('Chatbot interface loaded. n8n webhook should be at:', WEBHOOK_URL);
            updateConnectionStatus(null, 'Ready');
        });
        
        // Global keyboard listener for ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                pauseTypewriter();
            }
        });

        // Handle global errors to prevent console spam
        window.addEventListener('error', function(e) {
            // Suppress specific errors that don't affect functionality
            if (e.filename && (e.filename.includes('challenge-platform') || e.filename.includes('cdn-cgi'))) {
                e.preventDefault();
                return false;
            }
        });

        // Suppress unhandled promise rejections for network requests
        window.addEventListener('unhandledrejection', function(e) {
            if (e.reason && e.reason.message && 
                (e.reason.message.includes('Failed to fetch') || 
                 e.reason.message.includes('JSONP request failed') ||
                 e.reason.message.includes('404'))) {
                // These are handled by our error handling, so suppress console spam
                e.preventDefault();
            }
        });

        // Add some sample questions for each department
        function addSampleQuestions() {
            const samples = {
                'CSE': ['What is machine learning?', 'Explain data structures', 'What are algorithms?'],
                'ECE': ['What is signal processing?', 'Explain digital circuits', 'What is embedded systems?'],
                'ME': ['What is thermodynamics?', 'Explain fluid mechanics', 'What is manufacturing?'],
                'CE': ['What is structural engineering?', 'Explain concrete design', 'What is surveying?']
            };
            
            if (selectedDepartment && samples[selectedDepartment]) {
                const sampleQuestions = samples[selectedDepartment];
                const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
                
                setTimeout(() => {
                    addMessage('bot', `Here's a sample question you can try: "${randomQuestion}"`);
                }, 2000);
            }
        }
