import { NextResponse } from "next/server";
import nlp from "compromise";
// Optional: Extend compromise with more plugins if needed later
// import nlpPlugin from 'compromise-plugin';
// nlp.plugin(nlpPlugin);

// Define the expected structure of a tagged term for clarity
interface TaggedTerm {
  text: string;
  tags: string[];
  normal?: string; // compromise adds other properties too
  // Add other properties if you need them from compromise's output
}

// Define the structure of the successful API response
interface TaggingResponse {
  taggedTerms: TaggedTerm[];
}

// Define the structure of the error response
interface ErrorResponse {
  error: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const textToTag: string = body.text;

    if (
      !textToTag ||
      typeof textToTag !== "string" ||
      textToTag.trim().length === 0
    ) {
      return NextResponse.json<ErrorResponse>(
        { error: "Input text cannot be empty." },
        { status: 400 } // Bad Request
      );
    }

    // Process the text with compromise
    const doc = nlp(textToTag);

    // Get terms with their tags. Using json() is convenient.
    // We select only the properties we need (text, tags).
    // You can explore doc.json() output to see all available info.
    const taggedData = doc.json({
      terms: { tags: true, text: true, normal: true },
    });

    // Extract just the terms array which matches our TaggedTerm structure
    const taggedTerms: TaggedTerm[] = taggedData[0]?.terms || []; // compromise json() returns an array of sentences

    return NextResponse.json<TaggingResponse>({ taggedTerms });
  } catch (error) {
    console.error("POS Tagging API Error:", error);
    let errorMessage = "Failed to process text.";
    if (error instanceof Error) {
      // Avoid leaking internal details in production, but log them
      // errorMessage = error.message; // Be cautious about exposing raw error messages
    }
    return NextResponse.json<ErrorResponse>(
      { error: errorMessage },
      { status: 500 } // Internal Server Error
    );
  }
}
