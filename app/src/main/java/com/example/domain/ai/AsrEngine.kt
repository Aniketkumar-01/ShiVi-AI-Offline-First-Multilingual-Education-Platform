package com.example.domain.ai

import kotlinx.coroutines.flow.StateFlow

data class AsrState(
    val isListening: Boolean = false,
    val recognizedText: String = "",
    val partialText: String = "",
    val errorMessage: String? = null
)

interface AsrEngine {
    val state: StateFlow<AsrState>
    
    val isAvailable: Boolean
    
    fun startListening(languageCode: String)
    fun stopListening()
    fun destroy()
}
