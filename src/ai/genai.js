import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateSQLQuery(userQuery) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Convert this natural language query into a PostgreSQL SELECT query for scholarships: "${userQuery}"

    Use this exact table schema:
    CREATE TABLE scholarships (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      amount INTEGER NOT NULL,
      location VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      religious VARCHAR(255) NOT NULL,
      gender VARCHAR(255) NOT NULL,
      min_age INTEGER NOT NULL,
      max_age INTEGER NOT NULL,
      category VARCHAR(255) NOT NULL,
      institution_name VARCHAR(255),
      deadline DATE,
      income INTEGER,
      disability BOOLEAN,
      ex_service BOOLEAN,
      is_active BOOLEAN DEFAULT true,
      "createdAt" TIMESTAMP,
      "updatedAt" TIMESTAMP
    );

    Rules for query generation:
    1. Always include is_active = true in WHERE clause
    2. Use ILIKE with '%term%' pattern for flexible text matching
    3. For each text field (name, description, type, category, etc.), check both the field directly and description
    4. Use proper NULL handling
    5. Include proper date handling for deadlines
    6. Use BETWEEN for age and amount ranges
    7. Consider 'Any' as a valid match for gender, religious, and category
    8. For caste-based searches (SC, ST, BC, OBC, etc.), check both category and description
    9. Order results by deadline ASC, amount DESC
    10. Limit results to 100
    11. Return ONLY the SQL query, no explanations

    Example format:
    SELECT * FROM scholarships 
    WHERE is_active = true 
    AND (
      category ILIKE '%BC%' 
      OR description ILIKE '%BC%' 
      OR category ILIKE '%backward class%' 
      OR description ILIKE '%backward class%'
      OR category = 'Any'
    )
    ORDER BY deadline ASC, amount DESC 
    LIMIT 100;`;

    const result = await model.generateContent(prompt);
    let sqlQuery = result.response.text().trim();

    sqlQuery = sqlQuery
      .replace(/```sql\s*/g, '')
      .replace(/```/g, '')
      .trim();

    if (!sqlQuery.includes('SELECT') || !sqlQuery.includes('FROM scholarships')) {
      throw new Error('Invalid SQL query generated');
    }

    if (!sqlQuery.includes('is_active = true')) {
      sqlQuery = sqlQuery.replace(
        /WHERE/i,
        'WHERE is_active = true AND'
      );
    }

    return sqlQuery;
  } catch (error) {
    console.error("Error generating SQL query:", error);
    return `
      SELECT * FROM scholarships 
      WHERE is_active = true 
      AND (
        description ILIKE '%${userQuery}%'
        OR name ILIKE '%${userQuery}%'
        OR category ILIKE '%${userQuery}%'
        OR category = 'Any'
      )
      ORDER BY deadline ASC, amount DESC 
      LIMIT 100;
    `.trim();
  }
}

async function searchScholarships(userQuery) {
  try {
    const sqlQuery = await generateSQLQuery(userQuery);
    return sqlQuery;
  } catch (error) {
    console.error('Error in searchScholarships:', error);
    throw error;
  }
}

export { generateSQLQuery, searchScholarships }; 