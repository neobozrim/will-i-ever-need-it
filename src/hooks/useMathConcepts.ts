import { useState, useEffect } from 'react';
import { supabase, getStorageUrl } from '../lib/supabase';
import { MathConcept, DatabaseMathConcept } from '../types';

// Helper function to check if a string is a full URL
const isFullUrl = (url: string | null): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper function to transform database concept to app concept
const transformConcept = (dbConcept: DatabaseMathConcept): MathConcept => {
  // Extract category and difficulty from title or description, or use defaults
  const category = extractCategory(dbConcept.title, dbConcept.description);
  const difficulty = extractDifficulty(dbConcept.title, dbConcept.description);
  
  // Handle thumbnail URL - use as is if it's already a full URL, otherwise construct it
  const getMediaUrl = (url: string | null, bucket: string) => {
    if (!url) return null;
    return isFullUrl(url) ? url : getStorageUrl(bucket, url);
  };
  
  return {
    id: dbConcept.id,
    slug: dbConcept.slug,
    title: dbConcept.title,
    description: dbConcept.description,
    thumbnail_url: getMediaUrl(dbConcept.thumbnail_url, 'thumbnails'),
    hero_image_url: getMediaUrl(dbConcept.hero_image_url, 'hero-images'),
    audio_recording_url: getMediaUrl(dbConcept.audio_recording_url, 'audio-recordings'),
    blog_post_content: dbConcept.blog_post_content,
    category,
    difficulty,
    created_at: dbConcept.created_at,
    updated_at: dbConcept.updated_at,
  };
};

// Helper functions to extract category and difficulty
const extractCategory = (title: string, description: string): string => {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('algebra') || text.includes('equation')) return 'Algebra';
  if (text.includes('calculus') || text.includes('derivative') || text.includes('integral')) return 'Calculus';
  if (text.includes('trigonometry') || text.includes('sine') || text.includes('cosine')) return 'Trigonometry';
  if (text.includes('linear algebra') || text.includes('vector') || text.includes('matrix')) return 'Linear Algebra';
  if (text.includes('statistics') || text.includes('probability')) return 'Statistics';
  if (text.includes('number theory') || text.includes('prime')) return 'Number Theory';
  if (text.includes('geometry')) return 'Geometry';
  
  return 'Mathematics';
};

const extractDifficulty = (title: string, description: string): 'beginner' | 'intermediate' | 'advanced' => {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('advanced') || text.includes('calculus') || text.includes('linear algebra')) return 'advanced';
  if (text.includes('intermediate') || text.includes('trigonometry') || text.includes('algebra')) return 'intermediate';
  
  return 'beginner';
};

export const useMathConcepts = () => {
  const [concepts, setConcepts] = useState<MathConcept[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConcepts = async () => {
      try {
        console.log('Starting to fetch concepts...');
        setLoading(true);
        setError(null);

        console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
        
        // First, test the connection to Supabase
        const { data: authData, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
          console.error('Supabase auth error:', authError);
          throw new Error(`Authentication failed: ${authError.message}`);
        }
        
        console.log('Supabase session:', authData);
        
        // Then fetch the concepts
        const { data, error: supabaseError, count } = await supabase
          .from('math_concepts')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false });

        console.log('Supabase response - data:', data);
        console.log('Supabase response - error:', supabaseError);
        console.log('Total concepts found:', count);

        if (supabaseError) {
          console.error('Supabase query error:', supabaseError);
          throw new Error(`Failed to fetch concepts: ${supabaseError.message} (${supabaseError.code})`);
        }

        if (!data || data.length === 0) {
          console.warn('No concepts found in the database');
        }

        const transformedConcepts = data?.map(transformConcept) || [];
        console.log('Transformed concepts:', transformedConcepts);
        setConcepts(transformedConcepts);
      } catch (err) {
        console.error('Error in fetchConcepts:', err);
        const errorMessage = err instanceof Error ? 
          `${err.message} (${err.name})` : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchConcepts();
  }, []);

  return { concepts, loading, error };
};

export const useMathConcept = (slug: string) => {
  const [concept, setConcept] = useState<MathConcept | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConcept = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('math_concepts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (supabaseError) {
          if (supabaseError.code === 'PGRST116') {
            throw new Error('Concept not found');
          }
          throw new Error(`Failed to fetch concept: ${supabaseError.message}`);
        }

        const transformedConcept = transformConcept(data);
        setConcept(transformedConcept);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching math concept:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConcept();
  }, [slug]);

  return { concept, loading, error };
};