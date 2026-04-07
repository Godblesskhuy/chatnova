import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const period = searchParams.get('period') || '7d'; // 7d, 30d, 90d

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Calculate date range
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default: // 7d
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get message stats
    const { count: totalMessages } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation.user_id', userId);

    // Get AI response count
    const { count: aiResponses } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('sender_type', 'bot');

    // Get new conversations
    const { count: newCustomers } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString());

    // Get orders and revenue
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'paid')
      .gte('created_at', startDate.toISOString());

    const totalRevenue = orders?.reduce((sum, order) => {
      const amount = parseInt(order.total_amount?.replace(/[^0-9]/g, '') || '0');
      return sum + amount;
    }, 0) || 0;

    // Get recent activity
    const { data: recentActivity } = await supabase
      .from('activity_log')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get daily message data for chart
    const dailyData: { date: string; messages: number; revenue: number }[] = [];
    const daysCount = period === '7d' ? 7 : period === '30d' ? 14 : 30;
    const daysStep = period === '7d' ? 1 : period === '30d' ? 2 : 3;

    for (let i = 0; i < daysCount; i++) {
      const date = new Date(startDate.getTime() + i * daysStep * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];

      // Placeholder - would query actual data
      dailyData.push({
        date: dateStr,
        messages: Math.floor(Math.random() * 100) + 20,
        revenue: Math.floor(Math.random() * 100000) + 10000,
      });
    }

    return NextResponse.json({
      totalMessages: totalMessages || 0,
      aiResponses: aiResponses || 0,
      newCustomers: newCustomers || 0,
      totalRevenue,
      recentActivity: recentActivity || [],
      dailyData,
      period,
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
