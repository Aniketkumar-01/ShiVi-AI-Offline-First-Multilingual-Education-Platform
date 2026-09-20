package com.example.domain.ai

/**
 * Result of a neural machine translation inference.
 */
data class TranslationResult(
    val translatedText: String,
    val isVerified: Boolean = false,
    val latencyMs: Long = 0L,
    val errorMsg: String? = null
)

/**
 * Interface representing a Neural Machine Translation engine.
 * Implementations must be fully offline and independent of network access.
 */
interface TranslationEngine {
    /**
     * Translates text from the source language to the target language.
     * Must be called off the main thread.
     */
    suspend fun translate(
        text: String,
        sourceLanguageCode: String,
        targetLanguageCode: String
    ): TranslationResult
}
