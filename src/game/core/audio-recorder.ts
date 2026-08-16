/**
 * Audio recording for speech-to-text transcription.
 *
 * Uses MediaRecorder API (works on iOS, Android, desktop).
 * Records a short mono audio clip and uploads it to the transcription API.
 */

export interface AudioRecorderConfig {
  timeoutMs?: number;
  onProgress?: (status: "recording" | "uploading" | "done" | "error") => void;
}

export class AudioRecorder {
  private mediaStream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private timeoutId: number | null = null;

  async startRecording(
    config?: AudioRecorderConfig,
  ): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.recorder = new MediaRecorder(this.mediaStream, {
        mimeType: "audio/webm;codecs=opus",
      });

      this.chunks = [];
      this.recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.chunks.push(e.data);
        }
      };

      this.recorder.start();
      config?.onProgress?.("recording");

      if (config?.timeoutMs) {
        this.timeoutId = window.setTimeout(() => {
          this.stopRecording();
        }, config.timeoutMs);
      }
    } catch (error) {
      console.error("[AudioRecorder] Failed to start recording:", error);
      config?.onProgress?.("error");
      throw error;
    }
  }

  stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.recorder) {
        resolve(null);
        return;
      }

      this.clearTimeout();

      this.recorder.onstop = () => {
        if (this.chunks.length === 0) {
          resolve(null);
          return;
        }

        const blob = new Blob(this.chunks, { type: "audio/webm" });
        this.chunks = [];
        this.cleanup();
        resolve(blob);
      };

      this.recorder.stop();
    });
  }

  async transcribe(audioBlob: Blob): Promise<string> {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");

    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Transcription failed");
    }

    const result = (await response.json()) as { text: string };
    return result.text;
  }

  private clearTimeout(): void {
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private cleanup(): void {
    this.clearTimeout();
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    this.recorder = null;
  }

  stop(): void {
    this.cleanup();
  }
}
