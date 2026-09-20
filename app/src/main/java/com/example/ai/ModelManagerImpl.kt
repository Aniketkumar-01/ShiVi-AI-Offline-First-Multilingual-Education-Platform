package com.example.ai

import android.app.ActivityManager
import android.content.Context
import android.util.Log
import com.example.domain.ai.ModelInfo
import com.example.domain.ai.ModelManager
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import java.io.File
import javax.inject.Inject

class ModelManagerImpl @Inject constructor(
    private val context: Context
) : ModelManager {

    private val _availableModels = MutableStateFlow<List<ModelInfo>>(emptyList())
    override val availableModels: StateFlow<List<ModelInfo>> = _availableModels.asStateFlow()

    private val _isModelLoading = MutableStateFlow(false)
    override val isModelLoading: StateFlow<Boolean> = _isModelLoading.asStateFlow()

    init {
        refreshModelList()
    }

    private fun refreshModelList() {
        val modelsDir = File(context.filesDir, "models")
        if (!modelsDir.exists()) modelsDir.mkdirs()

        // Mocking the detection of the IndicTrans2 ONNX model
        val transModelFile = File(modelsDir, "indictrans2_hi_sat.onnx")
        
        val transModel = ModelInfo(
            modelId = "indictrans2_hi_sat",
            name = "AI4Bharat IndicTrans2 (Hindi to Santali)",
            languagePair = "hi-IN -> sat-Olck",
            sizeBytes = 1_073_741_824L, // 1GB
            isInstalled = transModelFile.exists(),
            ramRecommendationMb = 2048
        )
        
        _availableModels.value = listOf(transModel)
    }

    override fun canLoadModel(modelId: String): Boolean {
        val model = _availableModels.value.find { it.modelId == modelId } ?: return false
        val am = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val memInfo = ActivityManager.MemoryInfo()
        am.getMemoryInfo(memInfo)

        val availRamMb = memInfo.availMem / (1024 * 1024)
        Log.d("ModelManager", "Available RAM: ${availRamMb}MB, Required: ${model.ramRecommendationMb}MB")
        
        // Prevent loading if RAM is dangerously low
        return availRamMb > (model.ramRecommendationMb / 2)
    }

    override suspend fun loadModel(modelId: String) = withContext(Dispatchers.IO) {
        if (!canLoadModel(modelId)) {
            throw IllegalStateException("Insufficient RAM to load model: $modelId")
        }
        _isModelLoading.value = true
        try {
            // Actual ONNX runtime initialization will happen in the specific Engine class
            // This manager simply ensures we have the resources and state tracked.
            Log.d("ModelManager", "Model $modelId marked as ready for inference.")
        } finally {
            _isModelLoading.value = false
        }
    }

    override fun unloadModel(modelId: String) {
        Log.d("ModelManager", "Model $modelId requested unload to free RAM.")
        // Delegate actual OrtSession cleanup to engines
    }

    override suspend fun installModelLocally(modelId: String) = withContext(Dispatchers.IO) {
        // Logic to copy from assets or download from a URL.
        // For the prototype, we assume the user pushes the .onnx via adb.
        Log.d("ModelManager", "Installing model $modelId...")
        refreshModelList()
    }
}
