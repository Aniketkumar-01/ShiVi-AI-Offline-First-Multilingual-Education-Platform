package com.example.domain.ai

import com.example.data.local.TranslationDao
import com.example.data.local.TranslationEntry
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject

class HybridTranslationCoordinator @Inject constructor(
    private val translationDao: TranslationDao,
    private val translationEngine: TranslationEngine
) {

    /**
     * Translates text using the hybrid approach:
     * 1. Check local Room DB for verified translation.
     * 2. If missing, fall back to NMT Engine.
     */
    suspend fun translate(
        text: String,
        sourceLang: String,
        targetLang: String
    ): TranslationResult = withContext(Dispatchers.IO) {
        val cleanText = text.trim()
        if (cleanText.isEmpty()) {
            return@withContext TranslationResult("", false, 0, "Empty input")
        }

        val startTime = System.currentTimeMillis()

        // 1. Check verified DB cache
        val cacheEntry = translationDao.getTranslation(cleanText, sourceLang, targetLang)
        if (cacheEntry != null && cacheEntry.verified) {
            val latency = System.currentTimeMillis() - startTime
            return@withContext TranslationResult(
                translatedText = cacheEntry.targetText,
                isVerified = true,
                latencyMs = latency,
                errorMsg = null
            )
        }

        // 2. Fall back to NMT
        val result = translationEngine.translate(cleanText, sourceLang, targetLang)
        val latency = System.currentTimeMillis() - startTime
        
        // Save the NMT result as unverified in the DB for future reference/caching
        if (result.errorMsg == null && result.translatedText.isNotBlank()) {
            translationDao.insertTranslation(
                TranslationEntry(
                    sourceText = cleanText,
                    sourceLanguage = sourceLang,
                    targetText = result.translatedText,
                    targetLanguage = targetLang,
                    verified = false
                )
            )
        }

        return@withContext result.copy(latencyMs = latency)
    }
}
