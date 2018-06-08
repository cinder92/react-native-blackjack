package com.blackjack.modules;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.ServiceConnection;
import android.content.res.AssetFileDescriptor;
import android.media.AudioManager;
import android.media.MediaPlayer;


import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.io.InputStream;

/**
 * Created by ivillamil on 12/8/16.
 */

public class AudioPlayer extends ReactContextBaseJavaModule {
    private static AudioPlayer instance = null;
    private MediaPlayer mediaPlayer;
    private Context context;

    public static AudioPlayer getInstance(ReactApplicationContext reactContext) {
        if (instance == null) {
            instance = new AudioPlayer(reactContext);
        }

        return instance;
    }

    private AudioPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AudioPlayer";
    }

    @ReactMethod
    public void canPlay(Callback callback) {
        callback.invoke((mediaPlayer != null));
    }

    @ReactMethod
    public void getVolume(Callback callback) {
        // No se puede obtener el volumen con el MediaPlayer
        callback.invoke(false);
    }

    @ReactMethod
    public void loadAudio(String url, final Callback callback) throws IOException {
        if (mediaPlayer == null) {
            mediaPlayer = new MediaPlayer();

            AssetFileDescriptor afd = this.getCurrentActivity().getApplicationContext().getAssets().openFd(url);
            mediaPlayer.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
            mediaPlayer.setLooping(true);
            mediaPlayer.setVolume(1, 1);
            afd.close();
            mediaPlayer.prepare();

            callback.invoke(true);
        } else {
            callback.invoke(false);
        }
    }

    @ReactMethod
    public void play() {
        mediaPlayer.start();
    }

    @ReactMethod
    public void playing(Callback callback) {
        if (mediaPlayer != null) {
            callback.invoke(mediaPlayer.isPlaying());
        } else {
            callback.invoke(false);
        }
    }

    @ReactMethod
    public void pause() {
        if(mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer = null;
        }
    }

    @ReactMethod
    public void setVolume(float volume) {
        if (mediaPlayer != null) {
            mediaPlayer.setVolume(volume, volume);
        }
    }
}
