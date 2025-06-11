const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the project root
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize ElevenLabs client
const ELEVENLABS_API_KEY = process.env.VITE_ELEVENLABS_API_KEY as string;

if (!ELEVENLABS_API_KEY) {
  throw new Error('Missing ElevenLabs API key');
}

const elevenLabsClient = axios.create({
  baseURL: 'https://api.elevenlabs.io/v1',
  headers: {
    'xi-api-key': ELEVENLABS_API_KEY,
    'Content-Type': 'application/json',
  },
});

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  blog_post_content: string;
  created_at: string;
  updated_at: string;
}

interface ElevenLabsDocument {
  id: string;
  name: string;
  text?: string;
  metadata?: {
    source: string;
    type: string;
    slug: string;
    updated_at: string;
  };: string;
  slug: string;
  title: string;
  blog_post_content: string;
  created_at: string;
  updated_at: string;
}

interface ElevenLabsDocument {
  id: string;
  name: string;
  text?: string;
  metadata?: {
    source: string;
    type: string;
    slug: string;
    updated_at: string;
  };
}

async function listDocuments(): Promise<Record<string, ElevenLabsDocument>> {
  try {
    const response = await elevenLabsClient.get('/convai/knowledge-base');
    const documents: Record<string, ElevenLabsDocument> = {};
    
    for (const doc of response.data.documents) {
      documents[doc.name] = doc;
    }
    
    return documents;
  } catch (error: any) {
    console.error('Error listing documents:', error.response?.data || error.message);
    throw error;
  }
}

async function createOrUpdateDocument(
  slug: string, 
  content: string,
  existingDocId?: string
): Promise<void> {
  const documentData = {
    name: slug,
    text: content,
    metadata: {
      source: 'supabase',
      type: 'blog_post',
      slug,
      updated_at: new Date().toISOString(),
    },
  };

  try {
    if (existingDocId) {
      // Update existing document
      await elevenLabsClient.put(
        `/convai/knowledge-base/${existingDocId}`,
        documentData
      );
      console.log(`✅ Updated document: ${slug}`);
    } else {
      // Create new document
      await elevenLabsClient.post(
        '/convai/knowledge-base',
        documentData
      );
      console.log(`✅ Created document: ${slug}`);
    }
  } catch (error: any) {
    console.error(`❌ Error processing document ${slug}:`, error.response?.data || error.message);
    throw error;
  }
}

async function syncBlogPosts() {
  try {
    console.log('🚀 Starting blog post sync to ElevenLabs...');

    // 1. Fetch all blog posts from Supabase
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*');

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    if (!posts || posts.length === 0) {
      console.log('ℹ️ No blog posts found in Supabase');
      return;
    }

    console.log(`📝 Found ${posts.length} blog posts to sync`);

    // 2. Get existing documents from ElevenLabs
    console.log('🔍 Fetching existing documents from ElevenLabs...');
    const existingDocs = await listDocuments();
    console.log(`📚 Found ${Object.keys(existingDocs).length} existing documents`);

    // 3. Process each post
    for (const post of posts as BlogPost[]) {
      if (!post.slug || !post.blog_post_content) {
        console.warn(`⚠️ Skipping post with missing slug or content: ${post.id}`);
        continue;
      }

      const documentContent = `# ${post.title || 'Untitled Post'}

SLUG: ${post.slug}
UPDATED_AT: ${post.updated_at || new Date().toISOString()}

${post.blog_post_content}`;

      const existingDoc = existingDocs[post.slug];
      
      await createOrUpdateDocument(
        post.slug,
        documentContent,
        existingDoc?.id
      );
    }

    console.log('🎉 Sync completed successfully!');
  } catch (error: any) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Run the sync
// Run the sync
syncBlogPosts().catch(console.error);
