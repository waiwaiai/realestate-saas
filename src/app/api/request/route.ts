import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

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

    // Build openclaw agent command
    const args = [
      "agent",
      "--agent", "main",
      "--message", message,
      "--json",
      "--thinking", "medium",
      "--timeout", "300",
    ];

    if (sessionId) {
      args.push("--session-id", sessionId);
    }

    // Escape the message for shell
    const escapedArgs = args.map((arg) =>
      arg === message ? `'${arg.replace(/'/g, "'\\''")}'` : arg
    );

    const command = `/opt/homebrew/bin/openclaw ${escapedArgs.join(" ")}`;

    const { stdout, stderr } = await execAsync(command, {
      timeout: 310000,
      env: { ...process.env, PATH: `/opt/homebrew/bin:${process.env.PATH}` },
    });

    // Parse JSON response from openclaw
    let result;
    try {
      result = JSON.parse(stdout);
    } catch {
      // If not valid JSON, return as text
      result = { reply: stdout.trim(), raw: true };
    }

    return NextResponse.json({
      success: true,
      reply: result.reply || result.message || result.content || stdout.trim(),
      sessionId: result.sessionId || result.session_id || sessionId,
      raw: result,
    });
  } catch (error: unknown) {
    const err = error as { message?: string; stderr?: string };
    console.error("OpenClaw agent error:", err.message);
    return NextResponse.json(
      {
        error: "Agent execution failed",
        detail: err.stderr || err.message,
      },
      { status: 500 }
    );
  }
}
