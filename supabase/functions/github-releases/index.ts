const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Extract repository info from query parameters
    const url = new URL(req.url);
    const owner = url.searchParams.get('owner') || 'Parsa3323';
    const repo = url.searchParams.get('repo') || 'AdvancedArmorStands';

    // Make authenticated request to GitHub API
    const githubResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases`,
      {
        headers: {
          'User-Agent': 'Supabase-Edge-Function',
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!githubResponse.ok) {
      throw new Error(`GitHub API error: ${githubResponse.status}`);
    }

    const releases = await githubResponse.json();

    return new Response(
      JSON.stringify(releases),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Error fetching releases:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch releases',
        message: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});