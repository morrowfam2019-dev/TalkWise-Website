import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn(
    "[transcribe] OPENAI_API_KEY is not set. Speech transcription will not work.",
  );
}

export async function POST(request: NextRequest) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Transcription service not configured." },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid request: expected FormData with audio file." },
      { status: 400 },
    );
  }

  const audioFile = formData.get("audio");
  if (!audioFile || !(audioFile instanceof File)) {
    return NextResponse.json(
      { error: "Missing 'audio' file in request." },
      { status: 400 },
    );
  }

  if (audioFile.size > 25 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Audio file too large (max 25 MB)." },
      { status: 413 },
    );
  }

  try {
    const whispFormData = new FormData();
    whispFormData.append("file", audioFile);
    whispFormData.append("model", "whisper-1");
    whispFormData.append("language", "en");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: whispFormData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[transcribe] OpenAI API error:", response.status, error);
      return NextResponse.json(
        { error: "Transcription failed. Please try again." },
        { status: 500 },
      );
    }

    const result = (await response.json()) as { text: string };
    return NextResponse.json({ text: result.text });
  } catch (error) {
    console.error("[transcribe] Error calling OpenAI Whisper API:", error);
    return NextResponse.json(
      { error: "Transcription error. Please try again." },
      { status: 500 },
    );
  }
}
