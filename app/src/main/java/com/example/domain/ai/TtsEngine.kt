package com.example.domain.ai

import kotlinx.coroutines.flow.StateFlow

interface TtsEngine {
    val isSpeaking: StateFlow<Boolean>
    
    /**
     * Speaks the given text in the specified language.
     * Must operate fully offline.
     */
    fun speak(text: String, languageCode: String, speed: Float = 1.0f)
    
    fun stop()
    
    fun destroy()
}
