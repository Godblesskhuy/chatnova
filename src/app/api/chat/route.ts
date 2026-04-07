import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase/server';

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

interface ChatRequest {
  conversationId: string;
  message: string;
  userId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { conversationId, message, userId } = body;

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'Message and userId are required' },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI not configured' },
        { status: 503 }
      );
    }

    const supabase = await createClient();

    // Get user's AI config
    const { data: aiConfig } = await supabase
      .from('ai_configs')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Get user's products for context
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    // Get user's knowledge base
    const { data: knowledgeBase } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('user_id', userId);

    // Get user's profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    const businessName = profile?.business_name || 'Бизнес';

    // Build context for AI
    let systemPrompt = aiConfig?.welcome_message || `Сайн байна уу! ${businessName}-д тавтай морил.`;
    systemPrompt += '\n\nТа бол AI чатбот. Монгол хэлээр хариулах ёстой.';

    if (products && products.length > 0) {
      systemPrompt += '\n\nБүтээгдэхүүнүүд:';
      products.forEach(p => {
        systemPrompt += `\n- ${p.name}: ${p.price}₮ (${p.description || ''})`;
      });
    }

    if (knowledgeBase && knowledgeBase.length > 0) {
      systemPrompt += '\n\nТүгээмэл асуултууд:';
      knowledgeBase.forEach(kb => {
        systemPrompt += `\nQ: ${kb.question}\nA: ${kb.answer}`;
      });
    }

    systemPrompt += '\n\nАсуултад товч, мэргэжлийн хариу өг. Хариулалт 2-3 өгүүлбэрт багтаах.';

    // Call OpenAI
    const model = aiConfig?.model_name || 'gpt-4.1-mini';
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Уучлаарай, хариу өгөх боломжгүй байна.';

    // Save AI response to messages table
    if (conversationId) {
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        sender_type: 'bot',
        content: aiResponse,
      });

      // Update conversation
      await supabase
        .from('conversations')
        .update({
          last_message: aiResponse.slice(0, 100),
          last_message_at: new Date().toISOString(),
        })
        .eq('id', conversationId);
    }

    // Log activity
    await supabase.from('activity_log').insert({
      user_id: userId,
      action_type: 'ai_response',
      description: 'AI чатбот хариу өглөө',
      metadata: { message_length: message.length, response_length: aiResponse.length },
    });

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
