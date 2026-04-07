import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Facebook webhook verification
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.FACEBOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

// Handle incoming Facebook messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle opt-in or other webhook events
    if (body.object !== 'page') {
      return NextResponse.json({ status: 'ok' });
    }

    const entries = body.entry || [];

    for (const entry of entries) {
      const messaging = entry.messaging || [];

      for (const event of messaging) {
        const senderId = event.sender?.id;
        const recipientId = event.recipient?.id;
        const message = event.message?.text;

        if (!message || !senderId) continue;

        // In a real implementation, you would:
        // 1. Find the business associated with this Facebook page
        // 2. Create or find the conversation
        // 3. Store the incoming message
        // 4. Trigger AI response

        console.log(`Received message from ${senderId}: ${message}`);

        // Log the incoming message (would save to database in production)
        // await saveMessage(senderId, message, 'customer');

        // Trigger AI response (would call /api/chat in production)
        // This is handled asynchronously
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Facebook webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
