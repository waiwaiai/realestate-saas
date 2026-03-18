import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

// Use spawn instead of exec to avoid shell escaping issues
function runCommand(
  cmd: string,
  args: string[],
  timeoutMs: number
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";

    const proc = spawn(cmd, args, {
      timeout: timeoutMs,
      env: {
        ...process.env,
        PATH: `/opt/homebrew/bin:/usr/local/bin:${process.env.PATH || ""}`,
        HOME: process.env.HOME || "/Users/kubotatoshi",
      },
    });

    proc.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    proc.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(stderr || `Process exited with code ${code}`));
      }
    });

    proc.on("error", (err) => {
      reject(err);
    });
  });
}

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 }
      );
    }

    // Build openclaw agent args (no shell escaping needed with spawn)
    const args = [
      "agent",
      "--agent", "iesearch",
      "--message", message,
      "--json",
      "--thinking", "medium",
      "--timeout", "300",
    ];

    if (sessionId) {
      args.push("--session-id", sessionId);
    }

    const { stdout } = await runCommand("openclaw", args, 310000);

    // Parse JSON response from openclaw
    let result;
    try {
      result = JSON.parse(stdout);
    } catch {
      result = null;
    }

    // Debug: log full response to console
    console.log("=== OpenClaw Response ===");
    console.log(JSON.stringify(result, null, 2));

    // Extract reply text from OpenClaw response
    let reply = "";
    let agentSessionId = sessionId;

    // Extract payloads text
    const payloadTexts: string[] =
      result?.result?.payloads
        ?.map((p: { text?: string }) => p.text || "")
        .filter(Boolean) || [];

    if (payloadTexts.length > 0) {
      // Normal case: payloads have text
      reply = payloadTexts.join("\n\n");
      agentSessionId =
        result?.result?.meta?.agentMeta?.sessionId || sessionId;
    } else if (result?.result?.meta?.agentMeta?.sessionId) {
      // Payloads empty but response parsed OK — agent ran but returned no text
      agentSessionId = result.result.meta.agentMeta.sessionId;
      reply = "リクエストを受け付けました。確認中です。もう少々お待ちください。";
      console.log("Warning: OpenClaw payloads empty, agent may have run without text output");
    } else if (result?.reply || result?.message || result?.content) {
      // Alternative response format
      reply = result.reply || result.message || result.content;
    } else if (result) {
      // Parsed JSON but no recognizable text field — don't show raw JSON
      reply = "リクエストを受け付けました。処理を進めています。";
      console.log("Warning: OpenClaw response has no text fields:", Object.keys(result));
    } else {
      // Could not parse as JSON — use raw output only if it looks like text
      const raw = stdout.trim();
      if (raw.startsWith("{") || raw.startsWith("[")) {
        reply = "回答の取得中に問題が起きました。もう一度お試しください。";
        console.log("Warning: Raw stdout looks like JSON but failed to extract text");
      } else {
        reply = raw;
      }
    }

    return NextResponse.json({
      success: true,
      reply,
      payloads: payloadTexts.length > 0 ? payloadTexts : [reply],
      sessionId: agentSessionId,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("OpenClaw agent error:", err.message);
    return NextResponse.json(
      {
        error: "Agent execution failed",
        detail: err.message,
      },
      { status: 500 }
    );
  }
}
