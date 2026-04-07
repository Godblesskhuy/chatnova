import { NextRequest, NextResponse } from 'next/server';

// Handle QPay payment webhooks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // QPay webhook payload
    const { invoice_id, payment_info, status, amount } = body;

    if (!invoice_id) {
      return NextResponse.json(
        { error: 'Missing invoice_id' },
        { status: 400 }
      );
    }

    // Verify webhook signature (if QPay provides one)
    // const signature = request.headers.get('x-qpay-signature');
    // const expectedSignature = crypto
    //   .createHmac('sha256', process.env.QPAY_SECRET_KEY || '')
    //   .update(JSON.stringify(body))
    //   .digest('hex');
    // if (signature !== expectedSignature) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }

    // Handle payment status
    switch (status) {
      case 'paid':
        // Update order status to paid
        // await supabase.from('orders')
        //   .update({ status: 'paid', updated_at: new Date().toISOString() })
        //   .eq('qpay_invoice_id', invoice_id);

        // Log activity
        console.log(`Payment received: ${invoice_id} - ${amount}₮`);

        // Send confirmation message to customer
        // This would integrate with Facebook Messenger API
        break;

      case 'cancelled':
        // Update order status to cancelled
        // await supabase.from('orders')
        //   .update({ status: 'cancelled', updated_at: new Date().toISOString() })
        //   .eq('qpay_invoice_id', invoice_id);
        break;

      case 'expired':
        // Handle expired payment
        console.log(`Payment expired: ${invoice_id}`);
        break;

      default:
        console.log(`Unknown payment status: ${status}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('QPay webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
