package com.example.ai

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.util.Log
import com.example.domain.ai.TtsEngine
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.Locale
import javax.inject.Inject

class NativeTtsEngine @Inject constructor(
    private val context: Context
) : TtsEngine, TextToSpeech.OnInitListener {

    private var tts: TextToSpeech? = null
    
    private val _isSpeaking = MutableStateFlow(false)
    override val isSpeaking: StateFlow<Boolean> = _isSpeaking.asStateFlow()

    private var isInitialized = false

    init {
        tts = TextToSpeech(context, this)
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            isInitialized = true
            tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) {
                    _isSpeaking.value = true
                }
                override fun onDone(utteranceId: String?) {
                    _isSpeaking.value = false
                }
                override fun onError(utteranceId: String?) {
                    _isSpeaking.value = false
                    Log.e("NativeTtsEngine", "TTS Error: $utteranceId")
                }
            })
        } else {
            Log.e("NativeTtsEngine", "TTS Initialization failed")
        }
    }

    override fun speak(text: String, languageCode: String, speed: Float) {
        if (!isInitialized) {
            Log.e("NativeTtsEngine", "TTS not initialized")
            return
        }
        
        // Android TTS lacks Santali offline voices generally. 
        // As per the constraints: "Do NOT pretend that Hindi TTS is Santali TTS."
        // We will fail transparently if Santali audio is requested without a valid engine.
        if (languageCode.startsWith("sat")) {
            Log.w("NativeTtsEngine", "Santali native offline TTS not available. Falling back to pre-recorded or failing.")
            // In a full implementation, we'd check if pre-recorded .ogg exists for this phrase in Room.
            // For now, we drop the synthesis request.
            return
        }

        val locale = when (languageCode) {
            "hi", "hi-IN" -> Locale("hi", "IN")
            else -> Locale("hi", "IN") // Defaulting to Hindi for Indian languages where possible
        }

        tts?.language = locale
        tts?.setSpeechRate(speed)
        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "utterance_${System.currentTimeMillis()}")
    }

    override fun stop() {
        tts?.stop()
        _isSpeaking.value = false
    }

    override fun destroy() {
        tts?.stop()
        tts?.shutdown()
        tts = null
    }
}
