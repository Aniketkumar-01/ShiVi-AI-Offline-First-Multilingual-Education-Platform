package com.example.domain.ai

import kotlinx.coroutines.flow.StateFlow

data class ModelInfo(
    val modelId: String,
    val name: String,
    val languagePair: String,
    val sizeBytes: Long,
    val isInstalled: Boolean,
    val ramRecommendationMb: Int
)

interface ModelManager {
    val availableModels: StateFlow<List<ModelInfo>>
    val isModelLoading: StateFlow<Boolean>
    
    /**
     * Checks device RAM and determines if a model can be safely loaded.
     */
    fun canLoadModel(modelId: String): Boolean
    
    /**
     * Loads the model into memory. Suspends until complete.
     * Throws exception if RAM is insufficient.
     */
    suspend fun loadModel(modelId: String)
    
    /**
     * Unloads the model from memory to free resources.
     */
    fun unloadModel(modelId: String)
    
    /**
     * Installs a model from local storage/assets into the active model directory.
     */
    suspend fun installModelLocally(modelId: String)
}
