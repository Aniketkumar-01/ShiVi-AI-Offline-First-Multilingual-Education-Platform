package com.example.ai

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.util.Log
import com.example.domain.ai.AsrEngine
import com.example.domain.ai.AsrState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject

class NativeAsrEngine @Inject constructor(
    private val context: Context
) : AsrEngine {

    private var speechRecognizer: SpeechRecognizer? = null
    
    private val _state = MutableStateFlow(AsrState())
    override val state: StateFlow<AsrState> = _state.asStateFlow()

    override val isAvailable: Boolean
        get() = SpeechRecognizer.isRecognitionAvailable(context)

    override fun startListening(languageCode: String) {
        if (!isAvailable) {
            _state.value = AsrState(errorMessage = "Speech Recognition not available on device.")
            return
        }

        // Fulfilling the requirement: "Do not silently substitute Hindi ASR for Santali ASR"
        // If the language is Santali, check if we have a model. 
        // Since we don't have a native offline Santali model in this implementation, fail transparently.
        if (languageCode.startsWith("sat")) {
            _state.value = AsrState(errorMessage = "Santali ASR model not installed. Please use Text input.")
            return
        }

        _state.value = AsrState(isListening = true)

        try {
            speechRecognizer?.destroy()
            speechRecognizer = SpeechRecognizer.createSpeechRecognizer(context).apply {
                setRecognitionListener(object : RecognitionListener {
                    override fun onReadyForSpeech(params: Bundle?) {}
                    override fun onBeginningOfSpeech() {}
                    override fun onRmsChanged(rmsdB: Float) {}
                    override fun onBufferReceived(buffer: ByteArray?) {}
                    override fun onEndOfSpeech() {
                        _state.value = _state.value.copy(isListening = false)
                    }

                    override fun onError(error: Int) {
                        val msg = when (error) {
                            SpeechRecognizer.ERROR_NETWORK -> "Network Error"
                            SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "Network Timeout"
                            SpeechRecognizer.ERROR_NO_MATCH -> "Please speak again."
                            else -> "Speech Error: $error"
                        }
                        _state.value = AsrState(errorMessage = msg, isListening = false)
                    }

                    override fun onResults(results: Bundle?) {
                        val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                        val text = matches?.firstOrNull()?.trim() ?: ""
                        _state.value = _state.value.copy(recognizedText = text, isListening = false)
                    }

                    override fun onPartialResults(partialResults: Bundle?) {
                        val matches = partialResults?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                        val text = matches?.firstOrNull()?.trim() ?: ""
                        _state.value = _state.value.copy(partialText = text)
                    }

                    override fun onEvent(eventType: Int, params: Bundle?) {}
                })
            }

            val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
                putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                putExtra(RecognizerIntent.EXTRA_LANGUAGE, languageCode)
                putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
                // Force offline requirement
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                    putExtra(RecognizerIntent.EXTRA_PREFER_OFFLINE, true)
                }
            }

            speechRecognizer?.startListening(intent)
        } catch (e: Exception) {
            _state.value = AsrState(errorMessage = "Failed to start ASR: ${e.message}", isListening = false)
            Log.e("NativeAsrEngine", "Error starting ASR", e)
        }
    }

    override fun stopListening() {
        speechRecognizer?.stopListening()
        _state.value = _state.value.copy(isListening = false)
    }

    override fun destroy() {
        speechRecognizer?.destroy()
        speechRecognizer = null
    }
}
