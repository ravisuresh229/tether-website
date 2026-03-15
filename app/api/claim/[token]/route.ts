import { NextRequest, NextResponse } from "next/server";

export type ClaimData = {
  referringPracticeName: string | null;
  receivingPractice: {
    name: string;
    address: string;
    specialty: string;
    providerCount?: number;
  };
};

/**
 * GET /api/claim/[token]
 * Returns claim/referral data for the given token.
 * Replace this with your real claim token lookup (e.g. DB by token);
 * do not change the response shape so the claim page keeps working.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  // TODO: Replace with real claim/referral lookup (e.g. by token).
  // Response shape must stay: referringPracticeName (or null), receivingPractice.
  const data: ClaimData = {
    referringPracticeName: null,
    receivingPractice: {
      name: "",
      address: "",
      specialty: "",
      providerCount: undefined,
    },
  };

  return NextResponse.json(data);
}
