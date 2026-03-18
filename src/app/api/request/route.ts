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
    // Response format: { runId, status, result: { payloads: [{ text }], meta: { agentMeta: { sessionId } } } }
    let result;
    try {
      result = JSON.parse(stdout);
    } catch {
      result = null;
    }

    // Extract reply text from OpenClaw response
    let reply = "";
    let agentSessionId = sessionId;

    if (result?.result?.payloads?.length > 0) {
      reply = result.result.payloads
        .map((p: { text?: string }) => p.text || "")
        .filter(Boolean)
        .join("\n\n");
      agentSessionId =
        result.result?.meta?.agentMeta?.sessionId || sessionId;
    } else if (result?.reply || result?.message || result?.content) {
      reply = result.reply || result.message || result.content;
    } else {
      reply = stdout.trim();
    }

    return NextResponse.json({
      success: true,
      reply,
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
